import type { Metadata } from "next";
import Link from "next/link";

import { CheckoutButton } from "@/components/checkout-button";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { RoiPoweredLink } from "@/components/roi-powered-link";

export const metadata: Metadata = {
  title: "AI Real Estate Listing Description Generator",
  description:
    "Generate MLS descriptions, real estate social media captions, email blasts, open house promos, and seller updates from one listing brief.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "AI Real Estate Listing Description Generator | MLSGPT",
    description:
      "Generate MLS descriptions, social captions, open house promos, email blasts, and seller updates for real-estate listings.",
    url: "/"
  },
  twitter: {
    title: "AI Real Estate Listing Description Generator | MLSGPT",
    description: "MLS listing in. Full real-estate marketing pack out."
  }
};

const workflowSteps = [
  {
    step: "01",
    title: "Paste one listing brief",
    body: "Drop in the address, pricing, features, neighborhood context, buyer angle, and CTA once."
  },
  {
    step: "02",
    title: "Generate the full campaign",
    body: "MLSGPT turns the listing into MLS copy, social captions, email text, video hooks, open house copy, and seller updates."
  },
  {
    step: "03",
    title: "Publish or hand off fast",
    body: "Copy individual assets, export the full campaign bundle, and move the listing live faster."
  }
];

const useCases = [
  {
    href: "/mls-description-generator",
    title: "MLS Description Generator",
    body: "Write cleaner, stronger, buyer-ready MLS remarks without starting from a blank page."
  },
  {
    href: "/real-estate-social-media-caption-generator",
    title: "Real Estate Social Caption Generator",
    body: "Generate Instagram and Facebook copy with stronger hooks, CTAs, and listing-specific angles."
  },
  {
    href: "/open-house-marketing-generator",
    title: "Open House Marketing Generator",
    body: "Create event headlines, invite copy, and follow-up messaging in one workflow."
  },
  {
    href: "/real-estate-email-generator",
    title: "Real Estate Email Generator",
    body: "Turn a listing into a fast email blast for your CRM, sphere, or buyer list."
  }
];

const sampleOutputs = [
  {
    label: "MLS Description",
    body:
      "Renovated Scottsdale single-level with vaulted ceilings, a resort-style backyard, quartz chef kitchen, and a turnkey split-floorplan that fits indoor-outdoor living."
  },
  {
    label: "Instagram Caption",
    body:
      "Pool days, vaulted ceilings, and a chef kitchen that actually earns the headline. Private tours now booking for this Scottsdale launch."
  },
  {
    label: "Email Blast",
    body:
      "New Scottsdale listing: upgraded 4-bed with heated pool, refined primary suite, and strong lock-and-leave appeal near golf and dining."
  },
  {
    label: "Seller Update",
    body:
      "We should lead with turnkey outdoor living and private-tour urgency. That angle gives the launch a clearer story than leading on specs alone."
  }
];

const faqItems = [
  {
    question: "What does MLSGPT generate for real-estate agents?",
    answer:
      "MLSGPT generates MLS descriptions, Instagram captions, Facebook posts, email blasts, open house promos, seller updates, and short video scripts from one listing brief."
  },
  {
    question: "Is MLSGPT only for MLS listing descriptions?",
    answer:
      "No. The product starts with listing copy, but it is designed to build a full real-estate marketing pack around the same property."
  },
  {
    question: "Can I use MLSGPT for open house marketing?",
    answer:
      "Yes. The generator creates open house headlines, invite copy, and follow-up text for event promotion and lead follow-up."
  },
  {
    question: "Does MLSGPT include fair-housing awareness?",
    answer:
      "MLSGPT applies compliance-focused instructions and includes a fair-housing review note so agents can check copy before publishing."
  },
  {
    question: "Who is MLSGPT built for?",
    answer:
      "The product is built for solo agents, listing coordinators, lean broker teams, and marketing assistants who need to turn one listing into multiple channel assets quickly."
  }
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MLSGPT",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "39",
    category: "subscription"
  },
  description: "AI engine that turns MLS listings into full real-estate marketing packs for agents."
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MLSGPT",
  url: "https://mlsgpt.com",
  description: "AI marketing software for real-estate agents and broker teams."
};

export default function HomePage() {
  return (
    <>
      <section className="hero-glow border-b border-line/60">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:pt-20">
          <div className="reveal">
            <p className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              AI Real Estate Listing Description Generator
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Generate MLS descriptions, social captions, and seller-ready listing marketing from one brief.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/75">
              MLSGPT helps real-estate agents turn one property into MLS copy, Instagram captions, Facebook posts,
              email blasts, open house promos, and seller updates in under a minute.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#123a60]"
              >
                Try The Generator
              </Link>
              <a
                href="#sample-outputs"
                className="inline-flex items-center justify-center rounded-xl border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/45"
              >
                See Sample Outputs
              </a>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {useCases.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-line/80 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink/70 transition hover:border-accent/30 hover:text-ink"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <div className="mt-8 grid max-w-2xl gap-3 text-sm sm:grid-cols-3">
              <TrustStat value="60s" label="Average generation time" />
              <TrustStat value="MLS + social" label="Multi-channel output from one listing" />
              <TrustStat value="3/day" label="Free daily generations before upgrade" />
            </div>
          </div>

          <div className="reveal lg:pl-6">
            <ImagePlaceholder id="hero-command-center" priority className="shadow-glow" />
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              One listing brief. Full real-estate marketing pack.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink/75">
              Instead of writing the same property from scratch for MLS, email, social, and open house promotion,
              MLSGPT builds the whole campaign around the same story angle.
            </p>
            <div className="mt-6 grid gap-4">
              <Feature title="MLS Description" body="Generate cleaner, stronger MLS listing copy that reads like a real agent wrote it." />
              <Feature title="Social Media Captions" body="Build Instagram and Facebook captions with listing-specific hooks, CTAs, and angles." />
              <Feature title="Email Blast" body="Create ready-to-send real-estate email copy for your CRM, sphere, or active buyer list." />
              <Feature title="Open House + Seller Updates" body="Cover launch events, follow-up messaging, and seller-facing communication in the same workflow." />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <ImagePlaceholder id="social-proof-grid" className="sm:col-span-2" />
            <ImagePlaceholder id="proof-agent-mobile" />
            <ImagePlaceholder id="workflow-automation" />
          </div>
        </div>
      </section>

      <section className="border-y border-line/70 bg-white/70">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">How It Works</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Built for fast listing launches, not generic AI prompts.
            </h2>
            <p className="mt-4 text-base leading-7 text-ink/75">
              The workflow is simple enough for solo agents and structured enough for listing coordinators and broker teams.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {workflowSteps.map((item) => (
              <WorkflowStep key={item.step} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section id="sample-outputs" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Sample Outputs</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              The kind of output agents actually need to publish.
            </h2>
            <p className="mt-4 text-base leading-7 text-ink/75">
              These are the surfaces that matter most when a new listing goes live: MLS copy, social hooks, email, and
              seller communication.
            </p>
          </div>

          <Link
            href="/generate"
            className="inline-flex items-center justify-center rounded-xl border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-accent/45"
          >
            Generate Your Own Pack
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {sampleOutputs.map((item) => (
            <SampleOutputCard key={item.label} {...item} />
          ))}
        </div>
      </section>

      <section className="border-y border-line/70 bg-white/70">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Search-Focused Pages</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Explore the real-estate workflows this product is built to support.
            </h2>
            <p className="mt-4 text-base leading-7 text-ink/75">
              These pages are designed around the specific jobs agents search for, from MLS listing descriptions to
              open house marketing and email copy.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {useCases.map((item) => (
              <UseCaseCard key={item.href} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section id="trust" className="border-b border-line/70 bg-white/70">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Trust-first architecture</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-ink/75">
            Built for professional teams: secure payments, API-key isolation, fair-housing-aware generation guidance,
            and a workflow that keeps agents moving without outsourcing copywriting every time a listing goes live.
          </p>
          <RoiPoweredLink className="mt-3 text-sm leading-6 text-ink/56" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <TrustCard title="Secure Checkout" body="Stripe-hosted checkout with subscription controls and promotion code support." />
            <TrustCard title="Rate-Limit Guard" body="Built-in throttling protects the service and keeps paid usage predictable." />
            <TrustCard title="Compliance Layer" body="Fair-housing-aware generation instructions with a review note before publishing." />
          </div>
          <div className="mt-5">
            <ImagePlaceholder id="pricing-trust-banner" />
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Pricing</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Simple recurring pricing for listing output.</h2>
          <p className="mt-3 text-base leading-7 text-ink/75">
            Start with the free demo tier, validate the output quality on a real property, then upgrade when it saves
            enough time to matter.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <PricingCard
            plan="Starter"
            price="$39/mo"
            description="For solo agents who need consistent MLS descriptions, social captions, email blasts, and open house copy."
            features={["150 generations/month", "MLS + social + email + video", "Commercial usage rights"]}
          >
            <CheckoutButton plan="starter" />
          </PricingCard>

          <PricingCard
            plan="Pro"
            price="$99/mo"
            description="For active agents and lean broker teams with heavier listing volume and faster campaign turnaround."
            features={[
              "Unlimited generations",
              "Priority generation queue",
              "Future team workspace support"
            ]}
            highlighted
          >
            <CheckoutButton plan="pro" />
          </PricingCard>
        </div>
      </section>

      <section className="border-y border-line/70 bg-white/70">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Frequently Asked Questions</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Questions agents ask before trying an AI real-estate marketing tool.
            </h2>
          </div>

          <div className="mt-8 grid gap-4">
            {faqItems.map((item) => (
              <FaqCard key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div className="max-w-2xl">
            <h3 className="font-display text-2xl font-semibold text-ink">
              Try MLSGPT with your next listing before you build the rest of your marketing stack around it.
            </h3>
            <p className="mt-2 text-base leading-7 text-ink/75">
              The fastest way to see the value is to run one real property through the generator and inspect the pack.
            </p>
          </div>
          <Link
            href="/generate"
            className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0a825f]"
          >
            Start Generating
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
    </>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-[24px] border border-line bg-white p-5 shadow-[0_16px_36px_-30px_rgba(11,41,66,0.26)] sm:min-h-[132px] sm:p-6">
      <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-[34ch] text-sm leading-6 text-ink/75">{body}</p>
    </article>
  );
}

function TrustCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-[24px] border border-line bg-white p-5 shadow-[0_16px_36px_-30px_rgba(11,41,66,0.26)] sm:min-h-[140px] sm:p-6">
      <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-[34ch] text-sm leading-6 text-ink/75">{body}</p>
    </article>
  );
}

function TrustStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[22px] border border-line bg-white px-4 py-4 shadow-[0_16px_30px_-28px_rgba(11,41,66,0.24)] sm:min-h-[108px] sm:px-5">
      <p className="font-display text-2xl font-semibold text-ink sm:text-[1.75rem]">{value}</p>
      <p className="mt-1 max-w-[18ch] text-[10px] uppercase tracking-[0.16em] text-ink/65 sm:text-[11px]">
        {label}
      </p>
    </div>
  );
}

function WorkflowStep({ step, title, body }: { step: string; title: string; body: string }) {
  return (
    <article className="rounded-[24px] border border-line bg-white p-5 shadow-[0_16px_36px_-30px_rgba(11,41,66,0.26)] sm:p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">{step}</p>
      <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-ink/75">{body}</p>
    </article>
  );
}

function SampleOutputCard({ label, body }: { label: string; body: string }) {
  return (
    <article className="rounded-[28px] border border-line bg-white p-6 shadow-[0_20px_44px_-34px_rgba(11,41,66,0.3)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{label}</p>
      <p className="mt-4 font-serif text-[1.18rem] leading-8 text-ink/88">{body}</p>
    </article>
  );
}

function UseCaseCard({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link
      href={href}
      className="group rounded-[26px] border border-line bg-white p-6 shadow-[0_18px_40px_-34px_rgba(11,41,66,0.28)] transition hover:-translate-y-0.5 hover:border-accent/35"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">Use Case</p>
      <h3 className="mt-3 font-display text-2xl font-semibold text-ink transition group-hover:text-[#0f5d53]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-ink/75">{body}</p>
      <p className="mt-4 text-sm font-semibold text-ink">Explore page</p>
    </Link>
  );
}

function FaqCard({ question, answer }: { question: string; answer: string }) {
  return (
    <article className="rounded-[24px] border border-line bg-white p-5 shadow-[0_16px_34px_-30px_rgba(11,41,66,0.22)] sm:p-6">
      <h3 className="font-display text-2xl font-semibold text-ink">{question}</h3>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-ink/75">{answer}</p>
    </article>
  );
}

function PricingCard({
  plan,
  price,
  description,
  features,
  highlighted,
  children
}: {
  plan: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <article
      className={[
        "rounded-3xl border bg-white p-6 shadow-[0_22px_48px_-38px_rgba(11,41,66,0.3)] sm:p-7",
        highlighted ? "border-accent/50 shadow-glow" : "border-line"
      ].join(" ")}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.15em] text-ink/65">{plan}</p>
      <p className="mt-3 font-display text-4xl font-semibold text-ink sm:text-[2.8rem]">{price}</p>
      <p className="mt-3 max-w-[36ch] text-sm leading-6 text-ink/75">{description}</p>
      <ul className="mt-6 space-y-2.5 text-sm text-ink/85">
        {features.map((feature) => (
          <li key={feature} className="rounded-xl bg-[#f7fbff] px-4 py-3 leading-6">
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-6">{children}</div>
    </article>
  );
}
