import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line/70 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-ink/70 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} MLSGPT. Built for real-estate marketing teams.</p>
        <div className="flex items-center gap-5">
          <Link href="/privacy" className="hover:text-ink">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-ink">
            Terms
          </Link>
          <Link href="/generate" className="hover:text-ink">
            App
          </Link>
        </div>
      </div>
    </footer>
  );
}
