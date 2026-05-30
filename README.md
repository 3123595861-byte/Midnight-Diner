# AI 深夜食堂 — 项目框架

基于 [PRD.md](./PRD.md) 搭建的 Next.js 代码骨架，**不含**具体游戏逻辑与画面实现。

## 技术栈

- Next.js 15 (App Router) + TypeScript
- TailwindCSS 4
- shadcn/ui（按需安装，见 `components.json`）

## 快速开始

```bash
npm install
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)

## 目录结构

```
app/
├── layout.tsx              # 根布局
├── page.tsx                # 入口 → GameShell
├── globals.css             # 全局样式（像素风待 Phase 1 完善）
└── api/cook/route.ts       # 烹饪 API 桩（Phase 3/4 接入 AI）

components/
├── game/                   # 游戏 UI 组件骨架
│   ├── GameShell.tsx       # 主容器
│   ├── HeaderBar.tsx       # 顶栏：天数 / 金钱 / 声望
│   ├── SceneArea.tsx       # 场景区：接待台 / 角色 / 食物
│   ├── OperationPanel.tsx  # 底部：选料 / 厨具 / 烹饪
│   └── SettlementModal.tsx # 结算弹窗
└── ui/                     # shadcn 组件（待安装）

hooks/
├── useGameState.ts         # 游戏状态 Hook 桩
└── useGameAudio.ts         # 音频 Hook 桩

lib/
├── types/                  # TypeScript 类型定义
├── constants/              # 游戏 / 经济常量
├── game/                   # 状态机（桩）
├── ai/                     # LLM / 生图（桩）
├── data/mock/              # Mock 数据占位
└── assets/paths.ts         # 素材路径常量

public/assets/              # ★ 素材导入目录 ★
├── characters/             # 角色立绘、表情
├── scenes/                 # 场景背景、道具
├── music/bgm|sfx/          # BGM 与音效
├── ingredients/            # 食材图标
├── utensils/               # 厨具图标
└── ui/                     # UI 装饰
```

## 素材导入

各素材目录下均有 `README.md` 说明建议结构与命名。代码中通过 `lib/assets/paths.ts` 引用：

```ts
import { ASSET_PATHS, resolveAssetPath } from "@/lib/assets/paths";

const guestSprite = resolveAssetPath("characters", "guests/guest_01/idle.png");
const bgm = `${ASSET_PATHS.music}/bgm/main_theme.mp3`;
```

## 环境变量

复制 `.env.example` 为 `.env.local`，填入 LLM 与生图 API 密钥（Phase 3/4 使用）。

## 开发阶段

| Phase | 内容 | 状态 |
|-------|------|------|
| 1 | 静态 UI + Mock 数据 + 布局 | 框架已预留 |
| 2 | 状态机 + 游戏循环 | 类型/桩已预留 |
| 3 | LLM 接入 | `app/api/cook` + `lib/ai/` |
| 4 | 生图 + 动效 | `lib/ai/image.ts` |

## shadcn/ui

```bash
npx shadcn@latest add button card tabs scroll-area progress
```
