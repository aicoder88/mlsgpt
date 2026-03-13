import { z } from "zod";

export const legacyListingInputSchema = z.object({
  address: z.string().min(8).max(140),
  city: z.string().min(2).max(80),
  state: z.string().min(2).max(40),
  price: z.string().min(3).max(30),
  beds: z.string().min(1).max(10),
  baths: z.string().min(1).max(10),
  sqft: z.string().min(2).max(20),
  propertyType: z.string().min(3).max(40),
  features: z.string().min(15).max(1500),
  tone: z.enum(["luxury", "warm", "straightforward", "investor-focused"]),
  targetChannel: z.enum(["buyers", "sellers", "investors", "relocation"])
});

export const listingInputSchema = z.object({
  address: z.string().min(8).max(140),
  city: z.string().min(2).max(80),
  state: z.string().min(2).max(40),
  price: z.string().min(3).max(30),
  beds: z.string().min(1).max(10),
  baths: z.string().min(1).max(10),
  sqft: z.string().min(2).max(20),
  propertyType: z.string().min(3).max(40),
  features: z.string().min(15).max(1500),
  neighborhood: z.string().min(10).max(400),
  idealBuyer: z.string().min(5).max(160),
  ctaPreference: z.string().min(5).max(120),
  tone: z.enum(["luxury", "warm", "straightforward", "investor-focused"]),
  targetChannel: z.enum(["buyers", "sellers", "investors", "relocation"]),
  listingGoal: z.enum([
    "new-launch",
    "open-house",
    "price-refresh",
    "stale-listing",
    "seller-update"
  ]),
  timeline: z.enum([
    "launch-this-week",
    "launch-this-month",
    "open-house-weekend",
    "nurture-campaign"
  ])
});

export const generatedPackSchema = z.object({
  title: z.string().min(12).max(120),
  heroAngle: z.string().min(12).max(120),
  positioningBrief: z.string().min(120).max(900),
  audienceProfile: z.string().min(80).max(400),
  launchReadinessScore: z.number().int().min(1).max(100),
  missingDetails: z.array(z.string().min(4).max(140)).max(6),
  bestHooks: z.array(z.string().min(12).max(180)).min(4).max(6),
  recommendedChannels: z.array(z.string().min(4).max(60)).min(3).max(6),
  launchPlan: z
    .array(
      z.object({
        day: z.string().min(2).max(40),
        focus: z.string().min(4).max(60),
        action: z.string().min(12).max(220),
        asset: z.string().min(4).max(80)
      })
    )
    .min(4)
    .max(6),
  mlsDescription: z.string().min(120).max(1800),
  instagramCaption: z.string().min(80).max(900),
  facebookPost: z.string().min(120).max(1200),
  emailBlast: z.string().min(180).max(2200),
  videoScript: z.string().min(120).max(1500),
  hashtags: z.array(z.string().min(2).max(40)).min(5).max(15),
  openHouseKit: z.object({
    headline: z.string().min(8).max(120),
    inviteText: z.string().min(60).max(500),
    followUpText: z.string().min(60).max(500)
  }),
  sellerUpdate: z.object({
    subject: z.string().min(8).max(140),
    summary: z.string().min(60).max(500),
    nextStep: z.string().min(20).max(220)
  }),
  fairHousingCheck: z.object({
    passed: z.boolean(),
    notes: z.array(z.string().min(3).max(140)).max(8)
  })
});

export const partialGenerationTargetSchema = z.enum([
  "mlsDescription",
  "emailBlast",
  "sellerUpdate"
]);

export const fullGenerationRequestSchema = z.object({
  mode: z.literal("full"),
  input: listingInputSchema
});

export const partialGenerationCurrentPackSchema = generatedPackSchema.extend({
  mlsDescription: z.string().max(1800),
  emailBlast: z.string().max(2200),
  sellerUpdate: generatedPackSchema.shape.sellerUpdate.extend({
    subject: z.string().max(140),
    summary: z.string().max(500),
    nextStep: z.string().max(220)
  })
});

export const partialGenerationRequestSchema = z.object({
  mode: z.literal("partial"),
  input: listingInputSchema,
  target: partialGenerationTargetSchema,
  currentPack: partialGenerationCurrentPackSchema,
  instruction: z.string().trim().max(280).optional()
});

export const partialGenerationOutputSchemas = {
  mlsDescription: z.object({
    mlsDescription: generatedPackSchema.shape.mlsDescription
  }),
  emailBlast: z.object({
    emailBlast: generatedPackSchema.shape.emailBlast
  }),
  sellerUpdate: z.object({
    sellerUpdate: generatedPackSchema.shape.sellerUpdate
  })
} as const;

export type ListingInput = z.infer<typeof listingInputSchema>;
export type LegacyListingInput = z.infer<typeof legacyListingInputSchema>;
export type GeneratedPack = z.infer<typeof generatedPackSchema>;
export type PartialGenerationTarget = z.infer<typeof partialGenerationTargetSchema>;
export type FullGenerationRequest = z.infer<typeof fullGenerationRequestSchema>;
export type PartialGenerationRequest = z.infer<typeof partialGenerationRequestSchema>;
