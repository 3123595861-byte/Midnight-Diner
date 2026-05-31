"use client";

import { COOKING_CONFIG } from "@/components/cooking/config";

export type FoodPanelStatus = "cooking" | "ready";

interface FoodResultPanelProps {
  status: FoodPanelStatus;
  imageUrl?: string | null;
  foodName?: string | null;
  onServe?: () => void;
}

/** 右侧：出锅料理展示 + 菜名 + 上菜按钮 */
export function FoodResultPanel({
  status,
  imageUrl,
  foodName,
  onServe,
}: FoodResultPanelProps) {
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
        {/* 上半部分：专门用来展示图片的框，腾出了底部空间 */}
        <div
          className="cooking-food-stage order-pixel-panel relative flex flex-1 items-center justify-center overflow-hidden mb-4"
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
            <div className="flex h-full w-full items-center justify-center p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={foodName || "生成的料理"}
                className="cooking-food-image max-h-full max-w-full object-contain"
                style={{
                  imageRendering: "pixelated",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          ) : (
            <p
              className="cooking-food-status order-pixel-text opacity-70"
              style={{ fontSize: font.size, color: colors.text }}
            >
              料理已就绪
            </p>
          )}
        </div>

        {/* 下半部分：底部信息与操作栏 */}
        <div className="flex items-center justify-between shrink-0">
          
          {/* 左下角：预留的菜名展示位置 */}
          <div 
            className="order-pixel-text font-bold truncate flex-1 mr-4"
            style={{ fontSize: font.size + 2, color: colors.text }}
          >
            {isCooking ? "未知料理..." : `【 ${foodName || "神秘料理"} 】`}
          </div>

          {/* 右下角：上菜按钮 (移除了原本的 absolute 定位) */}
          <button
            type="button"
            className="cooking-serve-btn order-pixel-text px-6 py-2 shrink-0 border-2 border-black bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            style={{
              fontSize: font.size,
            }}
            disabled={isCooking}
            aria-disabled={isCooking}
            onClick={onServe}
          >
            上菜 ➔
          </button>
        </div>
      </div>
    </section>
  );
}