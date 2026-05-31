import type { PlayerRecipe } from "@/lib/types/ingredient";
import { getIngredientsByIds } from "@/lib/data/ingredients";
import { getUtensilName } from "@/lib/data/utensils";

/**
 * 计算玩家选择的所有食材/调料/主食的总成本
 * （注：厨具由于在 player_recipe 中是独立字段，天然不参与此处计算）
 */
export function calculateIngredientCost(ingredientIds: string[]): number {
  return getIngredientsByIds(ingredientIds).reduce(
    (sum, item) => sum + item.price,
    0,
  );
}

/**
 * 结构化格式化配方，提供给大模型（LLM）解析
 * 升级后：按主食、肉类、蔬菜、调料清晰分类，防止 AI 误判调料配比
 */
export function formatRecipeForAI(recipe: PlayerRecipe): string {
  const ingredients = getIngredientsByIds(recipe.ingredientIds);

  if (ingredients.length === 0) {
    const utensilText = getUtensilName(recipe.utensilId);
    return `食材：无（未选择任何食材）；厨具：${utensilText}`;
  }

  // 1. 按新分类拆分
  const staples = ingredients.filter((i) => i.category === "staple").map((i) => i.name).join("、");
  const meats = ingredients.filter((i) => i.category === "meat" || i.category === "seafood").map((i) => i.name).join("、");
  const vegetables = ingredients.filter((i) => i.category === "vegetable").map((i) => i.name).join("、");
  const seasonings = ingredients.filter((i) => i.category === "seasoning").map((i) => i.name).join("、");
  const others = ingredients.filter((i) => !["staple", "meat", "seafood", "vegetable", "seasoning"].includes(i.category)).map((i) => i.name).join("、");

  // 2. 组装结构化文本
  const parts: string[] = [];
  if (staples) parts.push(`【主食】${staples}`);
  if (meats) parts.push(`【肉禽海鲜】${meats}`);
  if (vegetables) parts.push(`【蔬菜菇类】${vegetables}`);
  if (seasonings) parts.push(`【调味酱料】${seasonings}`);
  if (others) parts.push(`【其他食材】${others}`);

  const utensilText = getUtensilName(recipe.utensilId);

  return `玩家烹饪配方：\n${parts.join("\n")} \n【使用厨具】${utensilText}`;
}

/**
 * 校验玩家选择的食材中是否包含核心关卡食材
 */
export function hasCoreIngredient(
  selectedIds: string[],
  coreIds: string[],
  acceptableIds: string[] = [],
): boolean {
  const allowed = new Set([...coreIds, ...acceptableIds]);
  return selectedIds.some((id) => allowed.has(id));
}