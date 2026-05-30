/** 从 LLM 回复中提取 JSON（支持 ```json 代码块） */
export function extractJsonContent(raw: string): string {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }
  return trimmed;
}

export function parseJsonObject(raw: string): Record<string, unknown> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(extractJsonContent(raw));
  } catch {
    throw new Error("LLM response is not valid JSON");
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("LLM response must be a JSON object");
  }

  return parsed as Record<string, unknown>;
}
