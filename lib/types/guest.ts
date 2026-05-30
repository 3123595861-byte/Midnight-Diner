export type GuestStoryDifficulty = "direct" | "hinted" | "abstract";

export interface GuestProfile {
  id: string;
  name: string;
  /** 对应 public/assets/characters/ 下的素材目录或文件名 */
  assetKey: string;
  /** 可选：默认对话头像、立绘等子资源键名 */
  sprites?: {
    idle?: string;
    happy?: string;
    angry?: string;
    sick?: string;
  };
}

export interface GuestRequest {
  guestId: string;
  story: string;
  /** 暗含或明确的目标食物提示（供 LLM / 调试使用，不一定直接展示给玩家） */
  hintedFood?: string;
  difficulty: GuestStoryDifficulty;
}

export interface GuestSession {
  guest: GuestProfile;
  request: GuestRequest;
}
