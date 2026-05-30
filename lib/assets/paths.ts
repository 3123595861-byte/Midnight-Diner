/**
 * 静态资源路径常量
 * 将素材放入 public/assets/ 对应目录后，通过此处路径引用
 */
export const ASSET_PATHS = {
  /** 角色立绘、头像、表情等 */
  characters: "/assets/characters",
  /** 场景背景、接待台、装饰等 */
  scenes: "/assets/scenes",
  /** BGM、音效等 */
  music: "/assets/music",
  /** 食材图标 */
  ingredients: "/assets/ingredients",
  /** 厨具图标 */
  utensils: "/assets/utensils",
  /** UI 装饰、按钮、边框等 */
  ui: "/assets/ui",
} as const;

export type AssetCategory = keyof typeof ASSET_PATHS;

/** 拼接素材完整 URL 路径 */
export function resolveAssetPath(category: AssetCategory, filename: string): string {
  return `${ASSET_PATHS[category]}/${filename}`;
}

/** 音频资源路径（BGM / SFX 子目录预留） */
export const AUDIO_PATHS = {
  bgm: `${ASSET_PATHS.music}/bgm`,
  sfx: `${ASSET_PATHS.music}/sfx`,
} as const;
