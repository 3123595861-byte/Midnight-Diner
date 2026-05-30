import type { CookRequestPayload, LLMCookResponse } from "@/lib/types/ai";

/**
 * 调用 LLM 进行料理判定与评价生成
 * TODO: Phase 3 接入豆包 / GLM-4 等 API
 */
export async function callLLMForCook(
  _payload: CookRequestPayload,
): Promise<LLMCookResponse> {
  throw new Error("callLLMForCook: not implemented");
}
