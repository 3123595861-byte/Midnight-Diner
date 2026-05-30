import { SAMPLE_ORDER_TEXTS } from "@/components/order/sampleOrders";

/**
 * 预留：对接 AI 生成顾客点单内容
 * @returns 多段文本，每段对应对话框一页；当前返回示例数据
 */
export async function generateAIOrder(): Promise<string[]> {
  // TODO: 调用 GET /api/guest 或 LLM 接口
  return SAMPLE_ORDER_TEXTS;
}
