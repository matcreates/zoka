import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createPrintfulOrder } from "@/lib/printful";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const fullSession = await getStripe().checkout.sessions.retrieve(session.id);
    const customerEmail = fullSession.customer_details?.email;
    const customerName = fullSession.customer_details?.name;
    const shipping = fullSession.collected_information?.shipping_details;

    const rawItems = fullSession.metadata?.printful_items;
    if (!rawItems) {
      console.error("No printful_items in session metadata", session.id);
      return NextResponse.json({ received: true });
    }

    const items: Array<{ svid: number; qty: number }> = JSON.parse(rawItems);

    try {
      const result = await createPrintfulOrder(
        {
          name: shipping?.name || customerName || "Customer",
          address1: shipping?.address?.line1 || "",
          address2: shipping?.address?.line2 || undefined,
          city: shipping?.address?.city || "",
          state_code: shipping?.address?.state || "",
          country_code: shipping?.address?.country || "",
          zip: shipping?.address?.postal_code || "",
          email: customerEmail || "",
        },
        items.map((i) => ({
          sync_variant_id: i.svid,
          quantity: i.qty,
        }))
      );

      console.log("Printful order created:", result.result?.id, "for session:", session.id);
    } catch (err) {
      console.error("Failed to create Printful order for session:", session.id, err);
    }
  }

  return NextResponse.json({ received: true });
}
