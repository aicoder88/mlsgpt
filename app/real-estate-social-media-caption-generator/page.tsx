import type { Metadata } from "next";

import { SeoLandingPage } from "@/components/seo-landing-page";

export const metadata: Metadata = {
  title: "Real Estate Social Media Caption Generator",
  description:
    "Generate Instagram and Facebook captions for real-estate listings with stronger hooks, CTAs, and property-specific angles.",
  alternates: {
    canonical: "/real-estate-social-media-caption-generator"
  }
};

export default function RealEstateSocialMediaCaptionGeneratorPage() {
  return (
    <SeoLandingPage
      eyebrow="Social Caption Generator"
      title="Generate real-estate social media captions that sound tied to the listing, not generic."
      description="MLSGPT turns one property brief into Instagram and Facebook caption drafts with sharper hooks, stronger calls to action, and a clearer story around the home."
      primaryCta="Generate Social Captions"
      secondaryCta={{ href: "/generate", label: "Open Full Generator" }}
      proof={[
        { label: "Channels covered", value: "Instagram + Facebook" },
        { label: "Listing-specific hooks", value: "Story-led" },
        { label: "Built for launch urgency", value: "Agent-ready" }
      ]}
      sections={[
        {
          title: "Hooks that fit the property",
          body: "The tool pulls from the listing's best details so the opening line reflects the actual home, not a recycled caption formula."
        },
        {
          title: "CTAs with better intent",
          body: "Instead of weak generic prompts, the workflow gives you clearer next steps like book a private showing, request the upgrades list, or RSVP to the open house."
        },
        {
          title: "One brief, multiple formats",
          body: "Generate social captions alongside MLS copy, email, and seller messaging so the campaign stays consistent across channels."
        }
      ]}
      examples={[
        {
          label: "Instagram Caption Example",
          body:
            "Pool days, vaulted ceilings, and a chef kitchen that actually deserves the headline. Private tours now booking for this Scottsdale launch."
        },
        {
          label: "Facebook Post Example",
          body:
            "Just listed in Scottsdale: renovated 4-bed with heated pool, quartz kitchen, and a split layout built for indoor-outdoor living. Message for details or private tour times."
        }
      ]}
      faqs={[
        {
          question: "Can this write captions for both Instagram and Facebook?",
          answer: "Yes. The generator can produce social copy variants tuned for each channel from the same property brief."
        },
        {
          question: "Does it add hashtags too?",
          answer: "Yes. The full generator includes hashtag output along with the social captions."
        },
        {
          question: "Can I reuse the same story angle across channels?",
          answer: "That is one of the main benefits. MLSGPT keeps the same listing angle across MLS, social, email, and seller updates."
        }
      ]}
    />
  );
}
