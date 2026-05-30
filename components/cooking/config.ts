/**
 * 烹饪选料界面 — 全局可配置参数
 */
export const COOKING_CONFIG = {
  designWidth: 1280,
  designHeight: 720,

  backgroundUrl: "/assets/scenes/cookinginterface.png",

  /** 右侧选料面板（占画面宽度比例） */
  panelWidthPercent: 38,
  panelMinWidth: 380,

  colors: {
    text: "#5D4037",
    border: "#5D4037",
    background: "#F5F0E1",
    backgroundHover: "#E8DCC8",
    backgroundSelected: "#E0D4B8",
    disabled: "#888888",
    shadow: "#3E2723",
  },

  font: {
    family: "var(--font-press-start), 'Courier New', monospace",
    size: 12,
    sizePrice: 11,
  },

  /** 椭圆食材卡片 */
  itemChip: {
    width: 108,
    height: 52,
    gap: 10,
  },

  tabs: ["vegetable", "meat", "utensil", "seasoning"] as const,
  tabLabels: {
    vegetable: "蔬菜",
    meat: "肉品",
    utensil: "厨具",
    seasoning: "调料",
  },
} as const;

export type CookingTab = (typeof COOKING_CONFIG.tabs)[number];
