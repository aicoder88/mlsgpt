import type { Metadata } from "next";

import { SeoLandingPage } from "@/components/seo-landing-page";

export const metadata: Metadata = {
  title: "Open House Marketing Generator",
  description:
    "Generate open house headlines, invite copy, and follow-up messaging for real-estate listings with MLSGPT.",
  alternates: {
    canonical: "/open-house-marketing-generator"
  }
};

export default function OpenHouseMarketingGeneratorPage() {
  return (
    <SeoLandingPage
      eyebrow="Open House Marketing Generator"
      title="Create open house marketing copy without rebuilding the listing story by hand."
      description="MLSGPT helps agents turn one listing into event headlines, invite text, and post-event follow-up so open house promotion fits the rest of the campaign."
      primaryCta="Generate Open House Copy"
      secondaryCta={{ href: "/", label: "See Homepage" }}
      proof={[
        { label: "Event headline", value: "Included" },
        { label: "Invite + follow-up", value: "Included" },
        { label: "Fits the full listing campaign", value: "One workflow" }
      ]}
      sections={[
        {
          title: "Promote the event with the right angle",
          body: "Use the same property positioning for the event headline so the open house marketing feels connected to the listing launch."
        },
        {
          title: "Write the invite faster",
          body: "The app creates open house invite copy that sounds more tailored than a standard date-and-time announcement."
        },
        {
          title: "Follow up while the visit is fresh",
          body: "Generate a quick follow-up text so interested buyers get the next step while the showing is still top of mind."
        }
      ]}
      examples={[
        {
          label: "Open House Headline",
          body: "See Scottsdale's new indoor-outdoor standout before the weekend calendar fills up."
        },
        {
          label: "Follow-up Text",
          body:
            "Thanks for stopping by today. If you want the upgrades list, pricing details, or a private second showing, reply and I will send everything over."
        }
      ]}
      faqs={[
        {
          question: "Is this only for open house invites?",
          answer: "No. The workflow also creates post-event follow-up and fits inside the broader listing campaign."
        },
        {
          question: "Can I use this for weekend event promotion?",
          answer: "Yes. It is built for launch-week and open-house-weekend use cases."
        },
        {
          question: "Does it help if I am promoting the listing across channels too?",
          answer: "Yes. Open house assets are generated alongside MLS copy, social posts, and email so the story remains aligned."
        }
      ]}
    />
  );
}
