"use client";

import { CONFIG } from "@/components/order/config";

interface StartCookButtonProps {
  enabled: boolean;
  pulsing: boolean;
  onClick: () => void;
}

/** 开始烹饪按钮（向右箭头造型） */
export function StartCookButton({
  enabled,
  pulsing,
  onClick,
}: StartCookButtonProps) {
  const { cookButton, dialog } = CONFIG;
  const top =
    dialog.top + dialog.height + cookButton.gapBelowDialog;

  return (
    <button
      type="button"
      disabled={!enabled}
      onClick={onClick}
      className={[
        "order-cook-btn absolute",
        enabled ? "order-cook-btn--enabled" : "order-cook-btn--disabled",
        pulsing ? "order-cook-btn--pulse" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        top,
        right: cookButton.right,
        padding: `${cookButton.paddingY}px ${cookButton.paddingX}px`,
        paddingRight: cookButton.paddingX + cookButton.arrowTipWidth,
        fontSize: cookButton.fontSize,
        borderWidth: cookButton.borderWidth,
        ["--arrow-tip" as string]: `${cookButton.arrowTipWidth}px`,
      }}
    >
      开始烹饪
    </button>
  );
}
