import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

export async function POST(request: Request) {
  try {
    const { items }: { items: CheckoutItem[] } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const origin = request.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
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
            description: item.size ? `Size: ${item.size}` : undefined,
            metadata: {
              product_id: item.id,
              size: item.size || "",
            },
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}`,
      metadata: {
        order_items: JSON.stringify(
          items.map((i) => ({ id: i.id, size: i.size, qty: i.quantity }))
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
