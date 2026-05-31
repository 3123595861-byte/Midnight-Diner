import type { CookingTab } from "@/components/cooking/config";
import type { CookingUiTab } from "@/lib/data/cooking-catalog";
import {
  COOKING_CATALOG_ENTRIES,
  getCatalogEntriesByUiTab,
  getCatalogEntry,
} from "@/lib/data/cooking-catalog";

export interface CookCatalogItem {
  id: string;
  name: string;
  price: number;
  category: CookingTab | "staple";
}

function toCookCatalogItem(
  entry: (typeof COOKING_CATALOG_ENTRIES)[number],
): CookCatalogItem {
  return {
    id: entry.id,
    name: entry.name,
    price: entry.price,
    category: entry.uiTab,
  };
}

export const COOKING_CATALOG: CookCatalogItem[] =
  COOKING_CATALOG_ENTRIES.map(toCookCatalogItem);

export function getCatalogItem(id: string): CookCatalogItem | undefined {
  const entry = getCatalogEntry(id);
  return entry ? toCookCatalogItem(entry) : undefined;
}

export function getItemsByCategory(
  category: CookingTab | "staple",
): CookCatalogItem[] {
  return getCatalogEntriesByUiTab(category as CookingUiTab).map(toCookCatalogItem);
}
