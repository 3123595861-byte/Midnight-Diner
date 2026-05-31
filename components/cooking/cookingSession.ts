"use client";

/** 烹饪阶段玩家输入的暖心寄语（跨组件读取，避免 state 时序问题） */
let chefMessageDraft = "";

export function setChefMessageDraft(message: string): void {
  chefMessageDraft = message;
}

export function getChefMessageDraft(): string {
  return chefMessageDraft;
}

export function clearChefMessageDraft(): void {
  chefMessageDraft = "";
}
