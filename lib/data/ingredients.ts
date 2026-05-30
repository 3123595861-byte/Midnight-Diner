import type { Ingredient } from "@/lib/types/ingredient";

export const INGREDIENTS: Ingredient[] = [
  { id: "noodles", name: "拉面", category: "other", price: 12, assetKey: "noodles.png" },
  { id: "pork_bone", name: "猪骨", category: "meat", price: 18, assetKey: "pork_bone.png" },
  { id: "green_onion", name: "葱", category: "vegetable", price: 3, assetKey: "green_onion.png" },
  { id: "soy_sauce", name: "酱油", category: "seasoning", price: 5, assetKey: "soy_sauce.png" },
  { id: "egg", name: "鸡蛋", category: "other", price: 6, assetKey: "egg.png" },
  { id: "rice", name: "米饭", category: "other", price: 8, assetKey: "rice.png" },
  { id: "pork", name: "猪肉", category: "meat", price: 15, assetKey: "pork.png" },
  { id: "tofu", name: "豆腐", category: "other", price: 7, assetKey: "tofu.png" },
  { id: "miso", name: "味噌", category: "seasoning", price: 9, assetKey: "miso.png" },
  { id: "fish", name: "鲜鱼", category: "seafood", price: 22, assetKey: "fish.png" },
  { id: "lemon", name: "柠檬", category: "vegetable", price: 4, assetKey: "lemon.png" },
  { id: "milk", name: "牛奶", category: "other", price: 8, assetKey: "milk.png" },
  { id: "tomato", name: "番茄", category: "vegetable", price: 5, assetKey: "tomato.png" },
  { id: "butter", name: "黄油", category: "seasoning", price: 10, assetKey: "butter.png" },
  { id: "potato", name: "土豆", category: "vegetable", price: 4, assetKey: "potato.png" },
  { id: "curry_powder", name: "咖喱粉", category: "seasoning", price: 11, assetKey: "curry_powder.png" },
  { id: "shrimp", name: "虾", category: "seafood", price: 20, assetKey: "shrimp.png" },
  { id: "garlic", name: "大蒜", category: "vegetable", price: 3, assetKey: "garlic.png" },
  { id: "beer", name: "啤酒", category: "other", price: 9, assetKey: "beer.png" },
  { id: "cheese", name: "芝士", category: "seasoning", price: 12, assetKey: "cheese.png" },
];

const ingredientMap = new Map(INGREDIENTS.map((item) => [item.id, item]));

export function getIngredientById(id: string): Ingredient | undefined {
  return ingredientMap.get(id);
}

export function getIngredientsByIds(ids: string[]): Ingredient[] {
  return ids
    .map((id) => ingredientMap.get(id))
    .filter((item): item is Ingredient => item !== undefined);
}
