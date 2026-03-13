"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import type { GeneratedPack, PartialGenerationTarget } from "@/lib/types";

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
  neighborhood: string;
  idealBuyer: string;
  ctaPreference: string;
  tone: "luxury" | "warm" | "straightforward" | "investor-focused";
  targetChannel: "buyers" | "sellers" | "investors" | "relocation";
  listingGoal: "new-launch" | "open-house" | "price-refresh" | "stale-listing" | "seller-update";
  timeline: "launch-this-week" | "launch-this-month" | "open-house-weekend" | "nurture-campaign";
};

type ResultTab = "positioning" | "copy" | "open-house" | "seller";
type PartialInstructions = Record<PartialGenerationTarget, string>;
type PartialGenerationPayload = Pick<GeneratedPack, PartialGenerationTarget>;

const defaultPartialInstructions = {
  mlsDescription: "",
  emailBlast: "",
  sellerUpdate: ""
} satisfies PartialInstructions;

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
    "Chef kitchen with quartz island, renovated primary suite, resort-style backyard with heated pool and pergola, open floor plan with vaulted ceilings, 3-car garage, energy-efficient windows.",
  neighborhood:
    "Minutes from golf, destination dining, and resort corridors. Quiet residential streets with strong curb appeal and year-round outdoor living.",
  idealBuyer: "Luxury move-up buyer or relocation family wanting turnkey indoor-outdoor living.",
  ctaPreference: "Invite private tours and offer a quick list of standout upgrades.",
  tone: "luxury",
  targetChannel: "buyers",
  listingGoal: "new-launch",
  timeline: "launch-this-week"
};

const listingPresets: Array<{ label: string; subtitle: string; value: FormState }> = [
  {
    label: "Luxury Launch",
    subtitle: "High-end home debut with polished positioning",
    value: defaultState
  },
  {
    label: "Open House Push",
    subtitle: "Weekend traffic campaign with urgency",
    value: {
      address: "28 Harbor View Lane",
      city: "Newport Beach",
      state: "CA",
      price: "$2,395,000",
      beds: "3",
      baths: "2.5",
      sqft: "2,140",
      propertyType: "Townhome",
      features:
        "Fold-away glass doors, designer kitchen, rooftop deck, private elevator, marina views, attached two-car garage, turnkey finishes.",
      neighborhood:
        "Walkable to the harbor, coffee shops, waterfront dining, and boutique retail with an easy lock-and-leave lifestyle.",
      idealBuyer: "Second-home buyer or professional couple seeking a stylish coastal base.",
      ctaPreference: "Push RSVP language and limited private preview slots.",
      tone: "warm",
      targetChannel: "relocation",
      listingGoal: "open-house",
      timeline: "open-house-weekend"
    }
  },
  {
    label: "Stale Listing Reset",
    subtitle: "Fresh story for a home that needs new energy",
    value: {
      address: "782 Oak Terrace Drive",
      city: "Charlotte",
      state: "NC",
      price: "$674,900",
      beds: "5",
      baths: "4",
      sqft: "3,420",
      propertyType: "Single Family",
      features:
        "Main-level guest suite, fenced backyard, updated lighting, home office, bonus room, community pool access, oversized pantry.",
      neighborhood:
        "Established community near greenways, commuter routes, and top everyday conveniences with broad family appeal.",
      idealBuyer: "Move-up family comparing space, flexibility, and school-access convenience.",
      ctaPreference: "Reframe value and invite buyers to compare layout flexibility in person.",
      tone: "straightforward",
      targetChannel: "buyers",
      listingGoal: "stale-listing",
      timeline: "launch-this-month"
    }
  }
];

const toneOptions = [
  { value: "luxury", label: "Luxury" },
  { value: "warm", label: "Warm" },
  { value: "straightforward", label: "Straightforward" },
  { value: "investor-focused", label: "Investor-focused" }
] as const;

const audienceOptions = [
  { value: "buyers", label: "Buyers" },
  { value: "sellers", label: "Sellers" },
  { value: "investors", label: "Investors" },
  { value: "relocation", label: "Relocation" }
] as const;

const goalOptions = [
  { value: "new-launch", label: "New launch" },
  { value: "open-house", label: "Open house" },
  { value: "price-refresh", label: "Price refresh" },
  { value: "stale-listing", label: "Stale listing rescue" },
  { value: "seller-update", label: "Seller update" }
] as const;

const timelineOptions = [
  { value: "launch-this-week", label: "Launch this week" },
  { value: "launch-this-month", label: "Launch this month" },
  { value: "open-house-weekend", label: "Open house weekend" },
  { value: "nurture-campaign", label: "Nurture campaign" }
] as const;

const featureChips = [
  "Resort backyard",
  "Walkable dining",
  "Freshly renovated",
  "Golf course access",
  "Home office",
  "Lock-and-leave lifestyle",
  "Income potential",
  "Sunset views"
];

const resultTabs: Array<{ id: ResultTab; label: string; hint: string }> = [
  { id: "positioning", label: "Positioning", hint: "Story, hooks, launch plan" },
  { id: "copy", label: "Copy Studio", hint: "MLS, social, email, video" },
  { id: "open-house", label: "Open House Kit", hint: "Invite and follow-up assets" },
  { id: "seller", label: "Seller Updates", hint: "Talking points and next moves" }
];

export function GeneratorForm() {
  const [form, setForm] = useState<FormState>(defaultState);
  const [loading, setLoading] = useState(false);
  const [regeneratingTarget, setRegeneratingTarget] = useState<PartialGenerationTarget | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedPack | null>(null);
  const [activeTab, setActiveTab] = useState<ResultTab>("positioning");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [importText, setImportText] = useState("");
  const [partialInstructions, setPartialInstructions] = useState<PartialInstructions>(defaultPartialInstructions);

  const localScore = useMemo(() => computeCompletenessScore(form), [form]);
  const missingPrompts = useMemo(() => buildMissingPrompts(form), [form]);
  const localAngle = useMemo(() => buildNarrativeAngle(form), [form]);
  const localHighlights = useMemo(
    () => deriveHighlights(`${form.features}, ${form.neighborhood}`, 5),
    [form.features, form.neighborhood]
  );
  const suggestedChannels = useMemo(() => suggestChannels(form), [form]);
  const readinessScore = result?.launchReadinessScore ?? localScore;
  const workspaceTitle = result?.title ?? `${form.address}, ${form.city}`;
  const strategicAngle = result?.heroAngle ?? localAngle;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "full",
          input: form
        })
      });

      const payload = (await response.json()) as {
        error?: string;
        data?: GeneratedPack;
      };

      if (!response.ok || !payload.data) {
        throw new Error(payload.error ?? "Unable to build the listing workspace right now.");
      }

      setResult(payload.data);
      setActiveTab("positioning");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected generation error.");
    } finally {
      setLoading(false);
    }
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updatePartialInstruction(target: PartialGenerationTarget, value: string) {
    setPartialInstructions((prev) => ({ ...prev, [target]: value }));
  }

  function updateResultField<K extends keyof GeneratedPack>(key: K, value: GeneratedPack[K]) {
    setResult((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function updateSellerField<K extends keyof GeneratedPack["sellerUpdate"]>(
    key: K,
    value: GeneratedPack["sellerUpdate"][K]
  ) {
    setResult((prev) =>
      prev
        ? {
            ...prev,
            sellerUpdate: {
              ...prev.sellerUpdate,
              [key]: value
            }
          }
        : prev
    );
  }

  function applyPreset(value: FormState) {
    setForm(value);
    setResult(null);
    setError(null);
    setActiveTab("positioning");
    setPartialInstructions(defaultPartialInstructions);
  }

  function applySampleListing() {
    applyPreset(listingPresets[0]?.value ?? defaultState);
    setImportText("");
  }

  function importRawMlsText() {
    if (importText.trim().length < 80) {
      setError("Paste a longer MLS block so the shortcut can detect facts and remarks.");
      return;
    }

    setForm((prev) => buildImportedFormState(importText, prev));
    setResult(null);
    setError(null);
    setActiveTab("positioning");
    setPartialInstructions(defaultPartialInstructions);
  }

  function addFeatureChip(chip: string) {
    setForm((prev) => {
      if (prev.features.toLowerCase().includes(chip.toLowerCase())) {
        return prev;
      }

      return {
        ...prev,
        features: `${prev.features.trim().replace(/[.,\s]+$/, "")}, ${chip}.`
      };
    });
  }

  async function copyText(value: string, id: string) {
    await navigator.clipboard.writeText(value);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 1400);
  }

  async function copyBundle() {
    if (!result) {
      return;
    }

    await copyText(buildCampaignBundle(result), "campaign-bundle");
  }

  async function regenerateSection(target: PartialGenerationTarget) {
    if (!result) {
      return;
    }

    setRegeneratingTarget(target);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "partial",
          input: form,
          target,
          currentPack: result,
          instruction: partialInstructions[target].trim() || undefined
        })
      });

      const payload = (await response.json()) as {
        error?: string;
        data?: PartialGenerationPayload;
      };

      if (!response.ok || !payload.data) {
        throw new Error(payload.error ?? "Unable to regenerate that section right now.");
      }

      const partialData = payload.data;
      setResult((prev) => (prev ? mergePartialGeneration(prev, partialData, target) : prev));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected partial generation error.");
    } finally {
      setRegeneratingTarget(null);
    }
  }

  async function copyWorkflowOutput(kind: "email" | "canva" | "scheduler" | "flyer") {
    if (!result) {
      return;
    }

    const builders = {
      email: buildEmailTransfer,
      canva: buildCanvaTransfer,
      scheduler: buildSocialSchedulerTransfer,
      flyer: buildOpenHouseFlyerTransfer
    } as const;

    await copyText(builders[kind](result, form), `workflow-${kind}`);
  }

  function openSellerReport() {
    if (!result) {
      return;
    }

    const popup = window.open("", "_blank", "noopener,noreferrer");

    if (!popup) {
      setError("Popup blocked. Allow popups to open the printable seller report.");
      return;
    }

    popup.document.open();
    popup.document.write(buildSellerReportHtml(result, form));
    popup.document.close();
    popup.focus();
    window.setTimeout(() => popup.print(), 250);
  }

  return (
    <section className="relative overflow-hidden pb-16 pt-6 sm:pt-8 lg:pb-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,rgba(216,160,84,0.22),transparent_30%),radial-gradient(circle_at_top_right,rgba(15,155,116,0.18),transparent_32%),linear-gradient(180deg,rgba(8,27,43,0.08),transparent_72%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-24 h-[26rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.34),transparent)]" />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="ambient-grid section-frame relative overflow-hidden rounded-[34px] border border-[#1f4d67]/45 bg-[linear-gradient(135deg,#092236_0%,#0c314c_48%,#164a67_100%)] p-5 shadow-[0_42px_120px_-58px_rgba(4,17,28,0.95)] sm:p-7 lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(216,160,84,0.25),transparent_22%),radial-gradient(circle_at_85%_18%,rgba(110,220,184,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_42%)]" />
          <div className="absolute inset-y-0 right-0 w-[32rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_58%)]" />
          <div className="absolute inset-x-8 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)]" />
          <div className="relative grid gap-7 lg:grid-cols-[minmax(0,1.08fr)_minmax(290px,0.92fr)] lg:items-end">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <p className="inline-flex items-center rounded-full border border-white/14 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#87dcc0] backdrop-blur">
                  Listing Command Center
                </p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/62">
                  Strategy deck for serious listing launches
                </p>
              </div>
              <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[0.98] text-white sm:text-5xl lg:text-[3.9rem]">
                Turn a property into a{" "}
                <span className="font-serif italic font-normal text-[#ffd7a3]">launch strategy</span>, not just a stack of captions.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
                MLSGPT now behaves like a listing strategist. It scores readiness, sharpens the angle, maps the rollout,
                and hands agents polished assets for launches, open houses, relaunches, and seller communication.
              </p>
              <div className="mt-6 grid gap-3 text-sm text-white/72 md:grid-cols-3">
                <HeroNote title="Positioning first" body="Lead with a narrative the seller and buyer can both understand." />
                <HeroNote title="Campaign sequencing" body="Build a launch rhythm instead of posting into the void." />
                <HeroNote title="Agent-ready output" body="Seller notes, open-house copy, and channel assets in one place." />
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <SignalPill label={`${readinessScore}/100 readiness`} tone={readinessScore >= 85 ? "good" : readinessScore >= 70 ? "warm" : "neutral"} />
                <SignalPill label={goalOptions.find((option) => option.value === form.listingGoal)?.label ?? "New launch"} />
                <SignalPill label={timelineOptions.find((option) => option.value === form.timeline)?.label ?? "Launch this week"} />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-1">
              <HeroMetric
                value={result ? `${result.launchPlan.length} moves` : `${suggestedChannels.length} channels`}
                label="Campaign map"
                detail={result ? "AI launch sequence ready to deploy" : "Built from your listing goal"}
              />
              <HeroMetric
                value={result ? `${result.bestHooks.length} hooks` : `${Math.max(4, localHighlights.length)} angles`}
                label="Story angles"
                detail="Multiple ways to pitch the same property"
              />
              <HeroMetric
                value={result ? "Seller-ready" : "Prep mode"}
                label="Agent workflow"
                detail="Open house, follow-up, and seller comms included"
              />
            </div>
          </div>

          <div className="relative mt-8 grid gap-3 border-t border-white/10 pt-5 text-white/84 md:grid-cols-3">
            <HeroStrip label="Current angle" value={strategicAngle} />
            <HeroStrip label="Primary CTA" value={form.ctaPreference} />
            <HeroStrip label="Best-fit buyer" value={form.idealBuyer} />
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[320px,minmax(0,1fr),320px] 2xl:grid-cols-[340px,minmax(0,1fr),330px]">
          <aside className="xl:sticky xl:top-24 xl:self-start">
            <div className="glass-shell section-frame relative overflow-hidden rounded-[28px] border border-white/65 p-5 backdrop-blur sm:p-6">
              <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(15,155,116,0.12),transparent)]" />
              <div className="relative">
                <SectionHeading
                  eyebrow="Intake"
                  title="Property brief"
                  body="Feed the machine the same way a strong listing coordinator would."
                />

                <div className="mt-5 rounded-[24px] border border-white/82 bg-[linear-gradient(180deg,#ffffff,#f5f8fb)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="max-w-[18rem]">
                      <p className="text-[15px] font-semibold text-ink">Import shortcuts</p>
                      <p className="mt-1 text-[13px] leading-6 text-ink/70">
                        Paste raw MLS remarks to prefill the form, or load a sample listing when you just need to demo the workflow.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/58">
                      <span className="rounded-full border border-line/70 bg-white px-2.5 py-1">MLS text now</span>
                      <span className="rounded-full border border-dashed border-line/80 bg-white/80 px-2.5 py-1">CSV soon</span>
                      <span className="rounded-full border border-dashed border-line/80 bg-white/80 px-2.5 py-1">CRM soon</span>
                    </div>
                  </div>

                  <textarea
                    className={cn(inputClass(), "mt-4 min-h-28")}
                    value={importText}
                    onChange={(event) => setImportText(event.target.value)}
                    placeholder="Paste MLS remarks, agent notes, or a full listing sheet. Example: 1542 Camino Del Sol, Scottsdale AZ 85255 | $949,000 | 4 bed | 3 bath | 2,880 sf | Single Family..."
                  />

                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={importRawMlsText}
                      className="inline-flex items-center justify-center rounded-2xl border border-[#0d6f56] bg-[linear-gradient(135deg,#0f9b74,#12765d)] px-4 py-3 text-sm font-semibold text-white shadow-[0_20px_38px_-26px_rgba(15,155,116,0.74)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      Paste Raw MLS Text
                    </button>
                    <button
                      type="button"
                      onClick={applySampleListing}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/85 bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:border-accent/28 hover:bg-[#f4fbf8]"
                    >
                      Use Sample Listing
                    </button>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {listingPresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => applyPreset(preset.value)}
                      className="lift-panel flex w-full items-start justify-between rounded-[22px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(246,249,251,0.92))] px-4 py-4 text-left"
                    >
                      <div className="max-w-[18rem] pr-3">
                        <p className="text-[15px] font-semibold leading-6 text-ink">{preset.label}</p>
                        <p className="mt-1 text-xs leading-5 text-ink/72">{preset.subtitle}</p>
                      </div>
                      <span className="rounded-full border border-accent/15 bg-accent/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                        Load
                      </span>
                    </button>
                  ))}
                </div>

                <form onSubmit={onSubmit} className="mt-6 space-y-5">
                  <FormBlock title="Listing facts" caption="Enough data to write, position, and route the campaign correctly.">
                    <Field label="Street address">
                      <input className={inputClass()} value={form.address} onChange={(event) => updateField("address", event.target.value)} />
                    </Field>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <Field label="City">
                        <input className={inputClass()} value={form.city} onChange={(event) => updateField("city", event.target.value)} />
                      </Field>
                      <Field label="State">
                        <input className={inputClass()} value={form.state} onChange={(event) => updateField("state", event.target.value)} />
                      </Field>
                      <Field label="Price">
                        <input className={inputClass()} value={form.price} onChange={(event) => updateField("price", event.target.value)} />
                      </Field>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-4">
                      <Field label="Beds">
                        <input className={inputClass()} value={form.beds} onChange={(event) => updateField("beds", event.target.value)} />
                      </Field>
                      <Field label="Baths">
                        <input className={inputClass()} value={form.baths} onChange={(event) => updateField("baths", event.target.value)} />
                      </Field>
                      <Field label="Sq ft">
                        <input className={inputClass()} value={form.sqft} onChange={(event) => updateField("sqft", event.target.value)} />
                      </Field>
                      <Field label="Type">
                        <input
                          className={inputClass()}
                          value={form.propertyType}
                          onChange={(event) => updateField("propertyType", event.target.value)}
                        />
                      </Field>
                    </div>
                  </FormBlock>

                  <FormBlock title="Story and location" caption="This is the part that separates commodity copy from actual marketing.">
                    <Field label="Property features">
                      <textarea
                        className={cn(inputClass(), "min-h-28")}
                        value={form.features}
                        onChange={(event) => updateField("features", event.target.value)}
                      />
                    </Field>

                    <div className="flex flex-wrap gap-2">
                      {featureChips.map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => addFeatureChip(chip)}
                          className="rounded-full border border-white/85 bg-white px-3 py-1.5 text-xs font-medium text-ink/76 transition hover:-translate-y-0.5 hover:border-accent/30 hover:bg-[#f4fbf8] hover:text-ink"
                        >
                          + {chip}
                        </button>
                      ))}
                    </div>

                    <Field label="Neighborhood context">
                      <textarea
                        className={cn(inputClass(), "min-h-24")}
                        value={form.neighborhood}
                        onChange={(event) => updateField("neighborhood", event.target.value)}
                      />
                    </Field>

                    <div className="grid gap-3">
                      <Field label="Ideal buyer">
                        <input
                          className={inputClass()}
                          value={form.idealBuyer}
                          onChange={(event) => updateField("idealBuyer", event.target.value)}
                        />
                      </Field>
                      <Field label="Preferred CTA">
                        <input
                          className={inputClass()}
                          value={form.ctaPreference}
                          onChange={(event) => updateField("ctaPreference", event.target.value)}
                        />
                      </Field>
                    </div>
                  </FormBlock>

                  <FormBlock title="Campaign settings" caption="Tell the system what kind of rollout you need.">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Tone">
                        <select
                          className={inputClass()}
                          value={form.tone}
                          onChange={(event) => updateField("tone", event.target.value as FormState["tone"])}
                        >
                          {toneOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Audience">
                        <select
                          className={inputClass()}
                          value={form.targetChannel}
                          onChange={(event) => updateField("targetChannel", event.target.value as FormState["targetChannel"])}
                        >
                          {audienceOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Goal">
                        <select
                          className={inputClass()}
                          value={form.listingGoal}
                          onChange={(event) => updateField("listingGoal", event.target.value as FormState["listingGoal"])}
                        >
                          {goalOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Timeline">
                        <select
                          className={inputClass()}
                          value={form.timeline}
                          onChange={(event) => updateField("timeline", event.target.value as FormState["timeline"])}
                        >
                          {timelineOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>
                  </FormBlock>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center rounded-2xl border border-[#0d6f56] bg-[linear-gradient(135deg,#0f9b74,#12765d)] px-4 py-4 text-sm font-semibold text-white shadow-[0_24px_44px_-28px_rgba(15,155,116,0.78)] transition hover:-translate-y-0.5 hover:shadow-[0_30px_52px_-28px_rgba(15,155,116,0.82)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? "Building Listing Command Center..." : "Build Launch Strategy"}
                  </button>

                  <p className="text-xs leading-5 text-ink/72">
                    Free users can run 3 strategy builds per day. Paid plans unlock high-volume listing workflows.
                  </p>

                  {error ? (
                    <p className="rounded-2xl border border-[#efc5c5] bg-[#fff2f2] px-4 py-3 text-sm text-[#861818]">
                      {error}
                    </p>
                  ) : null}
                </form>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="glass-shell section-frame overflow-hidden rounded-[28px] border border-white/70">
              <div className="border-b border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(244,248,251,0.92))] px-5 py-5 sm:px-6 lg:px-7 lg:py-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 max-w-3xl">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Workspace</p>
                    <h2 className="mt-2 break-words font-display text-[2rem] font-semibold leading-tight text-ink sm:text-[2.2rem]">
                      {workspaceTitle}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/78 sm:text-[15px]">
                      {result?.positioningBrief ??
                        "This workspace turns raw listing details into positioning, messaging, and a concrete agent playbook. Even before generation, it surfaces weak spots and suggests where to focus the story."}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <ActionBadge label={result ? "AI Strategy Ready" : "Prep Mode"} value={strategicAngle} />
                    <ActionBadge label="Primary CTA" value={form.ctaPreference} />
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <WorkspaceMetric label="Launch readiness" value={`${readinessScore}/100`} tone={readinessScore >= 85 ? "good" : readinessScore >= 70 ? "warm" : "neutral"} />
                  <WorkspaceMetric label="Target story" value={strategicAngle} />
                  <WorkspaceMetric label="Best-fit channels" value={(result?.recommendedChannels ?? suggestedChannels).slice(0, 2).join(" + ")} />
                </div>
              </div>

              <div className="border-b border-white/70 px-3 py-3 sm:px-4">
                <div className="inline-flex flex-wrap gap-2 rounded-[22px] border border-white/75 bg-white/70 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
                  {resultTabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "rounded-[18px] px-3.5 py-2 text-sm font-medium transition",
                        activeTab === tab.id
                          ? "bg-[linear-gradient(135deg,#0b2942,#184d6d)] text-white shadow-[0_18px_28px_-22px_rgba(11,41,66,0.9)]"
                          : "text-ink/72 hover:bg-white hover:text-ink"
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-ink/62">
                  {resultTabs.find((tab) => tab.id === activeTab)?.hint}
                </p>
              </div>

              <div className="px-5 py-5 sm:px-6 sm:py-6 lg:px-7">
                {result ? (
                  <>
                    {activeTab === "positioning" ? (
                      <div className="space-y-5">
                        <InsightPanel
                          title={result.heroAngle}
                          body={result.positioningBrief}
                          actionLabel={copiedId === "positioning-brief" ? "Copied" : "Copy brief"}
                          onAction={() => copyText(result.positioningBrief, "positioning-brief")}
                        />

                        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                          <SurfaceCard title="Likely buyer profile" subtitle="Who the property is most likely to resonate with first.">
                            <p className="text-sm leading-7 text-ink/78">{result.audienceProfile}</p>
                          </SurfaceCard>

                          <SurfaceCard title="Recommended channels" subtitle="What to push first based on the listing and campaign goal.">
                            <div className="flex flex-wrap gap-2">
                              {result.recommendedChannels.map((channel) => (
                                <span
                                  key={channel}
                                  className="rounded-full border border-accent/20 bg-[#eef8f4] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent"
                                >
                                  {channel}
                                </span>
                              ))}
                            </div>
                          </SurfaceCard>
                        </div>

                        <div className="grid gap-5 lg:grid-cols-[0.96fr_1.04fr]">
                          <SurfaceCard title="Best hooks" subtitle="Openers and reframes for ads, captions, and listing copy.">
                            <div className="space-y-3">
                              {result.bestHooks.map((hook, index) => (
                                <div key={hook} className="lift-panel rounded-[22px] border border-white/75 bg-[linear-gradient(180deg,#ffffff,#f8fbfc)] px-4 py-4">
                                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">Hook {index + 1}</p>
                                  <p className="mt-1 text-sm leading-6 text-ink/78">{hook}</p>
                                </div>
                              ))}
                            </div>
                          </SurfaceCard>

                          <SurfaceCard title="Launch plan" subtitle="A sequenced rollout your agent can execute immediately.">
                            <div className="space-y-3">
                              {result.launchPlan.map((step) => (
                                <div key={`${step.day}-${step.focus}`} className="lift-panel rounded-[22px] border border-white/75 bg-[linear-gradient(180deg,#ffffff,#f8fbfc)] px-4 py-4">
                                  <div className="flex flex-wrap items-center justify-between gap-3">
                                    <p className="text-sm font-semibold text-ink">{step.day}</p>
                                    <span className="rounded-full border border-line/80 bg-[#f2f7fb] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/72">
                                      {step.asset}
                                    </span>
                                  </div>
                                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">{step.focus}</p>
                                  <p className="mt-1 text-sm leading-6 text-ink/76">{step.action}</p>
                                </div>
                              ))}
                            </div>
                          </SurfaceCard>
                        </div>
                      </div>
                    ) : null}

                    {activeTab === "copy" ? (
                      <div className="space-y-4">
                        <SurfaceCard
                          title="Editing workflow"
                          subtitle="Edit the sections below directly, then regenerate only the draft that changed instead of rebuilding the full pack."
                        >
                          <div className="grid gap-3 sm:grid-cols-3">
                            <MiniSignal title="Targeted refresh" value="MLS description, email blast, or seller update" />
                            <MiniSignal title="Manual edits" value="Every direct output uses your current edited draft" />
                            <MiniSignal title="Distribution" value="Copy to email, Canva, flyer, or scheduler without reformatting" />
                          </div>
                        </SurfaceCard>
                        <EditableResultCard
                          title={result.title}
                          body={result.mlsDescription}
                          valueLabel="MLS description"
                          copyId="mls-description"
                          copiedId={copiedId}
                          note={partialInstructions.mlsDescription}
                          notePlaceholder="Optional note: shorter, more luxury, more factual, stronger CTA..."
                          loading={regeneratingTarget === "mlsDescription"}
                          onChange={(value) => updateResultField("mlsDescription", value)}
                          onNoteChange={(value) => updatePartialInstruction("mlsDescription", value)}
                          onRegenerate={() => regenerateSection("mlsDescription")}
                          onCopy={() => copyText(`${result.title}\n\n${result.mlsDescription}`, "mls-description")}
                        />
                        <ResultCard
                          title="Instagram Caption"
                          body={result.instagramCaption}
                          copyId="instagram-caption"
                          copiedId={copiedId}
                          onCopy={() => copyText(result.instagramCaption, "instagram-caption")}
                        />
                        <ResultCard
                          title="Facebook Post"
                          body={result.facebookPost}
                          copyId="facebook-post"
                          copiedId={copiedId}
                          onCopy={() => copyText(result.facebookPost, "facebook-post")}
                        />
                        <EditableResultCard
                          title="Email Blast"
                          body={result.emailBlast}
                          valueLabel="Email blast"
                          copyId="email-blast"
                          copiedId={copiedId}
                          note={partialInstructions.emailBlast}
                          notePlaceholder="Optional note: make it tighter, more personal, more event-driven..."
                          loading={regeneratingTarget === "emailBlast"}
                          onChange={(value) => updateResultField("emailBlast", value)}
                          onNoteChange={(value) => updatePartialInstruction("emailBlast", value)}
                          onRegenerate={() => regenerateSection("emailBlast")}
                          onCopy={() => copyText(result.emailBlast, "email-blast")}
                        />
                        <ResultCard
                          title="Video Script"
                          body={result.videoScript}
                          copyId="video-script"
                          copiedId={copiedId}
                          onCopy={() => copyText(result.videoScript, "video-script")}
                        />
                        <ResultCard
                          title="Hashtags"
                          body={result.hashtags.join(" ")}
                          copyId="hashtags"
                          copiedId={copiedId}
                          onCopy={() => copyText(result.hashtags.join(" "), "hashtags")}
                        />
                      </div>
                    ) : null}

                    {activeTab === "open-house" ? (
                      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                        <SurfaceCard title="Open house headline" subtitle="Use this for event promo, stories, and invite graphics.">
                          <div className="rounded-[28px] border border-white/60 bg-[linear-gradient(135deg,rgba(12,49,76,0.96),rgba(19,95,118,0.92)_72%,rgba(216,160,84,0.54)_170%)] p-5 text-white shadow-[0_22px_50px_-36px_rgba(11,41,66,0.8)]">
                            <p className="break-words font-display text-2xl font-semibold leading-tight text-white">{result.openHouseKit.headline}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyText(result.openHouseKit.headline, "open-house-headline")}
                            className="mt-4 rounded-full border border-line/80 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink/74 transition hover:border-accent/30 hover:text-ink"
                          >
                            {copiedId === "open-house-headline" ? "Copied" : "Copy headline"}
                          </button>
                        </SurfaceCard>

                        <div className="space-y-5">
                          <ResultCard
                            title="Invite Text"
                            body={result.openHouseKit.inviteText}
                            copyId="open-house-invite"
                            copiedId={copiedId}
                            onCopy={() => copyText(result.openHouseKit.inviteText, "open-house-invite")}
                          />
                          <ResultCard
                            title="Follow-up Text"
                            body={result.openHouseKit.followUpText}
                            copyId="open-house-follow-up"
                            copiedId={copiedId}
                            onCopy={() => copyText(result.openHouseKit.followUpText, "open-house-follow-up")}
                          />
                        </div>
                      </div>
                    ) : null}

                    {activeTab === "seller" ? (
                      <div className="space-y-5">
                        <EditableSellerUpdateCard
                          sellerUpdate={result.sellerUpdate}
                          note={partialInstructions.sellerUpdate}
                          copiedId={copiedId}
                          loading={regeneratingTarget === "sellerUpdate"}
                          onSubjectChange={(value) => updateSellerField("subject", value)}
                          onSummaryChange={(value) => updateSellerField("summary", value)}
                          onNextStepChange={(value) => updateSellerField("nextStep", value)}
                          onNoteChange={(value) => updatePartialInstruction("sellerUpdate", value)}
                          onRegenerate={() => regenerateSection("sellerUpdate")}
                          onCopySubject={() => copyText(result.sellerUpdate.subject, "seller-subject")}
                          onCopySummary={() => copyText(result.sellerUpdate.summary, "seller-summary")}
                          onCopyNextStep={() => copyText(result.sellerUpdate.nextStep, "seller-next-step")}
                        />

                        <SurfaceCard title="Compliance review" subtitle="Final check before publishing or sending anything live.">
                          <div
                            className={cn(
                              "rounded-[22px] border px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]",
                              result.fairHousingCheck.passed
                                ? "border-[#b4dfcc] bg-[linear-gradient(180deg,#effaf4,#f8fcf9)]"
                                : "border-[#f1d0b3] bg-[linear-gradient(180deg,#fff8ef,#fffdf8)]"
                            )}
                          >
                            <p className="text-sm font-semibold text-ink">
                              {result.fairHousingCheck.passed ? "Passed compliance review" : "Needs compliance review"}
                            </p>
                            <div className="mt-3 space-y-2 text-sm leading-6 text-ink/76">
                              {(result.fairHousingCheck.notes.length > 0
                                ? result.fairHousingCheck.notes
                                : ["No compliance flags detected."]).map((note) => (
                                <p key={note}>{note}</p>
                              ))}
                            </div>
                          </div>
                        </SurfaceCard>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <div className="space-y-5">
                    <InsightPanel
                      title={localAngle}
                      body={`Likely story angle: ${localAngle}. This property currently reads strongest for ${form.idealBuyer.toLowerCase()} with a ${goalOptions
                        .find((option) => option.value === form.listingGoal)
                        ?.label.toLowerCase()} campaign. Generate the full workspace to turn this into polished channel assets, open-house copy, and seller communication.`}
                    />

                    <div className="grid gap-5 lg:grid-cols-[1fr_0.92fr]">
                      <SurfaceCard title="What the page already knows" subtitle="Pre-generation insight based on your current intake.">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <MiniSignal title="Readiness" value={`${localScore}/100`} />
                          <MiniSignal title="Primary audience" value={form.idealBuyer} />
                          <MiniSignal title="Suggested channels" value={suggestedChannels.slice(0, 2).join(" + ")} />
                          <MiniSignal title="CTA direction" value={form.ctaPreference} />
                        </div>
                      </SurfaceCard>

                      <SurfaceCard title="Likely talking points" subtitle="The strongest raw material in the listing so far.">
                        <div className="flex flex-wrap gap-2">
                          {localHighlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="rounded-full border border-white/80 bg-[linear-gradient(180deg,#ffffff,#f4f8fb)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-ink/64"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </SurfaceCard>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-[0.94fr_1.06fr]">
                      <SurfaceCard title="Missing details that would sharpen the campaign" subtitle="These inputs usually improve conversion and make the story more credible.">
                        <div className="space-y-3">
                          {missingPrompts.map((prompt, index) => (
                            <div key={prompt} className="lift-panel flex gap-3 rounded-[22px] border border-white/80 bg-[linear-gradient(180deg,#ffffff,#f8fbfc)] px-4 py-4">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
                                {index + 1}
                              </span>
                              <p className="text-sm leading-6 text-ink/76">{prompt}</p>
                            </div>
                          ))}
                        </div>
                      </SurfaceCard>

                      <SurfaceCard title="What generation will add" subtitle="The finished workspace includes strategy plus ready-to-send assets.">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <CapabilityCard title="Positioning brief" body="A crisp narrative for how to frame the listing and who it is for." />
                          <CapabilityCard title="Launch plan" body="A sequenced campaign with channel ideas, day-by-day actions, and hooks." />
                          <CapabilityCard title="Open house kit" body="Event headline, invite text, and post-event follow-up copy." />
                          <CapabilityCard title="Seller updates" body="Clear owner-facing summaries and next-step recommendations." />
                        </div>
                      </SurfaceCard>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="min-w-0 space-y-5">
            <SurfaceCard title="Listing health" subtitle="Fast feedback before you burn a generation.">
              <Gauge score={localScore} />
              <p className="mt-4 text-sm leading-7 text-ink/78">
                {localScore >= 85
                  ? "This listing brief is strong enough to support polished multi-channel output."
                  : localScore >= 70
                    ? "Good base. Add a little more local context or buyer clarity to improve the strategy."
                    : "The page can still generate from this, but you are leaving too much marketing leverage on the table."}
              </p>
            </SurfaceCard>

            <SurfaceCard title="Copilot notes" subtitle="Quick coaching based on the inputs in the form.">
              <div className="space-y-3">
                <SideNote
                  title="Story angle"
                  body={`Lead with ${localAngle.toLowerCase()} and make the CTA feel specific instead of generic.`}
                />
                <SideNote
                  title="Targeting"
                  body={`Current audience fit is strongest for ${form.idealBuyer.toLowerCase()}. If that is wrong, correct it before generating.`}
                />
                <SideNote
                  title="Campaign mode"
                  body={`${goalOptions.find((option) => option.value === form.listingGoal)?.label} pairs best with ${suggestedChannels
                    .slice(0, 2)
                    .join(" and ")}.`}
                />
              </div>
            </SurfaceCard>

            <SurfaceCard title="Recommended channels" subtitle="The immediate distribution stack for this listing.">
              <div className="space-y-2">
                {(result?.recommendedChannels ?? suggestedChannels).map((channel) => (
                  <div key={channel} className="lift-panel rounded-[22px] border border-white/80 bg-[linear-gradient(180deg,#ffffff,#f8fbfc)] px-4 py-3.5 text-sm leading-6 text-ink/76">
                    {channel}
                  </div>
                ))}
              </div>
            </SurfaceCard>

            <SurfaceCard title="Export bundle" subtitle="Once a strategy is generated, copy the whole campaign in one shot.">
              <button
                type="button"
                disabled={!result}
                onClick={copyBundle}
                className="inline-flex w-full items-center justify-center rounded-2xl border border-[#0d6f56] bg-[linear-gradient(135deg,#0f9b74,#12765d)] px-4 py-4 text-sm font-semibold text-white shadow-[0_24px_44px_-28px_rgba(15,155,116,0.78)] transition hover:-translate-y-0.5 hover:shadow-[0_30px_52px_-28px_rgba(15,155,116,0.82)] disabled:cursor-not-allowed disabled:border-[#9acdbd] disabled:bg-[#9acdbd]"
              >
                {!result ? "Generate Strategy First" : copiedId === "campaign-bundle" ? "Campaign Copied" : "Copy Full Campaign Bundle"}
              </button>
              <p className="mt-3 text-xs leading-5 text-ink/70">
                Bundle includes positioning brief, hooks, launch plan, copy assets, open-house copy, and seller notes.
              </p>
            </SurfaceCard>

            <SurfaceCard title="Workflow outputs" subtitle="Push the next action without reformatting the pack by hand.">
              <div className="space-y-2">
                <WorkflowAction
                  label="Seller report PDF"
                  detail="Opens a branded print view for save-to-PDF."
                  disabled={!result}
                  onClick={openSellerReport}
                />
                <WorkflowAction
                  label={copiedId === "workflow-email" ? "Email copied" : "Copy to email"}
                  detail="Subject + body, ready for Gmail or your CRM."
                  disabled={!result}
                  onClick={() => copyWorkflowOutput("email")}
                />
                <WorkflowAction
                  label={copiedId === "workflow-canva" ? "Canva text copied" : "Copy to Canva"}
                  detail="Headline, subheads, feature bullets, and CTA blocks."
                  disabled={!result}
                  onClick={() => copyWorkflowOutput("canva")}
                />
                <WorkflowAction
                  label={copiedId === "workflow-scheduler" ? "Scheduler batch copied" : "Copy to social scheduler"}
                  detail="Instagram, Facebook, and reel script packed into one queue."
                  disabled={!result}
                  onClick={() => copyWorkflowOutput("scheduler")}
                />
                <WorkflowAction
                  label={copiedId === "workflow-flyer" ? "Flyer text copied" : "Copy open-house flyer text"}
                  detail="Branded flyer copy with headline, facts, and RSVP line."
                  disabled={!result}
                  onClick={() => copyWorkflowOutput("flyer")}
                />
              </div>
              <p className="mt-3 text-xs leading-5 text-ink/70">
                These actions use the current edited draft, including any manual changes or partial regenerations.
              </p>
            </SurfaceCard>
          </aside>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
      <h2 className="mt-2 font-display text-[1.7rem] font-semibold leading-tight text-ink sm:text-[1.85rem]">{title}</h2>
      <p className="mt-2 max-w-[32ch] text-sm leading-7 text-ink/76">{body}</p>
    </div>
  );
}

function FormBlock({ title, caption, children }: { title: string; caption: string; children: ReactNode }) {
  return (
    <div className="space-y-4 rounded-[24px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(246,249,251,0.9))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-5">
      <div>
        <p className="text-[15px] font-semibold text-ink">{title}</p>
        <p className="mt-1 max-w-[42ch] text-[13px] leading-6 text-ink/70">{caption}</p>
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/76">{label}</span>
      {children}
    </label>
  );
}

function SurfaceCard({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="lift-panel min-w-0 rounded-[26px] border border-white/78 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(246,249,252,0.96))] p-5 shadow-[0_18px_40px_-32px_rgba(15,47,79,0.42)] sm:p-6">
      <h3 className="break-words font-display text-[1.28rem] font-semibold text-ink sm:text-[1.4rem]">{title}</h3>
      <p className="mt-1 max-w-[42ch] break-words text-sm leading-7 text-ink/74">{subtitle}</p>
      <div className="mt-4 min-w-0">{children}</div>
    </div>
  );
}

function InsightPanel({
  title,
  body,
  actionLabel,
  onAction
}: {
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-[30px] border border-line/70 bg-[linear-gradient(135deg,rgba(15,47,79,1),rgba(21,77,120,0.92)_58%,rgba(244,180,89,0.34)_150%)] p-5 text-white sm:p-6 lg:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/82">Lead narrative</p>
          <h3 className="mt-2 break-words font-display text-[2rem] font-semibold leading-tight sm:text-[2.3rem]">{title}</h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/88 sm:text-[15px]">{body}</p>
        </div>
        {actionLabel && onAction ? (
          <button
            type="button"
            onClick={onAction}
            className="rounded-full border border-white/30 bg-white/12 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/18"
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function EditableResultCard({
  title,
  body,
  valueLabel,
  note,
  notePlaceholder,
  loading,
  copyId,
  copiedId,
  onChange,
  onNoteChange,
  onRegenerate,
  onCopy
}: {
  title: string;
  body: string;
  valueLabel: string;
  note: string;
  notePlaceholder: string;
  loading: boolean;
  copyId: string;
  copiedId: string | null;
  onChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onRegenerate: () => void;
  onCopy: () => void;
}) {
  return (
    <article className="lift-panel rounded-[24px] border border-white/78 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(246,249,252,0.96))] p-5 shadow-[0_18px_38px_-34px_rgba(15,47,79,0.42)] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h4 className="break-words font-display text-[1.2rem] font-semibold text-ink sm:text-[1.35rem]">{title}</h4>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-ink/56">{valueLabel}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={onRegenerate}
            disabled={loading}
            className="rounded-full border border-accent/20 bg-[#eef8f4] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent transition hover:border-accent/35 hover:bg-[#e6f5ef] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Regenerating" : "Regenerate Only This"}
          </button>
          <button
            type="button"
            onClick={onCopy}
            className="rounded-full border border-line/80 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink/74 transition hover:border-accent/30 hover:text-ink"
          >
            {copiedId === copyId ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <textarea
        className={cn(inputClass(), "mt-4 min-h-48 whitespace-pre-wrap")}
        value={body}
        onChange={(event) => onChange(event.target.value)}
      />

      <label className="mt-4 block">
        <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/70">
          Regeneration note
        </span>
        <textarea
          className={cn(inputClass(), "min-h-24")}
          value={note}
          onChange={(event) => onNoteChange(event.target.value)}
          placeholder={notePlaceholder}
        />
      </label>
    </article>
  );
}

function ResultCard({
  title,
  body,
  copyId,
  copiedId,
  onCopy
}: {
  title: string;
  body: string;
  copyId: string;
  copiedId: string | null;
  onCopy: () => void;
}) {
  return (
    <article className="lift-panel rounded-[24px] border border-white/78 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(246,249,252,0.96))] p-5 shadow-[0_18px_38px_-34px_rgba(15,47,79,0.42)] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h4 className="break-words font-display text-[1.2rem] font-semibold text-ink sm:text-[1.35rem]">{title}</h4>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="shrink-0 rounded-full border border-line/80 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink/74 transition hover:border-accent/30 hover:text-ink"
        >
          {copiedId === copyId ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-ink/78 sm:text-[15px]">{body}</p>
    </article>
  );
}

function EditableSellerUpdateCard({
  sellerUpdate,
  note,
  copiedId,
  loading,
  onSubjectChange,
  onSummaryChange,
  onNextStepChange,
  onNoteChange,
  onRegenerate,
  onCopySubject,
  onCopySummary,
  onCopyNextStep
}: {
  sellerUpdate: GeneratedPack["sellerUpdate"];
  note: string;
  copiedId: string | null;
  loading: boolean;
  onSubjectChange: (value: string) => void;
  onSummaryChange: (value: string) => void;
  onNextStepChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onRegenerate: () => void;
  onCopySubject: () => void;
  onCopySummary: () => void;
  onCopyNextStep: () => void;
}) {
  return (
    <SurfaceCard
      title="Seller update draft"
      subtitle="Edit the note directly or regenerate only this seller-facing update when the strategy changes."
    >
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onRegenerate}
          disabled={loading}
          className="rounded-full border border-accent/20 bg-[#eef8f4] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent transition hover:border-accent/35 hover:bg-[#e6f5ef] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Regenerating" : "Regenerate Seller Update"}
        </button>
        <button
          type="button"
          onClick={onCopySubject}
          className="rounded-full border border-line/80 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink/74 transition hover:border-accent/30 hover:text-ink"
        >
          {copiedId === "seller-subject" ? "Subject copied" : "Copy subject"}
        </button>
        <button
          type="button"
          onClick={onCopySummary}
          className="rounded-full border border-line/80 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink/74 transition hover:border-accent/30 hover:text-ink"
        >
          {copiedId === "seller-summary" ? "Summary copied" : "Copy summary"}
        </button>
        <button
          type="button"
          onClick={onCopyNextStep}
          className="rounded-full border border-line/80 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink/74 transition hover:border-accent/30 hover:text-ink"
        >
          {copiedId === "seller-next-step" ? "Next step copied" : "Copy next step"}
        </button>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Field label="Subject">
          <input className={inputClass()} value={sellerUpdate.subject} onChange={(event) => onSubjectChange(event.target.value)} />
        </Field>
        <Field label="Next step">
          <textarea
            className={cn(inputClass(), "min-h-28")}
            value={sellerUpdate.nextStep}
            onChange={(event) => onNextStepChange(event.target.value)}
          />
        </Field>
      </div>

      <Field label="Summary">
        <textarea
          className={cn(inputClass(), "min-h-40")}
          value={sellerUpdate.summary}
          onChange={(event) => onSummaryChange(event.target.value)}
        />
      </Field>

      <Field label="Regeneration note">
        <textarea
          className={cn(inputClass(), "min-h-24")}
          value={note}
          onChange={(event) => onNoteChange(event.target.value)}
          placeholder="Optional note: more concise, calmer for seller concerns, stronger explanation of next steps..."
        />
      </Field>
    </SurfaceCard>
  );
}

function WorkflowAction({
  label,
  detail,
  disabled,
  onClick
}: {
  label: string;
  detail: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="lift-panel min-w-0 flex w-full items-start justify-between gap-3 rounded-[22px] border border-white/80 bg-[linear-gradient(180deg,#ffffff,#f8fbfc)] px-4 py-4 text-left transition disabled:cursor-not-allowed disabled:border-[#d6e0e7] disabled:bg-[#eef3f5] disabled:text-ink/50"
    >
      <div className="min-w-0">
        <p className="break-words text-sm font-semibold text-ink">{label}</p>
        <p className="mt-1 break-words text-xs leading-5 text-ink/66">{detail}</p>
      </div>
      <span className="shrink-0 rounded-full border border-line/70 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/58">
        Output
      </span>
    </button>
  );
}

function CapabilityCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="lift-panel min-w-0 rounded-[22px] border border-white/80 bg-[linear-gradient(180deg,#ffffff,#f6f9fb)] p-4 sm:p-5">
      <p className="break-words text-[15px] font-semibold text-ink">{title}</p>
      <p className="mt-1 break-words text-sm leading-6 text-ink/74">{body}</p>
    </div>
  );
}

function HeroNote({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[22px] border border-white/14 bg-[rgba(6,26,42,0.34)] px-4 py-4 backdrop-blur">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#87dcc0]">{title}</p>
      <p className="mt-2 text-[13px] leading-6 text-[#edf5fb] sm:text-sm">{body}</p>
    </div>
  );
}

function HeroStrip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/12 bg-[rgba(6,26,42,0.28)] px-4 py-4 backdrop-blur">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#bfd0dc]">{label}</p>
      <p className="mt-2 break-words text-[13px] leading-6 text-[#f3f7fb] sm:text-sm">{value}</p>
    </div>
  );
}

function HeroMetric({ value, label, detail }: { value: string; label: string; detail: string }) {
  return (
    <div className="rounded-[24px] border border-[#9fc0d4]/55 bg-[linear-gradient(180deg,rgba(14,44,71,0.86),rgba(18,61,94,0.94))] p-5 text-white shadow-[0_18px_40px_-30px_rgba(2,18,34,0.9)] backdrop-blur sm:min-h-[168px] lg:min-h-0">
      <p className="break-words font-display text-[1.8rem] font-semibold leading-tight text-white">{value}</p>
      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/88">{label}</p>
      <p className="mt-2 max-w-[22ch] text-sm leading-6 text-white/82">{detail}</p>
    </div>
  );
}

function ActionBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-[22px] border border-white/80 bg-[linear-gradient(180deg,#ffffff,#f6f9fb)] px-4 py-3.5 shadow-[0_18px_30px_-28px_rgba(15,47,79,0.45)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">{label}</p>
      <p className="mt-1 max-w-[20rem] break-words text-sm leading-6 text-ink/82">{value}</p>
    </div>
  );
}

function WorkspaceMetric({
  label,
  value,
  tone = "neutral"
}: {
  label: string;
  value: string;
  tone?: "good" | "warm" | "neutral";
}) {
  return (
    <div
      className={cn(
        "rounded-[22px] border px-4 py-4 sm:px-5",
        tone === "good"
          ? "border-[#bddfcd] bg-[#f1faf5]"
          : tone === "warm"
            ? "border-[#efd8b5] bg-[#fff9f0]"
            : "border-line/70 bg-[#fbfdff]"
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/68">{label}</p>
      <p className="mt-2 break-words text-sm font-semibold leading-6 text-ink sm:text-[15px]">{value}</p>
    </div>
  );
}

function SignalPill({ label, tone = "neutral" }: { label: string; tone?: "good" | "warm" | "neutral" }) {
  return (
    <span
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur",
        tone === "good"
          ? "border-[#b8dec9]/70 bg-[#eefaf4]/92 text-[#0a6f4f]"
          : tone === "warm"
            ? "border-[#efd3ad]/70 bg-[#fff7ed]/94 text-[#9a681d]"
            : "border-white/16 bg-white/7 text-white/74"
      )}
    >
      {label}
    </span>
  );
}

function MiniSignal({ title, value }: { title: string; value: string }) {
  return (
    <div className="lift-panel rounded-[22px] border border-white/80 bg-[linear-gradient(180deg,#ffffff,#f6f9fb)] p-4 sm:p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">{title}</p>
      <p className="mt-2 break-words text-sm leading-6 text-ink/82">{value}</p>
    </div>
  );
}

function Gauge({ score }: { score: number }) {
  return (
    <div className="min-w-0 rounded-[24px] border border-white/80 bg-[linear-gradient(180deg,#ffffff,#f6f9fb)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">Completeness score</p>
          <p className="mt-2 font-display text-4xl font-semibold text-ink">{score}</p>
        </div>
        <p className="max-w-[11rem] break-words text-xs leading-5 text-ink/68 sm:text-right">
          Calculated from facts, story detail, buyer clarity, and CTA specificity.
        </p>
      </div>
      <div className="mt-4 h-3 rounded-full bg-white">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#0a986e,#f4b459)]"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function SideNote({ title, body }: { title: string; body: string }) {
  return (
    <div className="lift-panel min-w-0 rounded-[22px] border border-white/80 bg-[linear-gradient(180deg,#ffffff,#f6f9fb)] p-4 sm:p-5">
      <p className="break-words text-[15px] font-semibold text-ink">{title}</p>
      <p className="mt-1 break-words text-sm leading-6 text-ink/74">{body}</p>
    </div>
  );
}

function mergePartialGeneration(
  result: GeneratedPack,
  partial: PartialGenerationPayload,
  target: PartialGenerationTarget
) {
  if (target === "sellerUpdate") {
    return {
      ...result,
      sellerUpdate: partial.sellerUpdate
    };
  }

  return {
    ...result,
    [target]: partial[target]
  };
}

function inputClass() {
  return "w-full rounded-2xl border border-white/80 bg-white/96 px-4 py-3 text-[15px] leading-6 text-ink outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] transition focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/18";
}

function parseRawMlsText(raw: string, fallback: FormState): Partial<FormState> {
  const normalized = raw.replace(/\r/g, "").trim();
  const lines = normalized
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const joined = lines.join("\n");
  const compact = lines.join(" ");

  const address =
    matchValue(joined, /(?:address|property address)[:\-]\s*(.+)/i)?.split("|")[0]?.trim() ??
    lines.find((line) => /^\d{2,}\s+.+/.test(line) && !/(bed|bath|sq|mls|price)/i.test(line));
  const cityStateMatch =
    joined.match(/([A-Za-z .'-]+),\s*([A-Z]{2})(?:\s+\d{5})?/) ??
    joined.match(/city[:\-]\s*([A-Za-z .'-]+).*?state[:\-]\s*([A-Z]{2})/i);
  const price = matchValue(joined, /(?:price|list price)[:\-]\s*(\$[\d,.\sMKmk]+)/i) ?? matchValue(compact, /(\$[\d,]+(?:\.\d+)?\s*[MKmk]?)/);
  const beds = matchValue(compact, /(\d+(?:\.\d+)?)\s*(?:bed|beds|br)\b/i);
  const baths = matchValue(compact, /(\d+(?:\.\d+)?)\s*(?:bath|baths|ba)\b/i);
  const sqft =
    matchValue(joined, /(?:sq(?:uare)?\s*(?:feet|foot|ft)|interior sqft)[:\-]\s*([\d,]+)/i) ??
    matchValue(compact, /([\d,]{3,})\s*(?:sq\.?\s*ft|sf)\b/i);
  const propertyType =
    matchValue(joined, /(?:property type|type)[:\-]\s*([A-Za-z /-]+)/i) ??
    matchPropertyType(compact) ??
    fallback.propertyType;
  const remarks = extractRemarks(joined);
  const sentences = splitSentences(remarks);
  const neighborhoodSentences = sentences.filter((sentence) =>
    /(minutes?|near|walk|walkable|close to|commute|shopping|dining|school|park|golf|resort|downtown|beach|harbor|greenway|waterfront|corridor)/i.test(
      sentence
    )
  );
  const featureSentences = sentences.filter((sentence) => !neighborhoodSentences.includes(sentence));
  const features = featureSentences.join(" ").slice(0, 1450);
  const neighborhood = neighborhoodSentences.join(" ").slice(0, 390);

  return {
    address: sanitizeImportedValue(address, fallback.address),
    city: sanitizeImportedValue(cityStateMatch?.[1], fallback.city),
    state: sanitizeImportedValue(cityStateMatch?.[2], fallback.state),
    price: sanitizeImportedValue(price, fallback.price),
    beds: sanitizeImportedValue(beds, fallback.beds),
    baths: sanitizeImportedValue(baths, fallback.baths),
    sqft: sanitizeImportedValue(sqft, fallback.sqft),
    propertyType: sanitizeImportedValue(propertyType, fallback.propertyType),
    features: sanitizeImportedValue(features || remarks, fallback.features),
    neighborhood: sanitizeImportedValue(neighborhood, fallback.neighborhood)
  };
}

function buildImportedFormState(raw: string, fallback: FormState): FormState {
  const parsed = parseRawMlsText(raw, fallback);

  return {
    ...fallback,
    ...parsed,
    idealBuyer: defaultImportedStrategy.idealBuyer,
    ctaPreference: defaultImportedStrategy.ctaPreference,
    listingGoal: defaultImportedStrategy.listingGoal,
    timeline: defaultImportedStrategy.timeline
  };
}

function computeCompletenessScore(form: FormState) {
  const values: Array<{ complete: boolean; weight: number }> = [
    { complete: form.address.trim().length > 8, weight: 10 },
    { complete: form.city.trim().length > 1, weight: 5 },
    { complete: form.state.trim().length > 1, weight: 5 },
    { complete: form.price.trim().length > 2, weight: 8 },
    { complete: form.beds.trim().length > 0, weight: 4 },
    { complete: form.baths.trim().length > 0, weight: 4 },
    { complete: form.sqft.trim().length > 1, weight: 4 },
    { complete: form.propertyType.trim().length > 2, weight: 4 },
    { complete: form.features.trim().length > 80, weight: 18 },
    { complete: form.neighborhood.trim().length > 50, weight: 14 },
    { complete: form.idealBuyer.trim().length > 20, weight: 12 },
    { complete: form.ctaPreference.trim().length > 15, weight: 8 },
    { complete: form.listingGoal.trim().length > 0, weight: 4 },
    { complete: form.timeline.trim().length > 0, weight: 4 }
  ];

  const score = values.reduce((total, item) => total + (item.complete ? item.weight : item.weight * 0.35), 0);
  return Math.min(99, Math.max(42, Math.round(score)));
}

function buildMissingPrompts(form: FormState) {
  const prompts: string[] = [];

  if (form.features.trim().length < 110) {
    prompts.push("Add more physical differentiators: renovations, views, lot value, layout flow, or special-use spaces.");
  }

  if (form.neighborhood.trim().length < 70) {
    prompts.push("Tighten the location story with walkability, commute appeal, nearby retail, schools, recreation, or lifestyle cues.");
  }

  if (form.idealBuyer.trim().length < 28) {
    prompts.push("Name the likely buyer more precisely so the messaging can feel tailored rather than broad.");
  }

  if (form.ctaPreference.trim().length < 24) {
    prompts.push("Specify what action you want next: schedule a private showing, RSVP to the open house, request upgrade sheet, or compare value.");
  }

  if (form.listingGoal === "stale-listing") {
    prompts.push("For stale listings, include what is changing now: new price, improved photos, refreshed staging, or a new story angle.");
  }

  if (form.listingGoal === "price-refresh") {
    prompts.push("For a price refresh campaign, add the strongest value narrative so the price shift feels strategic, not reactive.");
  }

  return (prompts.length > 0
    ? prompts
    : [
        "Add a few more proof points that justify the price and make the property easier to remember.",
        "Clarify what lifestyle the buyer is buying into so the copy can carry more emotional weight."
      ]
  ).slice(0, 4);
}

function buildNarrativeAngle(form: FormState) {
  const base =
    form.listingGoal === "open-house"
      ? "high-touch event-driven discovery"
      : form.listingGoal === "stale-listing"
        ? "fresh-market repositioning"
        : form.listingGoal === "price-refresh"
          ? "value-driven re-entry"
          : form.tone === "luxury"
            ? "aspirational lifestyle-led positioning"
            : form.tone === "investor-focused"
              ? "return and upside storytelling"
              : "practical lifestyle utility";

  if (form.targetChannel === "relocation") {
    return `${base} for relocation buyers seeking confidence and convenience`;
  }

  if (form.targetChannel === "investors") {
    return `${base} with a sharper emphasis on efficiency, margin, and optionality`;
  }

  return `${base} for ${form.idealBuyer.replace(/\.$/, "")}`;
}

function deriveHighlights(value: string, limit: number) {
  const parts = value
    .split(/[,.;]/)
    .map((part) => part.trim())
    .filter(Boolean);

  const unique = Array.from(new Set(parts));
  return unique.slice(0, limit);
}

function suggestChannels(form: FormState) {
  const channels = ["MLS refresh", "Instagram reel", "email blast"];

  if (form.listingGoal === "open-house") {
    channels.push("open house RSVP push", "story countdown");
  }

  if (form.listingGoal === "stale-listing" || form.listingGoal === "price-refresh") {
    channels.push("price-improvement relaunch", "broker outreach note");
  }

  if (form.targetChannel === "relocation") {
    channels.push("relocation-friendly email sequence");
  }

  if (form.targetChannel === "investors") {
    channels.push("investor snapshot");
  }

  return Array.from(new Set(channels)).slice(0, 5);
}

function buildCampaignBundle(result: GeneratedPack) {
  return [
    result.title,
    "",
    `Hero Angle: ${result.heroAngle}`,
    "",
    "Positioning Brief",
    result.positioningBrief,
    "",
    "Likely Buyer",
    result.audienceProfile,
    "",
    "Best Hooks",
    ...result.bestHooks.map((hook) => `- ${hook}`),
    "",
    "Launch Plan",
    ...result.launchPlan.map((step) => `- ${step.day}: ${step.focus} | ${step.asset} | ${step.action}`),
    "",
    "MLS Description",
    result.mlsDescription,
    "",
    "Instagram Caption",
    result.instagramCaption,
    "",
    "Facebook Post",
    result.facebookPost,
    "",
    "Email Blast",
    result.emailBlast,
    "",
    "Video Script",
    result.videoScript,
    "",
    "Hashtags",
    result.hashtags.join(" "),
    "",
    "Open House Invite",
    result.openHouseKit.headline,
    result.openHouseKit.inviteText,
    "",
    "Open House Follow-up",
    result.openHouseKit.followUpText,
    "",
    "Seller Update",
    result.sellerUpdate.subject,
    result.sellerUpdate.summary,
    result.sellerUpdate.nextStep,
    "",
    "Compliance Notes",
    ...(result.fairHousingCheck.notes.length > 0 ? result.fairHousingCheck.notes : ["No compliance flags detected."])
  ].join("\n");
}

function buildEmailTransfer(result: GeneratedPack) {
  return result.emailBlast;
}

function buildCanvaTransfer(result: GeneratedPack, form: FormState) {
  return [
    "Canva Flyer Copy",
    "",
    `Headline: ${result.openHouseKit.headline}`,
    `Subhead: ${result.heroAngle}`,
    `Address: ${form.address}, ${form.city}, ${form.state}`,
    `Price: ${form.price}`,
    `Specs: ${form.beds} bed | ${form.baths} bath | ${form.sqft} sq ft | ${form.propertyType}`,
    "",
    "Feature Bullets",
    ...deriveHighlights(result.mlsDescription, 4).map((item) => `- ${item}`),
    "",
    "CTA",
    form.ctaPreference,
    "",
    "Open House Invite",
    result.openHouseKit.inviteText
  ].join("\n");
}

function buildSocialSchedulerTransfer(result: GeneratedPack) {
  return [
    "Social Scheduler Queue",
    "",
    "[Instagram Caption]",
    result.instagramCaption,
    "",
    "[Facebook Post]",
    result.facebookPost,
    "",
    "[Reel Script]",
    result.videoScript,
    "",
    "[Hashtags]",
    result.hashtags.join(" ")
  ].join("\n");
}

function buildOpenHouseFlyerTransfer(result: GeneratedPack, form: FormState) {
  return [
    result.openHouseKit.headline,
    `${form.address}, ${form.city}, ${form.state}`,
    `${form.price} | ${form.beds} bed | ${form.baths} bath | ${form.sqft} sq ft`,
    "",
    deriveHighlights(result.mlsDescription, 3)
      .map((item) => `• ${item}`)
      .join("\n"),
    "",
    result.openHouseKit.inviteText,
    "",
    `CTA: ${form.ctaPreference}`
  ].join("\n");
}

function buildSellerReportHtml(result: GeneratedPack, form: FormState) {
  const hooks = result.bestHooks.map((hook) => `<li>${escapeHtml(hook)}</li>`).join("");
  const steps = result.launchPlan
    .map(
      (step) => `
        <tr>
          <td>${escapeHtml(step.day)}</td>
          <td>${escapeHtml(step.focus)}</td>
          <td>${escapeHtml(step.asset)}</td>
          <td>${escapeHtml(step.action)}</td>
        </tr>
      `
    )
    .join("");
  const complianceNotes = (result.fairHousingCheck.notes.length > 0
    ? result.fairHousingCheck.notes
    : ["No compliance flags detected."])
    .map((note) => `<li>${escapeHtml(note)}</li>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(form.address)} Seller Report</title>
    <style>
      body { font-family: "Helvetica Neue", Arial, sans-serif; margin: 0; color: #0b2942; background: #f4f7f8; }
      .page { max-width: 860px; margin: 0 auto; padding: 32px 28px 48px; }
      .hero { background: linear-gradient(135deg, #0b2942, #184d6d); color: white; padding: 28px; border-radius: 28px; }
      .eyebrow { font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; opacity: 0.8; }
      h1 { margin: 12px 0 6px; font-size: 36px; line-height: 1.05; }
      h2 { margin: 0 0 12px; font-size: 22px; }
      p { margin: 0; line-height: 1.7; }
      .grid { display: grid; gap: 18px; grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 18px; }
      .card { background: white; border: 1px solid #d7e1e8; border-radius: 24px; padding: 22px; }
      .stats { display: grid; gap: 14px; grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 18px; }
      .stat { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18); border-radius: 20px; padding: 16px; }
      .stat strong { display: block; font-size: 24px; margin-bottom: 6px; }
      ul { margin: 0; padding-left: 18px; line-height: 1.7; }
      table { width: 100%; border-collapse: collapse; font-size: 14px; }
      th, td { border-top: 1px solid #d7e1e8; padding: 12px 10px; text-align: left; vertical-align: top; }
      th { font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #5b7286; }
      .meta { margin-top: 10px; color: rgba(255,255,255,0.84); }
      .footer { margin-top: 20px; font-size: 12px; color: #5b7286; }
      @media print {
        body { background: white; }
        .page { padding: 0; max-width: none; }
      }
    </style>
  </head>
  <body>
    <div class="page">
      <section class="hero">
        <div class="eyebrow">MLSGPT Seller Report</div>
        <h1>${escapeHtml(form.address)}</h1>
        <p class="meta">${escapeHtml(`${form.city}, ${form.state} | ${form.price} | ${form.beds} bed | ${form.baths} bath | ${form.sqft} sq ft`)}</p>
        <div class="stats">
          <div class="stat"><strong>${result.launchReadinessScore}/100</strong><span>Launch readiness</span></div>
          <div class="stat"><strong>${escapeHtml(result.heroAngle)}</strong><span>Core positioning</span></div>
          <div class="stat"><strong>${escapeHtml(result.sellerUpdate.nextStep)}</strong><span>Recommended next step</span></div>
        </div>
      </section>

      <div class="grid">
        <section class="card">
          <h2>Seller Summary</h2>
          <p>${escapeHtml(result.sellerUpdate.summary)}</p>
        </section>
        <section class="card">
          <h2>Likely Buyer</h2>
          <p>${escapeHtml(result.audienceProfile)}</p>
        </section>
      </div>

      <section class="card" style="margin-top: 18px;">
        <h2>Best Hooks</h2>
        <ul>${hooks}</ul>
      </section>

      <section class="card" style="margin-top: 18px;">
        <h2>Launch Plan</h2>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Focus</th>
              <th>Asset</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>${steps}</tbody>
        </table>
      </section>

      <section class="card" style="margin-top: 18px;">
        <h2>Compliance Review</h2>
        <ul>${complianceNotes}</ul>
      </section>

      <p class="footer">Generated from the current edited MLSGPT workspace. Use your browser print dialog to save as PDF.</p>
    </div>
  </body>
</html>`;
}

function matchValue(value: string, regex: RegExp) {
  return value.match(regex)?.[1]?.trim();
}

function matchPropertyType(value: string) {
  const knownTypes = [
    "Single Family",
    "Condo",
    "Townhome",
    "Townhouse",
    "Multi-Family",
    "Loft",
    "Co-op"
  ];

  return knownTypes.find((type) => new RegExp(type.replace("-", "[- ]"), "i").test(value));
}

function sanitizeImportedValue(value: string | undefined, fallback: string) {
  return value?.trim() ? value.trim() : fallback;
}

function extractRemarks(value: string) {
  const remarks =
    matchValue(value, /(?:public remarks?|remarks?|description|marketing remarks?)[:\-]\s*([\s\S]+)/i) ??
    value;

  return remarks.replace(/\s+/g, " ").trim();
}

function splitSentences(value: string) {
  return value
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 20);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const defaultImportedStrategy: Pick<
  FormState,
  "idealBuyer" | "ctaPreference" | "listingGoal" | "timeline"
> = {
  idealBuyer: "Buyer looking for a home that matches their lifestyle, budget, and location priorities.",
  ctaPreference: "Invite a private tour or request the full property details.",
  listingGoal: "new-launch",
  timeline: "launch-this-week"
};
