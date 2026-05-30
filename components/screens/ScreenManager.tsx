"use client";

import { useEffect, useState } from "react";
import {
  registerCookingNavigator,
  unregisterCookingNavigator,
} from "@/components/cooking/screenNav";
import { CookingScreen } from "@/components/screens/CookingScreen";
import { StartScreen } from "@/components/screens/StartScreen";
import { OrderScreen } from "@/components/screens/OrderScreen";

export type AppScreen = 0 | 1 | 2;

/**
 * 界面0（开始）→ 界面1（点单）→ 界面2（烹饪选料）
 */
export function ScreenManager() {
  const [screen, setScreen] = useState<AppScreen>(0);

  useEffect(() => {
    registerCookingNavigator(() => setScreen(2));
    return () => unregisterCookingNavigator();
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <StartScreen
        visible={screen === 0}
        onStart={() => setScreen(1)}
      />
      <OrderScreen visible={screen === 1} />
      <CookingScreen visible={screen === 2} />
    </div>
  );
}
