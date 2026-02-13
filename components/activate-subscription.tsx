"use client";

import { useEffect, useState } from "react";

type ActivateSubscriptionProps = {
  sessionId?: string;
};

export function ActivateSubscription({ sessionId }: ActivateSubscriptionProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    sessionId ? "loading" : "idle"
  );
  const [message, setMessage] = useState<string>(
    sessionId ? "Activating your paid access..." : "No checkout session detected."
  );

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    const controller = new AbortController();

    async function run() {
      try {
        const response = await fetch("/api/activate-subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
          signal: controller.signal
        });

        const payload = (await response.json()) as {
          ok?: boolean;
          plan?: string;
          error?: string;
        };

        if (!response.ok || !payload.ok) {
          throw new Error(payload.error ?? "Activation failed.");
        }

        setStatus("done");
        setMessage(`Paid access is active (${payload.plan ?? "plan"}).`);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Activation error.");
      }
    }

    void run();

    return () => controller.abort();
  }, [sessionId]);

  const tone =
    status === "error"
      ? "border-[#f0b8b8] bg-[#fff1f1] text-[#8a1919]"
      : status === "done"
        ? "border-accent/25 bg-accent/10 text-accent"
        : "border-line bg-[#f7fbff] text-ink/80";

  return <p className={`mt-5 rounded-xl border px-4 py-3 text-sm ${tone}`}>{message}</p>;
}
