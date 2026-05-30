"use client";

import { COOKING_CONFIG } from "@/components/cooking/config";

interface StartCookingButtonProps {
  enabled: boolean;
  onClick: () => void;
}

/** 选料面板底部 — 开始烹饪 */
export function StartCookingButton({
  enabled,
  onClick,
}: StartCookingButtonProps) {
  const { startCookButton, colors } = COOKING_CONFIG;

  return (
    <button
      type="button"
      disabled={!enabled}
      onClick={onClick}
      className={[
        "cooking-start-btn order-pixel-text w-full shrink-0",
        enabled ? "cooking-start-btn--enabled" : "cooking-start-btn--disabled",
      ].join(" ")}
      style={{
        marginTop: startCookButton.marginTop,
        padding: `${startCookButton.paddingY}px ${startCookButton.paddingX}px`,
        fontSize: startCookButton.fontSize,
        color: enabled ? colors.text : colors.disabled,
        borderColor: enabled ? colors.border : colors.disabled,
      }}
    >
      开始烹饪
    </button>
  );
}
