import type { Ingredient, Utensil } from "@/lib/types/ingredient";
import type { GuestProfile } from "@/lib/types/guest";

/**
 * Mock 食材数据
 * TODO: Phase 1 补充完整列表；assetKey 对应 public/assets/ingredients/
 */
export const MOCK_INGREDIENTS: Ingredient[] = [
  {
    id: "ingredient-placeholder-1",
    name: "占位食材",
    category: "vegetable",
    price: 10,
    assetKey: "placeholder.png",
  },
];

/**
 * Mock 厨具数据
 * TODO: Phase 1 补充完整列表；assetKey 对应 public/assets/utensils/
 */
export const MOCK_UTENSILS: Utensil[] = [
  {
    id: "utensil-placeholder-1",
    name: "占位厨具",
    assetKey: "placeholder.png",
  },
];

/**
 * Mock 客人档案
 * TODO: Phase 1 补充；assetKey 对应 public/assets/characters/
 */
export const MOCK_GUEST_PROFILES: GuestProfile[] = [
  {
    id: "guest-placeholder-1",
    name: "占位客人",
    assetKey: "placeholder",
    sprites: {
      idle: "idle.png",
    },
  },
];

/**
 * Mock 客人故事
 * TODO: Phase 2 按天数与难度递增生成或抽取
 */
export const MOCK_GUEST_STORIES: Record<number, string[]> = {
  1: ["占位故事：客人想吃点什么……"],
};
