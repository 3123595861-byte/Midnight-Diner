"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CONFIG } from "@/components/order/config";
import { useUIScale } from "@/components/order/useUIScale";
import { DialogueBox } from "@/components/serving/DialogueBox";
import {
  SettlementNavButton,
  SettlementOverlay,
} from "@/components/serving/SettlementOverlay";
import { updateMoney } from "@/components/order/moneyStore";
import { navigateToOrderScreen } from "@/components/order/screenNav";
import {
  clearPendingChefMessage,
  clearServingPayload,
  getPendingChefMessage,
  getServingPayload,
  type ServingSessionPayload,
} from "@/components/serving/servingSession";
// 👇 正确引入刚才在全局导出的推进函数
import { advanceToNextGuest } from "@/components/order/guestStore";

interface ServingScreenViewProps {
  visible: boolean;
}

type DialoguePhase = "chef" | "customer" | "ready" | "settlement";

function resolvePayload(): ServingSessionPayload | null {
  const raw = getServingPayload();
  if (!raw) return null;

  const chefMessage =
    raw.chefMessage.trim() || getPendingChefMessage().trim();
  return { ...raw, chefMessage };
}

/**
 * 界面3：上菜后对话
 * 厨师寄语 → 点下一步 → 顾客评价 → 点下一步 → 对话框消失 → 今日结算
 */
export function ServingScreenView({ visible }: ServingScreenViewProps) {
  const scale = useUIScale();
  const [payload, setPayload] = useState<ServingSessionPayload | null>(null);
  const [phase, setPhase] = useState<DialoguePhase>("chef");
  const moneyAppliedRef = useRef(false);

  useEffect(() => {
    if (!visible) {
      moneyAppliedRef.current = false;
      return;
    }

    setPayload(resolvePayload());
    setPhase("chef");
    clearPendingChefMessage();
  }, [visible]);

  const applySettlementMoney = useCallback(() => {
    if (!payload || moneyAppliedRef.current) return;
    updateMoney(payload.settlement.net_change);
    moneyAppliedRef.current = true;
  }, [payload]);

  const handleChefNext = useCallback(() => {
    setPhase("customer");
  }, []);

  const handleCustomerNext = useCallback(() => {
    setPhase("ready");
  }, []);

  const handleOpenSettlement = useCallback(() => {
    applySettlementMoney();
    setPhase("settlement");
  }, [applySettlementMoney]);

  const handleSettlementClose = useCallback(() => {
    applySettlementMoney();
    clearServingPayload();
    
    // 👇 关键修复点：点击继续经营时，在这里正式调用推进函数
    if (typeof advanceToNextGuest === "function") {
      advanceToNextGuest();
    }

    navigateToOrderScreen();
  }, [applySettlementMoney]);

  const uiStyle = useMemo(
    () => ({
      width: CONFIG.designWidth,
      height: CONFIG.designHeight,
      transform: `scale(${scale})`,
      transformOrigin: "top left" as const,
    }),
    [scale],
  );

  const wrapperStyle = useMemo(
    () => ({
      width: CONFIG.designWidth * scale,
      height: CONFIG.designHeight * scale,
    }),
    [scale],
  );

  if (!visible) return null;

  if (!payload) {
    return (
      <div
        id="screen-3"
        className="serving-screen-root order-fade-in absolute inset-0 flex items-center justify-center bg-black"
        aria-hidden={!visible}
      >
        <div className="order-pixel-panel order-pixel-text p-6 text-center">
          <p className="mb-4">结算数据丢失，请从上菜流程重新进入。</p>
          <button
            type="button"
            className="serving-settlement-close"
            onClick={() => navigateToOrderScreen()}
          >
            返回点单
          </button>
        </div>
      </div>
    );
  }

  const chefText =
    payload.chefMessage.trim() || "（厨师默默把菜端了上去……）";
  const customerText =
    payload.customerEvaluation.trim() || "……还不错。";

  return (
    <div
      id="screen-3"
      className="serving-screen-root order-fade-in absolute inset-0 overflow-hidden bg-black"
      aria-hidden={!visible}
    >
      <div
        className="absolute inset-0 bg-black bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${payload.backgroundUrl})`,
          imageRendering: "pixelated",
        }}
        role="img"
        aria-label="深夜食堂"
      />

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={wrapperStyle}
      >
        <div className="relative h-full w-full" style={uiStyle}>
          {phase === "settlement" ? (
            <SettlementOverlay
              payload={payload}
              onClose={handleSettlementClose}
            />
          ) : null}

          {phase === "chef" ? (
            <DialogueBox
              key="chef-line"
              speaker="厨师"
              text={chefText}
              onNext={handleChefNext}
            />
          ) : null}

          {phase === "customer" ? (
            <DialogueBox
              key="customer-line"
              speaker="顾客"
              text={customerText}
              onNext={handleCustomerNext}
            />
          ) : null}

          {phase === "ready" ? (
            <SettlementNavButton onClick={handleOpenSettlement} />
          ) : null}
        </div>
      </div>
    </div>
  );
}