"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  ArrowRight,
  Check,
  CheckCircle2,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { useOrderStore } from "@/store/orderStore";

export default function OrderSuccessContent() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");

  const order = useOrderStore(
    (state) =>
      state.orders.find(
        (item) => item.id === orderId
      ) ?? state.lastOrder
  );

  /* =========================================
     ORDER NOT FOUND
  ========================================= */

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFF8F2] px-6">

        <div className="w-full max-w-md rounded-3xl border border-[#EDE3D7] bg-white p-8 text-center shadow-xl sm:p-10">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF0F4]">
            <Package
              size={30}
              className="text-[#7B1E3A]"
            />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-[#7B1E3A]">
            Order Not Found
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            We couldnt find this order.
            Please check your order history
            or continue shopping.
          </p>

          <Link
            href="/shop"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#7B1E3A] px-6 py-3.5 font-semibold text-white transition hover:bg-[#641730]"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>

        </div>

      </main>
    );
  }

  /* =========================================
     DATE
  ========================================= */

  const formattedDate = new Date(
    order.createdAt
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  /* =========================================
     TIME
  ========================================= */

  const formattedTime = new Date(
    order.createdAt
  ).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  /* =========================================
     TOTAL ITEMS
  ========================================= */

  const totalItems = order.items.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  );

  /* =========================================
     PAGE
  ========================================= */

  return (
    <main className="min-h-screen bg-[#FFF8F2]">

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-24">

        {/* =====================================
            SUCCESS HEADER
        ===================================== */}

        <div className="text-center">

          {/* SUCCESS ICON */}

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F5EBD7]">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7B1E3A]">

              <Check
                size={28}
                strokeWidth={3}
                className="text-white"
              />

            </div>

          </div>

          {/* SMALL LABEL */}

          <p className="mt-6 text-xs font-semibold uppercase tracking-[3px] text-[#B18A2B]">
            Thank You For Shopping With Us
          </p>

          {/* TITLE */}

          <h1 className="mt-2 text-3xl font-bold text-[#7B1E3A] sm:text-4xl">
            Order Placed Successfully
          </h1>

          {/* DESCRIPTION */}

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            Your order has been received and
            is now being prepared with care.
          </p>

        </div>

        {/* =====================================
            ORDER CARD
        ===================================== */}

        <div className="mt-10 overflow-hidden rounded-3xl border border-[#EDE3D7] bg-white shadow-sm">

          {/* GOLD ACCENT */}

          <div className="h-1.5 bg-[#D4AF37]" />

          <div className="p-5 sm:p-7">

            {/* =================================
                ORDER TOP
            ================================= */}

            <div className="flex flex-col gap-4 border-b border-[#EDE3D7] pb-6 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#B18A2B]">
                  Order ID
                </p>

                <p className="mt-1 text-lg font-bold text-[#7B1E3A]">
                  #{order.id}
                </p>

              </div>

              <div className="flex items-center gap-2 self-start rounded-full bg-[#F5FAF5] px-3 py-2 text-xs font-semibold text-green-700">

                <CheckCircle2 size={15} />

                {order.status}

              </div>

            </div>

            {/* =================================
                ORDER INFORMATION
            ================================= */}

            <div className="mt-6 grid gap-4 sm:grid-cols-3">

              {/* DATE */}

              <div className="rounded-xl bg-[#FFFCF8] p-4">

                <p className="text-xs text-gray-400">
                  Order Date
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {formattedDate}
                </p>

              </div>

              {/* TIME */}

              <div className="rounded-xl bg-[#FFFCF8] p-4">

                <p className="text-xs text-gray-400">
                  Order Time
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {formattedTime}
                </p>

              </div>

              {/* ITEMS */}

              <div className="rounded-xl bg-[#FFFCF8] p-4">

                <p className="text-xs text-gray-400">
                  Items
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {totalItems}{" "}
                  {totalItems === 1
                    ? "Item"
                    : "Items"}
                </p>

              </div>

            </div>

            {/* =================================
                PRODUCTS
            ================================= */}

            <div className="mt-7">

              <h2 className="text-lg font-bold text-[#7B1E3A]">
                Your Items
              </h2>

              <div className="mt-4 space-y-3">

                {order.items.map(
                  (item) => (

                    <div
                      key={item.product.id}
                      className="flex gap-3 rounded-xl border border-[#EDE3D7] bg-[#FFFCF8] p-3 sm:gap-4"
                    >

                      {/* IMAGE */}

                      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-[#F5EFE8]">

                        {item.product
                          .images?.[0] ? (

                          <Image
                            src={
                              item.product
                                .images[0]
                            }
                            alt={
                              item.product
                                .name
                            }
                            fill
                            sizes="64px"
                            className="object-cover"
                          />

                        ) : (

                          <div className="flex h-full items-center justify-center text-[9px] text-gray-400">
                            No Image
                          </div>

                        )}

                      </div>

                      {/* PRODUCT INFO */}

                      <div className="min-w-0 flex-1">

                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#B18A2B]">
                          {item.product.category}
                        </p>

                        <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-gray-800">
                          {item.product.name}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>

                      </div>

                      {/* PRICE */}

                      <div className="self-center text-right">

                        <p className="text-sm font-bold text-[#7B1E3A]">
                          ₹
                          {(
                            item.product
                              .price *
                            item.quantity
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* =================================
                PRICE SUMMARY
            ================================= */}

            <div className="mt-7 border-t border-[#EDE3D7] pt-6">

              <div className="space-y-3">

                {/* SUBTOTAL */}

                <div className="flex justify-between text-sm">

                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-semibold text-gray-800">
                    ₹
                    {order.subtotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

                {/* SHIPPING */}

                <div className="flex justify-between text-sm">

                  <span className="text-gray-500">
                    Shipping
                  </span>

                  <span className="font-semibold text-green-600">
                    FREE
                  </span>

                </div>

                {/* TOTAL */}

                <div className="flex items-center justify-between border-t border-[#EDE3D7] pt-4">

                  <span className="text-lg font-bold text-gray-800">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-[#7B1E3A]">
                    ₹
                    {order.total.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================
            DELIVERY INFORMATION
        ===================================== */}

        <div className="mt-6 overflow-hidden rounded-3xl border border-[#EDE3D7] bg-white shadow-sm">

          <div className="h-1 bg-[#D4AF37]" />

          <div className="p-5 sm:p-7">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF0F4]">

                <Truck
                  size={19}
                  className="text-[#7B1E3A]"
                />

              </div>

              <div>

                <h2 className="font-bold text-[#7B1E3A]">
                  Delivery Information
                </h2>

                <p className="text-xs text-gray-400">
                  Your order will be delivered to
                </p>

              </div>

            </div>

            {/* ADDRESS */}

            <div className="mt-5 rounded-xl bg-[#FFFCF8] p-4">

              <p className="font-semibold text-gray-800">
                {order.customer.fullName}
              </p>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                {order.customer.address}
              </p>

              <p className="text-sm text-gray-500">
                {order.customer.city},{" "}
                {order.customer.state} -{" "}
                {order.customer.pinCode}
              </p>

              <p className="mt-3 text-sm text-gray-500">
                Phone:{" "}
                <span className="font-medium text-gray-700">
                  {order.customer.phone}
                </span>
              </p>

            </div>

            {/* DELIVERY ESTIMATE */}

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#F5FAF5] px-4 py-3 text-sm font-medium text-green-700">

              <Truck size={16} />

              Estimated delivery:
              <span className="font-bold">
                4–6 Business Days
              </span>

            </div>

          </div>

        </div>

        {/* =====================================
            TRUST FEATURES
        ===================================== */}

        <div className="mt-6 grid gap-3 sm:grid-cols-3">

          {/* CONFIRMED */}

          <div className="rounded-2xl border border-[#EDE3D7] bg-white p-4 text-center">

            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF0F4]">

              <ShoppingBag
                size={19}
                className="text-[#7B1E3A]"
              />

            </div>

            <p className="mt-3 text-sm font-semibold text-gray-700">
              Order Confirmed
            </p>

            <p className="mt-1 text-[10px] text-gray-400">
              We have received your order
            </p>

          </div>

          {/* DELIVERY */}

          <div className="rounded-2xl border border-[#EDE3D7] bg-white p-4 text-center">

            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF8E7]">

              <Truck
                size={19}
                className="text-[#B18A2B]"
              />

            </div>

            <p className="mt-3 text-sm font-semibold text-gray-700">
              Free Delivery
            </p>

            <p className="mt-1 text-[10px] text-gray-400">
              Shipping included
            </p>

          </div>

          {/* SECURE */}

          <div className="rounded-2xl border border-[#EDE3D7] bg-white p-4 text-center">

            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#F5FAF5]">

              <ShieldCheck
                size={19}
                className="text-green-600"
              />

            </div>

            <p className="mt-3 text-sm font-semibold text-gray-700">
              Secure Order
            </p>

            <p className="mt-1 text-[10px] text-gray-400">
              Your details are protected
            </p>

          </div>

        </div>

        {/* =====================================
            ACTION BUTTONS
        ===================================== */}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

          {/* CONTINUE SHOPPING */}

          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#7B1E3A] px-7 py-3.5 font-semibold text-white transition hover:bg-[#641730]"
          >

            <ShoppingBag size={18} />

            Continue Shopping

          </Link>

          {/* MY ORDERS */}

          <Link
            href="/orders"
            className="flex items-center justify-center gap-2 rounded-xl border border-[#7B1E3A] bg-white px-7 py-3.5 font-semibold text-[#7B1E3A] transition hover:bg-[#7B1E3A] hover:text-white"
          >

            <Package size={18} />

            View My Orders

            <ArrowRight size={18} />

          </Link>

        </div>

      </section>

    </main>
  );
}