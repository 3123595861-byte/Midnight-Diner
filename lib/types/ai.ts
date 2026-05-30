import type { PlayerRecipe } from "@/lib/types/ingredient";
import type { StarRating } from "@/lib/types/game";
import type { StarAdjustmentReason } from "@/lib/game/scoring";

/** 结构化玩家配方（推荐前端使用） */
export interface CookPlayerRecipeBody {
  ingredient_ids: string[];
  utensil_id: string;
}

/** POST /api/cook 请求体 */
export interface CookApiRequestBody {
  guest_story: string;
  /** 结构化配方（推荐）或字符串描述（兼容旧版） */
  player_recipe: CookPlayerRecipeBody | string;
  current_day?: number;
  /** 可选：关联 lib/data/guests 中的客人，自动读取核心食材 */
  guest_id?: string;
  /** 可选：手动指定核心食材（无 guest_id 时使用） */
  core_ingredient_ids?: string[];
  acceptable_ingredient_ids?: string[];
  /** 可选：当前资金，用于返回 remaining_money */
  current_money?: number;
}

/** LLM 预期 JSON 输出结构 */
export interface LLMCookResponse {
  food_name: string;
  star_rating: StarRating;
  evaluation: string;
  image_prompt: string;
}

export interface LLMCookPlayerRecipe {
  ingredient_ids: string[];
  ingredient_names: string[];
  utensil_id: string;
  utensil_name: string;
}

export interface CookSettlementData {
  ingredient_cost: number;
  payment_received: number;
  poison_penalty: number;
  net_change: number;
  remaining_money: number;
  is_bankrupt: boolean;
}

export interface CookMetaData {
  has_core_ingredient: boolean;
  is_poisonous: boolean;
  incompatible_label: string | null;
  star_rating_adjusted: boolean;
  adjustment_reason: StarAdjustmentReason;
  current_day: number;
  guest_id: string | null;
}

/** POST /api/cook 成功响应 data 字段 */
export interface CookApiSuccessData {
  food_name: string;
  star_rating: StarRating;
  /** AI 原始星级（后端校正前） */
  star_rating_raw: StarRating;
  evaluation: string;
  image_url: string;
  settlement: CookSettlementData;
  meta: CookMetaData;
}

/** POST /api/cook 统一响应 */
export interface CookApiRouteResponse {
  success: boolean;
  data?: CookApiSuccessData;
  error?: string;
}

/** GET /api/guest 响应 */
export interface GuestApiSuccessData {
  guest_id: string;
  name: string;
  story: string;
  difficulty: string;
  asset_key: string;
  day: number;
  index: number;
  guests_total: number;
}

/** LLM 生成客人故事的 JSON 结构（仅服务端使用，不返回给前端） */
export interface LLMGeneratedGuest {
  name: string;
  story: string;
  core_ingredient_ids: string[];
  acceptable_ingredient_ids: string[];
  hinted_food?: string;
  difficulty: string;
  asset_key: string;
}

export interface GuestApiRouteResponse {
  success: boolean;
  data?: GuestApiSuccessData;
  error?: string;
}

/** GET /api/catalog 响应 */
export interface CatalogApiSuccessData {
  initial_money: number;
  guests_per_day: number;
  poison_penalty: number;
  star_income_multiplier: Record<StarRating, number>;
  ingredients: Array<{
    id: string;
    name: string;
    category: string;
    price: number;
    asset_key: string;
  }>;
  utensils: Array<{
    id: string;
    name: string;
    asset_key: string;
  }>;
}

export interface CatalogApiRouteResponse {
  success: boolean;
  data?: CatalogApiSuccessData;
  error?: string;
}

/** @deprecated 使用 CookApiSuccessData */
export interface CookRequestPayload {
  guestStory: string;
  playerRecipe: PlayerRecipe;
  currentDay: number;
}

/** @deprecated 使用 CookApiSuccessData */
export interface CookApiResponse {
  foodName: string;
  starRating: StarRating;
  evaluation: string;
  imagePrompt: string;
  foodImageUrl: string | null;
}
