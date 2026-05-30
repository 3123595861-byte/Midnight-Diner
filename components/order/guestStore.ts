"use client";

import type { GuestApiSuccessData } from "@/lib/types/ai";

/** 当前接待中的客人信息，供烹饪 /api/cook 使用 */
let currentGuest: GuestApiSuccessData | null = null;

export function setCurrentGuest(guest: GuestApiSuccessData): void {
  currentGuest = guest;
}

export function getCurrentGuest(): GuestApiSuccessData | null {
  return currentGuest;
}

export function clearCurrentGuest(): void {
  currentGuest = null;
}
