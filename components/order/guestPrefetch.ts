import type { GenerateAIOrderOptions, GenerateAIOrderResult } from "@/components/order/generateAIOrder";
import { generateAIOrder } from "@/components/order/generateAIOrder";
import { CONFIG } from "@/components/order/config";
import { getRecentGuestIds } from "@/components/order/guestSession";

let prefetchCache: {
  key: string;
  promise: Promise<GenerateAIOrderResult>;
} | null = null;

function buildOrderOptions(
  overrides?: Partial<GenerateAIOrderOptions>,
): GenerateAIOrderOptions {
  return {
    day: CONFIG.money.initialDay,
    index: 0,
    excludeGuestIds: getRecentGuestIds(CONFIG.guest.recentExcludeCount),
    ...overrides,
  };
}

function orderCacheKey(options: GenerateAIOrderOptions): string {
  return `${options.day}:${options.index}:${options.excludeGuestIds?.join(",") ?? ""}`;
}

async function warmServerGuestPool(day: number): Promise<void> {
  const params = new URLSearchParams({
    day: String(day),
    warm: "1",
    wait: "1",
  });
  const response = await fetch(`/api/guest?${params.toString()}`);
  if (!response.ok) {
    throw new Error("客人预热失败");
  }
}

/** 触发服务端预热 + 客户端预取第一位客人故事 */
export function prefetchGuestOrder(
  overrides?: Partial<GenerateAIOrderOptions>,
): void {
  const options = buildOrderOptions(overrides);
  const key = orderCacheKey(options);

  if (prefetchCache?.key === key) return;

  prefetchCache = {
    key,
    promise: (async () => {
      await warmServerGuestPool(options.day);
      return generateAIOrder(options);
    })(),
  };
}

/** 优先消费预取结果，否则现场请求 */
export async function loadGuestOrder(
  overrides?: Partial<GenerateAIOrderOptions>,
): Promise<GenerateAIOrderResult> {
  const options = buildOrderOptions(overrides);
  const key = orderCacheKey(options);

  if (prefetchCache?.key === key) {
    const promise = prefetchCache.promise;
    prefetchCache = null;
    return promise;
  }

  await warmServerGuestPool(options.day);
  return generateAIOrder(options);
}

/** 当前客人接待完成后，预取下一位 */
export function prefetchNextGuestOrder(): void {
  prefetchGuestOrder();
}

export function clearGuestOrderPrefetch(): void {
  prefetchCache = null;
}
