"use client";

import { useState } from "react";

type CheckoutButtonProps = {
  plan: "starter" | "pro";
  className?: string;
};

export function CheckoutButton({ plan, className }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan })
      });

      const payload = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error || "Unable to initialize checkout");
      }

      window.location.href = payload.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected checkout error");
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <button
        onClick={startCheckout}
        disabled={loading}
        className={
          className ??
          "inline-flex w-full items-center justify-center rounded-xl bg-ink px-4 py-3 font-semibold text-white transition hover:bg-[#0d2f52] disabled:cursor-not-allowed disabled:opacity-70"
        }
      >
        {loading ? "Redirecting..." : `Start ${plan === "pro" ? "Pro" : "Starter"}`}
      </button>
      {error ? <p className="mt-2 text-xs text-[#a31f1f]">{error}</p> : null}
    </div>
  );
}
