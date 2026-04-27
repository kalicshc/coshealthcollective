import { NextRequest, NextResponse } from "next/server";
import { CHATBOT_CONTEXT } from "@/lib/chatbotContext";
import { extractCta } from "@/lib/chatbotRouting";

const OPENAI_API_KEY = (process.env.OPENAI_API_KEY ?? process.env.OpenAI_API_KEY ?? "").trim();
const OPENAI_CHATBOT_MODEL = (process.env.OPENAI_CHATBOT_MODEL ?? "gpt-4o-mini").trim();

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type OpenAIResponseContent = {
  text?: unknown;
  type?: unknown;
};

type OpenAIResponseOutput = {
  content?: unknown;
  type?: unknown;
};

type OpenAIResponseBody = {
  output_text?: unknown;
  output?: unknown;
};

function normalizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];

  return input
    .filter((item): item is ChatMessage => {
      if (!item || typeof item !== "object") return false;
      const role = (item as { role?: unknown }).role;
      const content = (item as { content?: unknown }).content;
      return (role === "user" || role === "assistant") && typeof content === "string" && content.trim().length > 0;
    })
    .slice(-10);
}

function extractResponseText(data: OpenAIResponseBody): string {
  if (typeof data.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  if (!Array.isArray(data.output)) return "";

  return data.output
    .flatMap((item: OpenAIResponseOutput) => {
      if (!Array.isArray(item?.content)) return [];

      return item.content
        .map((content: OpenAIResponseContent) => {
          if (typeof content?.text === "string") return content.text;
          return "";
        })
        .filter(Boolean);
    })
    .join("\n")
    .trim();
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const pagePath = typeof body?.pagePath === "string" ? body.pagePath : "/";
  const messages = normalizeMessages(body?.messages);

  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user")?.content?.trim();

  if (!latestUserMessage) {
    return NextResponse.json({ error: "A message is required." }, { status: 400 });
  }

  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      {
        reply:
          "The chat assistant is not configured yet. Add `OPENAI_API_KEY` on the server to enable replies.",
      },
      { status: 503 }
    );
  }

  const input = [
    {
      role: "developer",
      content: `${CHATBOT_CONTEXT}\n\nThe visitor is currently on page: ${pagePath}`,
    },
    ...messages.map((message) => ({
      role: message.role,
      content: message.content,
    })),
  ];

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_CHATBOT_MODEL,
      input,
      max_output_tokens: 250,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Chatbot OpenAI error:", errorText);
    return NextResponse.json(
      {
        reply:
          "I hit a problem generating a reply. Please try again, or use the follow-up form and the team can respond directly.",
      },
      { status: 502 }
    );
  }

  const data = (await response.json()) as OpenAIResponseBody;
  const rawReply = extractResponseText(data);
  const { reply: cleanedReply, cta } = extractCta(rawReply);

  return NextResponse.json({
    reply:
      cleanedReply ||
      "Hmm, I didn't catch that. Want to try again, or fill out the follow-up form below?",
    cta,
  });
}
