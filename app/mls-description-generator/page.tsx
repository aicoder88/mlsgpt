import type { Metadata } from "next";

import { SeoLandingPage } from "@/components/seo-landing-page";

export const metadata: Metadata = {
  title: "MLS Description Generator",
  description:
    "Generate cleaner, stronger MLS listing descriptions from one real-estate property brief with MLSGPT.",
  alternates: {
    canonical: "/mls-description-generator"
  }
};

export default function MlsDescriptionGeneratorPage() {
  return (
    <SeoLandingPage
      eyebrow="MLS Description Generator"
      title="Write stronger MLS listing descriptions without starting from a blank page."
      description="MLSGPT helps agents turn raw listing facts into cleaner MLS descriptions with stronger positioning, better buyer language, and a faster editing starting point."
      primaryCta="Generate MLS Copy"
      secondaryCta={{ href: "/", label: "Back To Homepage" }}
      proof={[
        { label: "Built for real-estate agents", value: "Agent-first" },
        { label: "Average generation speed", value: "Under 60s" },
        { label: "Included with the app", value: "MLS + more" }
      ]}
      sections={[
        {
          title: "Start with listing facts",
          body: "Paste the address, pricing, property features, neighborhood context, buyer angle, and CTA once instead of rewriting the same listing from scratch."
        },
        {
          title: "Generate a sharper lead angle",
          body: "The app reframes the listing around story, positioning, and buyer appeal so your MLS copy feels more specific than a spec dump."
        },
        {
          title: "Use the result as your base draft",
          body: "Agents can copy the description as-is or tighten it for brand voice, local style, and brokerage review before publishing."
        }
      ]}
      examples={[
        {
          label: "MLS Description Example",
          body:
            "Renovated Scottsdale single-level with vaulted ceilings, a quartz island kitchen, and a resort-style backyard with heated pool and pergola. The split-floorplan supports privacy, while the open living spaces make indoor-outdoor entertaining feel easy."
        },
        {
          label: "Lead Angle Example",
          body:
            "Lead with turnkey outdoor living and private-tour urgency rather than opening on beds and baths. That creates a stronger emotional entry into the property."
        }
      ]}
      faqs={[
        {
          question: "Can this help me write MLS remarks faster?",
          answer: "Yes. The workflow is designed to turn one listing brief into a usable draft quickly, so agents spend less time staring at an empty field."
        },
        {
          question: "Does it only write the MLS description?",
          answer: "No. MLSGPT also builds social captions, email copy, open house assets, and seller communication from the same property."
        },
        {
          question: "Will the copy still need review?",
          answer: "Yes. It should be treated as a high-quality draft that you review for brokerage standards, compliance, and final polish."
        }
      ]}
    />
  );
}
