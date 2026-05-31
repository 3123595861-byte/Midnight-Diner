import type { IngredientCategory } from "@/lib/types/ingredient";

export type CookingUiTab =
  | "vegetable"
  | "meat"
  | "staple"
  | "utensil"
  | "seasoning";

export interface CookingCatalogEntry {
  id: string;
  name: string;
  price: number;
  ingredientCategory: IngredientCategory | "utensil";
  uiTab: CookingUiTab;
}

export const COOKING_CATALOG_ENTRIES: CookingCatalogEntry[] = [
  {
    "id": "v01",
    "name": "大白菜",
    "price": 4,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v02",
    "name": "小白菜",
    "price": 3,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v03",
    "name": "菠菜",
    "price": 5,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v04",
    "name": "生菜",
    "price": 4,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v05",
    "name": "芹菜",
    "price": 4,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v06",
    "name": "油麦菜",
    "price": 5,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v07",
    "name": "茼蒿",
    "price": 6,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v08",
    "name": "娃娃菜",
    "price": 6,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v09",
    "name": "空心菜",
    "price": 5,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v10",
    "name": "莲藕",
    "price": 8,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v11",
    "name": "土豆",
    "price": 3,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v12",
    "name": "胡萝卜",
    "price": 4,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v13",
    "name": "白萝卜",
    "price": 3,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v14",
    "name": "山药",
    "price": 9,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v15",
    "name": "芋头",
    "price": 7,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v16",
    "name": "茄子",
    "price": 5,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v17",
    "name": "番茄",
    "price": 5,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v18",
    "name": "青椒",
    "price": 4,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v19",
    "name": "小米辣",
    "price": 6,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v20",
    "name": "黄瓜",
    "price": 4,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v21",
    "name": "南瓜",
    "price": 6,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v22",
    "name": "冬瓜",
    "price": 5,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v23",
    "name": "丝瓜",
    "price": 5,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v24",
    "name": "苦瓜",
    "price": 6,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v25",
    "name": "西兰花",
    "price": 8,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v26",
    "name": "花菜",
    "price": 7,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v27",
    "name": "豇豆",
    "price": 5,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v28",
    "name": "四季豆",
    "price": 5,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v29",
    "name": "毛豆",
    "price": 6,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v30",
    "name": "黄豆芽",
    "price": 3,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v31",
    "name": "绿豆芽",
    "price": 3,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v32",
    "name": "大葱",
    "price": 3,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v33",
    "name": "蒜苗",
    "price": 5,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v34",
    "name": "韭菜",
    "price": 4,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v35",
    "name": "洋葱",
    "price": 3,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v36",
    "name": "大蒜",
    "price": 3,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v37",
    "name": "生姜",
    "price": 4,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v38",
    "name": "香菜",
    "price": 3,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v39",
    "name": "香菇",
    "price": 10,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v40",
    "name": "金针菇",
    "price": 6,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v41",
    "name": "杏鲍菇",
    "price": 8,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v42",
    "name": "木耳",
    "price": 5,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v43",
    "name": "海带",
    "price": 4,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v44",
    "name": "竹笋",
    "price": 12,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "v45",
    "name": "芦笋",
    "price": 15,
    "ingredientCategory": "vegetable",
    "uiTab": "vegetable"
  },
  {
    "id": "m01",
    "name": "猪肉",
    "price": 18,
    "ingredientCategory": "meat",
    "uiTab": "meat"
  },
  {
    "id": "m02",
    "name": "五花肉",
    "price": 24,
    "ingredientCategory": "meat",
    "uiTab": "meat"
  },
  {
    "id": "m03",
    "name": "排骨",
    "price": 26,
    "ingredientCategory": "meat",
    "uiTab": "meat"
  },
  {
    "id": "m04",
    "name": "里脊肉",
    "price": 20,
    "ingredientCategory": "meat",
    "uiTab": "meat"
  },
  {
    "id": "m05",
    "name": "牛肉",
    "price": 38,
    "ingredientCategory": "meat",
    "uiTab": "meat"
  },
  {
    "id": "m06",
    "name": "牛腩",
    "price": 35,
    "ingredientCategory": "meat",
    "uiTab": "meat"
  },
  {
    "id": "m07",
    "name": "羊肉卷",
    "price": 32,
    "ingredientCategory": "meat",
    "uiTab": "meat"
  },
  {
    "id": "m08",
    "name": "羊排",
    "price": 45,
    "ingredientCategory": "meat",
    "uiTab": "meat"
  },
  {
    "id": "m09",
    "name": "鸡肉",
    "price": 16,
    "ingredientCategory": "meat",
    "uiTab": "meat"
  },
  {
    "id": "m10",
    "name": "鸡腿",
    "price": 14,
    "ingredientCategory": "meat",
    "uiTab": "meat"
  },
  {
    "id": "m11",
    "name": "鸡胸肉",
    "price": 12,
    "ingredientCategory": "meat",
    "uiTab": "meat"
  },
  {
    "id": "m12",
    "name": "鸡翅",
    "price": 22,
    "ingredientCategory": "meat",
    "uiTab": "meat"
  },
  {
    "id": "m13",
    "name": "鸭肉",
    "price": 20,
    "ingredientCategory": "meat",
    "uiTab": "meat"
  },
  {
    "id": "m14",
    "name": "毛肚",
    "price": 28,
    "ingredientCategory": "meat",
    "uiTab": "meat"
  },
  {
    "id": "m15",
    "name": "鸭肠",
    "price": 18,
    "ingredientCategory": "meat",
    "uiTab": "meat"
  },
  {
    "id": "m16",
    "name": "培根",
    "price": 15,
    "ingredientCategory": "meat",
    "uiTab": "meat"
  },
  {
    "id": "m17",
    "name": "火腿",
    "price": 14,
    "ingredientCategory": "meat",
    "uiTab": "meat"
  },
  {
    "id": "m18",
    "name": "香肠",
    "price": 12,
    "ingredientCategory": "meat",
    "uiTab": "meat"
  },
  {
    "id": "m19",
    "name": "虾仁",
    "price": 28,
    "ingredientCategory": "seafood",
    "uiTab": "meat"
  },
  {
    "id": "m20",
    "name": "大虾",
    "price": 35,
    "ingredientCategory": "seafood",
    "uiTab": "meat"
  },
  {
    "id": "m21",
    "name": "花蛤",
    "price": 12,
    "ingredientCategory": "seafood",
    "uiTab": "meat"
  },
  {
    "id": "m22",
    "name": "生蚝",
    "price": 40,
    "ingredientCategory": "seafood",
    "uiTab": "meat"
  },
  {
    "id": "m23",
    "name": "扇贝",
    "price": 36,
    "ingredientCategory": "seafood",
    "uiTab": "meat"
  },
  {
    "id": "m24",
    "name": "草鱼",
    "price": 22,
    "ingredientCategory": "seafood",
    "uiTab": "meat"
  },
  {
    "id": "m25",
    "name": "鱿鱼",
    "price": 24,
    "ingredientCategory": "seafood",
    "uiTab": "meat"
  },
  {
    "id": "st01",
    "name": "大米",
    "price": 5,
    "ingredientCategory": "staple",
    "uiTab": "staple"
  },
  {
    "id": "st02",
    "name": "面条",
    "price": 4,
    "ingredientCategory": "staple",
    "uiTab": "staple"
  },
  {
    "id": "st03",
    "name": "宽面",
    "price": 5,
    "ingredientCategory": "staple",
    "uiTab": "staple"
  },
  {
    "id": "st04",
    "name": "意大利面",
    "price": 8,
    "ingredientCategory": "staple",
    "uiTab": "staple"
  },
  {
    "id": "st05",
    "name": "粉丝",
    "price": 4,
    "ingredientCategory": "staple",
    "uiTab": "staple"
  },
  {
    "id": "st06",
    "name": "米粉",
    "price": 5,
    "ingredientCategory": "staple",
    "uiTab": "staple"
  },
  {
    "id": "st07",
    "name": "土司面包",
    "price": 8,
    "ingredientCategory": "staple",
    "uiTab": "staple"
  },
  {
    "id": "st08",
    "name": "馒头",
    "price": 2,
    "ingredientCategory": "staple",
    "uiTab": "staple"
  },
  {
    "id": "st09",
    "name": "饺子皮",
    "price": 4,
    "ingredientCategory": "staple",
    "uiTab": "staple"
  },
  {
    "id": "st10",
    "name": "年糕",
    "price": 6,
    "ingredientCategory": "staple",
    "uiTab": "staple"
  },
  {
    "id": "u01",
    "name": "中华炒锅",
    "price": 0,
    "ingredientCategory": "utensil",
    "uiTab": "utensil"
  },
  {
    "id": "u02",
    "name": "平底煎锅",
    "price": 0,
    "ingredientCategory": "utensil",
    "uiTab": "utensil"
  },
  {
    "id": "u03",
    "name": "深海汤锅",
    "price": 0,
    "ingredientCategory": "utensil",
    "uiTab": "utensil"
  },
  {
    "id": "u04",
    "name": "老式砂锅",
    "price": 0,
    "ingredientCategory": "utensil",
    "uiTab": "utensil"
  },
  {
    "id": "u05",
    "name": "多层蒸锅",
    "price": 0,
    "ingredientCategory": "utensil",
    "uiTab": "utensil"
  },
  {
    "id": "u06",
    "name": "智能电饭煲",
    "price": 0,
    "ingredientCategory": "utensil",
    "uiTab": "utensil"
  },
  {
    "id": "u07",
    "name": "电烤箱",
    "price": 0,
    "ingredientCategory": "utensil",
    "uiTab": "utensil"
  },
  {
    "id": "u08",
    "name": "微波炉",
    "price": 0,
    "ingredientCategory": "utensil",
    "uiTab": "utensil"
  },
  {
    "id": "u09",
    "name": "高压锅",
    "price": 0,
    "ingredientCategory": "utensil",
    "uiTab": "utensil"
  },
  {
    "id": "u10",
    "name": "空气炸锅",
    "price": 0,
    "ingredientCategory": "utensil",
    "uiTab": "utensil"
  },
  {
    "id": "s01",
    "name": "食盐",
    "price": 2,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s02",
    "name": "白糖",
    "price": 2,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s03",
    "name": "冰糖",
    "price": 4,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s04",
    "name": "鸡精",
    "price": 3,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s05",
    "name": "生抽",
    "price": 5,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s06",
    "name": "老抽",
    "price": 5,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s07",
    "name": "陈醋",
    "price": 4,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s08",
    "name": "料酒",
    "price": 5,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s09",
    "name": "蚝油",
    "price": 6,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s10",
    "name": "豆瓣酱",
    "price": 6,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s11",
    "name": "火锅底料",
    "price": 15,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s12",
    "name": "黑胡椒粉",
    "price": 5,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s13",
    "name": "白胡椒粉",
    "price": 5,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s14",
    "name": "孜然粉",
    "price": 4,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s15",
    "name": "孜然粒",
    "price": 5,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s16",
    "name": "花椒",
    "price": 4,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s17",
    "name": "八角",
    "price": 3,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s18",
    "name": "桂皮",
    "price": 3,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s19",
    "name": "香叶",
    "price": 3,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s20",
    "name": "干辣椒",
    "price": 4,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s21",
    "name": "芝麻油",
    "price": 8,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s22",
    "name": "辣椒油",
    "price": 6,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s23",
    "name": "蒜蓉辣酱",
    "price": 5,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s24",
    "name": "韩式辣酱",
    "price": 8,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s25",
    "name": "甜面酱",
    "price": 4,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s26",
    "name": "味噌",
    "price": 9,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s27",
    "name": "鱼露",
    "price": 7,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s28",
    "name": "美乃滋",
    "price": 8,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s29",
    "name": "沙拉酱",
    "price": 8,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s30",
    "name": "番茄酱",
    "price": 5,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s31",
    "name": "芥末酱",
    "price": 6,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s32",
    "name": "咖喱块",
    "price": 9,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s33",
    "name": "黄油",
    "price": 12,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  },
  {
    "id": "s34",
    "name": "迷迭香",
    "price": 8,
    "ingredientCategory": "seasoning",
    "uiTab": "seasoning"
  }
];

export function getCatalogEntry(id: string): CookingCatalogEntry | undefined {
  return COOKING_CATALOG_ENTRIES.find((item) => item.id === id);
}

export function getCatalogEntriesByUiTab(tab: CookingUiTab): CookingCatalogEntry[] {
  return COOKING_CATALOG_ENTRIES.filter((item) => item.uiTab === tab);
}
