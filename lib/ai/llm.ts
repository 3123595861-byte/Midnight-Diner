import type { CookPrecheckContext } from "@/lib/ai/prompts";
import type { LLMCookResponse } from "@/lib/types/ai";
import type { StarRating } from "@/lib/types/game";
import { getArkClient } from "@/lib/ai/client";
import { parseJsonObject } from "@/lib/ai/parse-json-response";
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

function normalizeFoodName(value: string): string {
  const genericTerms = [
    "什锦",
    "拼盘",
    "综合",
    "混合",
    "杂烩",
    "大杂烩",
    "风味",
    "特选",
    "家常",
    "夜宵组合",
  ];

  let normalized = value;
  for (const term of genericTerms) {
    normalized = normalized.replace(new RegExp(term, "g"), "");
  }

  normalized = normalized
    .replace(/U\d+/gi, "")
    .replace(/\bitem\s*\d+\b/gi, "")
    .replace(/\s+/g, " ")
    .replace(/([锅煮烤炖炒煎])\1+/g, "$1")
    .replace(/^[-_\s]+|[-_\s]+$/g, "")
    .trim();

  return normalized;
}

function parseLLMResponse(raw: string): LLMCookResponse {
  const record = parseJsonObject(raw);
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

  const cleanedFoodName = normalizeFoodName(food_name.trim());
  if (!cleanedFoodName) {
    throw new Error("LLM response produced an invalid food_name");
  }

  return {
    food_name: cleanedFoodName,
    star_rating: parseStarRating(record.star_rating),
    evaluation: evaluation.trim(),
    image_prompt: normalizedPrompt.trim(),
  };
}

export async function generateCookResult(payload: {
  guestStory: string;
  currentDay: number;
  playerRecipe: {
    ingredient_ids: string[];
    ingredient_names: string[];
    utensil_id: string;
    utensil_name: string;
  };
  precheck: CookPrecheckContext;
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
    temperature: 0.9,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("LLM returned empty content");
  }

  return parseLLMResponse(content);
}
