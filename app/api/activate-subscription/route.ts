import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

import { createAccessToken } from "@/lib/access-token";

const schema = z.object({
  sessionId: z.string().min(8)
});

function resolvePlan(priceId: string | null | undefined) {
  if (!priceId) {
    return null;
  }

  if (priceId === process.env.STRIPE_PRICE_PRO) {
    return "pro" as const;
  }

  if (priceId === process.env.STRIPE_PRICE_STARTER) {
    return "starter" as const;
  }

  return null;
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid session id." }, { status: 400 });
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const signingSecret = process.env.ACCESS_TOKEN_SECRET;

  if (!stripeSecret || !signingSecret) {
    return NextResponse.json(
      {
        error:
          "Missing STRIPE_SECRET_KEY or ACCESS_TOKEN_SECRET on server."
      },
      { status: 500 }
    );
  }

  try {
    const stripe = new Stripe(stripeSecret);
    const checkoutSession = await stripe.checkout.sessions.retrieve(parsed.data.sessionId, {
      expand: ["subscription"]
    });

    if (checkoutSession.mode !== "subscription" || checkoutSession.status !== "complete") {
      return NextResponse.json({ error: "Checkout session is not completed." }, { status: 400 });
    }

    const subscriptionRef = checkoutSession.subscription;
    const subscriptionId =
      typeof subscriptionRef === "string" ? subscriptionRef : subscriptionRef?.id;

    if (!subscriptionId) {
      return NextResponse.json({ error: "Subscription was not attached to checkout session." }, { status: 400 });
    }

    const subscription =
      typeof subscriptionRef === "string"
        ? await stripe.subscriptions.retrieve(subscriptionRef)
        : subscriptionRef;

    if (!subscription) {
      return NextResponse.json({ error: "Subscription not found." }, { status: 404 });
    }

    if (!["active", "trialing", "past_due"].includes(subscription.status)) {
      return NextResponse.json({ error: "Subscription is not active." }, { status: 402 });
    }

    const customerId =
      typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer?.id;

    if (!customerId) {
      return NextResponse.json({ error: "Subscription customer is missing." }, { status: 400 });
    }

    const priceId = subscription.items.data[0]?.price?.id;
    const plan = resolvePlan(priceId);

    if (!plan) {
      return NextResponse.json({ error: "Unable to map subscription plan." }, { status: 400 });
    }

    const token = createAccessToken(
      {
        customerId,
        subscriptionId,
        plan
      },
      signingSecret
    );

    const response = NextResponse.json({ ok: true, plan });

    response.cookies.set({
      name: "mlsgpt_access",
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/"
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Activation failed.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
