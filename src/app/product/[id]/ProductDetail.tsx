"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/store/cart";

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.[0]
  );
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link
          href={product.category === "clothing" ? "/clothing" : "/posters"}
          className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-blue transition-colors"
        >
          <ArrowLeft size={14} />
          Back to {product.category === "clothing" ? "Clothing" : "Posters"}
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square bg-beige rounded-2xl flex items-center justify-center">
            <div className="text-blue/20">
              <svg
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              >
                {product.category === "clothing" ? (
                  <path d="M6 2L2 6v14a2 2 0 002 2h16a2 2 0 002-2V6l-4-4H6zM2 6h20M16 10a4 4 0 01-8 0" />
                ) : (
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                )}
              </svg>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue mb-2">
              {product.category === "clothing" ? "Clothing" : "Art Print"}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-blue mb-6">
              ${product.price}
            </p>
            <p className="text-foreground-muted leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <label className="text-xs font-semibold tracking-widest uppercase block mb-3">
                  {product.category === "clothing" ? "Size" : "Format"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        selectedSize === size
                          ? "bg-blue text-white border-blue"
                          : "border-beige-dark/40 hover:border-blue"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue text-white px-10 py-4 rounded-lg font-medium hover:bg-blue-dark transition-colors"
            >
              <ShoppingBag size={18} />
              {added ? "Added!" : "Add to Cart"}
            </button>

            {/* Details */}
            <div className="mt-10 pt-8 border-t border-beige-dark/30 space-y-3">
              <p className="text-sm text-foreground-muted">
                <span className="font-medium text-foreground">Print on demand</span> — Made
                just for you by Printful
              </p>
              <p className="text-sm text-foreground-muted">
                <span className="font-medium text-foreground">Worldwide shipping</span> —
                Delivered right to your door
              </p>
              <p className="text-sm text-foreground-muted">
                <span className="font-medium text-foreground">Secure payment</span> —
                Powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
