"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";

export interface UseTypewriterOptions {
  /** 为 false 时立即显示全文（如翻回上一页） */
  enabled: boolean;
  charDelayMs?: number;
  punctuationDelayMs?: number;
}

export interface UseTypewriterResult {
  displayedText: string;
  isComplete: boolean;
  showCursor: boolean;
}

const PUNCTUATION_RE = /[。！？，、；：…]/;

/**
 * 逐字显示文本，营造讲故事的打字机效果
 */
export function useTypewriter(
  text: string,
  options: UseTypewriterOptions,
): UseTypewriterResult {
  const {
    enabled,
    charDelayMs = 55,
    punctuationDelayMs = charDelayMs * 3,
  } = options;

  const chars = useMemo(() => Array.from(text), [text]);
  const [visibleCount, setVisibleCount] = useState(0);

  useLayoutEffect(() => {
    if (!enabled) {
      setVisibleCount(chars.length);
      return;
    }
    setVisibleCount(0);
  }, [enabled, text, chars.length]);

  useEffect(() => {
    if (!enabled || visibleCount >= chars.length) return;

    const currentChar = chars[visibleCount] ?? "";
    const delay = PUNCTUATION_RE.test(currentChar)
      ? punctuationDelayMs
      : charDelayMs;

    const timer = window.setTimeout(() => {
      setVisibleCount((count) => count + 1);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [
    enabled,
    visibleCount,
    chars,
    charDelayMs,
    punctuationDelayMs,
  ]);

  const isComplete = !enabled || visibleCount >= chars.length;

  return {
    displayedText: enabled
      ? chars.slice(0, visibleCount).join("")
      : chars.join(""),
    isComplete,
    showCursor: enabled && !isComplete,
  };
}
