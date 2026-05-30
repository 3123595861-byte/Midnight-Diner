import type { GamePhase } from "@/lib/types/game";

interface SceneAreaProps {
  phase: GamePhase;
  guestStory: string | null;
}

/**
 * 主视区：接待台、主角（左下）、客人（右上）、食物展示位（中央）
 * TODO: Phase 1 实现对角线构图与素材挂载（characters / scenes）
 */
export function SceneArea(_props: SceneAreaProps) {
  return (
    <section data-testid="scene-area">
      {/* TODO: 场景背景 @see public/assets/scenes/ */}
      {/* TODO: 主角精灵 @see public/assets/characters/ */}
      {/* TODO: 客人精灵 + 对话气泡 */}
      {/* TODO: 食物展示位（AI 生成图或占位） */}
      {/* TODO: 烹饪中 Loading 动画（魔性颠勺） */}
    </section>
  );
}
