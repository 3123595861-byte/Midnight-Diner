"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CONFIG } from "@/components/order/config";
import { useTypewriter } from "@/components/order/useTypewriter";

interface OrderDialogProps {
  pages: string[];
  currentPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  /** 当前页打字是否完成（用于控制翻页与开始烹饪） */
  onTypingComplete?: (complete: boolean) => void;
}

/** 顾客点单对话框（固定尺寸 + 翻页 + 打字机讲故事） */
export function OrderDialog({
  pages,
  currentPage,
  onPrevPage,
  onNextPage,
  onTypingComplete,
}: OrderDialogProps) {
  const { dialog, colors } = CONFIG;
  const isFirstPage = currentPage <= 0;
  const isLastPage = currentPage >= pages.length - 1;
  const text = pages[currentPage] ?? "";

  const prevPageRef = useRef(currentPage);
  const [typewriterEnabled, setTypewriterEnabled] = useState(true);

  useEffect(() => {
    if (currentPage > prevPageRef.current) {
      setTypewriterEnabled(true);
    } else if (currentPage < prevPageRef.current) {
      setTypewriterEnabled(false);
    }
    prevPageRef.current = currentPage;
  }, [currentPage]);

  const { displayedText, isComplete, showCursor } = useTypewriter(text, {
    enabled: typewriterEnabled,
    charDelayMs: CONFIG.dialog.typewriterCharDelayMs,
    punctuationDelayMs: CONFIG.dialog.typewriterPunctuationDelayMs,
  });

  useEffect(() => {
    onTypingComplete?.(isComplete);
  }, [isComplete, onTypingComplete]);

  const handleNextPage = useCallback(() => {
    if (!isComplete) return;
    onNextPage();
  }, [isComplete, onNextPage]);

  const arrowStyle = {
    bottom: dialog.padding,
    width: dialog.arrowSize,
    height: dialog.arrowSize,
  };

  const nextDisabled = isLastPage || !isComplete;

  return (
    <div
      className="order-pixel-panel absolute flex flex-col"
      style={{
        right: dialog.right,
        top: dialog.top,
        width: dialog.width,
        height: dialog.height,
        padding: dialog.padding,
        borderWidth: dialog.borderWidth,
      }}
    >
      <div
        className="order-pixel-text flex-1 overflow-hidden text-left whitespace-pre-wrap"
        style={{
          lineHeight: `${dialog.lineHeight}px`,
          fontSize: dialog.fontSize,
          maxHeight: dialog.height - dialog.padding * 2 - dialog.arrowSize,
        }}
      >
        {displayedText}
        {showCursor && (
          <span className="order-typewriter-cursor" aria-hidden="true">
            |
          </span>
        )}
      </div>

      <button
        type="button"
        className="order-page-arrow order-page-arrow--prev absolute"
        aria-label="上一页"
        disabled={isFirstPage}
        onClick={onPrevPage}
        style={{
          ...arrowStyle,
          left: dialog.padding,
          color: isFirstPage ? colors.disabled : colors.text,
          borderColor: isFirstPage ? colors.disabled : colors.border,
        }}
      />

      <button
        type="button"
        className="order-page-arrow order-page-arrow--next absolute"
        aria-label="下一页"
        disabled={nextDisabled}
        onClick={handleNextPage}
        style={{
          ...arrowStyle,
          right: dialog.padding,
          color: nextDisabled ? colors.disabled : colors.text,
          borderColor: nextDisabled ? colors.disabled : colors.border,
        }}
      />
    </div>
  );
}
