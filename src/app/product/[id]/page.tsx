import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProducts, getProduct } from "@/lib/products";
import ProductDetail from "./ProductDetail";

export const revalidate = 3600;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Not Found — Zoka" };
  return {
    title: `${product.name} — Zoka`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
