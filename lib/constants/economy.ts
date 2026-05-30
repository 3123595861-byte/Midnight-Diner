import type { StarRating } from "@/lib/types/game";
import { POISON_PENALTY } from "@/lib/constants/game";

/** 各星级对应的收入倍率（基于食材总成本） @see PRD §6 */
export const STAR_INCOME_MULTIPLIER: Record<StarRating, number> = {
  5: 3.0,
  4: 2.0,
  3: 1.0,
  2.5: 1.0,
  2: 0,
  1: 0,
  0: 0,
};

export function calculatePoisonPenalty(): number {
  return POISON_PENALTY;
}
