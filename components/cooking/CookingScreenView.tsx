"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { COOKING_CONFIG, type CookingTab } from "@/components/cooking/config";
import {
  getCatalogItem,
  getItemsByCategory,
  type CookCatalogItem,
} from "@/components/cooking/catalog";
import { CategoryTabs } from "@/components/cooking/CategoryTabs";
import { ItemGrid } from "@/components/cooking/ItemGrid";
import { SelectedBar } from "@/components/cooking/SelectedBar";
import { StartCookingButton } from "@/components/cooking/StartCookingButton";
import { ChefThoughtPanel } from "@/components/cooking/ChefThoughtPanel";
import {
  FoodResultPanel,
  type FoodPanelStatus,
} from "@/components/cooking/FoodResultPanel";
import { useUIScale } from "@/components/order/useUIScale";
import {
  getChefMessageDraft,
  setChefMessageDraft,
} from "@/components/cooking/cookingSession";
import {
  getOrderBackgroundUrl,
  setPendingChefMessage,
  setServingPayload,
} from "@/components/serving/servingSession";
import { navigateToServingScreen } from "@/components/serving/screenNav";
import type { CookApiSuccessData, CookApiRouteResponse } from "@/lib/types/ai";
import { getCurrentGuest } from "@/components/order/guestStore";
import { getCurrentMoney } from "@/components/order/moneyStore";
import { DEFAULT_UTENSIL_ID } from "@/lib/data/utensils";

interface CookingScreenViewProps {
  visible: boolean;
}

type CookingPhase = "selecting" | "cooking";

/** * 为已选食材定义显示顺序权重 
 * 按照：主食 -> 肉品 -> 蔬菜 -> 调料 -> 厨具 排序
 */
const CATEGORY_SORT_WEIGHT: Record<string, number> = {
  staple: 1,
  meat: 2,
  vegetable: 3,
  seasoning: 4,
  utensil: 5,
};

/**
 * 界面2：烹饪选料 → 开始烹饪 → 左右双框（心里话 / 出锅）
 */
export function CookingScreenView({ visible }: CookingScreenViewProps) {
  const scale = useUIScale();
  const [phase, setPhase] = useState<CookingPhase>("selecting");
  const [activeTab, setActiveTab] = useState<CookingTab>("vegetable");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectedUtensilId, setSelectedUtensilId] = useState<string | null>(
    null,
  );
  const [chefThought, setChefThought] = useState("");
  const chefThoughtRef = useRef("");
  const [foodStatus, setFoodStatus] = useState<FoodPanelStatus>("cooking");
  const [foodImageUrl, setFoodImageUrl] = useState<string | null>(null);
  const [foodName, setFoodName] = useState<string | null>(null);
  const [cookResult, setCookResult] = useState<CookApiSuccessData | null>(
    null,
  );
  const [isCookingNow, setIsCookingNow] = useState(false);

  const tabItems = useMemo(
    () => getItemsByCategory(activeTab),
    [activeTab],
  );

  const selectedItems = useMemo(() => {
    const list: CookCatalogItem[] = [];
    for (const id of selectedIds) {
      const item = getCatalogItem(id);
      if (item && item.category !== "utensil") list.push(item);
    }
    if (selectedUtensilId) {
      const utensil = getCatalogItem(selectedUtensilId);
      if (utensil) list.push(utensil);
    }

    return list.sort((a, b) => {
      const weightA = CATEGORY_SORT_WEIGHT[a.category] || 99;
      const weightB = CATEGORY_SORT_WEIGHT[b.category] || 99;
      return weightA - weightB;
    });
  }, [selectedIds, selectedUtensilId]);

  const selectedIngredientSubtotal = useMemo(
    () =>
      selectedItems
        .filter((item) => item.category !== "utensil")
        .reduce((sum, item) => sum + item.price, 0),
    [selectedItems],
  );

  const hasIngredients = useMemo(
    () => selectedItems.some((item) => item.category !== "utensil"),
    [selectedItems],
  );

  const handleToggle = useCallback((item: CookCatalogItem) => {
    if (item.category === "utensil") {
      setSelectedUtensilId((prev) => (prev === item.id ? null : item.id));
      return;
    }
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(item.id)) next.delete(item.id);
      else next.add(item.id);
      return next;
    });
  }, []);

  const handleRemove = useCallback((id: string) => {
    const item = getCatalogItem(id);
    if (item?.category === "utensil") {
      setSelectedUtensilId(null);
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }, []);

  const handleStartCooking = useCallback(async () => {
    if (!hasIngredients || isCookingNow) return;

    // 这里依然只筛选非厨具作为 ingredientIds 传给后端
    // staple 和 seasoning 会自动包含在内
    const ingredientIds = selectedItems
      .filter((item) => item.category !== "utensil")
      .map((item) => item.id);
    const utensilId = selectedUtensilId ?? DEFAULT_UTENSIL_ID;

    setPhase("cooking");
    setFoodStatus("cooking");
    setIsCookingNow(true);
    setFoodImageUrl(null);
    setFoodName(null);
    setCookResult(null);

    try {
      const guest = getCurrentGuest();
      const response = await fetch("/api/cook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guest_story: guest?.story ?? (chefThought.trim() || "请给顾客一句温柔的话"),
          guest_id: guest?.guest_id,
          player_recipe: {
            ingredient_ids: ingredientIds,
            utensil_id: utensilId,
          },
          current_day: guest?.day ?? 1,
          current_money: getCurrentMoney(),
        }),
      });

      const result = (await response.json()) as CookApiRouteResponse;
      if (!response.ok) {
        throw new Error(result.error || `HTTP ${response.status}`);
      }

      if (result.success && result.data) {
        setCookResult(result.data);
        setFoodImageUrl(result.data.image_url || null);
        setFoodName(result.data.food_name || null);
        setFoodStatus("ready");
      } else {
        throw new Error(result.error || "Cook API returned empty data");
      }
    } catch (error) {
      console.error("[CookingScreenView] cook api failed", error);
      setFoodStatus("ready");
      setFoodName("生图失败，请检查配置");
      setFoodImageUrl(null);
    } finally {
      setIsCookingNow(false);
    }
  }, [chefThought, hasIngredients, isCookingNow, selectedItems, selectedUtensilId]);

  const handleChefThoughtChange = useCallback((value: string) => {
    chefThoughtRef.current = value;
    setChefMessageDraft(value);
    setPendingChefMessage(value);
    setChefThought(value);
  }, []);

  const handleServe = useCallback(() => {
    if (!cookResult || foodStatus !== "ready") return;

    const textarea = document.querySelector<HTMLTextAreaElement>(
      '[aria-label="想对顾客说的话"]',
    );
    const chefMessage = (
      textarea?.value ??
      chefThoughtRef.current ??
      getChefMessageDraft()
    ).trim();

    setServingPayload({
      backgroundUrl: getOrderBackgroundUrl(),
      chefMessage,
      customerEvaluation: cookResult.evaluation,
      foodName: cookResult.food_name,
      starRating: cookResult.star_rating,
      settlement: cookResult.settlement,
    });
    navigateToServingScreen();
  }, [cookResult, foodStatus]);

  const uiStyle = useMemo<CSSProperties>(
    () => ({
      width: COOKING_CONFIG.designWidth,
      height: COOKING_CONFIG.designHeight,
      transform: `scale(${scale})`,
      transformOrigin: "top left",
    }),
    [scale],
  );

  const wrapperStyle = useMemo(
    () => ({
      width: COOKING_CONFIG.designWidth * scale,
      height: COOKING_CONFIG.designHeight * scale,
    }),
    [scale],
  );

  if (!visible) return null;

  return (
    <div
      id="screen-2"
      className="cooking-screen-root order-fade-in absolute inset-0 overflow-hidden bg-black"
      aria-hidden={!visible}
    >
      <div
        className="absolute inset-0 bg-black bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${COOKING_CONFIG.backgroundUrl})`,
          imageRendering: "pixelated",
        }}
        role="img"
        aria-label="烹饪场景"
      />

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={wrapperStyle}
      >
        <div className="relative h-full w-full" style={uiStyle}>
          {phase === "selecting" && (
            <aside
              className="cooking-panel order-pixel-panel absolute bottom-0 right-0 top-0 flex flex-col order-fade-in"
              style={{
                width: `${COOKING_CONFIG.panelWidthPercent}%`,
                minWidth: COOKING_CONFIG.panelMinWidth,
                padding: 16,
                borderWidth: 2,
              }}
            >
              <CategoryTabs active={activeTab} onChange={setActiveTab} />
              <ItemGrid
                items={tabItems}
                selectedIds={selectedIds}
                selectedUtensilId={selectedUtensilId}
                activeCategory={activeTab}
                onToggle={handleToggle}
              />
              <SelectedBar
                items={selectedItems}
                onRemove={handleRemove}
                subtotal={selectedIngredientSubtotal}
              />
              <StartCookingButton
                enabled={hasIngredients}
                onClick={handleStartCooking}
              />
            </aside>
          )}

          {phase === "cooking" && (
            <div className="cooking-result-stage order-fade-in absolute inset-0">
              <ChefThoughtPanel
                value={chefThought}
                onChange={handleChefThoughtChange}
              />
              <div className="absolute top-[20%] right-[10%] w-[40%]">
                <FoodResultPanel
                  status={foodStatus}
                  imageUrl={foodImageUrl}
                  foodName={foodName}
                  onServe={handleServe}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}