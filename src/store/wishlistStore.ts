import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types/product";

interface WishlistStore {
  wishlist: Product[];

  addToWishlist: (product: Product) => void;

  removeFromWishlist: (productId: number) => void;

  toggleWishlist: (product: Product) => void;

  isWishlisted: (productId: number) => boolean;

  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],

      addToWishlist: (product) => {
        const exists = get().wishlist.some(
          (item) => item.id === product.id
        );

        if (exists) return;

        set((state) => ({
          wishlist: [...state.wishlist, product],
        }));
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter(
            (item) => item.id !== productId
          ),
        }));
      },

      toggleWishlist: (product) => {
        const exists = get().wishlist.some(
          (item) => item.id === product.id
        );

        if (exists) {
          get().removeFromWishlist(product.id);
        } else {
          get().addToWishlist(product);
        }
      },

      isWishlisted: (productId) => {
        return get().wishlist.some(
          (item) => item.id === productId
        );
      },

      clearWishlist: () => {
        set({ wishlist: [] });
      },
    }),
    {
      name: "varnika-wishlist",

      storage: createJSONStorage(() => localStorage),
    }
  )
);