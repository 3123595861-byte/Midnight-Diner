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

/**
 * 根据星级与食材成本计算顾客支付金额
 * TODO: Phase 2 实现具体结算逻辑
 */
export function calculatePayment(
  starRating: StarRating,
  ingredientCost: number,
): number {
  void starRating;
  void ingredientCost;
  throw new Error("calculatePayment: not implemented");
}

/**
 * 计算 0 星（相克/中毒）时的额外扣费
 * TODO: Phase 2 实现
 */
export function calculatePoisonPenalty(): number {
  return POISON_PENALTY;
}
