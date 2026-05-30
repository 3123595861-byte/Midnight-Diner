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
      // 当前 Ark 图像接入点要求至少 3686400 像素（1920×1920），512×512 会被拒绝
      size: "1920x1920",
    });

    const url = response.data?.[0]?.url;
    return url ?? "";
  } catch (error) {
    console.error("[generateFoodImage] Image generation failed:", error);
    return "";
  }
}
