import fs from "fs";

const src = fs.readFileSync("components/cooking/catalog.ts", "utf8");
const seafoodIds = new Set(["m19", "m20", "m21", "m22", "m23", "m24", "m25"]);

function parseBlock(name) {
  const start = src.indexOf(`const ${name}:`);
  if (start < 0) throw new Error(`no ${name}`);
  const eq = src.indexOf("=", start);
  const open = src.indexOf("[", eq);
  let depth = 0;
  for (let i = open; i < src.length; i += 1) {
    if (src[i] === "[") depth += 1;
    if (src[i] === "]") {
      depth -= 1;
      if (depth === 0) return src.slice(open + 1, i);
    }
  }
  throw new Error(`unclosed ${name}`);
}

function toEntries(block) {
  const re =
    /\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*price:\s*(\d+),\s*category:\s*"([^"]+)"\s*\}/g;
  const items = [];
  let m;
  while ((m = re.exec(block))) {
    const [, id, name, price, cat] = m;
    let ingredientCategory = cat;
    if (cat === "meat" && seafoodIds.has(id)) ingredientCategory = "seafood";
    if (cat === "utensil") ingredientCategory = "utensil";
    items.push({
      id,
      name,
      price: Number(price),
      ingredientCategory,
      uiTab: cat,
    });
  }
  return items;
}

let all = [];
for (const blockName of [
  "VEGETABLES",
  "MEATS",
  "STAPLES",
  "UTENSILS",
  "SEASONINGS",
]) {
  all = all.concat(toEntries(parseBlock(blockName)));
}

const out = `import type { IngredientCategory } from "@/lib/types/ingredient";

export type CookingUiTab =
  | "vegetable"
  | "meat"
  | "staple"
  | "utensil"
  | "seasoning";

export interface CookingCatalogEntry {
  id: string;
  name: string;
  price: number;
  ingredientCategory: IngredientCategory | "utensil";
  uiTab: CookingUiTab;
}

export const COOKING_CATALOG_ENTRIES: CookingCatalogEntry[] = ${JSON.stringify(all, null, 2)};

export function getCatalogEntry(id: string): CookingCatalogEntry | undefined {
  return COOKING_CATALOG_ENTRIES.find((item) => item.id === id);
}

export function getCatalogEntriesByUiTab(tab: CookingUiTab): CookingCatalogEntry[] {
  return COOKING_CATALOG_ENTRIES.filter((item) => item.uiTab === tab);
}
`;

fs.writeFileSync("lib/data/cooking-catalog.ts", out);
console.log("written", all.length, "entries");
