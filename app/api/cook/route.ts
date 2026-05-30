import { NextResponse } from "next/server";
import type { CookApiRouteResponse } from "@/lib/types/ai";
import { executeCookFlow } from "@/lib/game/cook-service";
import {
  parseCookRequestBody,
  toPlayerRecipe,
} from "@/lib/game/parse-cook-request";

function errorResponse(
  message: string,
  status: number,
): NextResponse<CookApiRouteResponse> {
  return NextResponse.json({ success: false, error: message }, { status });
}

/**
 * POST /api/cook
 *
 * 完整烹饪流程：预检 → AI 判定 → 星级校正 → 生图 → 经济结算
 *
 * @example
 * {
 *   "guest_story": "想喝一碗豚骨拉面……",
 *   "guest_id": "guest_01",
 *   "player_recipe": {
 *     "ingredient_ids": ["noodles", "pork_bone", "green_onion"],
 *     "utensil_id": "pot"
 *   },
 *   "current_day": 1,
 *   "current_money": 1000
 * }
 */
export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const payload = parseCookRequestBody(body);

    if (!payload) {
      return errorResponse(
        "Invalid body: guest_story and player_recipe { ingredient_ids, utensil_id } are required",
        400,
      );
    }

    if (typeof payload.player_recipe === "string") {
      return errorResponse(
        "player_recipe must be an object: { ingredient_ids: string[], utensil_id: string }",
        400,
      );
    }

    const recipe = toPlayerRecipe(payload.player_recipe);

    if (!Array.isArray(recipe.ingredientIds) || recipe.ingredientIds.length === 0 || !recipe.utensilId) {
      return errorResponse(
        "player_recipe must include non-empty ingredient_ids and utensil_id",
        400,
      );
    }

    const data = await executeCookFlow({
      guestStory: payload.guest_story,
      playerRecipe: recipe,
      currentDay: payload.current_day ?? 1,
      guestId: payload.guest_id,
      coreIngredientIds: payload.core_ingredient_ids,
      acceptableIngredientIds: payload.acceptable_ingredient_ids,
      currentMoney: payload.current_money,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("[POST /api/cook]", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
