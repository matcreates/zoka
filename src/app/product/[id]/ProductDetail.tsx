"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useCartStore } from "@/store/cart";

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const selectedVariant = product.variants[selectedIdx];

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        currency: product.currency,
        category: product.category,
        thumbnail: product.thumbnail,
      },
      selectedVariant.syncVariantId,
      selectedVariant.label,
      selectedVariant.price
    );
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
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-beige rounded-2xl overflow-hidden relative">
              <Image
                src={product.images[activeImage] || product.thumbnail}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden relative shrink-0 border-2 transition-colors ${
                      activeImage === i ? "border-blue" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
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
              {formatPrice(selectedVariant.price, product.currency)}
            </p>
            <p className="text-foreground-muted leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Variant Selector */}
            {product.variants.length > 1 && (
              <div className="mb-8">
                <label className="text-xs font-semibold tracking-widest uppercase block mb-3">
                  {product.category === "clothing" ? "Size" : "Format"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant, i) => (
                    <button
                      key={variant.syncVariantId}
                      onClick={() => setSelectedIdx(i)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        selectedIdx === i
                          ? "bg-blue text-white border-blue"
                          : "border-beige-dark/40 hover:border-blue"
                      }`}
                    >
                      {variant.label}
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
                <span className="font-medium text-foreground">
                  Print on demand
                </span>{" "}
                — Made just for you by Printful
              </p>
              <p className="text-sm text-foreground-muted">
                <span className="font-medium text-foreground">
                  Worldwide shipping
                </span>{" "}
                — Delivered right to your door
              </p>
              <p className="text-sm text-foreground-muted">
                <span className="font-medium text-foreground">
                  Secure payment
                </span>{" "}
                — Powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
