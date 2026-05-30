import { GamePhase, type GameState } from "@/lib/types/game";
import {
  GUESTS_PER_DAY_MVP,
  INITIAL_MONEY,
} from "@/lib/constants/game";

/**
 * 创建初始游戏状态
 * TODO: Phase 2 实现完整初始化
 */
export function createInitialGameState(): GameState {
  return {
    phase: GamePhase.WaitingForGuest,
    currentDay: 1,
    money: INITIAL_MONEY,
    reputation: 0,
    guestsServedToday: 0,
    guestsPerDay: GUESTS_PER_DAY_MVP,
    currentGuestIndex: 0,
    guestStory: null,
    selectedIngredientIds: [],
    selectedUtensilId: null,
    lastCookResult: null,
  };
}

/**
 * 游戏阶段转换
 * TODO: Phase 2 实现状态机逻辑
 */
export function transitionPhase(
  _state: GameState,
  _nextPhase: GamePhase,
): GameState {
  throw new Error("transitionPhase: not implemented");
}

/**
 * 判断是否破产
 * TODO: Phase 2 实现
 */
export function isBankrupt(_state: GameState): boolean {
  throw new Error("isBankrupt: not implemented");
}

/**
 * 判断是否完成当日所有客人
 * TODO: Phase 2 实现
 */
export function isDayComplete(_state: GameState): boolean {
  throw new Error("isDayComplete: not implemented");
}
