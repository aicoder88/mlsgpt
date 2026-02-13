import { NextRequest, NextResponse } from "next/server";

import { getOpenAIClient } from "@/lib/openai";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompts";
import { rateLimit } from "@/lib/rate-limit";
import { generatedPackSchema, listingInputSchema } from "@/lib/types";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const throttle = rateLimit(ip, 20, 60 * 60 * 1000);

  if (!throttle.ok) {
    return NextResponse.json(
      { error: "Rate limit reached. Please try again later." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Remaining": String(throttle.remaining),
          "X-RateLimit-Reset": String(throttle.resetAt)
        }
      }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = listingInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input payload." }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  try {
    const client = getOpenAIClient();
    const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

    const completion = await client.chat.completions.create({
      model,
      temperature: 0.45,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: buildSystemPrompt() },
        { role: "user", content: buildUserPrompt(parsed.data) }
      ]
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Model returned empty output");
    }

    const raw = JSON.parse(content) as unknown;
    const output = generatedPackSchema.parse(raw);

    return NextResponse.json(
      { data: output },
      {
        headers: {
          "Cache-Control": "no-store",
          "X-RateLimit-Remaining": String(throttle.remaining),
          "X-RateLimit-Reset": String(throttle.resetAt)
        }
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Generation failed.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
