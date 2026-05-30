import type { LLMCookResponse } from "@/lib/types/ai";
import type { StarRating } from "@/lib/types/game";
import { getArkClient } from "@/lib/ai/client";
import { COOK_SYSTEM_PROMPT, buildCookUserMessage } from "@/lib/ai/prompts";

const VALID_STAR_RATINGS: StarRating[] = [0, 1, 2, 2.5, 3, 4, 5];

function parseStarRating(value: unknown): StarRating {
  const num = typeof value === "string" ? Number(value) : value;
  if (typeof num !== "number" || Number.isNaN(num)) {
    throw new Error(`Invalid star_rating: ${String(value)}`);
  }
  if (!VALID_STAR_RATINGS.includes(num as StarRating)) {
    throw new Error(`star_rating must be one of ${VALID_STAR_RATINGS.join(", ")}`);
  }
  return num as StarRating;
}

function extractJsonContent(raw: string): string {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }
  return trimmed;
}

function parseLLMResponse(raw: string): LLMCookResponse {
  let parsed: unknown;
  try {
    parsed = JSON.parse(extractJsonContent(raw));
  } catch {
    throw new Error("LLM response is not valid JSON");
  }

  if (!parsed || typeof parsed !== "object") {
    throw new Error("LLM response must be a JSON object");
  }

  const record = parsed as Record<string, unknown>;
  const food_name = record.food_name;
  const evaluation = record.evaluation;
  const image_prompt = record.image_prompt;

  if (typeof food_name !== "string" || !food_name.trim()) {
    throw new Error("LLM response missing food_name");
  }
  if (typeof evaluation !== "string" || !evaluation.trim()) {
    throw new Error("LLM response missing evaluation");
  }
  if (typeof image_prompt !== "string" || !image_prompt.trim()) {
    throw new Error("LLM response missing image_prompt");
  }

  const IMAGE_PROMPT_PREFIX =
    "Pixel art, 2d game asset, retro RPG style, dark background, transparent background,";
  const normalizedPrompt = image_prompt.startsWith(IMAGE_PROMPT_PREFIX)
    ? image_prompt
    : `${IMAGE_PROMPT_PREFIX} ${image_prompt}`;

  return {
    food_name: food_name.trim(),
    star_rating: parseStarRating(record.star_rating),
    evaluation: evaluation.trim(),
    image_prompt: normalizedPrompt.trim(),
  };
}

export async function generateCookResult(payload: {
  guestStory: string;
  playerRecipe: string;
}): Promise<LLMCookResponse> {
  const textEndpoint = process.env.ARK_TEXT_ENDPOINT;
  if (!textEndpoint) {
    throw new Error("Missing ARK_TEXT_ENDPOINT environment variable");
  }

  const client = getArkClient();
  const completion = await client.chat.completions.create({
    model: textEndpoint,
    messages: [
      { role: "system", content: COOK_SYSTEM_PROMPT },
      {
        role: "user",
        content: buildCookUserMessage(payload),
      },
    ],
    temperature: 0.7,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("LLM returned empty content");
  }

  return parseLLMResponse(content);
}
