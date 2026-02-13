import type { Metadata } from "next";

import { GeneratorForm } from "@/components/generator-form";

export const metadata: Metadata = {
  title: "Generate",
  description: "Generate MLS listing descriptions and marketing assets instantly.",
  alternates: {
    canonical: "/generate"
  }
};

export default function GeneratePage() {
  return (
    <>
      <section className="border-b border-line/60 bg-white/80">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Live App
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-ink">Build a full listing campaign instantly</h1>
          <p className="mt-3 max-w-3xl text-ink/75">
            Enter listing data once and get channel-ready outputs in one pass. This page is optimized for fast repeat workflows.
          </p>
          <p className="mt-2 text-sm text-ink/65">Free tier: 3 generations per day. Paid plans unlock higher volume.</p>
        </div>
      </section>
      <GeneratorForm />
    </>
  );
}
