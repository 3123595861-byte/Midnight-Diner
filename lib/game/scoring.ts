import type { StarRating } from "@/lib/types/game";

export type StarAdjustmentReason =
  | "none"
  | "poisonous_combo_forced_zero"
  | "missing_core_ingredient_cap"
  | "no_main_ingredient_forced_low"; // 新增：因没有主料（全是调料）被强制压低星级

export interface ScoringContext {
  rawStarRating: StarRating;
  isPoisonous: boolean;
  hasCoreIngredient: boolean;
  hasMainIngredient: boolean; // 新增：是否包含任意主料（蔬菜、肉品、主食至少有一种）
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
 * - 全是调料，没有主料 → 强制最高 1 星（防 AI 幻觉漏洞）
 * - 未含核心食材 → 最高 4 星
 */
export function applyStarRatingRules(ctx: ScoringContext): ScoringResult {
  const { rawStarRating, isPoisonous, hasCoreIngredient, hasMainIngredient } = ctx;

  // 1. 绝杀规则：食物中毒直接 0 星
  if (isPoisonous) {
    return {
      starRating: 0,
      rawStarRating,
      adjusted: rawStarRating !== 0,
      adjustmentReason: "poisonous_combo_forced_zero",
    };
  }

  // 2. 防刷规则：如果没有选择任何主料（全是调料或空锅），强制最高只能得 1 星
  if (!hasMainIngredient && rawStarRating > 1) {
    return {
      starRating: 1,
      rawStarRating,
      adjusted: true,
      adjustmentReason: "no_main_ingredient_forced_low",
    };
  }

  // 3. 关卡规则：没有包含客人指名要求的核心食材，封顶 4 星
  if (!hasCoreIngredient && rawStarRating > 4) {
    return {
      starRating: 4,
      rawStarRating,
      adjusted: true,
      adjustmentReason: "missing_core_ingredient_cap",
    };
  }

  // 4. 完美通过，维持 AI 原判
  return {
    starRating: rawStarRating,
    rawStarRating,
    adjusted: false,
    adjustmentReason: "none",
  };
}