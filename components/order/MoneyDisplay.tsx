"use client";

import { CONFIG } from "@/components/order/config";

interface MoneyDisplayProps {
  amount: number;
  day: number;
  animating: boolean;
}

/** 左上角金额显示 */
export function MoneyDisplay({ amount, day, animating }: MoneyDisplayProps) {
  const { money, colors, font } = CONFIG;

  return (
    <div
      className="order-pixel-panel absolute flex flex-col gap-1"
      style={{
        left: money.left,
        top: money.top,
        padding: `${money.paddingY}px ${money.paddingX}px`,
        borderWidth: money.borderWidth,
      }}
    >
      <p
        className="order-pixel-text m-0 whitespace-nowrap"
        style={{ fontSize: money.fontSize, fontFamily: font.family }}
      >
        第 {day} 天
      </p>
      <p
        className={`order-pixel-text m-0 whitespace-nowrap ${animating ? "order-money-bump" : ""}`}
        style={{ fontSize: money.fontSize, fontFamily: font.family }}
      >
        <span aria-hidden="true">💰 </span>
        金额:{" "}
        <span
          className="font-bold"
          style={{ fontSize: money.amountFontSize, color: colors.text }}
        >
          {amount}
        </span>{" "}
        元
      </p>
    </div>
  );
}
