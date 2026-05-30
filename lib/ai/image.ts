import { getArkClient } from "@/lib/ai/client";

/**
 * 根据 image_prompt 调用 Ark 图像模型生成像素风食物图。
 * 失败时返回空字符串，不抛出异常。
 */
export async function generateFoodImage(imagePrompt: string): Promise<string> {
  const imageEndpoint = process.env.ARK_IMAGE_ENDPOINT;
  if (!imageEndpoint) {
    console.error("[generateFoodImage] Missing ARK_IMAGE_ENDPOINT");
    return "";
  }

  try {
    const client = getArkClient();
    const response = await client.images.generate({
      model: imageEndpoint,
      prompt: imagePrompt,
      n: 1,
      // Ark 这个接入点要求至少 3686400 像素，因此这里必须使用 1920x1920
      // 如果前端只想“显示得小”，应在页面里缩放展示，而不是把生成尺寸改小。
      size: "1920x1920",
    });

    console.log("[generateFoodImage] raw response:", JSON.stringify(response));

    const first = response.data?.[0];
    const url = first?.url;
    const b64 = first?.b64_json;

    if (url) return url;
    if (b64) return `data:image/png;base64,${b64}`;

    console.error("[generateFoodImage] Empty image response:", response);
    return "";
  } catch (error) {
    console.error("[generateFoodImage] Image generation failed:", error);
    return "";
  }
}
