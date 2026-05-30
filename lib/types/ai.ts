import type { PlayerRecipe } from "@/lib/types/ingredient";
import type { StarRating } from "@/lib/types/game";

/** 发送给 /api/cook 的请求体（前端 camelCase 兼容） */
export interface CookRequestPayload {
  guestStory: string;
  playerRecipe: PlayerRecipe;
  currentDay: number;
}

/** POST /api/cook 规范请求体（snake_case） */
export interface CookApiRequestBody {
  guest_story: string;
  player_recipe: string;
}

/** LLM 预期 JSON 输出结构 @see PRD §5 */
export interface LLMCookResponse {
  food_name: string;
  star_rating: StarRating;
  evaluation: string;
  image_prompt: string;
}

/** POST /api/cook 成功响应 data 字段 */
export interface CookApiSuccessData {
  food_name: string;
  star_rating: StarRating;
  evaluation: string;
  image_url: string;
}

/** POST /api/cook 统一响应 */
export interface CookApiRouteResponse {
  success: boolean;
  data?: CookApiSuccessData;
  error?: string;
}

/** 烹饪 API 完整响应（文本 + 可选图片 URL）— 前端内部使用 */
export interface CookApiResponse {
  foodName: string;
  starRating: StarRating;
  evaluation: string;
  imagePrompt: string;
  foodImageUrl: string | null;
}
