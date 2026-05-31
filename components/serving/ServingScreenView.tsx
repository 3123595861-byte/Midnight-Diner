"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    if (!visible) return;
    setPayload(resolvePayload());
    setPhase("chef");
    clearPendingChefMessage();
  }, [visible]);

  const handleChefNext = useCallback(() => {
    setPhase("customer");
  }, []);

  const handleCustomerNext = useCallback(() => {
    setPhase("ready");
  }, []);

  const handleSettlementClose = useCallback(() => {
    if (payload) {
      updateMoney(payload.settlement.net_change);
    }
    clearServingPayload();
    navigateToOrderScreen();
  }, [payload]);

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

  if (!visible || !payload) return null;

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
            <SettlementNavButton onClick={() => setPhase("settlement")} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
