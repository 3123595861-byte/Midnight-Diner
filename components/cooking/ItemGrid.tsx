"use client";

import type { CookCatalogItem } from "@/components/cooking/catalog";
import { COOKING_CONFIG } from "@/components/cooking/config";

interface ItemGridProps {
  items: CookCatalogItem[];
  selectedIds: Set<string>;
  /** 厨具单选：已选中的厨具 id */
  selectedUtensilId: string | null;
  activeCategory: string;
  onToggle: (item: CookCatalogItem) => void;
}

/** 椭圆卡片网格 */
export function ItemGrid({
  items,
  selectedIds,
  selectedUtensilId,
  activeCategory,
  onToggle,
}: ItemGridProps) {
  const { itemChip, font, colors } = COOKING_CONFIG;
  const isUtensilTab = activeCategory === "utensil";

  return (
    <div
      className="cooking-item-grid flex-1 overflow-y-auto overflow-x-hidden py-3"
      style={{
        gap: itemChip.gap,
        gridTemplateColumns: `repeat(auto-fill, minmax(${itemChip.width}px, 1fr))`,
        display: "grid",
      }}
    >
      {items.map((item) => {
        const selected = isUtensilTab
          ? selectedUtensilId === item.id
          : selectedIds.has(item.id);

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onToggle(item)}
            className={[
              "cooking-item-chip order-pixel-text relative flex flex-col items-center justify-center",
              selected ? "cooking-item-chip--selected" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{
              width: itemChip.width,
              height: itemChip.height,
              fontSize: font.size,
              color: colors.text,
            }}
          >
            <span className="max-w-full truncate px-1 text-center leading-tight">
              {item.name}
            </span>
            <span
              className="mt-0.5 text-center leading-tight opacity-90"
              style={{ fontSize: font.sizePrice }}
            >
              {item.category === "utensil" ? "免费" : `${item.price}元`}
            </span>
          </button>
        );
      })}
    </div>
  );
}
