import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: {
    canonical: "/terms"
  }
};

export default function TermsPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-semibold text-ink">Terms of Service</h1>
      <p className="mt-4 text-sm text-ink/70">Effective date: February 13, 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/80">
        <p>
          MLSGPT is provided as-is for business productivity. You agree to use generated content responsibly and verify factual accuracy and legal compliance before publishing.
        </p>
        <p>
          Do not upload data you are not authorized to use. You retain responsibility for brokerage, MLS, and advertising compliance in your jurisdiction.
        </p>
        <p>
          Subscriptions renew automatically until canceled in Stripe customer portal or by contacting support.
        </p>
        <p>Contact: legal@mlsgpt.com</p>
      </div>
    </section>
  );
}
