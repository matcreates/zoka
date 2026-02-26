"use client";

import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } =
    useCartStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            syncVariantId: item.syncVariantId,
            name: item.product.name,
            variantLabel: item.variantLabel,
            price: item.variantPrice,
            quantity: item.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-50" onClick={closeCart} />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-beige-light z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-beige-dark/30">
            <h2 className="text-lg font-semibold">Cart</h2>
            <button
              onClick={closeCart}
              className="p-1 hover:text-blue transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-foreground-muted">
                <ShoppingBag size={48} className="mb-4 opacity-30" />
                <p className="text-sm">Your cart is empty</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.syncVariantId}
                    className="flex gap-4 bg-beige/50 rounded-lg p-3"
                  >
                    <div className="w-16 h-16 bg-beige rounded-md overflow-hidden relative shrink-0">
                      <Image
                        src={item.product.thumbnail}
                        alt={item.product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-foreground-muted">
                        {item.variantLabel}
                      </p>
                      <p className="text-sm font-medium mt-1">
                        ${item.variantPrice.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.syncVariantId,
                              item.quantity - 1
                            )
                          }
                          className="w-6 h-6 rounded border border-beige-dark/40 flex items-center justify-center hover:border-blue transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.syncVariantId,
                              item.quantity + 1
                            )
                          }
                          className="w-6 h-6 rounded border border-beige-dark/40 flex items-center justify-center hover:border-blue transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => removeItem(item.syncVariantId)}
                          className="ml-auto text-xs text-foreground-muted hover:text-red-500 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-beige-dark/30 px-6 py-4 space-y-4">
              <div className="flex justify-between text-sm font-medium">
                <span>Total</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-blue text-white py-3 rounded-lg font-medium text-sm hover:bg-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Checkout"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
