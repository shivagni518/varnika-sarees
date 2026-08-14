"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useSyncExternalStore } from "react";

import { useOrderStore } from "@/store/orderStore";

/* =========================================================
   ZUSTAND HYDRATION
========================================================= */

const subscribeToHydration = (
  callback: () => void
) => {
  return useOrderStore.persist.onFinishHydration(
    callback
  );
};

const getHydrationSnapshot = () => {
  return useOrderStore.persist.hasHydrated();
};

const getServerHydrationSnapshot = () => {
  return false;
};

/* =========================================================
   ORDERS PAGE
========================================================= */

export default function OrdersPage() {
  const orders = useOrderStore(
    (state) => state.orders
  );

  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydrationSnapshot,
    getServerHydrationSnapshot
  );

  /* =======================================================
     LOADING
  ======================================================= */

  if (!hydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFF8F2] px-6">

        <div className="text-center">

          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#7B1E3A] border-t-transparent" />

          <p className="text-sm text-gray-500">
            Loading your orders...
          </p>

        </div>

      </main>
    );
  }

  /* =======================================================
     EMPTY ORDERS
  ======================================================= */

  if (orders.length === 0) {
    return (
      <main className="min-h-screen bg-[#FFF8F2] px-4 py-24 sm:px-6 sm:py-28">

        <div className="mx-auto max-w-md overflow-hidden rounded-3xl border border-[#EDE3D7] bg-white shadow-sm">

          {/* GOLD ACCENT */}

          <div className="h-1.5 bg-[#D4AF37]" />

          <div className="p-8 text-center sm:p-10">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F5EBD7]">

              <ShoppingBag
                size={36}
                className="text-[#7B1E3A]"
              />

            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[2px] text-[#B18A2B]">
              Varnika Sarees
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#7B1E3A]">
              No Orders Yet
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              You havent placed any orders yet.
              Discover our beautiful saree
              collection and find something
              special for your next occasion.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#7B1E3A] px-6 py-3.5 font-semibold text-white transition hover:bg-[#641730]"
            >
              <ShoppingBag size={18} />
              Start Shopping
            </Link>

          </div>

        </div>

      </main>
    );
  }

  /* =======================================================
     ORDERS LIST
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#FFF8F2]">

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">

          <p className="text-xs font-semibold uppercase tracking-[2px] text-[#B18A2B]">
            Varnika Sarees
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#7B1E3A] sm:text-4xl">
            My Orders
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            View your order history and track
            your purchases.
          </p>

        </div>

        {/* =================================================
            ORDER COUNT
        ================================================= */}

        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-[#EDE3D7] bg-white p-4 shadow-sm">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF0F4]">

            <Package
              size={20}
              className="text-[#7B1E3A]"
            />

          </div>

          <div>

            <p className="font-semibold text-gray-800">
              {orders.length}{" "}
              {orders.length === 1
                ? "Order"
                : "Orders"}
            </p>

            <p className="text-xs text-gray-500">
              Your order history
            </p>

          </div>

        </div>

        {/* =================================================
            ORDERS
        ================================================= */}

        <div className="space-y-6">

          {orders.map((order) => {

            /* =============================================
               TOTAL ITEMS
            ============================================= */

            const totalItems =
              order.items.reduce(
                (sum, item) =>
                  sum + item.quantity,
                0
              );

            /* =============================================
               DATE
            ============================================= */

            const orderDate =
              new Date(
                order.createdAt
              ).toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              );

            return (
              <div
                key={order.id}
                className="overflow-hidden rounded-3xl border border-[#EDE3D7] bg-white shadow-sm transition hover:shadow-md"
              >

                {/* GOLD ACCENT */}

                <div className="h-1.5 bg-[#D4AF37]" />

                <div className="p-5 sm:p-6">

                  {/* ===================================
                      ORDER HEADER
                  =================================== */}

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                      <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#B18A2B]">
                        Order ID
                      </p>

                      <h2 className="mt-1 text-lg font-bold text-[#7B1E3A] sm:text-xl">
                        #{order.id}
                      </h2>

                      <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                        Placed on {orderDate}
                      </p>

                    </div>

                    {/* STATUS */}

                    <div className="flex w-fit items-center gap-2 rounded-full bg-[#F5FAF5] px-3 py-2 text-xs font-semibold text-green-700">

                      <CheckCircle2 size={15} />

                      {order.status}

                    </div>

                  </div>

                  {/* ===================================
                      DIVIDER
                  =================================== */}

                  <div className="my-6 border-t border-[#EDE3D7]" />

                  {/* ===================================
                      ORDER CONTENT
                  =================================== */}

                  <div className="grid gap-6 lg:grid-cols-3">

                    {/* =================================
                        PRODUCTS
                    ================================= */}

                    <div className="min-w-0 lg:col-span-2">

                      <div className="mb-3 flex items-center justify-between">

                        <p className="text-sm font-semibold text-gray-700">
                          Order Items
                        </p>

                        <span className="text-xs text-gray-400">
                          {totalItems}{" "}
                          {totalItems === 1
                            ? "item"
                            : "items"}
                        </span>

                      </div>

                      <div className="space-y-3">

                        {order.items
                          .slice(0, 3)
                          .map((item) => (

                            <div
                              key={
                                item.product.id
                              }
                              className="flex gap-3 rounded-xl border border-[#EDE3D7] bg-[#FFFCF8] p-3 sm:gap-4"
                            >

                              {/* IMAGE */}

                              <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-[#F5EFE8]">

                                {item.product
                                  .images?.[0] ? (

                                  <Image
                                    src={
                                      item
                                        .product
                                        .images[0]
                                    }
                                    alt={
                                      item
                                        .product
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

                              {/* INFO */}

                              <div className="min-w-0 flex-1">

                                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#B18A2B]">
                                  {
                                    item
                                      .product
                                      .category
                                  }
                                </p>

                                <p className="mt-1 line-clamp-2 text-sm font-semibold text-gray-800">
                                  {
                                    item
                                      .product
                                      .name
                                  }
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                  Qty:{" "}
                                  {
                                    item.quantity
                                  }
                                </p>

                              </div>

                              {/* PRICE */}

                              <p className="self-center whitespace-nowrap text-sm font-bold text-[#7B1E3A]">

                                ₹
                                {(
                                  item
                                    .product
                                    .price *
                                  item.quantity
                                ).toLocaleString(
                                  "en-IN"
                                )}

                              </p>

                            </div>

                          ))}

                        {/* MORE ITEMS */}

                        {order.items.length >
                          3 && (

                          <p className="pt-1 text-xs text-gray-500">
                            +{" "}
                            {order.items.length -
                              3}{" "}
                            more{" "}
                            {order.items.length -
                              3 ===
                            1
                              ? "item"
                              : "items"}
                          </p>

                        )}

                      </div>

                    </div>

                    {/* =================================
                        SUMMARY
                    ================================= */}

                    <div className="rounded-2xl bg-[#FFFCF8] p-5">

                      <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#B18A2B]">
                        Order Total
                      </p>

                      <div className="mt-4">

                        <p className="text-xs text-gray-500">
                          Total Items
                        </p>

                        <p className="mt-1 font-semibold text-gray-800">
                          {totalItems}
                        </p>

                      </div>

                      <div className="mt-4">

                        <p className="text-xs text-gray-500">
                          Total Amount
                        </p>

                        <p className="mt-1 text-2xl font-bold text-[#7B1E3A]">
                          ₹
                          {order.total.toLocaleString(
                            "en-IN"
                          )}
                        </p>

                      </div>

                      <div className="mt-4 flex items-center gap-2 text-xs font-medium text-green-700">

                        <Truck size={14} />

                        Free Delivery

                      </div>

                      {/* VIEW ORDER */}

                      <Link
                        href={`/orders/${order.id}`}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#7B1E3A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#641730]"
                      >
                        View Order
                        <ArrowRight size={17} />
                      </Link>

                    </div>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

        {/* =================================================
            CONTINUE SHOPPING
        ================================================= */}

        <div className="mt-8 text-center">

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#7B1E3A] transition hover:underline"
          >
            <ShoppingBag size={17} />
            Continue Shopping
          </Link>

        </div>

      </section>

    </main>
  );
}