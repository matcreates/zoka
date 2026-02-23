"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useCartStore } from "@/store/cart";

export default function SuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-lg mx-auto px-6 py-32 text-center">
      <CheckCircle size={64} className="text-green-600 mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-3">Order Confirmed!</h1>
      <p className="text-foreground-muted mb-8">
        Thank you for your purchase. Your order is being processed and will be
        printed and shipped by Printful. You&apos;ll receive a confirmation email
        shortly.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-blue text-white px-8 py-3 rounded-lg font-medium text-sm hover:bg-blue-dark transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
