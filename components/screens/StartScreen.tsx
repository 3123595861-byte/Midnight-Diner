"use client";

import { useEffect } from "react";
import { PixelButton } from "@/components/ui/PixelButton";
import { prefetchGuestOrder } from "@/components/order/guestPrefetch";

interface StartScreenProps {
  visible: boolean;
  onStart: () => void;
}

/** 界面0：开始页面 */
export function StartScreen({ visible, onStart }: StartScreenProps) {
  useEffect(() => {
    if (!visible) return;
    prefetchGuestOrder();
  }, [visible]);

  return (
    <div
      id="screen-0"
      className="screen-layer"
      style={{ display: visible ? "flex" : "none" }}
      aria-hidden={!visible}
    >
      <div
        className="screen-bg"
        style={{ backgroundImage: "url(/image.png)" }}
        role="img"
        aria-label="深夜食堂开始画面"
      />

      <div className="screen-content">
        <h1 className="game-title">
          <span className="game-title-text">深夜食堂</span>
          <span className="game-title-line" aria-hidden="true" />
        </h1>
        <PixelButton onClick={onStart}>开始游戏</PixelButton>
      </div>
    </div>
  );
}
