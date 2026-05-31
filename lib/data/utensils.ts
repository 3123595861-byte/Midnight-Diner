import type { Utensil } from "@/lib/types/ingredient";
import { COOKING_CATALOG_ENTRIES } from "@/lib/data/cooking-catalog";

export const UTENSILS: Utensil[] = COOKING_CATALOG_ENTRIES.filter(
  (item) => item.ingredientCategory === "utensil",
).map((item) => ({
  id: item.id,
  name: item.name,
  assetKey: `${item.id}.png`,
}));

/** 默认厨具：深海汤锅 */
export const DEFAULT_UTENSIL_ID = "u03";

const utensilMap = new Map(UTENSILS.map((item) => [item.id, item]));

export function getUtensilById(id: string): Utensil | undefined {
  return utensilMap.get(id);
}

export function getUtensilName(id: string): string {
  return utensilMap.get(id)?.name ?? id;
}
