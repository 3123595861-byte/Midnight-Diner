"use client";

import { useCallback, useEffect, useState } from "react";
import { SERVING_CONFIG } from "@/components/serving/config";
import { useTypewriter } from "@/components/order/useTypewriter";

interface DialogueBoxProps {
  speaker: string;
  text: string;
  /** 玩家点击「下一步」后触发 */
  onNext: () => void;
}

/** RPG 风格底部对话框 + 打字机；打完后点「下一步」继续 */
export function DialogueBox({ speaker, text, onNext }: DialogueBoxProps) {
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    setSkipped(false);
  }, [text, speaker]);

  const { displayedText, isComplete, showCursor } = useTypewriter(text, {
    enabled: !skipped,
    charDelayMs: SERVING_CONFIG.typewriterCharDelayMs,
  });

  const fullyShown = skipped || isComplete;

  const handleSkip = useCallback(() => {
    if (!fullyShown) setSkipped(true);
  }, [fullyShown]);

  return (
    <div
      className="serving-dialogue-wrap absolute"
      style={{
        left: SERVING_CONFIG.dialogue.left,
        right: SERVING_CONFIG.dialogue.right,
        bottom: SERVING_CONFIG.dialogue.bottom,
      }}
    >
      <button
        type="button"
        className="serving-dialogue-box w-full text-left"
        style={{
          minHeight: SERVING_CONFIG.dialogue.minHeight,
          padding: SERVING_CONFIG.dialogue.padding,
        }}
        onClick={handleSkip}
        aria-live="polite"
      >
        <p className="serving-dialogue-speaker">{speaker}</p>
        <p className="serving-dialogue-text">
          {skipped ? text : displayedText}
          {showCursor && !skipped ? (
            <span className="serving-dialogue-cursor" aria-hidden="true">
              ▌
            </span>
          ) : null}
        </p>
        {!fullyShown ? (
          <p className="serving-dialogue-hint">点击跳过打字</p>
        ) : null}
      </button>

      {fullyShown ? (
        <button
          type="button"
          className="serving-dialogue-next"
          onClick={onNext}
        >
          下一步
          <span className="serving-dialogue-next__arrow" aria-hidden="true">
            ➔
          </span>
        </button>
      ) : null}
    </div>
  );
}
