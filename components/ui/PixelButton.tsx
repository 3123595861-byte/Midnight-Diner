"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/** 像素风按钮：悬停变色/放大，点击位移 */
export function PixelButton({
  children,
  className,
  type = "button",
  ...props
}: PixelButtonProps) {
  return (
    <button type={type} className={cn("pixel-btn", className)} {...props}>
      {children}
    </button>
  );
}
