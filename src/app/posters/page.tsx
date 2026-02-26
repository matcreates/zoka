import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/lib/products";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Posters — Zoka",
  description:
    "Museum-quality art prints by Zoka. Available in multiple sizes on premium paper.",
};

export default async function PostersPage() {
  const posters = await getProductsByCategory("poster");

  return (
    <>
      <section className="bg-beige">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Posters</h1>
          <p className="text-foreground-muted max-w-md mx-auto">
            Museum-quality art prints on premium paper. Each piece is printed
            on demand and shipped in protective packaging.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        {posters.length === 0 ? (
          <p className="text-center text-foreground-muted py-12">
            No poster products available yet. Check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posters.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
