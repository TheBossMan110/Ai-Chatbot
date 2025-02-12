import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { initialMessage } from "@/lib/data";

const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
    compatibility: "strict",
});

export const runtime = "edge";

export async function POST(req: Request) {
 const { messages } = await req.json();
 const stream = await streamText({
    model: openai("gpt-4o-mini"),
    messages: [initialMessage, ...messages],
    temperature: 1,
});

return stream?.toDataStreamResponse();
}