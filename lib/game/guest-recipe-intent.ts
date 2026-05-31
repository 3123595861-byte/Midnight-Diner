import type { Ingredient } from "@/lib/types/ingredient";
import type { GuestStoryDifficulty } from "@/lib/types/guest";
import { INGREDIENTS } from "@/lib/data/ingredients";
import { findIncompatiblePair } from "@/lib/data/incompatibilities";
import { GUEST_CHARACTER_ASSETS } from "@/lib/ai/prompts";

export interface GuestRecipeIntent {
  coreIngredientIds: string[];
  acceptableIngredientIds: string[];
  hintedFood: string;
  assetKey: string;
  coreIngredientNames: string[];
}

const DISH_HINTS: Record<string, string[]> = {
  st02: ["豚骨拉面", "热汤面", "深夜拉面"],
  m03: ["豚骨汤", "浓汤拉面", "排骨汤"],
  st01: ["蛋炒饭", "家常饭", "暖胃饭"],
  m09: ["照烧鸡", "鸡腿饭"],
  m24: ["烤鱼", "盐烤鲜鱼"],
  m19: ["鲜虾料理", "海鲜饭"],
  s26: ["味噌汤", "热汤"],
  v11: ["土豆炖菜", "浓汤"],
  m01: ["红烧肉", "炖肉"],
  v17: ["番茄料理", "暖汤"],
  s33: ["黄油料理", "焗饭"],
  s32: ["咖喱饭", "咖喱"],
  s05: ["酱油料理", "小炒"],
};

function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

function isCompatible(ids: string[]): boolean {
  return findIncompatiblePair(ids) === null;
}

function pickHintedFood(core: Ingredient[]): string {
  const primary = core[0]!;
  const hints = DISH_HINTS[primary.id];
  if (hints?.length) {
    return hints[Math.floor(Math.random() * hints.length)]!;
  }
  if (core.length > 1) {
    return `${primary.name}${core[1]!.name}料理`;
  }
  return `${primary.name}料理`;
}

/** 服务端随机决定客人「想吃什么」，LLM 只负责写故事（更快、更稳） */
export function buildGuestRecipeIntent(): GuestRecipeIntent {
  const shuffled = shuffle(INGREDIENTS);
  const core: Ingredient[] = [shuffled[0]!];

  if (Math.random() < 0.55) {
    for (const item of shuffled.slice(1)) {
      if (isCompatible([core[0]!.id, item.id])) {
        core.push(item);
        break;
      }
    }
  }

  const coreIds = core.map((item) => item.id);
  const acceptable: string[] = [];

  for (const item of shuffled) {
    if (acceptable.length >= 1) break;
    if (coreIds.includes(item.id)) continue;
    if (isCompatible([...coreIds, item.id])) {
      acceptable.push(item.id);
    }
  }

  const assetKey =
    GUEST_CHARACTER_ASSETS[
      Math.floor(Math.random() * GUEST_CHARACTER_ASSETS.length)
    ]!;

  return {
    coreIngredientIds: coreIds,
    acceptableIngredientIds: acceptable,
    hintedFood: pickHintedFood(core),
    assetKey,
    coreIngredientNames: core.map((item) => item.name),
  };
}

export type { GuestStoryDifficulty };
