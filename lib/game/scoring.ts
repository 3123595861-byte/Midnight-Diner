import type { StarRating } from "@/lib/types/game";

export type StarAdjustmentReason =
  | "none"
  | "poisonous_combo_forced_zero"
  | "missing_core_ingredient_cap";

export interface ScoringContext {
  rawStarRating: StarRating;
  isPoisonous: boolean;
  hasCoreIngredient: boolean;
  incompatibleLabel?: string;
}

export interface ScoringResult {
  starRating: StarRating;
  rawStarRating: StarRating;
  adjusted: boolean;
  adjustmentReason: StarAdjustmentReason;
}

/**
 * 后端星级校正：AI 主判，代码兜底
 * - 相克组合 → 强制 0 星
 * - 未含核心食材 → 最高 4 星
 */
export function applyStarRatingRules(ctx: ScoringContext): ScoringResult {
  const { rawStarRating, isPoisonous, hasCoreIngredient } = ctx;

  if (isPoisonous) {
    return {
      starRating: 0,
      rawStarRating,
      adjusted: rawStarRating !== 0,
      adjustmentReason: "poisonous_combo_forced_zero",
    };
  }

  if (!hasCoreIngredient && rawStarRating > 4) {
    return {
      starRating: 4,
      rawStarRating,
      adjusted: true,
      adjustmentReason: "missing_core_ingredient_cap",
    };
  }

  return {
    starRating: rawStarRating,
    rawStarRating,
    adjusted: false,
    adjustmentReason: "none",
  };
}
