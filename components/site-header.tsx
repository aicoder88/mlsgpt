import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink">
          MLS<span className="text-accent">GPT</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-ink/80 md:flex">
          <a href="#features" className="transition hover:text-ink">
            Features
          </a>
          <a href="#pricing" className="transition hover:text-ink">
            Pricing
          </a>
          <a href="#trust" className="transition hover:text-ink">
            Trust
          </a>
        </nav>
        <Link
          href="/generate"
          className="inline-flex items-center rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0b2744]"
        >
          Try Free
        </Link>
      </div>
    </header>
  );
}
