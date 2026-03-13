import Link from "next/link";

import { RoiPoweredLink } from "@/components/roi-powered-link";

type SeoLandingPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta?: { href: string; label: string };
  proof: Array<{ label: string; value: string }>;
  sections: Array<{ title: string; body: string }>;
  examples: Array<{ label: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

export function SeoLandingPage({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  proof,
  sections,
  examples,
  faqs
}: SeoLandingPageProps) {
  return (
    <section className="relative overflow-hidden pb-16 pt-8 lg:pb-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top_left,rgba(216,160,84,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(15,155,116,0.14),transparent_30%),linear-gradient(180deg,rgba(8,27,43,0.06),transparent_72%)]" />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[34px] border border-line/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(247,250,252,0.94))] p-6 shadow-[0_28px_80px_-52px_rgba(11,41,66,0.4)] sm:p-8">
          <p className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/76">{description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/generate"
              className="inline-flex items-center justify-center rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#123a60]"
            >
              {primaryCta}
            </Link>
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-xl border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/45"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {proof.map((item) => (
              <div key={item.label} className="rounded-[22px] border border-line bg-white px-5 py-4">
                <p className="font-display text-2xl font-semibold text-ink">{item.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-ink/62">{item.label}</p>
              </div>
            ))}
          </div>

          <RoiPoweredLink className="mt-5 text-xs leading-6 text-ink/54" />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {sections.map((item) => (
            <article
              key={item.title}
              className="rounded-[26px] border border-line bg-white p-6 shadow-[0_18px_40px_-34px_rgba(11,41,66,0.26)]"
            >
              <h2 className="font-display text-2xl font-semibold text-ink">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-ink/76">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[30px] border border-line bg-white p-6 shadow-[0_22px_48px_-36px_rgba(11,41,66,0.28)] sm:p-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Example Outputs</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Output examples built for a real listing workflow.
            </h2>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {examples.map((item) => (
              <article
                key={item.label}
                className="rounded-[24px] border border-line bg-[linear-gradient(180deg,#ffffff,#f8fbfd)] p-5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">{item.label}</p>
                <p className="mt-4 font-serif text-[1.14rem] leading-8 text-ink/88">{item.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-[30px] border border-line bg-white p-6 shadow-[0_22px_48px_-36px_rgba(11,41,66,0.28)] sm:p-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">FAQ</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Questions people ask before trying this workflow.
            </h2>
          </div>

          <div className="mt-6 grid gap-4">
            {faqs.map((item) => (
              <article key={item.question} className="rounded-[22px] border border-line bg-[#fbfdff] p-5">
                <h3 className="font-display text-2xl font-semibold text-ink">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-ink/76">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-[30px] border border-line bg-[linear-gradient(135deg,#0b2942,#184d6d)] px-6 py-8 text-white shadow-[0_30px_70px_-40px_rgba(11,41,66,0.7)] sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold">Try the generator with a real listing.</h2>
              <p className="mt-3 text-sm leading-7 text-white/84">
                The fastest way to judge the workflow is to run one property through the app and inspect the full pack.
              </p>
              <p className="mt-3 text-xs leading-6 text-white/62">
                Powered by{" "}
                <a
                  href="https://roigpt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white/82 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-[#83d8b9]"
                >
                  roigpt.com
                </a>
                .
              </p>
            </div>
            <Link
              href="/generate"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-[#edf4f8]"
            >
              Open Generator
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
