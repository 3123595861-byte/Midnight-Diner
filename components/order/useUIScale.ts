"use client";

import { useEffect, useState } from "react";
import { CONFIG } from "@/components/order/config";

/** 根据视口相对设计稿计算 UI 缩放比 */
export function useUIScale(): number {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function update() {
      const sx = window.innerWidth / CONFIG.designWidth;
      const sy = window.innerHeight / CONFIG.designHeight;
      setScale(Math.min(sx, sy, 1.5));
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return scale;
}
