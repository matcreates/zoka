"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const totalItems = useCartStore((s) => s.totalItems);

  useEffect(() => setMounted(true), []);

  const count = mounted ? totalItems() : 0;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-beige-light/90 backdrop-blur-md border-b border-beige-dark/30">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Zoka" width={80} height={32} className="h-8 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/clothing" className="text-sm font-medium tracking-wide uppercase hover:text-blue transition-colors">
            Clothing
          </Link>
          <Link href="/posters" className="text-sm font-medium tracking-wide uppercase hover:text-blue transition-colors">
            Posters
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleCart} className="relative p-2 hover:text-blue transition-colors" aria-label="Open cart">
            <ShoppingBag size={22} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-blue text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 hover:text-blue transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-beige-light border-t border-beige-dark/30 px-6 py-4 space-y-3">
          <Link
            href="/clothing"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-medium tracking-wide uppercase hover:text-blue transition-colors"
          >
            Clothing
          </Link>
          <Link
            href="/posters"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-medium tracking-wide uppercase hover:text-blue transition-colors"
          >
            Posters
          </Link>
        </div>
      )}
    </nav>
  );
}
