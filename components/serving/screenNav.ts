"use client";

type NavigateFn = () => void;

let navigateToServing: NavigateFn | null = null;

export function registerServingNavigator(fn: NavigateFn): void {
  navigateToServing = fn;
}

export function unregisterServingNavigator(): void {
  navigateToServing = null;
}

export function navigateToServingScreen(): void {
  navigateToServing?.();
}
