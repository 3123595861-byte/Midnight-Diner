import type { GamePhase } from "@/lib/types/game";

interface OperationPanelProps {
  phase: GamePhase;
}

/**
 * 底部操作区：食材 Tabs、厨具 Tabs、已选列表、烹饪按钮
 * TODO: Phase 1 实现 Grid 布局与 shadcn Tabs
 * TODO: Phase 2 实现选料交互
 */
export function OperationPanel(_props: OperationPanelProps) {
  return (
    <footer data-testid="operation-panel">
      {/* TODO: 食材分类 Tabs @see lib/data/mock MOCK_INGREDIENTS */}
      {/* TODO: 厨具 Tabs @see lib/data/mock MOCK_UTENSILS */}
      {/* TODO: 已选食材列表 */}
      {/* TODO: 【开始烹饪】按钮 */}
    </footer>
  );
}
