# MLSGPT

Vercel-ready Next.js SaaS for `mlsgpt.com`.

## What it includes

- Conversion-optimized landing page
- Live generator app (`/generate`) for MLS-to-marketing packs
- OpenAI-backed generation API (`/api/generate`) with validation + rate limiting
- Stripe checkout API (`/api/create-checkout`) for Starter/Pro subscriptions
- Checkout activation API (`/api/activate-subscription`) that issues signed paid-access cookies
- SEO setup: metadata, JSON-LD, `sitemap.xml`, `robots.txt`
- Legal/trust pages: privacy + terms
- Image placeholder system designed for post-generation automation

## Local run

```bash
pnpm install
pnpm dev
```

## Environment variables

Copy `.env.example` to `.env.local` and fill:

- `NEXT_PUBLIC_SITE_URL`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_STARTER`
- `STRIPE_PRICE_PRO`
- `ACCESS_TOKEN_SECRET` (long random string)
- optional: `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`

## Access model

- Free users: 3 generations per day
- Paid users: 300 generations/hour after successful Stripe checkout activation
- On `/success`, the app exchanges `session_id` for a signed `mlsgpt_access` cookie

## Vercel deployment

1. Import this folder into Vercel.
2. Set all env vars in Vercel Project Settings.
3. Deploy.
4. Point `mlsgpt.com` and `www.mlsgpt.com` DNS to Vercel.
5. Set `NEXT_PUBLIC_SITE_URL=https://mlsgpt.com` in production.

## Image placeholders (for nanobanannapro generation)

The app intentionally ships with machine-readable placeholders.

Detection selector:

- `[data-antigravity="image-placeholder"]`

Required attributes on each placeholder:

- `data-placeholder-id`
- `data-placeholder-label`
- `data-placeholder-aspect`
- `data-placeholder-prompt`

Current placeholder IDs:

- `hero-command-center`
- `proof-agent-mobile`
- `workflow-automation`
- `social-proof-grid`
- `pricing-trust-banner`

### nanobanannapro prompt pack

Use each prompt exactly once, named by ID:

- `hero-command-center`: Photoreal, premium SaaS dashboard on a modern laptop in a bright real-estate office, showing MLS listing transformed into social posts, calm daylight, high trust, no people, clean typography blocks, subtle depth of field, brand palette of navy teal sand, conversion-focused UI, 4k
- `proof-agent-mobile`: Professional real estate agent in business-casual attire reviewing listing social media posts on smartphone beside a yard sign, suburban street background, confident expression, natural lighting, realistic skin texture, documentary commercial style, no logos, high trust
- `workflow-automation`: Editorial illustration of an automated marketing workflow for real estate: listing card enters on left, AI processing node in center, outputs to Instagram Facebook email and video script on right, modern geometric style, crisp labels, white background, navy teal amber accents
- `social-proof-grid`: High-fidelity UI mockup collage of Instagram Facebook email snippets for a single luxury home listing, polished cards, realistic interface details, clear call-to-action buttons, tasteful shadows, neutral background, clean product marketing aesthetic
- `pricing-trust-banner`: Minimal wide trust banner image featuring secure checkout concept: lock icon, credit card abstraction, compliance badges style, soft gradient background, enterprise clean design, no text, subtle premium lighting

Save files to:

- `/public/images/generated/<placeholder-id>.webp`

Then map them in:

- `/lib/generated-images.ts`

Example:

```ts
export const generatedImages: Record<string, string> = {
  "hero-command-center": "/images/generated/hero-command-center.webp"
};
```
