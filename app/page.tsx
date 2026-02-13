import type { Metadata } from "next";
import Link from "next/link";

import { CheckoutButton } from "@/components/checkout-button";
import { ImagePlaceholder } from "@/components/image-placeholder";

export const metadata: Metadata = {
  alternates: {
    canonical: "/"
  }
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does MLSGPT generate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MLSGPT generates MLS description copy, Instagram captions, Facebook posts, email blasts, and short video scripts from one listing input."
      }
    },
    {
      "@type": "Question",
      name: "Is content fair-housing aware?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MLSGPT applies compliance-focused instructions and includes a basic fair-housing check output so agents can review before publishing."
      }
    }
  ]
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
  description: "AI engine that turns MLS listings into complete marketing packs for real-estate agents."
};

export default function HomePage() {
  return (
    <>
      <section className="hero-glow border-b border-line/60">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:pt-20">
          <div className="reveal">
            <p className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Built For Listing Agents
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Turn one MLS listing into your complete marketing machine.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink/75">
              Paste listing details once. Publish faster with MLS-ready copy, social content, email blasts, and video scripts in under a minute.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#123a60]"
              >
                Launch Generator
              </Link>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-xl border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/45"
              >
                See Pricing
              </a>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-sm">
              <TrustStat value="60s" label="Average output time" />
              <TrustStat value="5x" label="More channels covered" />
              <TrustStat value="24/7" label="Always-on generation" />
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
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">One input. Every channel done.</h2>
            <p className="mt-4 max-w-xl text-base text-ink/75">
              MLSGPT converts listing details into high-performing channel-specific assets while preserving your voice and compliance posture.
            </p>
            <div className="mt-6 grid gap-3">
              <Feature title="MLS Description" body="Clean, compelling listing copy tuned for buyer intent." />
              <Feature title="Social Pack" body="Instagram + Facebook variants with CTAs and hashtags." />
              <Feature title="Email Blast" body="Ready-to-send subject + body for your CRM." />
              <Feature title="Video Script" body="45-60 second reel script with shot cues." />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <ImagePlaceholder id="social-proof-grid" className="sm:col-span-2" />
            <ImagePlaceholder id="proof-agent-mobile" />
            <ImagePlaceholder id="workflow-automation" />
          </div>
        </div>
      </section>

      <section id="trust" className="border-y border-line/70 bg-white/70">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Trust-first architecture</h2>
          <p className="mt-4 max-w-3xl text-ink/75">
            Designed for professional teams: secure payments, API-key isolation, and compliance-aware output guidelines. No manual delivery required.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <TrustCard title="Secure Checkout" body="Stripe-hosted checkout with subscription controls." />
            <TrustCard title="Rate-Limit Guard" body="Built-in throttling to prevent abuse and cost spikes." />
            <TrustCard title="Compliance Layer" body="Fair-housing aware generation with explicit checks." />
          </div>
          <div className="mt-5">
            <ImagePlaceholder id="pricing-trust-banner" />
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Simple recurring pricing</h2>
          <p className="mt-3 text-ink/75">Low-touch SaaS model designed to run automatically once live.</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <PricingCard
            plan="Starter"
            price="$39/mo"
            description="For solo agents who need consistent listing marketing output."
            features={["150 generations/month", "MLS + social + email + video", "Commercial usage rights"]}
          >
            <CheckoutButton plan="starter" />
          </PricingCard>

          <PricingCard
            plan="Pro"
            price="$99/mo"
            description="For active agents and lean broker teams with heavier volume."
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

      <section className="border-t border-line/70 bg-white/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <h3 className="font-display text-2xl font-semibold text-ink">See it with your own listing in under 2 minutes.</h3>
            <p className="mt-2 text-ink/75">Launch free, verify quality, then subscribe when it already saves you hours.</p>
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
    </>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-line bg-white p-4">
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-ink/75">{body}</p>
    </article>
  );
}

function TrustCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-line bg-white p-4">
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-ink/75">{body}</p>
    </article>
  );
}

function TrustStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-line bg-white px-4 py-3">
      <p className="font-display text-xl font-semibold text-ink">{value}</p>
      <p className="text-xs uppercase tracking-[0.15em] text-ink/65">{label}</p>
    </div>
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
        "rounded-3xl border bg-white p-6",
        highlighted ? "border-accent/50 shadow-glow" : "border-line"
      ].join(" ")}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.15em] text-ink/65">{plan}</p>
      <p className="mt-2 font-display text-4xl font-semibold text-ink">{price}</p>
      <p className="mt-2 text-sm text-ink/75">{description}</p>
      <ul className="mt-5 space-y-2 text-sm text-ink/85">
        {features.map((feature) => (
          <li key={feature} className="rounded-lg bg-[#f7fbff] px-3 py-2">
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-6">{children}</div>
    </article>
  );
}
