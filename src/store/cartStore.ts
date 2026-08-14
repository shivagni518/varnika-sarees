import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Product } from "@/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

type CartStore = {
  cart: CartItem[];

  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;

  addToCart: (
    product: Product,
    quantity?: number
  ) => void;

  removeFromCart: (
    productId: number
  ) => void;

  increaseQuantity: (
    productId: number
  ) => void;

  decreaseQuantity: (
    productId: number
  ) => void;

  clearCart: () => void;

  totalItems: () => number;

  totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      hasHydrated: false,

      setHasHydrated: (state) =>
        set({
          hasHydrated: state,
        }),

      addToCart: (
        product,
        quantity = 1
      ) => {
        const existing = get().cart.find(
          (item) =>
            item.product.id === product.id
        );

        if (existing) {
          set({
            cart: get().cart.map((item) =>
              item.product.id === product.id
                ? {
                    ...item,
                    quantity:
                      item.quantity +
                      quantity,
                  }
                : item
            ),
          });

          return;
        }

        set({
          cart: [
            ...get().cart,
            {
              product,
              quantity,
            },
          ],
        });
      },

      removeFromCart: (
        productId
      ) => {
        set({
          cart: get().cart.filter(
            (item) =>
              item.product.id !== productId
          ),
        });
      },

      increaseQuantity: (
        productId
      ) => {
        set({
          cart: get().cart.map((item) =>
            item.product.id === productId
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1,
                }
              : item
          ),
        });
      },

      decreaseQuantity: (
        productId
      ) => {
        set({
          cart: get()
            .cart
            .map((item) =>
              item.product.id ===
              productId
                ? {
                    ...item,
                    quantity:
                      item.quantity - 1,
                  }
                : item
            )
            .filter(
              (item) =>
                item.quantity > 0
            ),
        });
      },

      clearCart: () => {
        set({
          cart: [],
        });
      },

      totalItems: () => {
        return get().cart.reduce(
          (sum, item) =>
            sum + item.quantity,
          0
        );
      },

      totalPrice: () => {
        return get().cart.reduce(
          (sum, item) =>
            sum +
            item.product.price *
              item.quantity,
          0
        );
      },
    }),
    {
      name: "varnika-cart",

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);