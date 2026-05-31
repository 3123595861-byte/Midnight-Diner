"use client";

import { useEffect, useState } from "react";
import {
  registerCookingNavigator,
  unregisterCookingNavigator,
} from "@/components/cooking/screenNav";
import {
  registerOrderNavigator,
  unregisterOrderNavigator,
} from "@/components/order/screenNav";
import {
  registerServingNavigator,
  unregisterServingNavigator,
} from "@/components/serving/screenNav";
import { CookingScreen } from "@/components/screens/CookingScreen";
import { ServingScreen } from "@/components/screens/ServingScreen";
import { StartScreen } from "@/components/screens/StartScreen";
import { OrderScreen } from "@/components/screens/OrderScreen";
import { prefetchGuestOrder } from "@/components/order/guestPrefetch";
import { setCurrentMoney } from "@/components/order/moneyStore";
import { INITIAL_MONEY } from "@/lib/constants/game";

export type AppScreen = 0 | 1 | 2 | 3;

/**
 * 界面0（开始）→ 界面1（点单）→ 界面2（烹饪）→ 界面3（上菜对话/结算）
 */
export function ScreenManager() {
  const [screen, setScreen] = useState<AppScreen>(0);

  useEffect(() => {
    prefetchGuestOrder();
  }, []);

  useEffect(() => {
    registerCookingNavigator(() => setScreen(2));
    return () => unregisterCookingNavigator();
  }, []);

  useEffect(() => {
    registerServingNavigator(() => setScreen(3));
    return () => unregisterServingNavigator();
  }, []);

  useEffect(() => {
    registerOrderNavigator(() => setScreen(1));
    return () => unregisterOrderNavigator();
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <StartScreen
        visible={screen === 0}
        onStart={() => {
          setCurrentMoney(INITIAL_MONEY);
          setScreen(1);
        }}
      />
      <OrderScreen visible={screen === 1} />
      <CookingScreen visible={screen === 2} />
      <ServingScreen visible={screen === 3} />
    </div>
  );
}
