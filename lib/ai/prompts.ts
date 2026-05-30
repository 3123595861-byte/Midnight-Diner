import type { GuestStoryDifficulty } from "@/lib/types/guest";

export const GUEST_CHARACTER_ASSETS = [
  "Customer1",
  "customer2",
  "Customer3",
  "customer4",
] as const;

export const GUEST_STORY_SYSTEM_PROMPT = `
你是《深夜食堂》编剧。为刚进店的食客写点单故事。
重要规则：
1. 只能输出纯 JSON 字符串，绝对不要使用 Markdown 代码块（如 \`\`\`json ），不要任何额外说明。
2. JSON 格式必须为：{"name":"简短称呼","story":"中文故事"}。
3. story 80~150 字，第一人称对「老板」说话，营造深夜治愈或都市夜归人的氛围，每次内容必须不同。
4. 随着难度增加，故事应当增加复杂度，让玩家稍微难以发现顾客此刻最想吃的食物。
5. 绝对不要在 story 里直接写出【禁止提及的食材】。
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
        : "非常抽象，用记忆、情绪、气味形容想吃的食物，增加推理难度。";

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
    "请生成一位全新食客并输出纯 JSON，不要 Markdown。",
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

## 重要原则
1. 必须强绑定玩家选择的食材与厨具，不要生成与输入无关的菜名、食物描述或生图内容。
2. 生成结果必须像“由这些食材和这个厨具做出来”的料理，不要泛化成任意常见菜。
3. 菜名、评价、图片都要根据当前这一单临时创作，禁止套用固定模板。
4. 整体气质是深夜经营感，允许带一点荒诞、冷峻、吐槽和反差，不要把所有表达都写成温馨抒情。
5. 必须且只能输出纯 JSON，绝对不要输出 Markdown 代码块（如 \`\`\`json ）或任何额外解释。

## 输入
你会收到一个 JSON 对象，字段如下：
{
  "guest_story": "string",
  "current_day": number,
  "player_recipe": {
    "ingredient_ids": string[],
    "ingredient_names": string[],
    "utensil_id": string,
    "utensil_name": string
  },
  "precheck": {
    "is_poisonous": boolean,
    "has_core_ingredient": boolean,
    "incompatible_label": string | null,
    "core_ingredient_names": string[],
    "difficulty": string | null
  }
}

## 输出
必须且只能输出一个 JSON 对象，字段如下：
{
  "food_name": "string，根据玩家选择的食材与厨具命名，必须能看出关联",
  "star_rating": number，只能是 0、1、2、2.5、3、4、5 之一,
  "evaluation": "string，食客吃下后的评价台词",
  "image_prompt": "string，英文生图提示词"
}

## 命名规则（food_name）
- 必须基于玩家选的核心食材命名，不能凭空捏造完全无关菜名。
- 不能使用泛化命名：禁止出现「什锦」「拼盘」「综合」「混合」「杂烩」「大杂烩」「风味」「特选」「家常」「夜宵组合」等过于笼统的词，也不要出现任何类似 U0xx 这样的机器编号。
- 若有 1~2 个主食材，就直接围绕主食材命名；若有多种食材，也要提炼出一个最像主角的主食材，不要把菜名写成“多种食材的集合体”。
- 菜名更偏“食材 + 烹饪方式”的自然组合，例如“番茄锅炒蛋”“味噌炖豆腐”“铁板虾煎物”，不要写成抽象标题。
- 厨具必须体现在做法里，而且必须和厨具语义一致：
  - 炒锅 / 铁板 / 平底锅：炒、煎、爆、滑、焗不可以。
  - 炖锅 / 汤锅：炖、煮、焖、煨、熬。
  - 烤箱：烤、焗、焙、烘，不要写成炖菜或焖菜。
  - 烤架 / 煎板：烤、烘、煎、炙。
- 若厨具是烤箱，成品必须是烤制/焗烤/烘烤类；若厨具是炖锅，成品必须是炖菜/汤菜/焖煮类；不要把烤箱写成焖菜，也不要把炖锅写成烤菜。

## 打分维度与规则 (star_rating)
1. 若 precheck.is_poisonous 为 true，必须打 0 分。
2. 若 precheck.has_core_ingredient 为 false：最高不得超过 4 星（绝不能给 5 星）。视搭配合理性给 2.5~4 分。
3. 只有 precheck.has_core_ingredient 为 true，且搭配合理、制作得当，才可给 5 星。

## 评价语气 (evaluation) —— 核心特色
- 5 分：各种花式夸奖！可以是热烈夸赞，也可以带一点夜店/江湖/戏谑式的最高赞誉，必须有食材细节。
- 3–4 分：冷幽默、感叹、无奈的夜晚语气，不必句句温馨，味道还行。
- 2.5 分：勉强能入口，不功不过。食客必须在台词中明确表示“这顿饭我只愿意付食材的成本钱”。
- 1–2 分：雷霆贬低！必须完全模仿《JOJO的奇妙冒险》中反派的狂妄语气和奇妙比喻，高频使用「贫弱」、「木大木大」、「你这料理的替身能力简直比替身使者的排泄物还不如」等雷霆词汇，疯狂贬低玩家做的食物，并明确提及是哪个食材或厨具毁了这道菜。
- 0 分：食物相克或不可食用。痛苦的食物中毒/严重不适反应描写（可提及 precheck.incompatible_label），顾客极度愤怒，必须在台词中明确要求“赔钱”！

## 生图提示词 (image_prompt)
- 必须严格以以下英文前缀开头（一字不差）：
  Pixel art, 2d game asset, retro RPG style, dark background, transparent background,
- 前缀后接英文，详细描述该料理的外观、摆盘、容器，必须把玩家选择的食材和厨具全部纳入画面描述。
- 画面必须简洁、偏粗糙游戏素材，不要写实，不要精致插画，要符合像素风游戏。
- 要允许焦边、热气、油渍、汤汁溢出、凌乱摆盘、夜宵摊感。
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
  currentDay: number;
  playerRecipe: {
    ingredient_ids: string[];
    ingredient_names: string[];
    utensil_id: string;
    utensil_name: string;
  };
  precheck: CookPrecheckContext;
}): string {
  const { precheck, playerRecipe } = payload;
  return [
    "请根据以下信息判定料理并输出纯 JSON，不要 Markdown。",
    "",
    `【current_day】${payload.currentDay}`,
    "",
    `【guest_story】\n${payload.guestStory}`,
    "",
    "【player_recipe_json】",
    JSON.stringify(playerRecipe, null, 2),
    "",
    "【strict_binding_rules】",
    `- 菜名必须至少包含以下食材之一：${playerRecipe.ingredient_names.join("、") || "未选食材"}`,
    `- 画面中必须明显体现厨具：${playerRecipe.utensil_name || playerRecipe.utensil_id}`,
    `- 成品做法必须和厨具一致：锅类要体现炒/煎/爆，炖锅要体现炖/焖/煮，烤箱要体现烤/焗/烘。`,
    `- 评价内容必须严格遵守 star_rating 对应的语气要求（如 JOJO 式贬低、2.5 星付成本、0 星赔钱）。`,
    "",
    "【precheck】",
    `- is_poisonous: ${precheck.isPoisonous}`,
    `- has_core_ingredient: ${precheck.hasCoreIngredient}`,
    `- incompatible_label: ${precheck.incompatibleLabel ?? "无"}`,
    `- core_ingredient_names: ${precheck.coreIngredientNames.join("、") || "未指定"}`,
    `- story_difficulty: ${precheck.difficulty ?? "unknown"}`,
  ].join("\n");
}