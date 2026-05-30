interface HeaderBarProps {
  currentDay: number;
  money: number;
  reputation: number;
}

/**
 * 顶部状态栏：天数、金钱、声望
 * TODO: Phase 1 实现 UI（Progress / 数字展示）
 */
export function HeaderBar(_props: HeaderBarProps) {
  return (
    <header data-testid="header-bar">
      {/* TODO: 渲染第 X 天、金钱条、声望 */}
    </header>
  );
}
