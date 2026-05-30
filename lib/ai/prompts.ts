/**
 * LLM System Prompt 模板
 * TODO: Phase 3 完善 Prompt，确保稳定 JSON 输出
 */
export const COOK_SYSTEM_PROMPT = `
你是《AI 深夜食堂》的料理判定系统。
根据客人故事、玩家选择的食材与厨具，输出 JSON：
{
  "food_name": "料理名称",
  "star_rating": 0-5（含 2.5）,
  "evaluation": "客人评价台词",
  "image_prompt": "英文像素风生图提示词"
}
`.trim();

/**
 * 构建 LLM 用户消息
 * TODO: Phase 3 实现
 */
export function buildCookUserMessage(_payload: {
  guestStory: string;
  playerRecipe: unknown;
  currentDay: number;
}): string {
  throw new Error("buildCookUserMessage: not implemented");
}
