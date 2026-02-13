import type { ListingInput } from "@/lib/types";

export function buildSystemPrompt() {
  return [
    "You are an elite real-estate marketing copywriter for US agents.",
    "Return ONLY valid JSON matching the requested schema.",
    "Never include markdown code fences.",
    "Follow US Fair Housing rules and avoid references to protected classes.",
    "Do not use discriminatory language or steering.",
    "Keep claims truthful and avoid unverifiable superlatives.",
    "Write in a confident, conversion-focused tone appropriate to the requested style."
  ].join(" ");
}

export function buildUserPrompt(input: ListingInput) {
  return `Create a listing marketing pack using this schema:
{
  "title": string,
  "mlsDescription": string,
  "instagramCaption": string,
  "facebookPost": string,
  "emailBlast": string,
  "videoScript": string,
  "hashtags": string[],
  "fairHousingCheck": { "passed": boolean, "notes": string[] }
}

Input listing:
- Address: ${input.address}
- City: ${input.city}
- State: ${input.state}
- Price: ${input.price}
- Beds: ${input.beds}
- Baths: ${input.baths}
- Square Feet: ${input.sqft}
- Property Type: ${input.propertyType}
- Features: ${input.features}
- Tone: ${input.tone}
- Audience: ${input.targetChannel}

Requirements:
- MLS description: 140-220 words.
- Instagram caption: concise, line-broken, with CTA.
- Facebook post: story + CTA + open-house style close.
- Email blast: subject line on first line prefixed with "Subject:" then body.
- Video script: 45-60 second reel script with shot cues in brackets.
- Hashtags: 8-12 tags relevant to market and property type.
- fairHousingCheck.passed should be true only if copy is compliant; otherwise false + notes.
- Optimize for lead conversion without sounding spammy.
- Output JSON only.`;
}
