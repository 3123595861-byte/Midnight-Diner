"use client";

import { useCallback, useMemo, useState } from "react";
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
import type { CookApiRouteResponse } from "@/lib/types/ai";

interface CookingScreenViewProps {
  visible: boolean;
}

type CookingPhase = "selecting" | "cooking";

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
  const [foodStatus, setFoodStatus] = useState<FoodPanelStatus>("cooking");
  const [foodImageUrl, setFoodImageUrl] = useState<string | null>(null);
  const [foodName, setFoodName] = useState<string | null>(null);
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
    return list;
  }, [selectedIds, selectedUtensilId]);

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

    const ingredientIds = selectedItems
      .filter((item) => item.category !== "utensil")
      .map((item) => item.id);
    const utensilId = selectedUtensilId ?? "pot";

    setPhase("cooking");
    setFoodStatus("cooking");
    setIsCookingNow(true);
    setFoodImageUrl(null);
    setFoodName(null);

    try {
      const response = await fetch("/api/cook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guest_story: chefThought.trim() || "请给顾客一句温柔的话",
          player_recipe: {
            ingredient_ids: ingredientIds,
            utensil_id: utensilId,
          },
          current_day: 1,
          current_money: 1000,
        }),
      });

      const result = (await response.json()) as CookApiRouteResponse;
      if (!response.ok) {
        throw new Error(result.error || `HTTP ${response.status}`);
      }

      if (result.success && result.data) {
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
              <SelectedBar items={selectedItems} onRemove={handleRemove} />
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
                onChange={setChefThought}
              />
              <div className="absolute top-[20%] right-[10%] w-[40%]">
                <FoodResultPanel
                  status={foodStatus}
                  imageUrl={foodImageUrl}
                  foodName={foodName}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}