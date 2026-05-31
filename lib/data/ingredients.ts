import type { Ingredient, IngredientCategory } from "@/lib/types/ingredient";
import { COOKING_CATALOG_ENTRIES } from "@/lib/data/cooking-catalog";

export const INGREDIENTS: Ingredient[] = COOKING_CATALOG_ENTRIES.filter(
  (item) => item.ingredientCategory !== "utensil",
).map((item) => ({
  id: item.id,
  name: item.name,
  category: item.ingredientCategory as IngredientCategory,
  price: item.price,
  assetKey: `${item.id}.png`,
}));

const ingredientMap = new Map(INGREDIENTS.map((item) => [item.id, item]));

export function getIngredientById(id: string): Ingredient | undefined {
  return ingredientMap.get(id);
}

export function getIngredientsByIds(ids: string[]): Ingredient[] {
  return ids
    .map((id) => ingredientMap.get(id))
    .filter((item): item is Ingredient => item !== undefined);
}
