import type { CookingTab } from "@/components/cooking/config";

export interface CookCatalogItem {
  id: string;
  name: string;
  price: number;
  category: CookingTab;
}

/** 蔬菜 35 种 */
const VEGETABLES: CookCatalogItem[] = [
  { id: "v01", name: "大白菜", price: 4, category: "vegetable" },
  { id: "v02", name: "小白菜", price: 3, category: "vegetable" },
  { id: "v03", name: "菠菜", price: 5, category: "vegetable" },
  { id: "v04", name: "生菜", price: 4, category: "vegetable" },
  { id: "v05", name: "芹菜", price: 4, category: "vegetable" },
  { id: "v06", name: "油麦菜", price: 5, category: "vegetable" },
  { id: "v07", name: "茼蒿", price: 6, category: "vegetable" },
  { id: "v08", name: "莲藕", price: 8, category: "vegetable" },
  { id: "v09", name: "土豆", price: 3, category: "vegetable" },
  { id: "v10", name: "胡萝卜", price: 4, category: "vegetable" },
  { id: "v11", name: "白萝卜", price: 3, category: "vegetable" },
  { id: "v12", name: "山药", price: 9, category: "vegetable" },
  { id: "v13", name: "芋头", price: 7, category: "vegetable" },
  { id: "v14", name: "茄子", price: 5, category: "vegetable" },
  { id: "v15", name: "番茄", price: 5, category: "vegetable" },
  { id: "v16", name: "青椒", price: 4, category: "vegetable" },
  { id: "v17", name: "黄瓜", price: 4, category: "vegetable" },
  { id: "v18", name: "南瓜", price: 6, category: "vegetable" },
  { id: "v19", name: "冬瓜", price: 5, category: "vegetable" },
  { id: "v20", name: "丝瓜", price: 5, category: "vegetable" },
  { id: "v21", name: "苦瓜", price: 6, category: "vegetable" },
  { id: "v22", name: "西兰花", price: 8, category: "vegetable" },
  { id: "v23", name: "花菜", price: 7, category: "vegetable" },
  { id: "v24", name: "豇豆", price: 5, category: "vegetable" },
  { id: "v25", name: "四季豆", price: 5, category: "vegetable" },
  { id: "v26", name: "毛豆", price: 6, category: "vegetable" },
  { id: "v27", name: "大葱", price: 3, category: "vegetable" },
  { id: "v28", name: "蒜苗", price: 5, category: "vegetable" },
  { id: "v29", name: "韭菜", price: 4, category: "vegetable" },
  { id: "v30", name: "香菇", price: 10, category: "vegetable" },
  { id: "v31", name: "竹笋", price: 12, category: "vegetable" },
  { id: "v32", name: "洋葱", price: 3, category: "vegetable" },
  { id: "v33", name: "大蒜", price: 3, category: "vegetable" },
  { id: "v34", name: "生姜", price: 4, category: "vegetable" },
  { id: "v35", name: "香菜", price: 3, category: "vegetable" },
];

/** 肉品 15 种 */
const MEATS: CookCatalogItem[] = [
  { id: "m01", name: "猪肉", price: 18, category: "meat" },
  { id: "m02", name: "牛肉", price: 32, category: "meat" },
  { id: "m03", name: "羊肉", price: 35, category: "meat" },
  { id: "m04", name: "鸡肉", price: 16, category: "meat" },
  { id: "m05", name: "鸭肉", price: 20, category: "meat" },
  { id: "m06", name: "排骨", price: 22, category: "meat" },
  { id: "m07", name: "五花肉", price: 24, category: "meat" },
  { id: "m08", name: "里脊肉", price: 20, category: "meat" },
  { id: "m09", name: "培根", price: 15, category: "meat" },
  { id: "m10", name: "火腿", price: 14, category: "meat" },
  { id: "m11", name: "香肠", price: 12, category: "meat" },
  { id: "m12", name: "虾仁", price: 28, category: "meat" },
  { id: "m13", name: "鱼片", price: 26, category: "meat" },
  { id: "m14", name: "带鱼", price: 22, category: "meat" },
  { id: "m15", name: "鱿鱼", price: 24, category: "meat" },
];

/** 厨具（应有尽有） */
const UTENSILS: CookCatalogItem[] = [
  { id: "u01", name: "炒锅", price: 0, category: "utensil" },
  { id: "u02", name: "炖锅", price: 0, category: "utensil" },
  { id: "u03", name: "汤锅", price: 0, category: "utensil" },
  { id: "u04", name: "平底锅", price: 0, category: "utensil" },
  { id: "u05", name: "砂锅", price: 0, category: "utensil" },
  { id: "u06", name: "蒸锅", price: 0, category: "utensil" },
  { id: "u07", name: "烤箱", price: 0, category: "utensil" },
  { id: "u08", name: "铁板", price: 0, category: "utensil" },
  { id: "u09", name: "高压锅", price: 0, category: "utensil" },
  { id: "u10", name: "炸锅", price: 0, category: "utensil" },
  { id: "u11", name: "拉面锅", price: 0, category: "utensil" },
  { id: "u12", name: "焖烧罐", price: 0, category: "utensil" },
  { id: "u13", name: "蒸笼", price: 0, category: "utensil" },
  { id: "u14", name: "烤架", price: 0, category: "utensil" },
  { id: "u15", name: "料理机", price: 0, category: "utensil" },
  { id: "u16", name: "擀面杖", price: 0, category: "utensil" },
  { id: "u17", name: "砧板", price: 0, category: "utensil" },
  { id: "u18", name: "菜刀", price: 0, category: "utensil" },
];

/** 调料（含火锅、西式酱料等） */
const SEASONINGS: CookCatalogItem[] = [
  { id: "s01", name: "食盐", price: 2, category: "seasoning" },
  { id: "s02", name: "白糖", price: 2, category: "seasoning" },
  { id: "s03", name: "生抽", price: 4, category: "seasoning" },
  { id: "s04", name: "老抽", price: 4, category: "seasoning" },
  { id: "s05", name: "陈醋", price: 4, category: "seasoning" },
  { id: "s06", name: "料酒", price: 5, category: "seasoning" },
  { id: "s07", name: "蚝油", price: 6, category: "seasoning" },
  { id: "s08", name: "豆瓣酱", price: 5, category: "seasoning" },
  { id: "s09", name: "火锅底料", price: 12, category: "seasoning" },
  { id: "s10", name: "黑胡椒粉", price: 5, category: "seasoning" },
  { id: "s11", name: "白胡椒粉", price: 5, category: "seasoning" },
  { id: "s12", name: "五香粉", price: 4, category: "seasoning" },
  { id: "s13", name: "孜然粉", price: 4, category: "seasoning" },
  { id: "s14", name: "花椒", price: 4, category: "seasoning" },
  { id: "s15", name: "八角", price: 3, category: "seasoning" },
  { id: "s16", name: "桂皮", price: 3, category: "seasoning" },
  { id: "s17", name: "芝麻油", price: 6, category: "seasoning" },
  { id: "s18", name: "辣椒油", price: 5, category: "seasoning" },
  { id: "s19", name: "蒜蓉酱", price: 5, category: "seasoning" },
  { id: "s20", name: "韩式辣酱", price: 6, category: "seasoning" },
  { id: "s21", name: "味噌", price: 8, category: "seasoning" },
  { id: "s22", name: "鱼露", price: 7, category: "seasoning" },
  { id: "s23", name: "美乃滋", price: 8, category: "seasoning" },
  { id: "s24", name: "沙拉酱", price: 8, category: "seasoning" },
  { id: "s25", name: "番茄酱", price: 5, category: "seasoning" },
  { id: "s26", name: "芥末酱", price: 6, category: "seasoning" },
  { id: "s27", name: "咖喱块", price: 9, category: "seasoning" },
  { id: "s28", name: "黄油", price: 10, category: "seasoning" },
];

export const COOKING_CATALOG: CookCatalogItem[] = [
  ...VEGETABLES,
  ...MEATS,
  ...UTENSILS,
  ...SEASONINGS,
];

const catalogMap = new Map(COOKING_CATALOG.map((item) => [item.id, item]));

export function getCatalogItem(id: string): CookCatalogItem | undefined {
  return catalogMap.get(id);
}

export function getItemsByCategory(category: CookingTab): CookCatalogItem[] {
  return COOKING_CATALOG.filter((item) => item.category === category);
}
