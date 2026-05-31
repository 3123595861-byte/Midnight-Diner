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

/** * 👇 新增功能：推进到下一位客人/下一天 
 * 作用是清除当前完结的客人缓存，并把天数算好，以便回到点单界面（Screen 1）触发全新的加载
 */
export function advanceToNextGuest(): void {
  if (currentGuest) {
    // 获取当前客人的天数，并为下一轮准备好递增的天数
    const nextDay = currentGuest.day + 1;
    
    // 清除上一轮客人的所有旧数据，只把天数继承并更新过去
    // 这样 Screen 1 重新 visible 时，就能通过判断天数变化来 fetch 下一个新客人
    currentGuest = {
      ...currentGuest,
      guest_id: "", // 清空 ID 触发重新加载
      day: nextDay, // 天数正式自增
      name: "",
      story: "",
    };
  } else {
    currentGuest = null;
  }
}