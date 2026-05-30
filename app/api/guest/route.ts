import { NextResponse } from "next/server";
import type { GuestApiRouteResponse } from "@/lib/types/ai";
import type { GuestEntry } from "@/lib/data/guests";
import {
  getGuestCountForDay,
  getGuestForDay,
} from "@/lib/data/guests";
import { acquireGuest, warmGuestPool } from "@/lib/game/guest-pool";

function errorResponse(
  message: string,
  status: number,
): NextResponse<GuestApiRouteResponse> {
  return NextResponse.json({ success: false, error: message }, { status });
}

function parseExcludeIds(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

function buildGuestResponse(
  guest: GuestEntry,
  day: number,
  index: number,
  guestsTotal: number,
): GuestApiRouteResponse {
  return {
    success: true,
    data: {
      guest_id: guest.guestId,
      name: guest.name,
      story: guest.story,
      difficulty: guest.difficulty,
      asset_key: guest.assetKey,
      day,
      index,
      guests_total: guestsTotal,
    },
  };
}

/**
 * GET /api/guest?day=1&index=0
 * GET /api/guest?day=1&warm=1          — 仅预热客人池
 * GET /api/guest?day=1&exclude=gen_xxx
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const day = Number(searchParams.get("day") ?? "1");
  const index = Number(searchParams.get("index") ?? "0");
  const source = searchParams.get("source");
  const warmOnly = searchParams.get("warm") === "1";
  const excludeIds = parseExcludeIds(searchParams.get("exclude"));

  if (!Number.isInteger(day) || day < 1) {
    return errorResponse("Query param day must be a positive integer", 400);
  }
  if (!Number.isInteger(index) || index < 0) {
    return errorResponse("Query param index must be a non-negative integer", 400);
  }

  if (warmOnly) {
    warmGuestPool(day);
    return NextResponse.json({ success: true });
  }

  if (source === "static") {
    const guest = getGuestForDay(day, index);
    if (!guest) {
      return errorResponse(`No guest found for day=${day}, index=${index}`, 404);
    }
    return NextResponse.json(
      buildGuestResponse(guest, day, index, getGuestCountForDay(day)),
    );
  }

  try {
    const result = await acquireGuest({
      day,
      index,
      excludeGuestIds: excludeIds,
    });

    warmGuestPool(day);

    return NextResponse.json(
      buildGuestResponse(
        result.guest,
        result.day,
        result.index,
        result.guestsTotal,
      ),
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to generate guest story";
    return errorResponse(message, 500);
  }
}
