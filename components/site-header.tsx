"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/#features", label: "Features" },
  { href: "/mls-description-generator", label: "MLS Copy" },
  { href: "/real-estate-social-media-caption-generator", label: "Social" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#trust", label: "Trust" }
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(8,27,43,0.74)] text-white backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-white" onClick={closeMenu}>
          MLS<span className="text-[#83d8b9]">GPT</span>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-2 text-sm text-white/78 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-white/6 text-white transition hover:bg-white/10 md:hidden"
          >
            <span className="flex flex-col gap-1.5">
              <span className={menuBarClass(menuOpen, "translate-y-[7px] rotate-45")} />
              <span className={menuBarClass(menuOpen, "opacity-0")} />
              <span className={menuBarClass(menuOpen, "-translate-y-[7px] -rotate-45")} />
            </span>
          </button>

          <Link
            href="/generate"
            className="inline-flex items-center rounded-full border border-white/16 bg-[linear-gradient(135deg,#ffffff,#dfe9f2)] px-4 py-2 text-sm font-semibold text-[#0b2942] shadow-[0_18px_30px_-24px_rgba(0,0,0,0.65)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_34px_-24px_rgba(0,0,0,0.78)]"
            onClick={closeMenu}
          >
            Try Free
          </Link>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-white/10 bg-[rgba(8,27,43,0.94)] px-4 py-4 md:hidden">
          <div className="mx-auto max-w-7xl rounded-[24px] border border-white/12 bg-white/6 p-3 shadow-[0_18px_36px_-24px_rgba(0,0,0,0.6)] backdrop-blur">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="block rounded-[18px] px-4 py-3 text-sm font-medium text-white/82 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <p className="mt-3 rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.06)] px-4 py-3 text-xs leading-5 text-white/70">
              Browse the main search-focused pages, pricing, and trust details here before jumping into the generator.
            </p>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function menuBarClass(open: boolean, openClass: string) {
  return [
    "block h-0.5 w-5 rounded-full bg-current transition",
    open ? openClass : ""
  ].join(" ");
}
