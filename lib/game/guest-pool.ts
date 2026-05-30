import type { GeneratedGuestResult, GenerateGuestOptions } from "@/lib/game/guest-generator";
import { generateGuestForDay } from "@/lib/game/guest-generator";

const POOL_TARGET = 2;

const pool: GeneratedGuestResult[] = [];
let refillPromise: Promise<void> | null = null;

async function refillGuestPool(day: number): Promise<void> {
  while (pool.length < POOL_TARGET) {
    const result = await generateGuestForDay({
      day,
      index: 0,
      excludeGuestIds: [],
    });
    pool.push(result);
  }
}

function scheduleRefill(day: number): void {
  if (refillPromise) return;

  refillPromise = refillGuestPool(day)
    .catch(() => {
      /* 预热失败不影响主流程 */
    })
    .finally(() => {
      refillPromise = null;
      if (pool.length < POOL_TARGET) {
        scheduleRefill(day);
      }
    });
}

/** 后台预热客人池，供下一次请求秒开 */
export function warmGuestPool(day: number): void {
  scheduleRefill(day);
}

/** 优先从预热池取客人，池空则同步生成 */
export async function acquireGuest(
  options: GenerateGuestOptions,
): Promise<GeneratedGuestResult> {
  const pooled = pool.shift();
  scheduleRefill(options.day);

  if (pooled) {
    return {
      ...pooled,
      day: options.day,
      index: options.index,
    };
  }

  const result = await generateGuestForDay(options);
  scheduleRefill(options.day);
  return result;
}

export function getGuestPoolSize(): number {
  return pool.length;
}
