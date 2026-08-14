"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { useOrderStore } from "@/store/orderStore";

/* =========================================================
   ORDER STATUS STEPS
========================================================= */

const statusSteps = [
  {
    status: "Confirmed",
    label: "Confirmed",
    icon: CheckCircle2,
  },
  {
    status: "Processing",
    label: "Processing",
    icon: Package,
  },
  {
    status: "Shipped",
    label: "Shipped",
    icon: Truck,
  },
  {
    status: "Delivered",
    label: "Delivered",
    icon: CheckCircle2,
  },
] as const;

/* =========================================================
   PAGE
========================================================= */

export default function OrderDetailsPage() {
  const params = useParams();

  const orderId = String(params.orderId);

  const orders = useOrderStore(
    (state) => state.orders
  );

  const order = orders.find(
    (item) => item.id === orderId
  );

  /* =======================================================
     ORDER NOT FOUND
  ======================================================= */

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFF8F2] px-4">

        <div className="w-full max-w-md overflow-hidden rounded-3xl border border-[#EDE3D7] bg-white shadow-sm">

          <div className="h-1.5 bg-[#D4AF37]" />

          <div className="p-8 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF0F4]">

              <Package
                size={30}
                className="text-[#7B1E3A]"
              />

            </div>

            <h1 className="mt-6 text-2xl font-bold text-[#7B1E3A]">
              Order Not Found
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              We couldnt find this order.
              It may have been removed or the
              order ID may be incorrect.
            </p>

            <Link
              href="/orders"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#7B1E3A] px-6 py-3.5 font-semibold text-white transition hover:bg-[#641730]"
            >
              <ArrowLeft size={17} />
              Back to Orders
            </Link>

          </div>

        </div>

      </main>
    );
  }

  /* =======================================================
     STATUS INDEX
  ======================================================= */

  const currentStatusIndex =
    statusSteps.findIndex(
      (step) =>
        step.status === order.status
    );

  /* =======================================================
     TOTAL ITEMS
  ======================================================= */

  const totalItems =
    order.items.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  /* =======================================================
     DATE
  ======================================================= */

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

  /* =======================================================
     TIME
  ======================================================= */

  const orderTime =
    new Date(
      order.createdAt
    ).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );

  /* =======================================================
     STATUS COLOR
  ======================================================= */

  const statusColor =
    order.status === "Confirmed"
      ? "bg-green-50 text-green-700"
      : order.status === "Processing"
        ? "bg-blue-50 text-blue-700"
        : order.status === "Shipped"
          ? "bg-orange-50 text-orange-700"
          : "bg-purple-50 text-purple-700";

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#FFF8F2]">

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-28">

        {/* =================================================
            BACK
        ================================================= */}

        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#7B1E3A] transition hover:underline"
        >
          <ArrowLeft size={17} />
          Back to Orders
        </Link>

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[2px] text-[#B18A2B]">
              Order Details
            </p>

            <h1 className="mt-1 text-3xl font-bold text-[#7B1E3A] sm:text-4xl">
              #{order.id}
            </h1>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">

              <span>
                Placed on {orderDate}
              </span>

              <span>
                {orderTime}
              </span>

            </div>

          </div>

          <span
            className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${statusColor}`}
          >
            {order.status}
          </span>

        </div>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="mt-8 grid gap-6 lg:grid-cols-3 lg:gap-8">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="min-w-0 space-y-6 lg:col-span-2">

            {/* =================================================
                ORDER STATUS
            ================================================= */}

            <div className="overflow-hidden rounded-3xl border border-[#EDE3D7] bg-white shadow-sm">

              <div className="h-1.5 bg-[#D4AF37]" />

              <div className="p-5 sm:p-7">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#B18A2B]">
                      Order Progress
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-[#7B1E3A]">
                      Order Status
                    </h2>

                  </div>

                  <Package
                    size={22}
                    className="text-[#7B1E3A]"
                  />

                </div>

                {/* STATUS STEPS */}

                <div className="mt-8 grid grid-cols-4 gap-1 sm:gap-4">

                  {statusSteps.map(
                    (step, index) => {

                      const Icon =
                        step.icon;

                      const isCompleted =
                        index <=
                        currentStatusIndex;

                      const isCurrent =
                        index ===
                        currentStatusIndex;

                      return (
                        <div
                          key={
                            step.status
                          }
                          className="relative flex flex-col items-center"
                        >

                          {/* CONNECTOR */}

                          {index > 0 && (

                            <div
                              className={`absolute right-1/2 top-5 h-0.5 w-full ${
                                index <=
                                currentStatusIndex
                                  ? "bg-[#7B1E3A]"
                                  : "bg-gray-200"
                              }`}
                            />

                          )}

                          {/* ICON */}

                          <div
                            className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full sm:h-11 sm:w-11 ${
                              isCompleted
                                ? "bg-[#7B1E3A]"
                                : "bg-gray-100"
                            }`}
                          >

                            <Icon
                              size={19}
                              className={
                                isCompleted
                                  ? "text-white"
                                  : "text-gray-400"
                              }
                            />

                          </div>

                          {/* LABEL */}

                          <p
                            className={`mt-3 text-center text-[10px] sm:text-xs ${
                              isCurrent
                                ? "font-bold text-[#7B1E3A]"
                                : isCompleted
                                  ? "font-medium text-gray-700"
                                  : "text-gray-400"
                            }`}
                          >
                            {step.label}
                          </p>

                        </div>
                      );
                    }
                  )}

                </div>

              </div>

            </div>

            {/* =================================================
                ORDER ITEMS
            ================================================= */}

            <div className="overflow-hidden rounded-3xl border border-[#EDE3D7] bg-white shadow-sm">

              <div className="h-1 bg-[#D4AF37]" />

              <div className="p-5 sm:p-7">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#B18A2B]">
                      Your Purchase
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-[#7B1E3A]">
                      Order Items
                    </h2>

                  </div>

                  <span className="text-xs text-gray-400">
                    {totalItems}{" "}
                    {totalItems === 1
                      ? "Item"
                      : "Items"}
                  </span>

                </div>

                {/* ITEMS */}

                <div className="mt-6 space-y-3">

                  {order.items.map(
                    (item) => (

                      <div
                        key={
                          item.product.id
                        }
                        className="flex gap-3 rounded-xl border border-[#EDE3D7] bg-[#FFFCF8] p-3 sm:gap-4 sm:p-4"
                      >

                        {/* IMAGE */}

                        <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-[#F5EFE8] sm:h-24 sm:w-20">

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
                              sizes="80px"
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

                          <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-gray-800 sm:text-base">
                            {
                              item
                                .product
                                .name
                            }
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            Fabric:{" "}
                            {
                              item
                                .product
                                .fabric
                            }
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            Quantity:{" "}
                            {item.quantity}
                          </p>

                        </div>

                        {/* PRICE */}

                        <div className="self-center text-right">

                          <p className="text-sm font-bold text-[#7B1E3A] sm:text-base">
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

                          <p className="mt-1 text-[10px] text-gray-400 sm:text-xs">
                            ₹
                            {item.product.price.toLocaleString(
                              "en-IN"
                            )}{" "}
                            each
                          </p>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

            </div>

            {/* =================================================
                DELIVERY INFORMATION
            ================================================= */}

            <div className="overflow-hidden rounded-3xl border border-[#EDE3D7] bg-white shadow-sm">

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

                    <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#B18A2B]">
                      Delivery
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-[#7B1E3A]">
                      Delivery Information
                    </h2>

                  </div>

                </div>

                <div className="mt-6 rounded-2xl bg-[#FFFCF8] p-5">

                  <p className="font-semibold text-gray-800">
                    {
                      order.customer
                        .fullName
                    }
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {
                      order.customer
                        .address
                    }
                    <br />

                    {
                      order.customer
                        .city
                    }
                    ,{" "}
                    {
                      order.customer
                        .state
                    }{" "}
                    -{" "}
                    {
                      order.customer
                        .pinCode
                    }
                  </p>

                  <div className="mt-4 border-t border-[#EDE3D7] pt-4">

                    <p className="text-sm text-gray-500">
                      Phone:{" "}
                      <span className="font-medium text-gray-700">
                        {
                          order.customer
                            .phone
                        }
                      </span>
                    </p>

                    <p className="mt-1 break-all text-sm text-gray-500">
                      Email:{" "}
                      <span className="font-medium text-gray-700">
                        {
                          order.customer
                            .email
                        }
                      </span>
                    </p>

                  </div>

                </div>

                <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#F5FAF5] px-4 py-3 text-sm font-medium text-green-700">

                  <Truck size={16} />

                  Estimated delivery:
                  <span className="font-bold">
                    4–6 Business Days
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT - SUMMARY
          ================================================= */}

          <div className="h-fit min-w-0 lg:sticky lg:top-24">

            <div className="overflow-hidden rounded-3xl border border-[#EDE3D7] bg-white shadow-sm">

              <div className="h-1.5 bg-[#D4AF37]" />

              <div className="p-5 sm:p-6">

                <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#B18A2B]">
                  Payment Summary
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#7B1E3A]">
                  Order Summary
                </h2>

                {/* PRICE */}

                <div className="mt-6 space-y-4">

                  <div className="flex justify-between text-sm">

                    <span className="text-gray-500">
                      Items
                    </span>

                    <span className="font-semibold text-gray-800">
                      {totalItems}
                    </span>

                  </div>

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

                  <div className="flex justify-between text-sm">

                    <span className="text-gray-500">
                      Shipping
                    </span>

                    <span className="font-semibold text-green-600">
                      {order.shipping ===
                      0
                        ? "FREE"
                        : `₹${order.shipping.toLocaleString(
                            "en-IN"
                          )}`}
                    </span>

                  </div>

                  <div className="border-t border-[#EDE3D7]" />

                  <div className="flex items-center justify-between">

                    <span className="font-bold text-gray-800">
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

                {/* DELIVERY */}

                <div className="mt-6 rounded-2xl bg-[#FFFCF8] p-4">

                  <div className="flex items-center gap-2">

                    <Truck
                      size={17}
                      className="text-[#7B1E3A]"
                    />

                    <p className="text-sm font-semibold text-[#7B1E3A]">
                      Estimated Delivery
                    </p>

                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    4–6 Business Days
                  </p>

                </div>

                {/* SECURITY */}

                <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#F5FAF5] px-3 py-3 text-xs font-medium text-green-700">

                  <ShieldCheck
                    size={15}
                  />

                  Secure order information

                </div>

                {/* TRACK ORDER */}

                <Link
                  href={`/track-order/${order.id}`}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#7B1E3A] py-3.5 font-semibold text-white transition hover:bg-[#641730]"
                >

                  <Truck size={18} />

                  Track Order

                </Link>

                {/* CONTINUE SHOPPING */}

                <Link
                  href="/shop"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#7B1E3A] bg-white py-3.5 font-semibold text-[#7B1E3A] transition hover:bg-[#7B1E3A] hover:text-white"
                >

                  <ShoppingBag
                    size={17}
                  />

                  Continue Shopping

                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}