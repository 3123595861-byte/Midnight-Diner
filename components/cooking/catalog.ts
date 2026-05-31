import type { CookingTab } from "@/components/cooking/config";

// 建议在 @/components/cooking/config 中将 CookingTab 更新为:
// type CookingTab = "vegetable" | "meat" | "staple" | "utensil" | "seasoning";

export interface CookCatalogItem {
  id: string;
  name: string;
  price: number;
  category: CookingTab | "staple"; // 兼容新增的主食类型
}

/** 蔬菜与豆菇类 45 种 */
const VEGETABLES: CookCatalogItem[] = [
  { id: "v01", name: "大白菜", price: 4, category: "vegetable" },
  { id: "v02", name: "小白菜", price: 3, category: "vegetable" },
  { id: "v03", name: "菠菜", price: 5, category: "vegetable" },
  { id: "v04", name: "生菜", price: 4, category: "vegetable" },
  { id: "v05", name: "芹菜", price: 4, category: "vegetable" },
  { id: "v06", name: "油麦菜", price: 5, category: "vegetable" },
  { id: "v07", name: "茼蒿", price: 6, category: "vegetable" },
  { id: "v08", name: "娃娃菜", price: 6, category: "vegetable" },
  { id: "v09", name: "空心菜", price: 5, category: "vegetable" },
  { id: "v10", name: "莲藕", price: 8, category: "vegetable" },
  { id: "v11", name: "土豆", price: 3, category: "vegetable" },
  { id: "v12", name: "胡萝卜", price: 4, category: "vegetable" },
  { id: "v13", name: "白萝卜", price: 3, category: "vegetable" },
  { id: "v14", name: "山药", price: 9, category: "vegetable" },
  { id: "v15", name: "芋头", price: 7, category: "vegetable" },
  { id: "v16", name: "茄子", price: 5, category: "vegetable" },
  { id: "v17", name: "番茄", price: 5, category: "vegetable" },
  { id: "v18", name: "青椒", price: 4, category: "vegetable" },
  { id: "v19", name: "小米辣", price: 6, category: "vegetable" },
  { id: "v20", name: "黄瓜", price: 4, category: "vegetable" },
  { id: "v21", name: "南瓜", price: 6, category: "vegetable" },
  { id: "v22", name: "冬瓜", price: 5, category: "vegetable" },
  { id: "v23", name: "丝瓜", price: 5, category: "vegetable" },
  { id: "v24", name: "苦瓜", price: 6, category: "vegetable" },
  { id: "v25", name: "西兰花", price: 8, category: "vegetable" },
  { id: "v26", name: "花菜", price: 7, category: "vegetable" },
  { id: "v27", name: "豇豆", price: 5, category: "vegetable" },
  { id: "v28", name: "四季豆", price: 5, category: "vegetable" },
  { id: "v29", name: "毛豆", price: 6, category: "vegetable" },
  { id: "v30", name: "黄豆芽", price: 3, category: "vegetable" },
  { id: "v31", name: "绿豆芽", price: 3, category: "vegetable" },
  { id: "v32", name: "大葱", price: 3, category: "vegetable" },
  { id: "v33", name: "蒜苗", price: 5, category: "vegetable" },
  { id: "v34", name: "韭菜", price: 4, category: "vegetable" },
  { id: "v35", name: "洋葱", price: 3, category: "vegetable" },
  { id: "v36", name: "大蒜", price: 3, category: "vegetable" },
  { id: "v37", name: "生姜", price: 4, category: "vegetable" },
  { id: "v38", name: "香菜", price: 3, category: "vegetable" },
  { id: "v39", name: "香菇", price: 10, category: "vegetable" },
  { id: "v40", name: "金针菇", price: 6, category: "vegetable" },
  { id: "v41", name: "杏鲍菇", price: 8, category: "vegetable" },
  { id: "v42", name: "木耳", price: 5, category: "vegetable" },
  { id: "v43", name: "海带", price: 4, category: "vegetable" },
  { id: "v44", name: "竹笋", price: 12, category: "vegetable" },
  { id: "v45", name: "芦笋", price: 15, category: "vegetable" },
];

/** 肉禽与海鲜 25 种 */
const MEATS: CookCatalogItem[] = [
  { id: "m01", name: "猪肉", price: 18, category: "meat" },
  { id: "m02", name: "五花肉", price: 24, category: "meat" },
  { id: "m03", name: "排骨", price: 26, category: "meat" },
  { id: "m04", name: "里脊肉", price: 20, category: "meat" },
  { id: "m05", name: "牛肉", price: 38, category: "meat" },
  { id: "m06", name: "牛腩", price: 35, category: "meat" },
  { id: "m07", name: "羊肉卷", price: 32, category: "meat" },
  { id: "m08", name: "羊排", price: 45, category: "meat" },
  { id: "m09", name: "鸡肉", price: 16, category: "meat" },
  { id: "m10", name: "鸡腿", price: 14, category: "meat" },
  { id: "m11", name: "鸡胸肉", price: 12, category: "meat" },
  { id: "m12", name: "鸡翅", price: 22, category: "meat" },
  { id: "m13", name: "鸭肉", price: 20, category: "meat" },
  { id: "m14", name: "毛肚", price: 28, category: "meat" },
  { id: "m15", name: "鸭肠", price: 18, category: "meat" },
  { id: "m16", name: "培根", price: 15, category: "meat" },
  { id: "m17", name: "火腿", price: 14, category: "meat" },
  { id: "m18", name: "香肠", price: 12, category: "meat" },
  { id: "m19", name: "虾仁", price: 28, category: "meat" },
  { id: "m20", name: "大虾", price: 35, category: "meat" },
  { id: "m21", name: "花蛤", price: 12, category: "meat" },
  { id: "m22", name: "生蚝", price: 40, category: "meat" },
  { id: "m23", name: "扇贝", price: 36, category: "meat" },
  { id: "m24", name: "草鱼", price: 22, category: "meat" },
  { id: "m25", name: "鱿鱼", price: 24, category: "meat" },
];

/** 主食类 10 种 */
const STAPLES: CookCatalogItem[] = [
  { id: "st01", name: "大米", price: 5, category: "staple" },
  { id: "st02", name: "面条", price: 4, category: "staple" },
  { id: "st03", name: "宽面", price: 5, category: "staple" },
  { id: "st04", name: "意大利面", price: 8, category: "staple" },
  { id: "st05", name: "粉丝", price: 4, category: "staple" },
  { id: "st06", name: "米粉", price: 5, category: "staple" },
  { id: "st07", name: "土司面包", price: 8, category: "staple" },
  { id: "st08", name: "馒头", price: 2, category: "staple" },
  { id: "st09", name: "饺子皮", price: 4, category: "staple" },
  { id: "st10", name: "年糕", price: 6, category: "staple" },
];

/** 厨具（全部免费，提供更合理的烹饪设备） */
const UTENSILS: CookCatalogItem[] = [
  { id: "u01", name: "中华炒锅", price: 0, category: "utensil" },
  { id: "u02", name: "平底煎锅", price: 0, category: "utensil" },
  { id: "u03", name: "深海汤锅", price: 0, category: "utensil" },
  { id: "u04", name: "老式砂锅", price: 0, category: "utensil" },
  { id: "u05", name: "多层蒸锅", price: 0, category: "utensil" },
  { id: "u06", name: "智能电饭煲", price: 0, category: "utensil" },
  { id: "u07", name: "电烤箱", price: 0, category: "utensil" },
  { id: "u08", name: "微波炉", price: 0, category: "utensil" },
  { id: "u09", name: "高压锅", price: 0, category: "utensil" },
  { id: "u10", name: "空气炸锅", price: 0, category: "utensil" },
];

/** 调料（含火锅、西式酱料及基础香辛料） */
const SEASONINGS: CookCatalogItem[] = [
  { id: "s01", name: "食盐", price: 2, category: "seasoning" },
  { id: "s02", name: "白糖", price: 2, category: "seasoning" },
  { id: "s03", name: "冰糖", price: 4, category: "seasoning" },
  { id: "s04", name: "鸡精", price: 3, category: "seasoning" },
  { id: "s05", name: "生抽", price: 5, category: "seasoning" },
  { id: "s06", name: "老抽", price: 5, category: "seasoning" },
  { id: "s07", name: "陈醋", price: 4, category: "seasoning" },
  { id: "s08", name: "料酒", price: 5, category: "seasoning" },
  { id: "s09", name: "蚝油", price: 6, category: "seasoning" },
  { id: "s10", name: "豆瓣酱", price: 6, category: "seasoning" },
  { id: "s11", name: "火锅底料", price: 15, category: "seasoning" },
  { id: "s12", name: "黑胡椒粉", price: 5, category: "seasoning" },
  { id: "s13", name: "白胡椒粉", price: 5, category: "seasoning" },
  { id: "s14", name: "孜然粉", price: 4, category: "seasoning" },
  { id: "s15", name: "孜然粒", price: 5, category: "seasoning" },
  { id: "s16", name: "花椒", price: 4, category: "seasoning" },
  { id: "s17", name: "八角", price: 3, category: "seasoning" },
  { id: "s18", name: "桂皮", price: 3, category: "seasoning" },
  { id: "s19", name: "香叶", price: 3, category: "seasoning" },
  { id: "s20", name: "干辣椒", price: 4, category: "seasoning" },
  { id: "s21", name: "芝麻油", price: 8, category: "seasoning" },
  { id: "s22", name: "辣椒油", price: 6, category: "seasoning" },
  { id: "s23", name: "蒜蓉辣酱", price: 5, category: "seasoning" },
  { id: "s24", name: "韩式辣酱", price: 8, category: "seasoning" },
  { id: "s25", name: "甜面酱", price: 4, category: "seasoning" },
  { id: "s26", name: "味噌", price: 9, category: "seasoning" },
  { id: "s27", name: "鱼露", price: 7, category: "seasoning" },
  { id: "s28", name: "美乃滋", price: 8, category: "seasoning" },
  { id: "s29", name: "沙拉酱", price: 8, category: "seasoning" },
  { id: "s30", name: "番茄酱", price: 5, category: "seasoning" },
  { id: "s31", name: "芥末酱", price: 6, category: "seasoning" },
  { id: "s32", name: "咖喱块", price: 9, category: "seasoning" },
  { id: "s33", name: "黄油", price: 12, category: "seasoning" },
  { id: "s34", name: "迷迭香", price: 8, category: "seasoning" },
];

export const COOKING_CATALOG: CookCatalogItem[] = [
  ...VEGETABLES,
  ...MEATS,
  ...STAPLES,
  ...UTENSILS,
  ...SEASONINGS,
];

const catalogMap = new Map(COOKING_CATALOG.map((item) => [item.id, item]));

export function getCatalogItem(id: string): CookCatalogItem | undefined {
  return catalogMap.get(id);
}

export function getItemsByCategory(category: CookingTab | "staple"): CookCatalogItem[] {
  return COOKING_CATALOG.filter((item) => item.category === category);
}