"use client";

/**
 * 全局金额更新接口
 * OrderScreen 挂载时注册，其他模块可调用 updateMoney(amount)
 */

type MoneyUpdater = (delta: number) => void;

let moneyUpdater: MoneyUpdater | null = null;
let currentMoney = 0;

export function registerMoneyUpdater(updater: MoneyUpdater): void {
  moneyUpdater = updater;
}

export function unregisterMoneyUpdater(): void {
  moneyUpdater = null;
}

export function setCurrentMoney(amount: number): void {
  currentMoney = amount;
}

export function getCurrentMoney(): number {
  return currentMoney;
}

/** 增加（正数）或减少（负数）金额，并触发动画 */
export function updateMoney(amount: number): void {
  currentMoney += amount;
  moneyUpdater?.(amount);
}
