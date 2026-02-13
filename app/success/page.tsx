import Link from "next/link";

export default function SuccessPage() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        Subscription Active
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold text-ink">You are live.</h1>
      <p className="mt-3 text-ink/75">Checkout completed successfully. Your account can now generate paid-plan content volume.</p>
      <Link
        href="/generate"
        className="mt-8 inline-flex items-center justify-center rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#123a60]"
      >
        Open Generator
      </Link>
    </section>
  );
}
