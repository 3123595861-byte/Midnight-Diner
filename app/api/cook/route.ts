import { NextResponse } from "next/server";
import type { CookRequestPayload } from "@/lib/types/ai";

/**
 * POST /api/cook
 * 接收玩家配方与客人故事，调用 LLM + 生图 API，返回评价与食物图片
 *
 * TODO: Phase 3 接入 LLM
 * TODO: Phase 4 接入图像生成
 */
export async function POST(request: Request) {
  try {
    const _payload = (await request.json()) as CookRequestPayload;

    return NextResponse.json(
      { error: "Cook API not implemented yet" },
      { status: 501 },
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
