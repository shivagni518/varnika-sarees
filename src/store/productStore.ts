import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Product } from "@/types/product";
import { products as initialProducts } from "@/data/products";

type ProductStore = {
  products: Product[];

  addProduct: (product: Product) => void;

  updateProduct: (
    id: number,
    product: Partial<Product>
  ) => void;

  deleteProduct: (id: number) => void;

  getProduct: (
    id: number
  ) => Product | undefined;

  resetProducts: () => void;
};

export const useProductStore =
  create<ProductStore>()(
    persist(
      (set, get) => ({

        /* =========================================
           INITIAL PRODUCTS
        ========================================= */

        products: initialProducts,

        /* =========================================
           ADD PRODUCT
        ========================================= */

        addProduct: (product) => {
          set((state) => ({
            products: [
              ...state.products,
              product,
            ],
          }));
        },

        /* =========================================
           UPDATE PRODUCT
        ========================================= */

        updateProduct: (
          id,
          updatedProduct
        ) => {
          set((state) => ({
            products: state.products.map(
              (product) =>
                product.id === id
                  ? {
                      ...product,
                      ...updatedProduct,
                    }
                  : product
            ),
          }));
        },

        /* =========================================
           DELETE PRODUCT
        ========================================= */

        deleteProduct: (id) => {
          set((state) => ({
            products: state.products.filter(
              (product) =>
                product.id !== id
            ),
          }));
        },

        /* =========================================
           GET PRODUCT
        ========================================= */

        getProduct: (id) => {
          return get().products.find(
            (product) =>
              product.id === id
          );
        },

        /* =========================================
           RESET PRODUCTS
        ========================================= */

        resetProducts: () => {
          set({
            products: initialProducts,
          });
        },

      }),

      /* =========================================
         PERSIST CONFIGURATION
      ========================================= */

      {
        name: "varnika-products",

        /*
         * We manually control hydration.
         *
         * This prevents Next.js hydration
         * mismatch when localStorage contains
         * updated product data.
         */

        skipHydration: true,
      }
    )
  );