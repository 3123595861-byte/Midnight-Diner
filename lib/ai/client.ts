import OpenAI from "openai";

let arkClient: OpenAI | null = null;

export function getArkClient(): OpenAI {
  if (!process.env.ARK_API_KEY) {
    throw new Error("Missing ARK_API_KEY environment variable");
  }

  if (!arkClient) {
    arkClient = new OpenAI({
      apiKey: process.env.ARK_API_KEY,
      baseURL: "https://ark.cn-beijing.volces.com/api/v3",
    });
  }

  return arkClient;
}
