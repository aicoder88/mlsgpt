import { z } from "zod";

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
  tone: z.enum(["luxury", "warm", "straightforward", "investor-focused"]),
  targetChannel: z.enum(["buyers", "sellers", "investors", "relocation"]) 
});

export const generatedPackSchema = z.object({
  title: z.string().min(12).max(120),
  mlsDescription: z.string().min(120).max(1800),
  instagramCaption: z.string().min(80).max(900),
  facebookPost: z.string().min(120).max(1200),
  emailBlast: z.string().min(180).max(2200),
  videoScript: z.string().min(120).max(1500),
  hashtags: z.array(z.string().min(2).max(40)).min(5).max(15),
  fairHousingCheck: z.object({
    passed: z.boolean(),
    notes: z.array(z.string().min(3).max(140)).max(8)
  })
});

export type ListingInput = z.infer<typeof listingInputSchema>;
export type GeneratedPack = z.infer<typeof generatedPackSchema>;
