const PRINTFUL_API = "https://api.printful.com";

function headers(): Record<string, string> {
  const key = process.env.PRINTFUL_API_KEY;
  if (!key) {
    throw new Error("PRINTFUL_API_KEY is not set in environment variables");
  }
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

export interface PrintfulOrderItem {
  sync_variant_id?: number;
  name: string;
  quantity: number;
  retail_price: string;
  files?: { url: string }[];
}

export interface PrintfulRecipient {
  name: string;
  address1: string;
  city: string;
  state_code: string;
  country_code: string;
  zip: string;
  email: string;
}

export async function createPrintfulOrder(
  recipient: PrintfulRecipient,
  items: PrintfulOrderItem[]
) {
  const res = await fetch(`${PRINTFUL_API}/orders`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      recipient,
      items,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Printful API error: ${JSON.stringify(error)}`);
  }

  return res.json();
}

export async function getStoreProducts() {
  const res = await fetch(`${PRINTFUL_API}/store/products`, {
    headers: headers(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Printful products");
  }

  return res.json();
}
