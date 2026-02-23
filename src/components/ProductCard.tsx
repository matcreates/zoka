import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="aspect-square bg-beige rounded-xl overflow-hidden mb-3 relative">
        <div className="absolute inset-0 flex items-center justify-center text-blue/20 group-hover:text-blue/30 transition-colors">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            {product.category === "clothing" ? (
              <path d="M6 2L2 6v14a2 2 0 002 2h16a2 2 0 002-2V6l-4-4H6zM2 6h20M16 10a4 4 0 01-8 0" />
            ) : (
              <rect x="3" y="3" width="18" height="18" rx="2" />
            )}
          </svg>
        </div>
        <div className="absolute inset-0 bg-blue/0 group-hover:bg-blue/5 transition-colors" />
      </div>
      <h3 className="font-medium text-sm group-hover:text-blue transition-colors">{product.name}</h3>
      <p className="text-foreground-muted text-sm mt-0.5">${product.price}</p>
    </Link>
  );
}
