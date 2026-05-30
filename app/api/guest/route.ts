import { NextResponse } from "next/server";
import type { GuestApiRouteResponse } from "@/lib/types/ai";
import { getGuestCountForDay, getGuestForDay } from "@/lib/data/guests";

function errorResponse(
  message: string,
  status: number,
): NextResponse<GuestApiRouteResponse> {
  return NextResponse.json({ success: false, error: message }, { status });
}

/**
 * GET /api/guest?day=1&index=0
 *
 * 获取指定天数、指定序号的客人故事（不含核心食材答案，防剧透）
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const day = Number(searchParams.get("day") ?? "1");
  const index = Number(searchParams.get("index") ?? "0");

  if (!Number.isInteger(day) || day < 1) {
    return errorResponse("Query param day must be a positive integer", 400);
  }
  if (!Number.isInteger(index) || index < 0) {
    return errorResponse("Query param index must be a non-negative integer", 400);
  }

  const guest = getGuestForDay(day, index);
  if (!guest) {
    return errorResponse(`No guest found for day=${day}, index=${index}`, 404);
  }

  const response: GuestApiRouteResponse = {
    success: true,
    data: {
      guest_id: guest.guestId,
      name: guest.name,
      story: guest.story,
      difficulty: guest.difficulty,
      asset_key: guest.assetKey,
      day,
      index,
      guests_total: getGuestCountForDay(day),
    },
  };

  return NextResponse.json(response);
}
