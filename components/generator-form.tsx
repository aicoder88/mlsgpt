"use client";

import { useMemo, useState } from "react";

import type { GeneratedPack } from "@/lib/types";

type FormState = {
  address: string;
  city: string;
  state: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  propertyType: string;
  features: string;
  tone: "luxury" | "warm" | "straightforward" | "investor-focused";
  targetChannel: "buyers" | "sellers" | "investors" | "relocation";
};

const defaultState: FormState = {
  address: "1542 Camino Del Sol",
  city: "Scottsdale",
  state: "AZ",
  price: "$949,000",
  beds: "4",
  baths: "3",
  sqft: "2,880",
  propertyType: "Single Family",
  features:
    "Chef kitchen with quartz island, renovated primary suite, resort-style backyard with heated pool and pergola, close to top dining and golf, open plan with vaulted ceilings, 3-car garage, energy-efficient windows.",
  tone: "luxury",
  targetChannel: "buyers"
};

function labelClass() {
  return "mb-1 block text-xs font-semibold uppercase tracking-[0.16em] text-ink/70";
}

function inputClass() {
  return "w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";
}

export function GeneratorForm() {
  const [form, setForm] = useState<FormState>(defaultState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedPack | null>(null);

  const usageHint = useMemo(() => {
    return "Tip: add details buyers care about (upgrades, location, layout, lifestyle).";
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const payload = (await response.json()) as {
        error?: string;
        data?: GeneratedPack;
      };

      if (!response.ok || !payload.data) {
        throw new Error(payload.error ?? "Unable to generate content right now.");
      }

      setResult(payload.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected generation error.");
    } finally {
      setLoading(false);
    }
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
      <div className="rounded-3xl border border-line bg-white p-5 shadow-glow sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Generate Your Marketing Pack</h2>
            <p className="mt-1 text-sm text-ink/70">Paste one listing and instantly get channel-ready content.</p>
          </div>
          <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            AI-Powered
          </span>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className={labelClass()}>Street Address</label>
            <input className={inputClass()} value={form.address} onChange={(e) => updateField("address", e.target.value)} />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className={labelClass()}>City</label>
              <input className={inputClass()} value={form.city} onChange={(e) => updateField("city", e.target.value)} />
            </div>
            <div>
              <label className={labelClass()}>State</label>
              <input className={inputClass()} value={form.state} onChange={(e) => updateField("state", e.target.value)} />
            </div>
            <div>
              <label className={labelClass()}>List Price</label>
              <input className={inputClass()} value={form.price} onChange={(e) => updateField("price", e.target.value)} />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-4">
            <div>
              <label className={labelClass()}>Beds</label>
              <input className={inputClass()} value={form.beds} onChange={(e) => updateField("beds", e.target.value)} />
            </div>
            <div>
              <label className={labelClass()}>Baths</label>
              <input className={inputClass()} value={form.baths} onChange={(e) => updateField("baths", e.target.value)} />
            </div>
            <div>
              <label className={labelClass()}>Sq Ft</label>
              <input className={inputClass()} value={form.sqft} onChange={(e) => updateField("sqft", e.target.value)} />
            </div>
            <div>
              <label className={labelClass()}>Type</label>
              <input
                className={inputClass()}
                value={form.propertyType}
                onChange={(e) => updateField("propertyType", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={labelClass()}>Key Property Features</label>
            <textarea
              className={inputClass() + " min-h-28"}
              value={form.features}
              onChange={(e) => updateField("features", e.target.value)}
            />
            <p className="mt-1 text-xs text-ink/65">{usageHint}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className={labelClass()}>Voice</label>
              <select className={inputClass()} value={form.tone} onChange={(e) => updateField("tone", e.target.value as FormState["tone"])}>
                <option value="luxury">Luxury</option>
                <option value="warm">Warm</option>
                <option value="straightforward">Straightforward</option>
                <option value="investor-focused">Investor-focused</option>
              </select>
            </div>

            <div>
              <label className={labelClass()}>Audience</label>
              <select
                className={inputClass()}
                value={form.targetChannel}
                onChange={(e) => updateField("targetChannel", e.target.value as FormState["targetChannel"])}
              >
                <option value="buyers">Buyers</option>
                <option value="sellers">Sellers</option>
                <option value="investors">Investors</option>
                <option value="relocation">Relocation</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0d2f52] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Generating..." : "Generate Full Content Pack"}
          </button>

          {error ? <p className="rounded-lg border border-[#f0b8b8] bg-[#fff1f1] px-3 py-2 text-xs text-[#8a1919]">{error}</p> : null}
        </form>
      </div>

      <div className="rounded-3xl border border-line bg-white p-5 sm:p-6">
        <h3 className="font-display text-xl font-semibold text-ink">Output</h3>
        <p className="mt-1 text-sm text-ink/70">MLS copy, social, email, and video script in one pass.</p>

        {!result ? (
          <div className="mt-6 rounded-2xl border border-dashed border-line bg-[#fbfdff] p-6 text-sm text-ink/65">
            Generate once to preview your complete content pack here.
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            <ResultCard title={result.title} body={result.mlsDescription} />
            <ResultCard title="Instagram Caption" body={result.instagramCaption} />
            <ResultCard title="Facebook Post" body={result.facebookPost} />
            <ResultCard title="Email Blast" body={result.emailBlast} />
            <ResultCard title="Video Script" body={result.videoScript} />
            <ResultCard title="Hashtags" body={result.hashtags.join(" ")} />
            <ResultCard
              title={result.fairHousingCheck.passed ? "Compliance Check: Passed" : "Compliance Check: Needs Review"}
              body={result.fairHousingCheck.notes.join("\n") || "No compliance flags detected."}
            />
          </div>
        )}
      </div>
    </section>
  );
}

type ResultCardProps = {
  title: string;
  body: string;
};

function ResultCard({ title, body }: ResultCardProps) {
  async function copyText() {
    await navigator.clipboard.writeText(`${title}\n\n${body}`);
  }

  return (
    <article className="rounded-2xl border border-line bg-[#fbfdff] p-4">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h4 className="font-display text-base font-semibold text-ink">{title}</h4>
        <button
          type="button"
          onClick={copyText}
          className="rounded-lg border border-line px-2.5 py-1 text-xs font-medium text-ink/75 transition hover:bg-white"
        >
          Copy
        </button>
      </div>
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink/80">{body}</p>
    </article>
  );
}
