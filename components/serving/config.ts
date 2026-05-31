export const SERVING_CONFIG = {
  designWidth: 1280,
  designHeight: 720,

  /** 打字机速度 (ms/字) */
  typewriterCharDelayMs: 50,

  dialogue: {
    bottom: 48,
    left: 48,
    right: 48,
    minHeight: 140,
    padding: 20,
  },

  settlementButton: {
    bottom: 12,
    right: 48,
  },
} as const;
