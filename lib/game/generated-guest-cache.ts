import type { GuestStoryDifficulty } from "@/lib/types/guest";

export interface CachedGeneratedGuest {
  guestId: string;
  name: string;
  story: string;
  coreIngredientIds: string[];
  acceptableIngredientIds?: string[];
  hintedFood?: string;
  difficulty: GuestStoryDifficulty;
  assetKey: string;
  createdAt: number;
}

const cache = new Map<string, CachedGeneratedGuest>();
const MAX_CACHE_SIZE = 200;

function evictOldestIfNeeded(): void {
  if (cache.size < MAX_CACHE_SIZE) return;

  let oldestKey: string | null = null;
  let oldestTime = Infinity;

  for (const [key, value] of cache.entries()) {
    if (value.createdAt < oldestTime) {
      oldestTime = value.createdAt;
      oldestKey = key;
    }
  }

  if (oldestKey) {
    cache.delete(oldestKey);
  }
}

export function storeGeneratedGuest(guest: CachedGeneratedGuest): void {
  evictOldestIfNeeded();
  cache.set(guest.guestId, guest);
}

export function getGeneratedGuest(
  guestId: string,
): CachedGeneratedGuest | null {
  return cache.get(guestId) ?? null;
}

export function getGeneratedGuestNames(guestIds: string[]): string[] {
  const names: string[] = [];
  for (const id of guestIds) {
    const name = cache.get(id)?.name;
    if (name) names.push(name);
  }
  return names;
}

export function createGeneratedGuestId(): string {
  const suffix = Math.random().toString(36).slice(2, 10);
  return `gen_${Date.now()}_${suffix}`;
}
