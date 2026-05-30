# 场景素材目录

将游戏场景、背景、装饰等素材放在此目录。

## 建议结构

```
scenes/
├── backgrounds/
│   ├── diner_interior.png      # 深夜食堂内景主背景
│   └── diner_exterior.png      # 可选：外景
├── props/
│   ├── counter.png             # 接待台 / 横向台面
│   ├── stove.png               # 灶台
│   ├── shelves.png             # 货架
│   └── window.png              # 窗户
├── overlays/
│   ├── night_glow.png          # 夜晚光效层
│   └── vignette.png            # 暗角
└── placeholder/
    └── scene.png
```

## 布局参考（PRD §4）

- 接待台横贯屏幕中下部（约 1/3 高度处）
- 主角位于接待台左下角
- 客人从右上角出现
- 食物展示位于接待台中央

## 代码引用

- 路径常量：`lib/assets/paths.ts` → `ASSET_PATHS.scenes`
- 使用处：`components/game/SceneArea.tsx`（待实现）
