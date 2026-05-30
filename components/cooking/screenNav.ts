"use client";

type NavigateFn = () => void;

let navigateToCooking: NavigateFn | null = null;

export function registerCookingNavigator(fn: NavigateFn): void {
  navigateToCooking = fn;
}

export function unregisterCookingNavigator(): void {
  navigateToCooking = null;
}

export function navigateToCookingScreen(): void {
  navigateToCooking?.();
}
