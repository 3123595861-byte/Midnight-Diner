// 修改后的食材分类联合类型，加入了 "staple"
export type IngredientCategory = "vegetable" | "meat" | "seafood" | "seasoning" | "staple" | "other";

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  price: number;
  /** 对应 public/assets/ingredients/ 下的素材文件名（不含路径） */
  assetKey: string;
}

export interface Utensil {
  id: string;
  name: string;
  /** 对应 public/assets/utensils/ 下的素材文件名（不含路径） */
  assetKey: string;
}

export interface PlayerRecipe {
  ingredientIds: string[];
  utensilId: string;
}