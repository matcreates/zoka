import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Clothing — Zoka",
  description: "Art-driven clothing by Zoka. Tees, hoodies, crewnecks, and caps printed on demand.",
};

export default function ClothingPage() {
  const clothing = getProductsByCategory("clothing");

  return (
    <>
      <section className="bg-beige">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Clothing</h1>
          <p className="text-foreground-muted max-w-md mx-auto">
            Wearable art. Every piece is printed on demand with premium materials
            and shipped directly to you.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clothing.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
