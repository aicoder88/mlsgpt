import Link from "next/link";

export default function CancelPage() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="rounded-full border border-[#e0bd7a] bg-[#fff8e9] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#8f6414]">
        Checkout Cancelled
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold text-ink">No charge was made.</h1>
      <p className="mt-3 text-ink/75">You can still use the generator and subscribe any time when ready.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-xl border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/45"
      >
        Return Home
      </Link>
    </section>
  );
}
