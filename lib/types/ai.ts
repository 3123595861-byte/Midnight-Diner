import type { PlayerRecipe } from "@/lib/types/ingredient";
import type { StarRating } from "@/lib/types/game";

/** 发送给 /api/cook 的请求体 */
export interface CookRequestPayload {
  guestStory: string;
  playerRecipe: PlayerRecipe;
  currentDay: number;
}

/** LLM 预期 JSON 输出结构 @see PRD §5 */
export interface LLMCookResponse {
  food_name: string;
  star_rating: StarRating;
  evaluation: string;
  image_prompt: string;
}

/** 烹饪 API 完整响应（文本 + 可选图片 URL） */
export interface CookApiResponse {
  foodName: string;
  starRating: StarRating;
  evaluation: string;
  imagePrompt: string;
  foodImageUrl: string | null;
}
