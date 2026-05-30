import type { GeneratedGuestResult, GenerateGuestOptions } from "@/lib/game/guest-generator";
import { generateGuestForDay } from "@/lib/game/guest-generator";

/** 池中维持的预生成客人数（后台并行补货） */
const POOL_TARGET = 3;

const pool: GeneratedGuestResult[] = [];
let refillPromise: Promise<void> | null = null;

async function generateOneGuest(day: number): Promise<GeneratedGuestResult> {
  return generateGuestForDay({
    day,
    index: 0,
    excludeGuestIds: [],
  });
}

/** 并行补满客人池 */
async function refillGuestPool(day: number): Promise<void> {
  const needed = POOL_TARGET - pool.length;
  if (needed <= 0) return;

  const results = await Promise.all(
    Array.from({ length: needed }, () => generateOneGuest(day)),
  );
  pool.push(...results);
}

function scheduleRefill(day: number): void {
  if (refillPromise || pool.length >= POOL_TARGET) return;

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

/** 后台预热客人池 */
export function warmGuestPool(day: number): void {
  scheduleRefill(day);
}

/**
 * 确保池中至少有 minSize 位客人；优先复用在途补货，否则同步生成一位
 */
export async function ensureGuestPoolReady(
  day: number,
  minSize = 1,
): Promise<void> {
  if (pool.length >= minSize) return;

  if (refillPromise) {
    await refillPromise.catch(() => {});
    if (pool.length >= minSize) return;
  }

  if (pool.length < minSize) {
    const result = await generateOneGuest(day);
    pool.push(result);
  }

  scheduleRefill(day);
}

/** 优先从预热池取客人，池空则等待在途补货或同步生成 */
export async function acquireGuest(
  options: GenerateGuestOptions,
): Promise<GeneratedGuestResult> {
  if (pool.length === 0 && refillPromise) {
    await refillPromise.catch(() => {});
  }

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
