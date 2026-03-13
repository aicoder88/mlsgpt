import type { Metadata } from "next";

import { SeoLandingPage } from "@/components/seo-landing-page";

export const metadata: Metadata = {
  title: "AI For Real Estate Agents",
  description:
    "See how MLSGPT helps real-estate agents use AI for MLS descriptions, social captions, open house marketing, email blasts, and seller updates.",
  alternates: {
    canonical: "/ai-for-real-estate-agents"
  }
};

export default function AiForRealEstateAgentsPage() {
  return (
    <SeoLandingPage
      eyebrow="AI For Real Estate Agents"
      title="Use AI for real-estate listing marketing without handing your voice over to generic prompts."
      description="MLSGPT is built around one of the most repetitive jobs in the business: turning a single listing into copy for MLS, social, email, open house promotion, and seller communication."
      primaryCta="Try AI For Listings"
      secondaryCta={{ href: "/", label: "View Homepage" }}
      proof={[
        { label: "Primary use case", value: "Listings" },
        { label: "Audience", value: "Agents + teams" },
        { label: "Output surfaces", value: "Multiple" }
      ]}
      sections={[
        {
          title: "Use AI where repetition is highest",
          body: "Agents rewrite the same listing story across multiple channels. This is where AI can save real time if the workflow is structured correctly."
        },
        {
          title: "Keep the story consistent",
          body: "The product is built to keep MLS copy, social captions, email, and seller updates aligned around one positioning angle."
        },
        {
          title: "Move from blank page to working draft",
          body: "The strongest use of AI here is not blind autopilot. It is getting to a high-quality draft faster, then reviewing before publishing."
        }
      ]}
      examples={[
        {
          label: "Workflow Example",
          body:
            "A new listing launches on Thursday. In one session, the agent generates MLS copy, an Instagram caption, a Facebook post, an email blast, and open house follow-up language."
        },
        {
          label: "Seller Communication Example",
          body:
            "The seller update reframes the launch around indoor-outdoor living, private tour urgency, and buyer fit so the next conversation is more strategic."
        }
      ]}
      faqs={[
        {
          question: "What is the best use of AI for real-estate agents?",
          answer: "One of the clearest use cases is turning listing data into multiple marketing assets quickly while keeping the story consistent."
        },
        {
          question: "Is this meant to replace review and compliance checks?",
          answer: "No. It should accelerate drafting, but agents still need to review output before it goes live."
        },
        {
          question: "Can one tool cover MLS, social, email, and open house copy?",
          answer: "That is the main promise of MLSGPT: one brief in, multiple campaign assets out."
        }
      ]}
    />
  );
}
