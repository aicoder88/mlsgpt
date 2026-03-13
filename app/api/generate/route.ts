import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { verifyAccessToken } from "@/lib/access-token";
import { getOpenAIClient } from "@/lib/openai";
import { buildPartialUserPrompt, buildSystemPrompt, buildUserPrompt } from "@/lib/prompts";
import { rateLimit } from "@/lib/rate-limit";
import {
  fullGenerationRequestSchema,
  generatedPackSchema,
  legacyListingInputSchema,
  partialGenerationOutputSchemas,
  partialGenerationRequestSchema,
  type LegacyListingInput,
  type ListingInput
} from "@/lib/types";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const accessCookie = request.cookies.get("mlsgpt_access")?.value;
  const signingSecret = process.env.ACCESS_TOKEN_SECRET;

  const verified =
    accessCookie && signingSecret ? verifyAccessToken(accessCookie, signingSecret) : null;
  const planTier = verified ? "paid" : "free";
  const rateWindowMs = verified ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
  const rateLimitCount = verified ? 300 : 3;
  const throttle = rateLimit(`${ip}:${planTier}`, rateLimitCount, rateWindowMs);

  if (!throttle.ok) {
    const message = verified
      ? "Rate limit reached for your current plan. Please try again soon."
      : "Free trial limit reached (3 generations/day). Upgrade to continue.";

    return NextResponse.json(
      { error: message },
      {
        status: 429,
        headers: {
          "X-Plan-Tier": planTier,
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

  const fullRequest = fullGenerationRequestSchema.safeParse(body);
  const partialRequest = partialGenerationRequestSchema.safeParse(body);
  const legacyFullRequest = legacyListingInputSchema.safeParse(body);

  if (!fullRequest.success && !partialRequest.success && !legacyFullRequest.success) {
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
    let input;
    let prompt: string;

    if (partialRequest.success) {
      input = partialRequest.data.input;
      prompt = buildPartialUserPrompt(partialRequest.data);
    } else if (fullRequest.success) {
      input = fullRequest.data.input;
      prompt = buildUserPrompt(input);
    } else if (legacyFullRequest.success) {
      input = upgradeLegacyListingInput(legacyFullRequest.data);
      prompt = buildUserPrompt(input);
    } else {
      return NextResponse.json({ error: "Invalid input payload." }, { status: 400 });
    }

    const completion = await client.chat.completions.create({
      model,
      temperature: 0.45,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: buildSystemPrompt() },
        { role: "user", content: prompt }
      ]
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Model returned empty output");
    }

    const raw = JSON.parse(content) as unknown;
    const output = partialRequest.success
      ? partialGenerationOutputSchemas[partialRequest.data.target].parse(raw)
      : generatedPackSchema.parse(raw);

    return NextResponse.json(
      { data: output },
      {
        headers: {
          "Cache-Control": "no-store",
          "X-Plan-Tier": planTier,
          "X-RateLimit-Remaining": String(throttle.remaining),
          "X-RateLimit-Reset": String(throttle.resetAt)
        }
      }
    );
  } catch (error) {
    const message =
      error instanceof z.ZodError
        ? "Model response did not match the expected output shape."
        : error instanceof Error
          ? error.message
          : "Generation failed.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function upgradeLegacyListingInput(input: LegacyListingInput): ListingInput {
  return {
    ...input,
    neighborhood: "Location context not provided. Focus on nearby amenities, convenience, and lifestyle fit.",
    idealBuyer: defaultIdealBuyerByAudience[input.targetChannel],
    ctaPreference: "Invite a private showing or request the full property details.",
    listingGoal: "new-launch",
    timeline: "launch-this-week"
  };
}

const defaultIdealBuyerByAudience: Record<ListingInput["targetChannel"], ListingInput["idealBuyer"]> = {
  buyers: "Buyer looking for a home that aligns with their lifestyle and day-to-day needs.",
  sellers: "Seller-focused audience evaluating positioning, presentation, and next-step strategy.",
  investors: "Investor looking for a property with practical upside, flexibility, or income potential.",
  relocation: "Relocating buyer who values confidence, convenience, and a clear picture of the lifestyle."
};
