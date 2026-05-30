/**
 * 游戏音频管理 Hook
 * TODO: 实现 BGM 循环、音效播放、音量控制
 *
 * 素材目录：
 * - BGM: public/assets/music/bgm/
 * - SFX: public/assets/music/sfx/
 */
export function useGameAudio() {
  return {
    playBgm: (_filename: string) => {
      /* TODO */
    },
    playSfx: (_filename: string) => {
      /* TODO */
    },
    stopBgm: () => {
      /* TODO */
    },
  };
}
