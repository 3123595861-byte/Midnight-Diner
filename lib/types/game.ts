/**
 * 游戏阶段状态机
 * @see PRD §3 核心游玩流程
 */
export enum GamePhase {
  /** 等待下一位客人 */
  WaitingForGuest = "waiting_for_guest",
  /** 客人点单 / 讲述故事中 */
  GuestOrdering = "guest_ordering",
  /** 玩家选择食材与厨具 */
  CookingPrep = "cooking_prep",
  /** AI 处理中（烹饪等待） */
  CookingInProgress = "cooking_in_progress",
  /** 上菜与展示评价 */
  Serving = "serving",
  /** 结算面板 */
  Settlement = "settlement",
  /** 一天结束过渡 */
  DayTransition = "day_transition",
  /** 破产结局 */
  GameOver = "game_over",
}

export interface GameState {
  phase: GamePhase;
  currentDay: number;
  money: number;
  reputation: number;
  guestsServedToday: number;
  guestsPerDay: number;
  currentGuestIndex: number;
  /** 当前客人故事 / 点单内容 */
  guestStory: string | null;
  /** 玩家当前选中的食材 ID 列表 */
  selectedIngredientIds: string[];
  /** 玩家当前选中的厨具 ID */
  selectedUtensilId: string | null;
  /** 最近一次烹饪结果（AI 返回） */
  lastCookResult: CookResult | null;
}

export interface CookResult {
  foodName: string;
  starRating: StarRating;
  evaluation: string;
  foodImageUrl: string | null;
  ingredientCost: number;
  paymentReceived: number;
  isPoisoned: boolean;
}

/** PRD 规定的星级枚举 */
export type StarRating = 0 | 1 | 2 | 2.5 | 3 | 4 | 5;

export interface SettlementSummary {
  starRating: StarRating;
  ingredientCost: number;
  paymentReceived: number;
  netChange: number;
  remainingMoney: number;
}
