"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  category: "clothing" | "poster";
  thumbnail: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
  variantLabel: string;
  syncVariantId: number;
  variantPrice: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: CartProduct, syncVariantId: number, variantLabel: string, variantPrice: number) => void;
  removeItem: (syncVariantId: number) => void;
  updateQuantity: (syncVariantId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, syncVariantId, variantLabel, variantPrice) => {
        const items = get().items;
        const existing = items.find((i) => i.syncVariantId === syncVariantId);

        if (existing) {
          set({
            items: items.map((i) =>
              i.syncVariantId === syncVariantId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({
            items: [
              ...items,
              { product, quantity: 1, variantLabel, syncVariantId, variantPrice },
            ],
          });
        }
        set({ isOpen: true });
      },

      removeItem: (syncVariantId) => {
        set({
          items: get().items.filter((i) => i.syncVariantId !== syncVariantId),
        });
      },

      updateQuantity: (syncVariantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(syncVariantId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.syncVariantId === syncVariantId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: () =>
        get().items.reduce(
          (sum, item) => sum + item.variantPrice * item.quantity,
          0
        ),
    }),
    {
      name: "zoka-cart",
      version: 2,
      partialize: (state) => ({ items: state.items }),
      migrate: () => {
        return { items: [] };
      },
      merge: (_persisted, current) => {
        const persisted = _persisted as { items?: CartItem[] } | undefined;
        const items = (persisted?.items ?? []).filter(
          (item) =>
            typeof item.syncVariantId === "number" &&
            typeof item.variantPrice === "number" &&
            item.product?.id &&
            item.product?.thumbnail &&
            item.product?.currency
        );
        return { ...current, items };
      },
    }
  )
);
