import type { Metadata } from "next";

import { SeoLandingPage } from "@/components/seo-landing-page";

export const metadata: Metadata = {
  title: "Real Estate Email Generator",
  description:
    "Generate real-estate listing email blasts and follow-up copy for your CRM, buyer list, or sphere from one property brief.",
  alternates: {
    canonical: "/real-estate-email-generator"
  }
};

export default function RealEstateEmailGeneratorPage() {
  return (
    <SeoLandingPage
      eyebrow="Real Estate Email Generator"
      title="Generate listing email blasts without rewriting the same property story for your CRM."
      description="MLSGPT helps agents create listing emails, subject lines, and follow-up copy that stay aligned with the MLS description and social campaign."
      primaryCta="Generate Email Copy"
      secondaryCta={{ href: "/generate", label: "Open Generator" }}
      proof={[
        { label: "Email subject + body", value: "Ready fast" },
        { label: "Matches listing angle", value: "Consistent" },
        { label: "Built for CRM workflows", value: "Agent-ready" }
      ]}
      sections={[
        {
          title: "Create the first draft faster",
          body: "Start with one listing brief and generate a subject line and email body that already know what makes the property worth opening."
        },
        {
          title: "Keep the campaign aligned",
          body: "Your email copy uses the same angle as the MLS remarks and social posts so the whole campaign feels more intentional."
        },
        {
          title: "Use for launches or updates",
          body: "This works for new listings, price refreshes, relaunches, and seller communication where the story needs to shift."
        }
      ]}
      examples={[
        {
          label: "Subject Line Example",
          body: "New Scottsdale listing with heated pool, designer updates, and serious indoor-outdoor appeal"
        },
        {
          label: "Email Body Example",
          body:
            "If your buyers are looking for turnkey Scottsdale living with vaulted ceilings, a renovated primary suite, and a resort-style backyard, this new listing deserves a close look. Reply for pricing details or private tour times."
        }
      ]}
      faqs={[
        {
          question: "Can this help me with listing email blasts?",
          answer: "Yes. That is one of the core outputs in the generator."
        },
        {
          question: "Does it only work for new listings?",
          answer: "No. It can also support price improvements, relaunches, and seller update workflows."
        },
        {
          question: "Will the email still need editing?",
          answer: "Usually some final editing is smart, but the value is getting to a strong first draft quickly."
        }
      ]}
    />
  );
}
