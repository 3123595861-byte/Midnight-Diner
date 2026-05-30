import { NextResponse } from "next/server";
import type { CookApiRequestBody, CookApiRouteResponse } from "@/lib/types/ai";
import { generateCookResult } from "@/lib/ai/llm";
import { generateFoodImage } from "@/lib/ai/image";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseRequestBody(body: unknown): CookApiRequestBody | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const record = body as Record<string, unknown>;
  const guest_story = record.guest_story;
  const player_recipe = record.player_recipe;

  if (!isNonEmptyString(guest_story) || !isNonEmptyString(player_recipe)) {
    return null;
  }

  return {
    guest_story: guest_story.trim(),
    player_recipe: player_recipe.trim(),
  };
}

function errorResponse(message: string, status: number): NextResponse<CookApiRouteResponse> {
  return NextResponse.json(
    { success: false, error: message },
    { status },
  );
}

/**
 * POST /api/cook
 * 1. 校验 guest_story、player_recipe
 * 2. Ark 文本模型：判定、评价、image_prompt
 * 3. Ark 图像模型：像素风食物图（失败时 image_url 为空）
 */
export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const payload = parseRequestBody(body);

    if (!payload) {
      return errorResponse(
        "Missing or invalid fields: guest_story and player_recipe are required",
        400,
      );
    }

    const cookResult = await generateCookResult({
      guestStory: payload.guest_story,
      playerRecipe: payload.player_recipe,
    });

    const image_url = await generateFoodImage(cookResult.image_prompt);

    const response: CookApiRouteResponse = {
      success: true,
      data: {
        food_name: cookResult.food_name,
        star_rating: cookResult.star_rating,
        evaluation: cookResult.evaluation,
        image_url,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[POST /api/cook]", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return errorResponse(message, 500);
  }
}
