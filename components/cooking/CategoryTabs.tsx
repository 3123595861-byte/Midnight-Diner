"use client";

import { COOKING_CONFIG, type CookingTab } from "@/components/cooking/config";

interface CategoryTabsProps {
  active: CookingTab;
  onChange: (tab: CookingTab) => void;
}

/** 顶部分类导航：蔬菜 / 肉品 / 主食 / 厨具 / 调料 */ // 👈 这里更新了注释
export function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  const { tabs, tabLabels, colors } = COOKING_CONFIG;

  return (
    <nav className="cooking-tabs flex flex-wrap shrink-0 gap-2 border-b-2 border-[#5D4037] pb-2"> {/* 👈 建议加一个 flex-wrap 防溢出 */}
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className={[
              "cooking-tab-btn order-pixel-text px-3 py-2 transition-colors", // 可以加个简单的过渡动画
              isActive ? "cooking-tab-btn--active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{
              fontSize: COOKING_CONFIG.font.size,
              color: isActive ? colors.background : colors.text,
              backgroundColor: isActive ? colors.border : colors.background,
              border: `2px solid ${colors.border}`,
            }}
          >
            {tabLabels[tab]}
          </button>
        );
      })}
    </nav>
  );
}