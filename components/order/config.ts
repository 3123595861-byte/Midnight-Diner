/**
 * 顾客点单界面 — 全局可配置参数
 * 修改位置、尺寸、颜色、背景图等请集中在此文件调整
 */
export const CONFIG = {
  /** 设计稿基准分辨率，用于响应式缩放 */
  designWidth: 1280,
  designHeight: 720,

  /** 餐厅像素背景图（页面加载时随机选一张） */
  backgroundUrls: [
    "/assets/scenes/ordering/mainscene1.png",
    "/assets/scenes/ordering/mainscene2.png",
    "/assets/scenes/ordering/mainscene3.png",
  ],

  /** 客人（LLM 实时生成，exclude 仅用于避免近期重复角色） */
  guest: {
    recentExcludeCount: 4,
  },

  /** 金额显示 */
  money: {
    initial: 1000,
    initialDay: 1,
    left: 20,
    top: 20,
    paddingX: 12,
    paddingY: 8,
    borderWidth: 2,
    fontSize: 14,
    amountFontSize: 16,
  },

  /** 顾客点单对话框（位于右侧顾客人物右上方） */
  dialog: {
    width: 280,
    height: 140,
    /** 距画面右边缘 */
    right: 48,
    /** 距画面顶部，位于顾客头部右上方 */
    top: 52,
    padding: 16,
    borderWidth: 2,
    lineHeight: 20,
    fontSize: 14,
    /** 翻页箭头按钮尺寸 */
    arrowSize: 20,
    /** 打字机：普通字符间隔 (ms) */
    typewriterCharDelayMs: 55,
    /** 打字机：句读停顿 (ms) */
    typewriterPunctuationDelayMs: 180,
    /** 估算每行最大字符数（Press Start 2P 14px 下中文约 14 字） */
    charsPerLine: 14,
    /** 内容区可见行数：(height - padding*2) / lineHeight */
    linesPerPage: 5,
  },

  /** 开始烹饪按钮（紧贴在对话框正下方，右对齐） */
  cookButton: {
    /** 与对话框的间距 */
    gapBelowDialog: 12,
    /** 与对话框相同的右边缘距，保持对齐 */
    right: 48,
    paddingX: 20,
    paddingY: 12,
    borderWidth: 2,
    fontSize: 14,
    /** 箭头尖端宽度 */
    arrowTipWidth: 14,
  },

  /** 全局像素 UI 配色 */
  colors: {
    text: "#5D4037",
    border: "#5D4037",
    background: "#F5F0E1",
    backgroundHover: "#E8DCC8",
    disabled: "#888888",
    shadow: "#3E2723",
  },

  /** 全局字体 */
  font: {
    family: "var(--font-press-start), 'Courier New', monospace",
    size: 14,
  },

  /** 页面过渡动画时长 (ms) */
  fadeDuration: 400,
} as const;

export type OrderConfig = typeof CONFIG;
