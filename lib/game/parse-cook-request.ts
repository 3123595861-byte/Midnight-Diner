import type {
  CookApiRequestBody,
  CookPlayerRecipeBody,
} from "@/lib/types/ai";
import type { PlayerRecipe } from "@/lib/types/ingredient";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((item) => typeof item === "string")
  );
}

function parsePlayerRecipe(value: unknown): PlayerRecipe | string | null {
  if (isNonEmptyString(value)) {
    return value.trim();
  }

  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;
  const ingredient_ids = record.ingredient_ids;
  const utensil_id = record.utensil_id;

  if (!isStringArray(ingredient_ids) || !isNonEmptyString(utensil_id)) {
    return null;
  }

  return {
    ingredientIds: ingredient_ids,
    utensilId: utensil_id.trim(),
  };
}

export function parseCookRequestBody(body: unknown): CookApiRequestBody | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const record = body as Record<string, unknown>;
  const guest_story = record.guest_story;
  const player_recipe = parsePlayerRecipe(record.player_recipe);

  if (!isNonEmptyString(guest_story) || player_recipe === null) {
    return null;
  }

  const current_day =
    typeof record.current_day === "number" && record.current_day >= 1
      ? Math.floor(record.current_day)
      : 1;

  const current_money =
    typeof record.current_money === "number" && record.current_money >= 0
      ? record.current_money
      : undefined;

  const guest_id = isNonEmptyString(record.guest_id)
    ? record.guest_id.trim()
    : undefined;

  const core_ingredient_ids = isStringArray(record.core_ingredient_ids)
    ? record.core_ingredient_ids
    : undefined;

  const acceptable_ingredient_ids = isStringArray(
    record.acceptable_ingredient_ids,
  )
    ? record.acceptable_ingredient_ids
    : undefined;

  const parsed: CookApiRequestBody = {
    guest_story: guest_story.trim(),
    player_recipe: player_recipe as CookPlayerRecipeBody | string,
    current_day,
  };

  if (guest_id) parsed.guest_id = guest_id;
  if (core_ingredient_ids) parsed.core_ingredient_ids = core_ingredient_ids;
  if (acceptable_ingredient_ids) {
    parsed.acceptable_ingredient_ids = acceptable_ingredient_ids;
  }
  if (current_money !== undefined) parsed.current_money = current_money;

  return parsed;
}

export function toPlayerRecipe(
  player_recipe: CookApiRequestBody["player_recipe"],
): PlayerRecipe {
  if (typeof player_recipe === "string") {
    return { ingredientIds: [], utensilId: "" };
  }
  return {
    ingredientIds: player_recipe.ingredient_ids,
    utensilId: player_recipe.utensil_id,
  };
}
