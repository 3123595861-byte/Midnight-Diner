# 音乐与音效素材目录

将 BGM 和音效文件放在此目录。

## 建议结构

```
music/
├── bgm/
│   ├── main_theme.mp3          # 主菜单 / 主循环 BGM
│   ├── cooking_loop.mp3        # 烹饪等待循环
│   ├── settlement.mp3          # 结算界面
│   └── game_over.mp3           # 破产结局
├── sfx/
│   ├── ui_click.wav            # UI 点击
│   ├── cook_start.wav          # 开始烹饪
│   ├── serve.wav               # 上菜
│   ├── coin.wav                # 收钱
│   ├── star.wav                # 星级弹出
│   └── poison.wav              # 中毒 / 赔钱
└── placeholder/
    └── silence.mp3
```

## 代码引用

- 路径常量：`lib/assets/paths.ts` → `ASSET_PATHS.music`、`AUDIO_PATHS`
- 音频 Hook（待实现）：`hooks/useGameAudio.ts`

## 格式建议

- BGM：MP3 / OGG，循环 Seamless
- 音效：WAV / OGG，短促、可叠加播放
