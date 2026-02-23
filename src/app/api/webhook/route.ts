import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
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

    console.log("Order completed:", {
      sessionId: session.id,
      email: customerEmail,
      items: fullSession.metadata?.order_items,
    });

    // TODO: Create Printful order here once products are synced.
    // Retrieve shipping info from the Stripe session and use it
    // to call createPrintfulOrder() from @/lib/printful
    //
    // const items = JSON.parse(fullSession.metadata?.order_items || "[]");
    // await createPrintfulOrder(recipient, printfulItems);
  }

  return NextResponse.json({ received: true });
}
