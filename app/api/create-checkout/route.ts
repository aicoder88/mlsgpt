import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

const schema = z.object({
  plan: z.enum(["starter", "pro"])
});

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
  }

  const fallbackPaymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;
  const secret = process.env.STRIPE_SECRET_KEY;

  if (!secret) {
    if (fallbackPaymentLink) {
      return NextResponse.json({ url: fallbackPaymentLink });
    }

    return NextResponse.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY or NEXT_PUBLIC_STRIPE_PAYMENT_LINK." },
      { status: 500 }
    );
  }

  const starterPriceId = process.env.STRIPE_PRICE_STARTER;
  const proPriceId = process.env.STRIPE_PRICE_PRO;

  const selectedPriceId = parsed.data.plan === "pro" ? proPriceId : starterPriceId;

  if (!selectedPriceId) {
    return NextResponse.json({ error: "Missing Stripe price ID for selected plan." }, { status: 500 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;

  try {
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: selectedPriceId, quantity: 1 }],
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel`,
      metadata: {
        product: "mlsgpt",
        plan: parsed.data.plan
      }
    });

    if (!session.url) {
      throw new Error("Stripe did not return checkout URL.");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
