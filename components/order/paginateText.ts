import { CONFIG } from "@/components/order/config";

/**
 * 将长文本按固定对话框容量分割为多页
 * 优先在句号、换行处断行，避免截断词语
 */
export function paginateText(
  pages: string[],
  charsPerLine = CONFIG.dialog.charsPerLine,
  linesPerPage = CONFIG.dialog.linesPerPage,
): string[] {
  const maxCharsPerPage = charsPerLine * linesPerPage;
  const result: string[] = [];

  for (const pageSource of pages) {
    const normalized = pageSource.replace(/\r\n/g, "\n").trim();
    if (!normalized) continue;

    if (normalized.length <= maxCharsPerPage) {
      result.push(normalized);
      continue;
    }

    let remaining = normalized;
    while (remaining.length > 0) {
      if (remaining.length <= maxCharsPerPage) {
        result.push(remaining);
        break;
      }

      let cut = maxCharsPerPage;
      const slice = remaining.slice(0, cut);
      const lastBreak = Math.max(
        slice.lastIndexOf("。"),
        slice.lastIndexOf("！"),
        slice.lastIndexOf("？"),
        slice.lastIndexOf("\n"),
        slice.lastIndexOf("，"),
      );

      if (lastBreak > cut * 0.4) {
        cut = lastBreak + 1;
      }

      result.push(remaining.slice(0, cut).trim());
      remaining = remaining.slice(cut).trim();
    }
  }

  return result.length > 0 ? result : [""];
}
