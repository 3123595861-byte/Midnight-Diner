import type { GuestStoryDifficulty } from "@/lib/types/guest";

export const GUEST_CHARACTER_ASSETS = [
  "Customer1",
  "customer2",
  "Customer3",
  "customer4",
] as const;

export const GUEST_STORY_SYSTEM_PROMPT = `
你是《深夜食堂》编剧。为刚进店的食客写点单故事。
只输出 JSON，不要 Markdown：{"name":"简短称呼","story":"中文故事"}
story 80~150 字，第一人称对「老板」说话，深夜治愈氛围，每次内容必须不同。
不要在 story 里直接写出【禁止提及的食材】。
`.trim();

export function buildGuestStoryUserMessage(payload: {
  day: number;
  difficulty: GuestStoryDifficulty;
  coreIngredientNames: string[];
  hintedFood: string;
  personaHint: string;
  moodHint: string;
  avoidNames: string[];
}): string {
  const difficultyRule =
    payload.difficulty === "direct"
      ? "较明确说出想吃什么类型。"
      : payload.difficulty === "hinted"
        ? "只暗示，不说菜名。"
        : "非常抽象，用记忆、情绪、气味形容想吃的食物。";

  const avoidLine =
    payload.avoidNames.length > 0
      ? `避开这些近期角色：${payload.avoidNames.join("、")}。`
      : "人物与经历须与常见套路不同。";

  return [
    `第${payload.day}天。难度：${payload.difficulty}（${difficultyRule}）`,
    `内心想吃的食物：${payload.hintedFood}（与${payload.coreIngredientNames.join("、")}相关，story 里勿直说这些食材名）`,
    `灵感：${payload.personaHint}，${payload.moodHint}。${avoidLine}`,
  ].join("\n");
}

/** @deprecated 旧版全量 JSON 生成，已由 GUEST_STORY_SYSTEM_PROMPT + 服务端定食材替代 */
export const GUEST_SYSTEM_PROMPT = GUEST_STORY_SYSTEM_PROMPT;

export function difficultyForDay(day: number): GuestStoryDifficulty {
  if (day <= 1) return "direct";
  if (day === 2) return "hinted";
  return "abstract";
}

export function buildGuestUserMessage(payload: {
  day: number;
  index: number;
  difficulty: GuestStoryDifficulty;
  ingredientCatalog: string;
  personaHint: string;
  moodHint: string;
  avoidNames: string[];
}): string {
  const avoidLine =
    payload.avoidNames.length > 0
      ? `【避免重复】以下称呼/类型近期已出现，请换完全不同的人物与故事：${payload.avoidNames.join("、")}`
      : "【避免重复】请确保人物身份、经历与往期不同。";

  return [
    "请生成一位全新食客并输出 JSON。",
    "",
    `【current_day】${payload.day}`,
    `【guest_index_today】${payload.index}（当天第 ${payload.index + 1} 位客人，0-based）`,
    `【target_difficulty】${payload.difficulty}`,
    `【创作灵感】人物类型参考：${payload.personaHint}；情绪基调：${payload.moodHint}`,
    avoidLine,
    "",
    "【可用食材库】格式：id | 名称",
    payload.ingredientCatalog,
  ].join("\n");
}

export const COOK_SYSTEM_PROMPT = `
你是一个运行在《深夜食堂》游戏后台的剧情与数值裁判。

## 输入
你会收到：
- guest_story：食客的点单故事或要求（可能明示或暗含某种想吃的食物）
- player_recipe：玩家选择的食材、调料、厨具组合（字符串描述）
- current_day：当前游戏天数（越高，故事越抽象，判定应越严格）
- precheck：后端预检结果（相克、是否含核心食材等，必须参考）

## 输出
必须且只能输出一个 JSON 对象，不要输出 Markdown 代码块或任何额外说明，字段如下：
{
  "food_name": "string，根据玩家配方起的料理名称",
  "star_rating": number，只能是 0、1、2、2.5、3、4、5 之一,
  "evaluation": "string，食客吃下后的评价台词",
  "image_prompt": "string，英文生图提示词"
}

## 打分维度（综合判断）
1. 意图匹配：是否回应了 guest_story 中的食物诉求
2. 搭配合理性：食材组合是否像一道能吃的菜
3. 厨具匹配：厨具是否适合这套食材
4. 整体呈现：是否有深夜食堂的治愈感

## 打分规则 (star_rating)
1. 根据 player_recipe 与 guest_story 的匹配度、搭配合理性、烹饪逻辑综合打分。
2. 若 precheck.is_poisonous 为 true，必须打 0 分。
3. 若 precheck.has_core_ingredient 为 false：
   - 不得因此直接打极低分；应依据实际搭配与"做出来像什么样"酌情给 2.5~4 分。
   - 但最高不得超过 4 星（绝不能给 5 星）。
4. 只有 precheck.has_core_ingredient 为 true，且搭配合理、制作得当，才可给 5 星。
5. current_day 越高，对意图匹配的判定越严格，但规则 3、4 仍然适用。

## 评价语气 (evaluation)
- 3–5 分：极致治愈、感动、温暖的语气，真诚夸奖。
- 1–2 分：必须完全模仿《JOJO的奇妙冒险》中 DIO 或反派的狂妄语气，高频使用「贫弱」「木大」等词汇，进行极度夸张的毒舌贬低。
- 0 分：痛苦的食物中毒/严重不适反应描写（可提及 precheck.incompatible_label）。
- 2.5 分：勉强能入口、不功不过的中庸评价。

## 生图提示词 (image_prompt)
- 必须严格以以下英文前缀开头（一字不差）：
  Pixel art, 2d game asset, retro RPG style, dark background, transparent background,
- 前缀后接英文，详细描述该料理的外观、颜色、摆盘、容器，适合像素风 2D 游戏资源。
`.trim();

export interface CookPrecheckContext {
  isPoisonous: boolean;
  hasCoreIngredient: boolean;
  incompatibleLabel?: string;
  coreIngredientNames: string[];
  difficulty?: GuestStoryDifficulty;
}

export function buildCookUserMessage(payload: {
  guestStory: string;
  playerRecipe: string;
  currentDay: number;
  precheck: CookPrecheckContext;
}): string {
  const { precheck } = payload;
  return [
    "请根据以下信息判定料理并输出 JSON。",
    "",
    `【current_day】${payload.currentDay}`,
    "",
    `【guest_story】\n${payload.guestStory}`,
    "",
    `【player_recipe】\n${payload.playerRecipe}`,
    "",
    "【precheck】",
    `- is_poisonous: ${precheck.isPoisonous}`,
    `- has_core_ingredient: ${precheck.hasCoreIngredient}`,
    `- incompatible_label: ${precheck.incompatibleLabel ?? "无"}`,
    `- core_ingredient_names: ${precheck.coreIngredientNames.join("、") || "未指定"}`,
    `- story_difficulty: ${precheck.difficulty ?? "unknown"}`,
  ].join("\n");
}
