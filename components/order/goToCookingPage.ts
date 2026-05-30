import { navigateToCookingScreen } from "@/components/cooking/screenNav";

/**
 * 进入烹饪选料界面（由 ScreenManager 注册导航）
 */
export function goToCookingPage(): void {
  navigateToCookingScreen();
}
