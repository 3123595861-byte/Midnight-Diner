import { NextResponse } from "next/server";
import type { CatalogApiRouteResponse } from "@/lib/types/ai";
import { INGREDIENTS } from "@/lib/data/ingredients";
import { UTENSILS } from "@/lib/data/utensils";
import { STAR_INCOME_MULTIPLIER } from "@/lib/constants/economy";
import {
  GUESTS_PER_DAY_MVP,
  INITIAL_MONEY,
  POISON_PENALTY,
} from "@/lib/constants/game";

/**
 * GET /api/catalog
 *
 * 前端初始化用：食材、厨具、经济常量（不含客人答案）
 */
export async function GET() {
  const response: CatalogApiRouteResponse = {
    success: true,
    data: {
      initial_money: INITIAL_MONEY,
      guests_per_day: GUESTS_PER_DAY_MVP,
      poison_penalty: POISON_PENALTY,
      star_income_multiplier: STAR_INCOME_MULTIPLIER,
      ingredients: INGREDIENTS.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        asset_key: item.assetKey,
      })),
      utensils: UTENSILS.map((item) => ({
        id: item.id,
        name: item.name,
        asset_key: item.assetKey,
      })),
    },
  };

  return NextResponse.json(response);
}
