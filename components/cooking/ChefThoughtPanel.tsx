"use client";

import { COOKING_CONFIG } from "@/components/cooking/config";

interface ChefThoughtPanelProps {
  value: string;
  onChange: (value: string) => void;
}

/** 左侧：厨师心里话（思考框） */
export function ChefThoughtPanel({ value, onChange }: ChefThoughtPanelProps) {
  const { resultStage, chefThoughtPrompt, font, colors } = COOKING_CONFIG;

  return (
    <section
      className="cooking-result-panel cooking-thought-panel order-pixel-panel flex flex-col"
      style={{
        width: resultStage.panelWidth,
        height: resultStage.panelHeight,
      }}
      aria-label="厨师心里话"
    >
      <header
        className="cooking-result-panel__header order-pixel-text flex items-center gap-2"
        style={{ height: resultStage.headerHeight, fontSize: font.size }}
      >
        <span className="cooking-result-panel__badge" aria-hidden="true">
          思
        </span>
        厨师心里话
      </header>

      <div
        className="cooking-result-panel__body flex flex-1 flex-col"
        style={{ padding: resultStage.bodyPadding }}
      >
        <p
          className="cooking-thought-prompt order-pixel-text mb-3 shrink-0"
          style={{ fontSize: font.size, color: colors.text, lineHeight: 1.65 }}
        >
          {chefThoughtPrompt}
        </p>

        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="在这里写下想对顾客说的话……"
          className="cooking-thought-input order-pixel-text flex-1 resize-none"
          style={{ fontSize: font.size, color: colors.text }}
          aria-label="想对顾客说的话"
        />
      </div>
    </section>
  );
}
