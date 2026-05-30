import type { GamePhase } from "@/lib/types/game";

interface SettlementModalProps {
  phase: GamePhase;
}

/**
 * 结算弹窗：星级、食材成本、获得报酬、资金变化
 * TODO: Phase 2 在 phase === Settlement 时展示
 */
export function SettlementModal(_props: SettlementModalProps) {
  return (
    <div data-testid="settlement-modal" hidden>
      {/* TODO: 0–5 星展示 */}
      {/* TODO: 收支明细 */}
      {/* TODO: 继续 / 下一位客人 按钮 */}
    </div>
  );
}
