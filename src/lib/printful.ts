const PRINTFUL_API = "https://api.printful.com";

function getHeaders(): Record<string, string> {
  const key = process.env.PRINTFUL_API_KEY;
  if (!key) {
    throw new Error("PRINTFUL_API_KEY is not set in environment variables");
  }
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

// ---------- Types ----------

export interface PrintfulSyncProduct {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string;
}

export interface PrintfulSyncVariant {
  id: number;
  external_id: string;
  sync_product_id: number;
  name: string;
  synced: boolean;
  variant_id: number;
  retail_price: string;
  currency: string;
  product: {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
  };
  files: Array<{
    id: number;
    type: string;
    url: string;
    preview_url: string;
  }>;
}

export interface PrintfulRecipient {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state_code: string;
  country_code: string;
  zip: string;
  email: string;
}

// ---------- Fetching ----------

export async function fetchAllSyncProducts(): Promise<PrintfulSyncProduct[]> {
  const all: PrintfulSyncProduct[] = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const res = await fetch(
      `${PRINTFUL_API}/store/products?offset=${offset}&limit=${limit}`,
      { headers: getHeaders(), next: { revalidate: 3600, tags: ["printful-products"] } }
    );
    if (!res.ok) throw new Error("Failed to fetch products from Printful");
    const data = await res.json();
    const products: PrintfulSyncProduct[] = data.result;
    all.push(...products);
    if (products.length < limit) break;
    offset += limit;
  }

  return all;
}

export async function fetchSyncProduct(id: number): Promise<{
  sync_product: PrintfulSyncProduct;
  sync_variants: PrintfulSyncVariant[];
}> {
  const res = await fetch(`${PRINTFUL_API}/store/products/${id}`, {
    headers: getHeaders(),
    next: { revalidate: 3600, tags: ["printful-products"] },
  });
  if (!res.ok) throw new Error(`Failed to fetch product ${id} from Printful`);
  const data = await res.json();
  return data.result;
}

// ---------- Order creation ----------

export async function createPrintfulOrder(
  recipient: PrintfulRecipient,
  items: Array<{ sync_variant_id: number; quantity: number }>
) {
  const res = await fetch(`${PRINTFUL_API}/orders`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      recipient,
      items: items.map((i) => ({
        sync_variant_id: i.sync_variant_id,
        quantity: i.quantity,
      })),
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(`Printful order creation failed: ${JSON.stringify(error)}`);
  }

  return res.json();
}

// ---------- Category detection ----------

const POSTER_KEYWORDS = [
  "poster",
  "print",
  "canvas",
  "framed",
  "art print",
  "wall art",
  "matte paper",
  "glossy paper",
  "museum-quality",
];

export function categorizeFromCatalogName(catalogProductName: string): "clothing" | "poster" {
  const lower = catalogProductName.toLowerCase();
  return POSTER_KEYWORDS.some((kw) => lower.includes(kw)) ? "poster" : "clothing";
}
