/**
 * 游戏音频管理 Hook
 * 实现 BGM 循环、音效播放、音量控制
 *
 * 素材目录：
 * - BGM: public/assets/music/bgm/
 * - SFX: public/assets/music/sfx/
 */
import { useEffect, useRef } from "react";
import { AUDIO_PATHS } from "@/lib/assets/paths";

export function useGameAudio() {
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
    };
  }, []);

  const playBgm = (filename: string) => {
    const src = `${AUDIO_PATHS.bgm}/${filename}`;
    if (!bgmRef.current) {
      bgmRef.current = new Audio(src);
      bgmRef.current.loop = true;
      bgmRef.current.volume = 0.6;
    } else if (bgmRef.current.src !== new URL(src, window.location.href).href) {
      bgmRef.current.pause();
      bgmRef.current = new Audio(src);
      bgmRef.current.loop = true;
      bgmRef.current.volume = 0.6;
    }

    return bgmRef.current.play().catch(() => {
      // Some browsers require user interaction before audio playback.
      return Promise.resolve();
    });
  };

  const stopBgm = () => {
    if (bgmRef.current) {
      bgmRef.current.pause();
      bgmRef.current.currentTime = 0;
    }
  };

  const playSfx = (filename: string) => {
    const src = `${AUDIO_PATHS.sfx}/${filename}`;
    const sfx = new Audio(src);
    sfx.volume = 0.8;
    sfx.play().catch(() => {
      return Promise.resolve();
    });
  };

  return {
    playBgm,
    playSfx,
    stopBgm,
  };
}
