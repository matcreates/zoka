import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="aspect-square bg-beige rounded-xl overflow-hidden mb-3 relative">
        <Image
          src={product.thumbnail || product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-blue/0 group-hover:bg-blue/5 transition-colors" />
      </div>
      <h3 className="font-medium text-sm group-hover:text-blue transition-colors">
        {product.name}
      </h3>
      <p className="text-foreground-muted text-sm mt-0.5">
        {product.variants.length > 1 ? "From " : ""}${product.price.toFixed(2)}
      </p>
    </Link>
  );
}
