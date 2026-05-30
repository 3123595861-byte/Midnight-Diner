import type { Utensil } from "@/lib/types/ingredient";

export const UTENSILS: Utensil[] = [
  { id: "wok", name: "炒锅", assetKey: "wok.png" },
  { id: "pot", name: "炖锅", assetKey: "pot.png" },
  { id: "oven", name: "烤箱", assetKey: "oven.png" },
  { id: "grill", name: "铁板", assetKey: "grill.png" },
];

const utensilMap = new Map(UTENSILS.map((item) => [item.id, item]));

export function getUtensilById(id: string): Utensil | undefined {
  return utensilMap.get(id);
}

export function getUtensilName(id: string): string {
  return utensilMap.get(id)?.name ?? id;
}
