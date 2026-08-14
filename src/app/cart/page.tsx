"use client";

import CartHeader from "@/components/cart/CartHeader";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";

import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const cart = useCartStore(
    (state) => state.cart
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFF8F2]">

      <section className="mx-auto w-full max-w-7xl px-4 py-28 sm:px-6 sm:py-32">

        {/* =================================================
            CART HEADER
        ================================================= */}

        <CartHeader />

        {/* =================================================
            EMPTY CART
        ================================================= */}

        {cart.length === 0 ? (
          <EmptyCart />
        ) : (

          <div
            className="
              mt-8
              grid
              w-full
              min-w-0
              grid-cols-1
              gap-6
              lg:grid-cols-3
              lg:gap-10
            "
          >

            {/* =================================================
                CART ITEMS
            ================================================= */}

            <div
              className="
                min-w-0
                w-full
                space-y-5
                lg:col-span-2
                lg:space-y-6
              "
            >

              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="w-full min-w-0"
                >
                  <CartItem item={item} />
                </div>
              ))}

            </div>

            {/* =================================================
                ORDER SUMMARY
            ================================================= */}

            <div
              className="
                w-full
                min-w-0
                lg:col-span-1
              "
            >
              <CartSummary />
            </div>

          </div>

        )}

      </section>

    </main>
  );
}