import type { GeneratedPack, ListingInput, PartialGenerationTarget } from "@/lib/types";

export function buildSystemPrompt() {
  return [
    "You are an elite real-estate marketing strategist for US agents.",
    "Return ONLY valid JSON matching the requested schema.",
    "Never include markdown code fences.",
    "Follow US Fair Housing rules and avoid references to protected classes.",
    "Do not use discriminatory language or steering.",
    "Keep claims truthful and avoid unverifiable superlatives.",
    "Write in a confident, conversion-focused tone appropriate to the requested style.",
    "Think like a listing launch advisor, not just a copy generator."
  ].join(" ");
}

export function buildUserPrompt(input: ListingInput) {
  return `Create a listing marketing pack using this schema:
{
  "title": string,
  "heroAngle": string,
  "positioningBrief": string,
  "audienceProfile": string,
  "launchReadinessScore": number,
  "missingDetails": string[],
  "bestHooks": string[],
  "recommendedChannels": string[],
  "launchPlan": [
    { "day": string, "focus": string, "action": string, "asset": string }
  ],
  "mlsDescription": string,
  "instagramCaption": string,
  "facebookPost": string,
  "emailBlast": string,
  "videoScript": string,
  "hashtags": string[],
  "openHouseKit": {
    "headline": string,
    "inviteText": string,
    "followUpText": string
  },
  "sellerUpdate": {
    "subject": string,
    "summary": string,
    "nextStep": string
  },
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
- Neighborhood / location context: ${input.neighborhood}
- Ideal buyer: ${input.idealBuyer}
- Preferred CTA: ${input.ctaPreference}
- Tone: ${input.tone}
- Audience: ${input.targetChannel}
- Primary goal: ${input.listingGoal}
- Timeline: ${input.timeline}

Requirements:
- Title: sharp listing headline, not clickbait.
- heroAngle: one high-conviction angle for how the listing should be positioned.
- positioningBrief: 2 concise paragraphs on positioning, emotional story, and what to emphasize first.
- audienceProfile: describe the likely buyer and what matters to them.
- launchReadinessScore: integer 1-100 based on how complete and marketable the listing input is.
- missingDetails: list 0-6 concrete details that would materially improve marketing output.
- bestHooks: 4-6 hook lines the agent can use across channels.
- recommendedChannels: 3-6 channels or tactics most appropriate for this listing and goal.
- launchPlan: 4-6 sequential campaign steps tailored to the stated goal and timeline.
- MLS description: 140-220 words.
- Instagram caption: concise, line-broken, with CTA.
- Facebook post: story + CTA + open-house style close.
- Email blast: subject line on first line prefixed with "Subject:" then body.
- Video script: 45-60 second reel script with shot cues in brackets.
- Hashtags: 8-12 tags relevant to market and property type.
- openHouseKit.headline: signage or event headline.
- openHouseKit.inviteText: short pre-event invitation copy.
- openHouseKit.followUpText: short post-event follow-up.
- sellerUpdate.subject: plain-English seller update subject line.
- sellerUpdate.summary: concise update explaining the marketing game plan.
- sellerUpdate.nextStep: the next recommended action the agent should take.
- fairHousingCheck.passed should be true only if copy is compliant; otherwise false + notes.
- Optimize for lead conversion without sounding spammy.
- If input lacks important detail, reflect that honestly in launchReadinessScore and missingDetails.
- Output JSON only.`;
}

export function buildPartialUserPrompt(args: {
  input: ListingInput;
  target: PartialGenerationTarget;
  currentPack: GeneratedPack;
  instruction?: string;
}) {
  const { input, target, currentPack, instruction } = args;
  const schema =
    target === "mlsDescription"
      ? `{
  "mlsDescription": string
}`
      : target === "emailBlast"
        ? `{
  "emailBlast": string
}`
        : `{
  "sellerUpdate": {
    "subject": string,
    "summary": string,
    "nextStep": string
  }
}`;

  const targetRequirements =
    target === "mlsDescription"
      ? [
          "- Regenerate only the MLS description.",
          "- Keep it 140-220 words, accurate, fair-housing compliant, and easy to paste into the MLS.",
          "- Maintain alignment with the existing positioning, title, and campaign angle.",
          "- Do not include bullet points or section labels."
        ]
      : target === "emailBlast"
        ? [
            "- Regenerate only the email blast.",
            '- Return a single string where the first line starts with "Subject:" and the remaining lines are the email body.',
            "- Keep the tone aligned with the existing campaign and make the CTA explicit.",
            "- Make it polished enough to paste directly into a CRM email send."
          ]
        : [
            "- Regenerate only the seller update object.",
            "- subject should feel plain-English and ready to send.",
            "- summary should explain what the campaign is doing and why.",
            "- nextStep should be a clear recommendation the agent can act on immediately."
          ];

  return `Regenerate just one asset from an existing listing marketing workspace.

Return ONLY valid JSON matching this schema:
${schema}

Listing input:
- Address: ${input.address}
- City: ${input.city}
- State: ${input.state}
- Price: ${input.price}
- Beds: ${input.beds}
- Baths: ${input.baths}
- Square Feet: ${input.sqft}
- Property Type: ${input.propertyType}
- Features: ${input.features}
- Neighborhood / location context: ${input.neighborhood}
- Ideal buyer: ${input.idealBuyer}
- Preferred CTA: ${input.ctaPreference}
- Tone: ${input.tone}
- Audience: ${input.targetChannel}
- Primary goal: ${input.listingGoal}
- Timeline: ${input.timeline}

Existing workspace context:
- Title: ${currentPack.title}
- Hero angle: ${currentPack.heroAngle}
- Positioning brief: ${currentPack.positioningBrief}
- Audience profile: ${currentPack.audienceProfile}
- Best hooks: ${currentPack.bestHooks.join(" | ")}
- Recommended channels: ${currentPack.recommendedChannels.join(" | ")}
- Current MLS description: ${currentPack.mlsDescription}
- Current email blast: ${currentPack.emailBlast}
- Current seller update subject: ${currentPack.sellerUpdate.subject}
- Current seller update summary: ${currentPack.sellerUpdate.summary}
- Current seller update next step: ${currentPack.sellerUpdate.nextStep}

Requested target: ${target}
${instruction ? `Adjustment note from the agent: ${instruction}` : "Adjustment note from the agent: none provided."}

Requirements:
${targetRequirements.join("\n")}
- Keep the output truthful, non-discriminatory, and consistent with the listing facts.
- Do not regenerate any other fields.
- Output JSON only.`;
}
