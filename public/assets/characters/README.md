# 角色素材目录

将像素风角色相关素材放在此目录。

## 建议结构

```
characters/
├── player/                 # 主角（食堂老板）
│   ├── idle.png
│   ├── cooking.png
│   └── serve.png
├── guests/                 # 客人（可按角色分子目录）
│   ├── guest_01/
│   │   ├── idle.png
│   │   ├── happy.png
│   │   ├── angry.png
│   │   └── sick.png        # 食物中毒 / 不适症状
│   └── guest_02/
│       └── ...
└── placeholder/            # 开发占位
    └── idle.png
```

## 代码引用

- 路径常量：`lib/assets/paths.ts` → `ASSET_PATHS.characters`
- 客人档案：`lib/types/guest.ts` → `GuestProfile.assetKey` / `sprites`
- Mock 数据：`lib/data/mock/index.ts` → `MOCK_GUEST_PROFILES`

## 命名建议

- 使用小写 + 下划线，如 `guest_office_worker_idle.png`
- 透明背景 PNG，像素风统一尺寸（如 32×32 或 64×64 倍数）
