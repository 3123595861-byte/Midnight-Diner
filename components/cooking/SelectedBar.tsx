"use client";

import type { CookCatalogItem } from "@/components/cooking/catalog";
import { COOKING_CONFIG } from "@/components/cooking/config";

interface SelectedBarProps {
  items: CookCatalogItem[];
  onRemove: (id: string) => void;
}

/** 底部已选区：悬停显示右上角叉号取消 */
export function SelectedBar({ items, onRemove }: SelectedBarProps) {
  const { font, colors } = COOKING_CONFIG;

  return (
    <div className="cooking-selected-bar shrink-0 border-t-2 border-[#5D4037] pt-3">
      <p
        className="order-pixel-text mb-2"
        style={{ fontSize: font.size, color: colors.text }}
      >
        已选 ({items.length})
      </p>
      <div className="flex min-h-[56px] flex-wrap gap-2">
        {items.length === 0 ? (
          <span
            className="order-pixel-text opacity-60"
            style={{ fontSize: font.size }}
          >
            点击上方食材加入
          </span>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="cooking-selected-chip group relative"
              style={{ fontSize: font.size }}
            >
              <span className="order-pixel-text px-3 py-2 pr-6">
                {item.name}
                {item.category !== "utensil" && (
                  <span className="ml-1 opacity-80">{item.price}元</span>
                )}
              </span>
              <button
                type="button"
                aria-label={`移除 ${item.name}`}
                className="cooking-remove-btn"
                onClick={() => onRemove(item.id)}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
