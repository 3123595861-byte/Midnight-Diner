import type { GuestStoryDifficulty } from "@/lib/types/guest";

export interface GuestEntry {
  guestId: string;
  name: string;
  story: string;
  /** 客人最想吃的核心食材 ID（至少命中一个才算猜中意图） */
  coreIngredientIds: string[];
  /** 可接受的替代食材（命中任一可视为猜中，可选） */
  acceptableIngredientIds?: string[];
  hintedFood: string;
  difficulty: GuestStoryDifficulty;
  assetKey: string;
}

/** 按天组织的客人队列；index 对应当天第几位客人（0-based） */
export const GUESTS_BY_DAY: Record<number, GuestEntry[]> = {
  1: [
    {
      guestId: "guest_01",
      name: "上班族",
      story: "老板，加班到现在……给我来一碗豚骨拉面吧，汤头要浓一点。",
      coreIngredientIds: ["noodles", "pork_bone"],
      hintedFood: "豚骨拉面",
      difficulty: "direct",
      assetKey: "Customer1",
    },
    {
      guestId: "guest_02",
      name: "学生",
      story: "考试考砸了，想吃点简单的。老板，来一份蛋炒饭行吗？",
      coreIngredientIds: ["rice", "egg"],
      hintedFood: "蛋炒饭",
      difficulty: "direct",
      assetKey: "customer2",
    },
    {
      guestId: "guest_03",
      name: "渔夫",
      story: "今天收成不错。整条鱼烤一下，再来点酱油，就够了。",
      coreIngredientIds: ["fish"],
      acceptableIngredientIds: ["soy_sauce"],
      hintedFood: "烤鱼",
      difficulty: "direct",
      assetKey: "Customer3",
    },
  ],
  2: [
    {
      guestId: "guest_04",
      name: "护士",
      story: "夜班刚下，又冷又饿……想喝一口热乎乎、能暖到心里的汤。",
      coreIngredientIds: ["miso", "tofu"],
      hintedFood: "味噌汤",
      difficulty: "hinted",
      assetKey: "customer4",
    },
    {
      guestId: "guest_05",
      name: "程序员",
      story: "代码写不出来，脑子一片空白。以前妈妈总给我做那种有土豆、有肉的浓汤……",
      coreIngredientIds: ["potato", "pork"],
      hintedFood: "土豆肉汤 / 炖菜",
      difficulty: "hinted",
      assetKey: "Customer1",
    },
    {
      guestId: "guest_06",
      name: "旅人",
      story: "走过很多城市，今晚只想吃一口有海洋味道的东西，别太复杂。",
      coreIngredientIds: ["shrimp", "fish"],
      hintedFood: "海鲜类",
      difficulty: "hinted",
      assetKey: "customer2",
    },
  ],
  3: [
    {
      guestId: "guest_07",
      name: "作家",
      story: "稿纸堆满了，却写不出结尾。我想找一种味道——像小时候放学回家，厨房里飘出来的那种。",
      coreIngredientIds: ["curry_powder", "rice"],
      hintedFood: "咖喱饭",
      difficulty: "abstract",
      assetKey: "Customer3",
    },
    {
      guestId: "guest_08",
      name: "老照片",
      story: "今天是我和老伴认识的日子。她最爱那种奶香和番茄混在一起、软软的东西……",
      coreIngredientIds: ["tomato", "cheese"],
      hintedFood: "番茄芝士类（注意：加柠檬会中毒）",
      difficulty: "abstract",
      assetKey: "customer4",
    },
    {
      guestId: "guest_09",
      name: "雨夜客",
      story: "外面雨很大。什么都不想说，只想有一碗能撑过这个晚上的东西。",
      coreIngredientIds: ["noodles"],
      acceptableIngredientIds: ["pork_bone", "egg"],
      hintedFood: "面类",
      difficulty: "abstract",
      assetKey: "Customer1",
    },
  ],
};

export function getGuestForDay(day: number, index: number): GuestEntry | null {
  const guests = GUESTS_BY_DAY[day];
  if (!guests || index < 0 || index >= guests.length) {
    return null;
  }
  return guests[index];
}

export function getGuestCountForDay(day: number): number {
  return GUESTS_BY_DAY[day]?.length ?? 0;
}

export function findGuestById(guestId: string): GuestEntry | null {
  for (const guests of Object.values(GUESTS_BY_DAY)) {
    const found = guests.find((g) => g.guestId === guestId);
    if (found) return found;
  }
  return null;
}
