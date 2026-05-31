"use client";

type NavigateFn = () => void;

let navigateToOrder: NavigateFn | null = null;

export function registerOrderNavigator(fn: NavigateFn): void {
  navigateToOrder = fn;
}

export function unregisterOrderNavigator(): void {
  navigateToOrder = null;
}

export function navigateToOrderScreen(): void {
  navigateToOrder?.();
}
