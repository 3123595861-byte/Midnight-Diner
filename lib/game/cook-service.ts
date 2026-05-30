import type { PlayerRecipe } from "@/lib/types/ingredient";
import type { CookApiSuccessData } from "@/lib/types/ai";
import { getIngredientById } from "@/lib/data/ingredients";
import { getUtensilName } from "@/lib/data/utensils";
import { findGuestById } from "@/lib/data/guests";
import { findIncompatiblePair, isPoisonousCombo } from "@/lib/data/incompatibilities";
import { getIngredientsByIds } from "@/lib/data/ingredients";
import {
  calculateIngredientCost,
  hasCoreIngredient,
} from "@/lib/game/recipe";
import { applyStarRatingRules } from "@/lib/game/scoring";
import { buildSettlement, isBankrupt } from "@/lib/game/settlement";
import { generateCookResult } from "@/lib/ai/llm";
import { generateFoodImage } from "@/lib/ai/image";
import { INITIAL_MONEY } from "@/lib/constants/game";

export interface CookServiceInput {
  guestStory: string;
  playerRecipe: PlayerRecipe;
  currentDay: number;
  guestId?: string;
  coreIngredientIds?: string[];
  acceptableIngredientIds?: string[];
  currentMoney?: number;
}

export async function executeCookFlow(
  input: CookServiceInput,
): Promise<CookApiSuccessData> {
  const {
    guestStory,
    playerRecipe,
    currentDay,
    guestId,
    coreIngredientIds: explicitCoreIds,
    acceptableIngredientIds: explicitAcceptableIds,
    currentMoney = INITIAL_MONEY,
  } = input;

  const guest = guestId ? findGuestById(guestId) : null;
  const coreIngredientIds =
    explicitCoreIds ?? guest?.coreIngredientIds ?? [];
  const acceptableIngredientIds =
    explicitAcceptableIds ?? guest?.acceptableIngredientIds ?? [];

  const ingredientCost = calculateIngredientCost(playerRecipe.ingredientIds);
  const incompatible = findIncompatiblePair(playerRecipe.ingredientIds);
  const isPoisonous = isPoisonousCombo(playerRecipe.ingredientIds);
  const hasCore = hasCoreIngredient(
    playerRecipe.ingredientIds,
    coreIngredientIds,
    acceptableIngredientIds,
  );

  const allIngredientNames = playerRecipe.ingredientIds
    .map((id) => getIngredientById(id)?.name)
    .filter((name): name is string => Boolean(name));
  const coreNames = getIngredientsByIds(coreIngredientIds).map((i) => i.name);
  const utensilName = getUtensilName(playerRecipe.utensilId);

  const llmResult = await generateCookResult({
    guestStory,
    currentDay,
    playerRecipe: {
      ingredient_ids: playerRecipe.ingredientIds,
      ingredient_names: allIngredientNames,
      utensil_id: playerRecipe.utensilId,
      utensil_name: utensilName,
    },
    precheck: {
      isPoisonous,
      hasCoreIngredient: hasCore,
      incompatibleLabel: incompatible?.label,
      coreIngredientNames: coreNames,
      difficulty: guest?.difficulty,
    },
  });

  const scoring = applyStarRatingRules({
    rawStarRating: llmResult.star_rating,
    isPoisonous,
    hasCoreIngredient: hasCore,
    incompatibleLabel: incompatible?.label,
  });

  const image_url = await generateFoodImage(llmResult.image_prompt);
  const settlement = buildSettlement(
    scoring.starRating,
    ingredientCost,
    currentMoney,
  );

  return {
    food_name: llmResult.food_name,
    star_rating: scoring.starRating,
    star_rating_raw: scoring.rawStarRating,
    evaluation: llmResult.evaluation,
    image_url,
    settlement: {
      ingredient_cost: settlement.ingredientCost,
      payment_received: settlement.paymentReceived,
      poison_penalty: settlement.poisonPenalty,
      net_change: settlement.netChange,
      remaining_money: settlement.remainingMoney,
      is_bankrupt: isBankrupt(settlement.remainingMoney),
    },
    meta: {
      has_core_ingredient: hasCore,
      is_poisonous: isPoisonous,
      incompatible_label: incompatible?.label ?? null,
      star_rating_adjusted: scoring.adjusted,
      adjustment_reason: scoring.adjustmentReason,
      current_day: currentDay,
      guest_id: guestId ?? guest?.guestId ?? null,
    },
  };
}
