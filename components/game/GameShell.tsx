"use client";

import { HeaderBar } from "@/components/game/HeaderBar";
import { SceneArea } from "@/components/game/SceneArea";
import { OperationPanel } from "@/components/game/OperationPanel";
import { SettlementModal } from "@/components/game/SettlementModal";
import { useGameState } from "@/hooks/useGameState";

/**
 * 游戏主容器
 * 布局：Header → 场景区（对角线构图）→ 底部操作区
 *
 * TODO: Phase 1 实现静态布局与像素风样式
 * TODO: Phase 2 接入状态机与各子组件交互
 */
export function GameShell() {
  const { state } = useGameState();

  return (
    <main className="flex min-h-screen flex-col">
      <HeaderBar
        currentDay={state.currentDay}
        money={state.money}
        reputation={state.reputation}
      />

      <SceneArea phase={state.phase} guestStory={state.guestStory} />

      <OperationPanel phase={state.phase} />

      <SettlementModal phase={state.phase} />
    </main>
  );
}
