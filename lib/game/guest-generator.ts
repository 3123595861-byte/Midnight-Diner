import type { GuestStoryDifficulty } from "@/lib/types/guest";
import type { GuestEntry } from "@/lib/data/guests";
import { GUESTS_PER_DAY_MVP } from "@/lib/constants/game";
import { generateGuestStoryText } from "@/lib/ai/guest-llm";
import { difficultyForDay } from "@/lib/ai/prompts";
import { buildGuestRecipeIntent } from "@/lib/game/guest-recipe-intent";
import {
  createGeneratedGuestId,
  getGeneratedGuestNames,
  storeGeneratedGuest,
} from "@/lib/game/generated-guest-cache";

export interface GenerateGuestOptions {
  day: number;
  index: number;
  excludeGuestIds?: string[];
}

export interface GeneratedGuestResult {
  guest: GuestEntry;
  day: number;
  index: number;
  guestsTotal: number;
}

/**
 * 服务端定食材 + LLM 只写故事，并写入缓存供 /api/cook 读取核心食材
 */
export async function generateGuestForDay(
  options: GenerateGuestOptions,
): Promise<GeneratedGuestResult> {
  const { day, index, excludeGuestIds = [] } = options;
  const difficulty = difficultyForDay(day);
  const avoidNames = getGeneratedGuestNames(excludeGuestIds);
  const intent = buildGuestRecipeIntent();

  const llmGuest = await generateGuestStoryText({
    day,
    difficulty,
    coreIngredientNames: intent.coreIngredientNames,
    hintedFood: intent.hintedFood,
    avoidNames,
  });

  const guestId = createGeneratedGuestId();
  const guest: GuestEntry = {
    guestId,
    name: llmGuest.name,
    story: llmGuest.story,
    coreIngredientIds: intent.coreIngredientIds,
    acceptableIngredientIds:
      intent.acceptableIngredientIds.length > 0
        ? intent.acceptableIngredientIds
        : undefined,
    hintedFood: intent.hintedFood,
    difficulty,
    assetKey: intent.assetKey,
  };

  storeGeneratedGuest({
    guestId,
    name: guest.name,
    story: guest.story,
    coreIngredientIds: guest.coreIngredientIds,
    acceptableIngredientIds: guest.acceptableIngredientIds,
    hintedFood: guest.hintedFood,
    difficulty: guest.difficulty,
    assetKey: guest.assetKey,
    createdAt: Date.now(),
  });

  return {
    guest,
    day,
    index,
    guestsTotal: GUESTS_PER_DAY_MVP,
  };
}
