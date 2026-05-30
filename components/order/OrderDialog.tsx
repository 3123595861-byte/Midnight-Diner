"use client";

import { CONFIG } from "@/components/order/config";

interface OrderDialogProps {
  pages: string[];
  currentPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

/** 顾客点单对话框（固定尺寸 + 翻页） */
export function OrderDialog({
  pages,
  currentPage,
  onPrevPage,
  onNextPage,
}: OrderDialogProps) {
  const { dialog, colors } = CONFIG;
  const isFirstPage = currentPage <= 0;
  const isLastPage = currentPage >= pages.length - 1;
  const text = pages[currentPage] ?? "";

  const arrowStyle = {
    bottom: dialog.padding,
    width: dialog.arrowSize,
    height: dialog.arrowSize,
  };

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
      {/* 文字展示区：超出隐藏 */}
      <div
        className="order-pixel-text flex-1 overflow-hidden text-left"
        style={{
          lineHeight: `${dialog.lineHeight}px`,
          fontSize: dialog.fontSize,
          maxHeight: dialog.height - dialog.padding * 2 - dialog.arrowSize,
        }}
      >
        {text}
      </div>

      {/* 上一页 */}
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

      {/* 下一页 */}
      <button
        type="button"
        className="order-page-arrow order-page-arrow--next absolute"
        aria-label="下一页"
        disabled={isLastPage}
        onClick={onNextPage}
        style={{
          ...arrowStyle,
          right: dialog.padding,
          color: isLastPage ? colors.disabled : colors.text,
          borderColor: isLastPage ? colors.disabled : colors.border,
        }}
      />
    </div>
  );
}
