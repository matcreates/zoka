import {
  fetchAllSyncProducts,
  fetchSyncProduct,
  categorizeFromCatalogName,
  type PrintfulSyncVariant,
} from "./printful";

// ---------- Types ----------

export interface ProductVariant {
  syncVariantId: number;
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "clothing" | "poster";
  images: string[];
  thumbnail: string;
  variants: ProductVariant[];
}

// ---------- Helpers ----------

function extractVariantLabel(variantName: string, productName: string): string {
  const stripped = variantName.replace(productName, "").replace(/^\s*[-–—]\s*/, "").trim();
  return stripped || variantName;
}

function bestImage(variant: PrintfulSyncVariant, fallback: string): string {
  const preview = variant.files.find((f) => f.type === "preview");
  if (preview?.preview_url) return preview.preview_url;
  const defaultFile = variant.files.find((f) => f.type === "default");
  if (defaultFile?.preview_url) return defaultFile.preview_url;
  if (variant.files[0]?.preview_url) return variant.files[0].preview_url;
  return fallback;
}

function buildDescription(catalogName: string, category: "clothing" | "poster"): string {
  if (category === "poster") {
    return `Museum-quality art print on premium paper. Printed on demand by Printful using ${catalogName} and shipped in protective packaging worldwide.`;
  }
  return `Premium quality ${catalogName.toLowerCase()}. Printed on demand by Printful and shipped directly to your door.`;
}

// ---------- Data fetching ----------

export async function getAllProducts(): Promise<Product[]> {
  if (!process.env.PRINTFUL_API_KEY) {
    console.warn("PRINTFUL_API_KEY not set — returning empty product list");
    return [];
  }

  try {
    const syncProducts = await fetchAllSyncProducts();
    const products: Product[] = [];

    for (const sp of syncProducts) {
      try {
        const details = await fetchSyncProduct(sp.id);
        const variants = details.sync_variants;
        if (variants.length === 0) continue;

        const catalogName = variants[0].product.name;
        const category = categorizeFromCatalogName(catalogName);
        const prices = variants.map((v) => parseFloat(v.retail_price));
        const minPrice = Math.min(...prices);

        const images: string[] = [];
        const seen = new Set<string>();
        for (const v of variants) {
          const img = bestImage(v, sp.thumbnail_url);
          if (!seen.has(img)) {
            seen.add(img);
            images.push(img);
          }
        }

        products.push({
          id: sp.id.toString(),
          name: sp.name,
          description: buildDescription(catalogName, category),
          price: minPrice,
          category,
          images: images.length > 0 ? images : [sp.thumbnail_url],
          thumbnail: sp.thumbnail_url,
          variants: variants.map((v) => ({
            syncVariantId: v.id,
            label: extractVariantLabel(v.name, sp.name),
            price: parseFloat(v.retail_price),
          })),
        });
      } catch (err) {
        console.error(`Failed to fetch details for product ${sp.id}:`, err);
      }
    }

    return products;
  } catch (err) {
    console.error("Failed to fetch products from Printful:", err);
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | undefined> {
  const all = await getAllProducts();
  return all.find((p) => p.id === id);
}

export async function getProductsByCategory(
  category: "clothing" | "poster"
): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.category === category);
}
