import Link from "next/link";

import { RoiPoweredLink } from "@/components/roi-powered-link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line/70 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 text-sm text-ink/70 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <p className="font-display text-xl font-semibold text-ink">
            MLS<span className="text-accent">GPT</span>
          </p>
          <p className="mt-3 max-w-[32rem] leading-6">
            AI marketing software for real-estate agents who need MLS descriptions, social media captions, email
            blasts, open house promos, and seller updates from one listing brief.
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.14em] text-ink/55">
            © {new Date().getFullYear()} MLSGPT. Built for real-estate marketing teams.
          </p>
          <RoiPoweredLink className="mt-3 text-sm leading-6 text-ink/58" />
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/55">Use Cases</p>
          <div className="mt-3 space-y-2">
            <Link href="/mls-description-generator" className="block hover:text-ink">
              MLS Description Generator
            </Link>
            <Link href="/real-estate-social-media-caption-generator" className="block hover:text-ink">
              Social Caption Generator
            </Link>
            <Link href="/open-house-marketing-generator" className="block hover:text-ink">
              Open House Marketing
            </Link>
            <Link href="/real-estate-email-generator" className="block hover:text-ink">
              Real Estate Email Generator
            </Link>
            <Link href="/ai-for-real-estate-agents" className="block hover:text-ink">
              AI For Real Estate Agents
            </Link>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/55">Company</p>
          <div className="mt-3 space-y-2">
            <Link href="/generate" className="block hover:text-ink">
              App
            </Link>
            <Link href="/#pricing" className="block hover:text-ink">
              Pricing
            </Link>
            <Link href="/privacy" className="block hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="block hover:text-ink">
              Terms
            </Link>
            <a
              href="https://roigpt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-ink"
            >
              ROI GPT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
