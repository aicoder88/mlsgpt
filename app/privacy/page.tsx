import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: {
    canonical: "/privacy"
  }
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-semibold text-ink">Privacy Policy</h1>
      <p className="mt-4 text-sm text-ink/70">Effective date: February 13, 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/80">
        <p>
          MLSGPT processes listing details you submit in order to generate marketing content. We collect minimal technical logs for security, abuse prevention, and service reliability.
        </p>
        <p>
          Payments are handled by Stripe. We do not store full card numbers. Generated content may be retained for product performance and troubleshooting.
        </p>
        <p>
          You are responsible for reviewing generated outputs for local compliance and fair housing rules before publication.
        </p>
        <p>Contact: privacy@mlsgpt.com</p>
      </div>
    </section>
  );
}
