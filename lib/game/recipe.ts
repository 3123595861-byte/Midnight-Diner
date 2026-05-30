import type { PlayerRecipe } from "@/lib/types/ingredient";
import { getIngredientsByIds } from "@/lib/data/ingredients";
import { getUtensilName } from "@/lib/data/utensils";

export function calculateIngredientCost(ingredientIds: string[]): number {
  return getIngredientsByIds(ingredientIds).reduce(
    (sum, item) => sum + item.price,
    0,
  );
}

export function formatRecipeForAI(recipe: PlayerRecipe): string {
  const ingredients = getIngredientsByIds(recipe.ingredientIds);
  const ingredientText =
    ingredients.length > 0
      ? ingredients.map((item) => item.name).join("、")
      : "（未选择食材）";
  const utensilText = getUtensilName(recipe.utensilId);

  return `食材：${ingredientText}；厨具：${utensilText}`;
}

export function hasCoreIngredient(
  selectedIds: string[],
  coreIds: string[],
  acceptableIds: string[] = [],
): boolean {
  const allowed = new Set([...coreIds, ...acceptableIds]);
  return selectedIds.some((id) => allowed.has(id));
}
