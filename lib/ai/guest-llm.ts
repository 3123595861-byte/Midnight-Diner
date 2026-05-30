import type { GuestStoryDifficulty } from "@/lib/types/guest";
import { getArkClient } from "@/lib/ai/client";
import { parseJsonObject } from "@/lib/ai/parse-json-response";
import {
  GUEST_STORY_SYSTEM_PROMPT,
  buildGuestStoryUserMessage,
} from "@/lib/ai/prompts";

const PERSONA_HINTS = [
  "刚下班的上班族",
  "备考到深夜的学生",
  "独自旅行的背包客",
  "刚下夜班的医护",
  "失恋的年轻人",
  "怀念故乡的老人",
  "赶稿的创作者",
  "雨夜路过的行人",
];

const MOOD_HINTS = [
  "疲惫但温柔",
  "怀旧",
  "孤独",
  "轻松",
  "焦虑",
  "感激",
  "迷茫",
  "安静",
];

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

export interface LLMGuestStoryText {
  name: string;
  story: string;
}

function parseGuestStoryResponse(raw: string): LLMGuestStoryText {
  const record = parseJsonObject(raw);
  const name = record.name;
  const story = record.story;

  if (typeof name !== "string" || !name.trim()) {
    throw new Error("LLM guest response missing name");
  }
  if (typeof story !== "string" || !story.trim()) {
    throw new Error("LLM guest response missing story");
  }

  return {
    name: name.trim(),
    story: story.trim(),
  };
}

/** 仅生成称呼与故事文本（核心食材由服务端预先决定，显著减少 LLM 输出量） */
export async function generateGuestStoryText(payload: {
  day: number;
  difficulty: GuestStoryDifficulty;
  coreIngredientNames: string[];
  hintedFood: string;
  avoidNames?: string[];
}): Promise<LLMGuestStoryText> {
  const textEndpoint = process.env.ARK_TEXT_ENDPOINT;
  if (!textEndpoint) {
    throw new Error("Missing ARK_TEXT_ENDPOINT environment variable");
  }

  const client = getArkClient();
  const completion = await client.chat.completions.create({
    model: textEndpoint,
    messages: [
      { role: "system", content: GUEST_STORY_SYSTEM_PROMPT },
      {
        role: "user",
        content: buildGuestStoryUserMessage({
          day: payload.day,
          difficulty: payload.difficulty,
          coreIngredientNames: payload.coreIngredientNames,
          hintedFood: payload.hintedFood,
          personaHint: pickRandom(PERSONA_HINTS),
          moodHint: pickRandom(MOOD_HINTS),
          avoidNames: payload.avoidNames ?? [],
        }),
      },
    ],
    temperature: 0.88,
    max_tokens: 220,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("LLM returned empty guest story");
  }

  return parseGuestStoryResponse(content);
}
