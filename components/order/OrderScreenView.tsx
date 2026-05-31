"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CONFIG } from "@/components/order/config";
import { loadGuestOrder, prefetchNextGuestOrder } from "@/components/order/guestPrefetch";
import { clearCurrentGuest, setCurrentGuest } from "@/components/order/guestStore";
import { rememberGuestId } from "@/components/order/guestSession";
import { goToCookingPage } from "@/components/order/goToCookingPage";
import {
  registerMoneyUpdater,
  unregisterMoneyUpdater,
} from "@/components/order/moneyStore";
import { paginateText } from "@/components/order/paginateText";
import { setOrderBackgroundUrl } from "@/components/serving/servingSession";
import { MoneyDisplay } from "@/components/order/MoneyDisplay";
import { OrderDialog } from "@/components/order/OrderDialog";
import { StartCookButton } from "@/components/order/StartCookButton";
import { useUIScale } from "@/components/order/useUIScale";

interface OrderScreenProps {
  visible: boolean;
}

/** 随机选取一张餐厅背景图 */
function pickRandomBackground(): string {
  const urls = CONFIG.backgroundUrls;
  return urls[Math.floor(Math.random() * urls.length)] ?? urls[0];
}

/**
 * 界面1：顾客点单
 * - 随机像素背景
 * - 金额 / 对话框 / 开始烹饪按钮
 */
export function OrderScreenView({ visible }: OrderScreenProps) {
  const scale = useUIScale();
  const [backgroundUrl] = useState(() => {
    const url = pickRandomBackground();
    setOrderBackgroundUrl(url);
    return url;
  });
  const [money, setMoney] = useState<number>(CONFIG.money.initial);
  const [moneyAnimating, setMoneyAnimating] = useState(false);
  const [pages, setPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [fadePhase, setFadePhase] = useState<"in" | "out" | "idle">("in");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [typingComplete, setTypingComplete] = useState(false);

  const isLastPage = pages.length > 0 && currentPage >= pages.length - 1;
  const cookEnabled =
    isLastPage && !loading && !loadError && typingComplete;

  const handleTypingComplete = useCallback((complete: boolean) => {
    setTypingComplete(complete);
  }, []);

  /** 顾客进店：从 GET /api/guest 加载故事并分页展示 */
  useEffect(() => {
    if (!visible) return;

    let cancelled = false;
    setLoading(true);
    setLoadError(null);
    setPages([]);
    setCurrentPage(0);
    setTypingComplete(false);
    setFadePhase("in");

    loadGuestOrder()
      .then(({ guest, storyPages }) => {
        if (cancelled) return;
        rememberGuestId(guest.guest_id, CONFIG.guest.recentExcludeCount);
        setCurrentGuest(guest);
        setPages(paginateText(storyPages));
        setLoading(false);
        prefetchNextGuestOrder();
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        clearCurrentGuest();
        setLoadError(
          error instanceof Error ? error.message : "客人故事加载失败",
        );
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [visible]);

  /** 注册全局 updateMoney */
  const handleMoneyUpdate = useCallback((delta: number) => {
    setMoneyAnimating(true);
    setMoney((prev) => prev + delta);
    window.setTimeout(() => setMoneyAnimating(false), 350);
  }, []);

  useEffect(() => {
    if (!visible) return;
    registerMoneyUpdater(handleMoneyUpdate);
    return () => unregisterMoneyUpdater();
  }, [visible, handleMoneyUpdate]);

  const handleNextPage = useCallback(() => {
    setTypingComplete(false);
    setCurrentPage((p) => Math.min(p + 1, pages.length - 1));
  }, [pages.length]);

  const handlePrevPage = useCallback(() => {
    setTypingComplete(true);
    setCurrentPage((p) => Math.max(p - 1, 0));
  }, []);

  const handleStartCook = useCallback(() => {
    if (!cookEnabled) return;
    setOrderBackgroundUrl(backgroundUrl);
    setFadePhase("out");
    window.setTimeout(() => {
      goToCookingPage();
      setFadePhase("idle");
    }, CONFIG.fadeDuration);
  }, [backgroundUrl, cookEnabled]);

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

  return (
    <div
      id="screen-1"
      className={`order-screen-root absolute inset-0 overflow-hidden bg-black ${
        fadePhase === "out" ? "order-fade-out" : fadePhase === "in" ? "order-fade-in" : ""
      }`}
      aria-hidden={!visible}
    >
      {/* 背景层：cover 居中裁剪 */}
      <div
        className="absolute inset-0 bg-black bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          imageRendering: "pixelated",
        }}
        role="img"
        aria-label="深夜食堂营业场景"
      />

      {/* UI 层：按设计稿缩放 */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={wrapperStyle}
      >
        <div className="relative" style={uiStyle}>
          <MoneyDisplay
            amount={money}
            day={CONFIG.money.initialDay}
            animating={moneyAnimating}
          />

          {!loading && pages.length > 0 && (
            <OrderDialog
              pages={pages}
              currentPage={currentPage}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
              onTypingComplete={handleTypingComplete}
            />
          )}

          {(loading || loadError) && (
            <div
              className="order-pixel-panel order-pixel-text absolute"
              style={{
                right: CONFIG.dialog.right,
                top: CONFIG.dialog.top,
                width: CONFIG.dialog.width,
                height: CONFIG.dialog.height,
                padding: CONFIG.dialog.padding,
                borderWidth: CONFIG.dialog.borderWidth,
                fontSize: CONFIG.font.size,
              }}
            >
              {loading ? "倾听顾客故事中..." : loadError}
            </div>
          )}

          <StartCookButton
            enabled={cookEnabled}
            pulsing={cookEnabled}
            onClick={handleStartCook}
          />
        </div>
      </div>
    </div>
  );
}
