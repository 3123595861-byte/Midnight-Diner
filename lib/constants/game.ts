import { GamePhase } from "@/lib/types/game";

/** 初始资金 @see PRD §6 */
export const INITIAL_MONEY = 1000;

/** 每日接待客人数（MVP：固定 3，后续可扩展为 3–5） */
export const GUESTS_PER_DAY_MIN = 3;
export const GUESTS_PER_DAY_MAX = 5;
export const GUESTS_PER_DAY_MVP = 3;

/** 相克 / 中毒医药费 @see PRD §6 */
export const POISON_PENALTY = 500;

/** 破产判定阈值 */
export const BANKRUPTCY_THRESHOLD = 0;

/** 游戏阶段流转顺序（供状态机实现时参考） */
export const GAME_PHASE_FLOW: GamePhase[] = [
  GamePhase.WaitingForGuest,
  GamePhase.GuestOrdering,
  GamePhase.CookingPrep,
  GamePhase.CookingInProgress,
  GamePhase.Serving,
  GamePhase.Settlement,
  GamePhase.DayTransition,
];
