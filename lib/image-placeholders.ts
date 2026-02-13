export type PlaceholderSpec = {
  id: string;
  label: string;
  aspectRatio: string;
  prompt: string;
};

export const placeholders: PlaceholderSpec[] = [
  {
    id: "hero-command-center",
    label: "Hero Product Mockup",
    aspectRatio: "16/10",
    prompt:
      "Photoreal, premium SaaS dashboard on a modern laptop in a bright real-estate office, showing MLS listing transformed into social posts, calm daylight, high trust, no people, clean typography blocks, subtle depth of field, brand palette of navy teal sand, conversion-focused UI, 4k"
  },
  {
    id: "proof-agent-mobile",
    label: "Agent With Mobile Content",
    aspectRatio: "4/5",
    prompt:
      "Professional real estate agent in business-casual attire reviewing listing social media posts on smartphone beside a yard sign, suburban street background, confident expression, natural lighting, realistic skin texture, documentary commercial style, no logos, high trust"
  },
  {
    id: "workflow-automation",
    label: "Automation Workflow Illustration",
    aspectRatio: "3/2",
    prompt:
      "Editorial illustration of an automated marketing workflow for real estate: listing card enters on left, AI processing node in center, outputs to Instagram Facebook email and video script on right, modern geometric style, crisp labels, white background, navy teal amber accents"
  },
  {
    id: "social-proof-grid",
    label: "Social Preview Grid",
    aspectRatio: "16/9",
    prompt:
      "High-fidelity UI mockup collage of Instagram Facebook email snippets for a single luxury home listing, polished cards, realistic interface details, clear call-to-action buttons, tasteful shadows, neutral background, clean product marketing aesthetic"
  },
  {
    id: "pricing-trust-banner",
    label: "Trust Banner",
    aspectRatio: "21/9",
    prompt:
      "Minimal wide trust banner image featuring secure checkout concept: lock icon, credit card abstraction, compliance badges style, soft gradient background, enterprise clean design, no text, subtle premium lighting"
  }
];

export const placeholderById = Object.fromEntries(
  placeholders.map((item) => [item.id, item])
) as Record<string, PlaceholderSpec>;
