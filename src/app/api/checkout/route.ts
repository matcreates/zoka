import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

interface CheckoutItem {
  syncVariantId: number;
  name: string;
  variantLabel: string;
  price: number;
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const { items }: { items: CheckoutItem[] } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const origin = request.headers.get("origin") || "http://localhost:3000";

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: [
          "US", "CA", "GB", "FR", "DE", "IT", "ES", "NL", "BE", "AT",
          "AU", "NZ", "JP", "SE", "DK", "NO", "FI", "IE", "PT", "CH",
        ],
      },
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: item.variantLabel,
            metadata: {
              sync_variant_id: item.syncVariantId.toString(),
            },
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}`,
      metadata: {
        printful_items: JSON.stringify(
          items.map((i) => ({
            svid: i.syncVariantId,
            qty: i.quantity,
          }))
        ),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
