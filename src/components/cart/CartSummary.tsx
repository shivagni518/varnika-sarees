"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { useCartStore } from "@/store/cartStore";

export default function CartSummary() {
  const cart = useCartStore(
    (state) => state.cart
  );

  /* =========================================
     TOTAL ITEMS
  ========================================= */

  const totalItems = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }, [cart]);

  /* =========================================
     SUBTOTAL
  ========================================= */

  const subtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) =>
        sum +
        item.product.price *
          item.quantity,
      0
    );
  }, [cart]);

  /* =========================================
     SHIPPING
  ========================================= */

  const shipping = subtotal > 0 ? 0 : 0;

  /* =========================================
     TOTAL
  ========================================= */

  const total = subtotal + shipping;

  /* =========================================
     EMPTY
  ========================================= */

  const isEmpty = cart.length === 0;

  /* =========================================
     FREE SHIPPING MESSAGE
  ========================================= */

  const freeShippingMessage =
    subtotal > 0
      ? "You're getting FREE shipping"
      : "Free shipping on all orders";

  return (
    <div className="sticky top-24 w-full overflow-hidden rounded-3xl border border-[#EDE3D7] bg-white shadow-sm">

      {/* =======================================
          GOLD ACCENT
      ======================================= */}

      <div className="h-1.5 w-full bg-[#D4AF37]" />

      <div className="p-5 sm:p-6">

        {/* =====================================
            TITLE
        ===================================== */}

        <div className="mb-6">

          <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#B18A2B]">
            Your Order
          </p>

          <h2 className="mt-1 text-2xl font-bold text-[#7B1E3A]">
            Order Summary
          </h2>

        </div>

        {/* =====================================
            ITEMS
        ===================================== */}

        <div className="space-y-4">

          <div className="flex items-center justify-between text-sm">

            <span className="text-gray-500">
              Items
            </span>

            <span className="font-semibold text-gray-800">
              {totalItems}
            </span>

          </div>

          {/* SUBTOTAL */}

          <div className="flex items-center justify-between text-sm">

            <span className="text-gray-500">
              Subtotal
            </span>

            <span className="font-semibold text-gray-800">
              ₹
              {subtotal.toLocaleString(
                "en-IN"
              )}
            </span>

          </div>

          {/* SHIPPING */}

          <div className="flex items-center justify-between text-sm">

            <span className="flex items-center gap-2 text-gray-500">

              <Truck size={16} />

              Shipping

            </span>

            <span className="font-semibold text-green-600">
              FREE
            </span>

          </div>

        </div>

        {/* =====================================
            DIVIDER
        ===================================== */}

        <div className="my-6 border-t border-[#EDE3D7]" />

        {/* =====================================
            TOTAL
        ===================================== */}

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-500">
              Total
            </p>

            <p className="mt-1 text-2xl font-bold text-[#7B1E3A]">
              ₹
              {total.toLocaleString(
                "en-IN"
              )}
            </p>

          </div>

          <div className="rounded-full bg-[#FFF0F4] px-3 py-1 text-xs font-semibold text-[#7B1E3A]">
            {totalItems}{" "}
            {totalItems === 1
              ? "Item"
              : "Items"}
          </div>

        </div>

        {/* =====================================
            FREE SHIPPING MESSAGE
        ===================================== */}

        {!isEmpty && (

          <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#F5FAF5] px-3 py-3 text-xs font-medium text-green-700">

            <Check
              size={15}
              className="shrink-0"
            />

            {freeShippingMessage}

          </div>

        )}

        {/* =====================================
            CHECKOUT
        ===================================== */}

        {isEmpty ? (

          <button
            type="button"
            disabled
            className="mt-6 flex w-full cursor-not-allowed items-center justify-center rounded-xl bg-gray-300 py-3.5 font-semibold text-gray-500"
          >
            Cart is Empty
          </button>

        ) : (

          <Link
            href="/checkout"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#7B1E3A] py-3.5 font-semibold text-white transition hover:bg-[#641730]"
          >
            Proceed to Checkout

            <ArrowRight size={18} />

          </Link>

        )}

        {/* =====================================
            TRUST FEATURES
        ===================================== */}

        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#EDE3D7] pt-5">

          {/* SECURE */}

          <div className="flex items-center gap-2">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF0F4]">

              <ShieldCheck
                size={16}
                className="text-[#7B1E3A]"
              />

            </div>

            <div>

              <p className="text-[10px] font-semibold text-gray-700">
                Secure
              </p>

              <p className="text-[9px] text-gray-400">
                Checkout
              </p>

            </div>

          </div>

          {/* SHIPPING */}

          <div className="flex items-center gap-2">

            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF8E7]">

              <Truck
                size={16}
                className="text-[#B18A2B]"
              />

            </div>

            <div>

              <p className="text-[10px] font-semibold text-gray-700">
                Free
              </p>

              <p className="text-[9px] text-gray-400">
                Shipping
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}