import type { StarRating, SettlementSummary } from "@/lib/types/game";
import {
  STAR_INCOME_MULTIPLIER,
  calculatePoisonPenalty,
} from "@/lib/constants/economy";

export function calculatePayment(
  starRating: StarRating,
  ingredientCost: number,
): number {
  const multiplier = STAR_INCOME_MULTIPLIER[starRating];
  return Math.round(ingredientCost * multiplier);
}

export function buildSettlement(
  starRating: StarRating,
  ingredientCost: number,
  currentMoney: number,
): SettlementSummary & { poisonPenalty: number } {
  const paymentReceived = calculatePayment(starRating, ingredientCost);
  const poisonPenalty =
    starRating === 0 ? calculatePoisonPenalty() : 0;
  const netChange = paymentReceived - ingredientCost - poisonPenalty;

  return {
    starRating,
    ingredientCost,
    paymentReceived,
    poisonPenalty,
    netChange,
    remainingMoney: currentMoney + netChange,
  };
}

export function isBankrupt(money: number): boolean {
  return money <= 0;
}
