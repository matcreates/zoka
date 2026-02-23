import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory, getFeaturedProducts } from "@/lib/products";

export default function Home() {
  const featured = getFeaturedProducts();
  const featuredClothing = featured.filter((p) => p.category === "clothing");
  const featuredPosters = featured.filter((p) => p.category === "poster");

  return (
    <>
      {/* Hero */}
      <section className="relative bg-beige overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-32 md:py-44 flex flex-col items-center text-center">
          <Image
            src="/logo.png"
            alt="Zoka"
            width={280}
            height={112}
            className="h-24 md:h-32 w-auto mb-8"
            priority
          />
          <p className="text-foreground-muted text-lg md:text-xl max-w-lg mb-10 text-balance">
            Art-driven clothing and prints. Designed with intention, printed on
            demand, shipped worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/clothing"
              className="inline-flex items-center gap-2 bg-blue text-white px-8 py-3 rounded-lg font-medium text-sm hover:bg-blue-dark transition-colors"
            >
              Shop Clothing <ArrowRight size={16} />
            </Link>
            <Link
              href="/posters"
              className="inline-flex items-center gap-2 bg-foreground text-beige-light px-8 py-3 rounded-lg font-medium text-sm hover:bg-foreground/80 transition-colors"
            >
              Shop Posters <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue/5 rounded-full translate-x-1/3 translate-y-1/3" />
      </section>

      {/* Featured Clothing */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Clothing</h2>
            <p className="text-foreground-muted text-sm mt-1">
              Wearable art, printed on demand
            </p>
          </div>
          <Link
            href="/clothing"
            className="text-sm font-medium text-blue hover:text-blue-dark transition-colors inline-flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {featuredClothing.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-beige-dark/30" />
      </div>

      {/* Featured Posters */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Posters</h2>
            <p className="text-foreground-muted text-sm mt-1">
              Museum-quality art prints
            </p>
          </div>
          <Link
            href="/posters"
            className="text-sm font-medium text-blue hover:text-blue-dark transition-colors inline-flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {featuredPosters.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-foreground text-beige-light">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Every piece, made for you
          </h2>
          <p className="text-beige-dark max-w-md mx-auto text-sm mb-8">
            All products are printed on demand using premium materials.
            Zero waste, direct to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/clothing"
              className="inline-flex items-center gap-2 bg-blue text-white px-8 py-3 rounded-lg font-medium text-sm hover:bg-blue-dark transition-colors"
            >
              Explore Clothing
            </Link>
            <Link
              href="/posters"
              className="inline-flex items-center gap-2 border border-beige-dark/40 text-beige-light px-8 py-3 rounded-lg font-medium text-sm hover:border-beige-light transition-colors"
            >
              Explore Posters
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
