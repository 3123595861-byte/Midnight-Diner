import type { GuestApiRouteResponse, GuestApiSuccessData } from "@/lib/types/ai";

export interface GenerateAIOrderResult {
  guest: GuestApiSuccessData;
  /** 原始故事段落，交由 paginateText 按对话框容量分页 */
  storyPages: string[];
}

export interface GenerateAIOrderOptions {
  day: number;
  /** 当天第几位客人，0-based，影响 LLM 上下文 */
  index?: number;
  /** 最近出现过的 guest_id，传给后端以避免相似角色 */
  excludeGuestIds?: string[];
}

/**
 * 从 GET /api/guest 获取 LLM 实时生成的客人点单故事
 */
export async function generateAIOrder(
  options: GenerateAIOrderOptions,
): Promise<GenerateAIOrderResult> {
  const { day, index = 0, excludeGuestIds = [] } = options;

  const params = new URLSearchParams({
    day: String(day),
    index: String(index),
  });

  if (excludeGuestIds.length > 0) {
    params.set("exclude", excludeGuestIds.join(","));
  }

  const response = await fetch(`/api/guest?${params.toString()}`);

  let json: GuestApiRouteResponse;
  try {
    json = (await response.json()) as GuestApiRouteResponse;
  } catch {
    throw new Error("无法解析客人故事响应");
  }

  if (!response.ok || !json.success || !json.data) {
    throw new Error(json.error ?? `获取客人故事失败 (${response.status})`);
  }

  const { story } = json.data;

  return {
    guest: json.data,
    storyPages: story.trim() ? [story.trim()] : [""],
  };
}
