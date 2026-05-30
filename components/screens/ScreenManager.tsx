"use client";

import { useState } from "react";
import { StartScreen } from "@/components/screens/StartScreen";
import { OrderScreen } from "@/components/screens/OrderScreen";

export type AppScreen = 0 | 1;

/**
 * 双界面容器：界面0（开始）↔ 界面1（顾客点单）
 * 通过 display 显示/隐藏切换，默认界面0
 */
export function ScreenManager() {
  const [screen, setScreen] = useState<AppScreen>(0);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <StartScreen
        visible={screen === 0}
        onStart={() => setScreen(1)}
      />
      <OrderScreen visible={screen === 1} />
    </div>
  );
}
