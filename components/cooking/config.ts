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

  /** 开始烹饪按钮（选料面板底部） */
  startCookButton: {
    paddingX: 20,
    paddingY: 12,
    fontSize: 13,
    marginTop: 12,
  },

  /** 烹饪结果阶段：左右双框 */
  resultStage: {
    gap: 20,
    panelWidth: 400,
    panelHeight: 380,
    headerHeight: 36,
    bodyPadding: 16,
    /** 出锅图展示区高度 */
    foodImageHeight: 260,
  },

  /** 厨师思考默认提示 */
  chefThoughtPrompt: "想一想，有没有什么话要对顾客说的？",

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

  // 👇 这里新增了 "staple"
  tabs: ["vegetable", "meat", "staple", "utensil", "seasoning"] as const,
  tabLabels: {
    vegetable: "蔬菜",
    meat: "肉品",
    staple: "主食", // 👇 新增主食的中文显示标签
    utensil: "厨具",
    seasoning: "调料",
  },
} as const;

export type CookingTab = (typeof COOKING_CONFIG.tabs)[number];