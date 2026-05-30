"use client";

import { COOKING_CONFIG } from "@/components/cooking/config";

export type FoodPanelStatus = "cooking" | "ready";

interface FoodResultPanelProps {
  status: FoodPanelStatus;
  imageUrl?: string | null;
}

/** 右侧：出锅料理展示 + 上菜按钮 */
export function FoodResultPanel({ status, imageUrl }: FoodResultPanelProps) {
  const { resultStage, font, colors } = COOKING_CONFIG;
  const isCooking = status === "cooking";

  return (
    <section
      className="cooking-result-panel cooking-food-panel order-pixel-panel relative flex flex-col"
      style={{
        width: resultStage.panelWidth,
        height: resultStage.panelHeight,
      }}
      aria-label="出锅料理"
    >
      <header
        className="cooking-result-panel__header order-pixel-text flex items-center gap-2"
        style={{ height: resultStage.headerHeight, fontSize: font.size }}
      >
        <span className="cooking-result-panel__badge" aria-hidden="true">
          菜
        </span>
        出锅料理
      </header>

      <div
        className="cooking-result-panel__body relative flex flex-1 flex-col"
        style={{ padding: resultStage.bodyPadding }}
      >
        <div
          className="cooking-food-stage order-pixel-panel relative flex flex-1 items-center justify-center overflow-hidden"
          style={{
            minHeight: resultStage.foodImageHeight,
            borderWidth: 2,
          }}
        >
          {isCooking ? (
            <p
              className="cooking-food-status order-pixel-text cooking-food-status--active"
              style={{ fontSize: font.size + 2, color: colors.text }}
            >
              烹饪中
              <span className="cooking-food-status__dots" aria-hidden="true">
                …
              </span>
            </p>
          ) : imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt="生成的料理"
              className="cooking-food-image max-h-full max-w-full object-contain"
              style={{ imageRendering: "pixelated" }}
            />
          ) : (
            <p
              className="cooking-food-status order-pixel-text opacity-70"
              style={{ fontSize: font.size, color: colors.text }}
            >
              料理已就绪
            </p>
          )}
        </div>

        <button
          type="button"
          className="cooking-serve-btn order-pixel-text absolute"
          style={{
            right: resultStage.bodyPadding,
            bottom: resultStage.bodyPadding,
            fontSize: font.size,
            opacity: isCooking ? 0.45 : 1,
          }}
          disabled={isCooking}
          aria-disabled={isCooking}
        >
          上菜
        </button>
      </div>
    </section>
  );
}
