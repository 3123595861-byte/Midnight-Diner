"use client";

import type { CookApiSuccessData } from "@/lib/types/ai";

export interface ServingSessionPayload {
  /** 点单界面随机背景 */
  backgroundUrl: string;
  /** 厨师暖心寄语（玩家输入） */
  chefMessage: string;
  /** AI 顾客评价 */
  customerEvaluation: string;
  foodName: string;
  starRating: number;
  settlement: CookApiSuccessData["settlement"];
}

let orderBackgroundUrl: string | null = null;
let servingPayload: ServingSessionPayload | null = null;
/** 烹饪界面实时同步的暖心寄语，避免跳转时 state 丢失 */
let pendingChefMessage = "";

export function setPendingChefMessage(message: string): void {
  pendingChefMessage = message;
}

export function getPendingChefMessage(): string {
  return pendingChefMessage;
}

export function clearPendingChefMessage(): void {
  pendingChefMessage = "";
}

export function setOrderBackgroundUrl(url: string): void {
  orderBackgroundUrl = url;
}

export function getOrderBackgroundUrl(): string {
  return orderBackgroundUrl ?? "/assets/scenes/ordering/mainscene1.png";
}

export function setServingPayload(payload: ServingSessionPayload): void {
  const chefMessage =
    payload.chefMessage.trim() || pendingChefMessage.trim();
  servingPayload = { ...payload, chefMessage };
}

export function getServingPayload(): ServingSessionPayload | null {
  return servingPayload;
}

export function clearServingPayload(): void {
  servingPayload = null;
}
