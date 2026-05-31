"use client";

import type { ServingSessionPayload } from "@/components/serving/servingSession";
import { SERVING_CONFIG } from "@/components/serving/config";

interface SettlementOverlayProps {
  payload: ServingSessionPayload;
  onClose?: () => void;
}

/** 今日结算面板（覆盖在主画面上方） */
export function SettlementOverlay({ payload, onClose }: SettlementOverlayProps) {
  const { settlement, starRating, chefMessage } = payload;
  const messageCount = chefMessage.trim() ? 1 : 0;

  return (
    <div className="serving-settlement-backdrop absolute inset-0 flex items-center justify-center">
      <div className="serving-settlement-panel">
        <h2 className="serving-settlement-title">今日结算</h2>
        <ul className="serving-settlement-list">
          <li>
            <span>今日寄语数</span>
            <span>{messageCount}</span>
          </li>
          <li>
            <span>顾客满意度</span>
            <span>{starRating} 星</span>
          </li>
          <li>
            <span>料理名称</span>
            <span>{payload.foodName}</span>
          </li>
          <li>
            <span>食材成本</span>
            <span>-{settlement.ingredient_cost} 元</span>
          </li>
          <li>
            <span>顾客付账</span>
            <span>+{settlement.payment_received} 元</span>
          </li>
          {settlement.poison_penalty > 0 ? (
            <li>
              <span>医药费</span>
              <span>-{settlement.poison_penalty} 元</span>
            </li>
          ) : null}
          <li className="serving-settlement-highlight">
            <span>本单净收益</span>
            <span>
              {settlement.net_change >= 0 ? "+" : ""}
              {settlement.net_change} 元
            </span>
          </li>
          <li>
            <span>剩余资金</span>
            <span>{settlement.remaining_money} 元</span>
          </li>
        </ul>
        {settlement.is_bankrupt ? (
          <p className="serving-settlement-warn">资金耗尽，食堂面临破产……</p>
        ) : null}
        {onClose ? (
          <button type="button" className="serving-settlement-close" onClick={onClose}>
            继续经营
          </button>
        ) : null}
      </div>
    </div>
  );
}

interface SettlementNavButtonProps {
  onClick: () => void;
}

/** 对话结束后：箭头 + 「今日结算」 */
export function SettlementNavButton({ onClick }: SettlementNavButtonProps) {
  return (
    <button
      type="button"
      className="serving-settlement-nav absolute"
      style={{
        right: SERVING_CONFIG.settlementButton.right,
        bottom: SERVING_CONFIG.settlementButton.bottom,
      }}
      onClick={onClick}
    >
      <span className="serving-settlement-nav__arrow" aria-hidden="true">
        ➔
      </span>
      今日结算
    </button>
  );
}
