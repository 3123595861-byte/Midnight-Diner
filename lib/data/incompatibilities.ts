/** 食材相克组合：任意一对同时出现则视为 0 星（中毒/严重不适） */
export const INCOMPATIBLE_PAIRS: [string, string][] = [
  ["s33", "v17"],
  ["m19", "s07"],
  ["m21", "s05"],
];

export const INCOMPATIBLE_PAIR_LABELS: Record<string, string> = {
  "s33+v17": "黄油与番茄",
  "m19+s07": "虾仁与陈醋",
  "m21+s05": "花蛤与生抽",
};

function pairKey(a: string, b: string): string {
  return [a, b].sort().join("+");
}

export function findIncompatiblePair(
  ingredientIds: string[],
): { a: string; b: string; label: string } | null {
  const set = new Set(ingredientIds);
  for (const [a, b] of INCOMPATIBLE_PAIRS) {
    if (set.has(a) && set.has(b)) {
      const key = pairKey(a, b);
      return {
        a,
        b,
        label: INCOMPATIBLE_PAIR_LABELS[key] ?? `${a}+${b}`,
      };
    }
  }
  return null;
}

export function isPoisonousCombo(ingredientIds: string[]): boolean {
  return findIncompatiblePair(ingredientIds) !== null;
}
