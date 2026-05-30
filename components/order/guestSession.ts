"use client";

const STORAGE_KEY = "midnaight-diner-recent-guests";

function readRecentGuestIds(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

/** 读取本局最近出现过的 guest_id，用于随机选客时排除 */
export function getRecentGuestIds(maxCount: number): string[] {
  return readRecentGuestIds().slice(0, maxCount);
}

/** 记录刚接待的客人，避免短时间内重复 */
export function rememberGuestId(guestId: string, maxCount: number): void {
  if (typeof window === "undefined") return;

  const recent = readRecentGuestIds().filter((id) => id !== guestId);
  recent.unshift(guestId);
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(recent.slice(0, maxCount)));
}
