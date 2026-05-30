import { useState } from "react";
import type { GameState } from "@/lib/types/game";
import { createInitialGameState } from "@/lib/game/state-machine";

/**
 * 游戏全局状态 Hook
 * TODO: Phase 2 实现 dispatch、阶段流转、选料逻辑等
 */
export function useGameState() {
  const [state] = useState<GameState>(createInitialGameState);

  return {
    state,
    // actions: { selectIngredient, selectUtensil, startCooking, ... }
  };
}
