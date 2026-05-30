"use client";

import { useCallback, useMemo, useState } from "react";
import { COOKING_CONFIG, type CookingTab } from "@/components/cooking/config";
import {
  getCatalogItem,
  getItemsByCategory,
  type CookCatalogItem,
} from "@/components/cooking/catalog";
import { CategoryTabs } from "@/components/cooking/CategoryTabs";
import { ItemGrid } from "@/components/cooking/ItemGrid";
import { SelectedBar } from "@/components/cooking/SelectedBar";
import { useUIScale } from "@/components/order/useUIScale";

interface CookingScreenViewProps {
  visible: boolean;
}

/**
 * 界面2：烹饪选料
 * 背景 cookinginterface.png，右侧选菜面板
 */
export function CookingScreenView({ visible }: CookingScreenViewProps) {
  const scale = useUIScale();
  const [activeTab, setActiveTab] = useState<CookingTab>("vegetable");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectedUtensilId, setSelectedUtensilId] = useState<string | null>(
    null,
  );

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

  const uiStyle = useMemo(
    () => ({
      width: COOKING_CONFIG.designWidth,
      height: COOKING_CONFIG.designHeight,
      transform: `scale(${scale})`,
      transformOrigin: "top left" as const,
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
          {/* 右侧选料面板 */}
          <aside
            className="cooking-panel order-pixel-panel absolute bottom-0 right-0 top-0 flex flex-col"
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
          </aside>
        </div>
      </div>
    </div>
  );
}
