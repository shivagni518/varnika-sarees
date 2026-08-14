"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useSyncExternalStore } from "react";

import {
  ArrowLeft,
  CheckCircle,
  Package,
  Truck,
  MapPin,
} from "lucide-react";

import { useOrderStore } from "@/store/orderStore";

/* =========================================================
   HYDRATION
========================================================= */

const subscribeToHydration = (callback: () => void) => {
  return useOrderStore.persist.onFinishHydration(callback);
};

const getHydrationSnapshot = () => {
  return useOrderStore.persist.hasHydrated();
};

const getServerHydrationSnapshot = () => {
  return false;
};

/* =========================================================
   TRACK ORDER PAGE
========================================================= */

export default function TrackOrderPage() {
  const params = useParams();

  const orderId = String(params.orderId);

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
      <main className="flex min-h-screen items-center justify-center bg-[#FFF8F2]">
        <div className="text-center">

          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#7B1E3A] border-t-transparent" />

          <p className="text-gray-500">
            Loading tracking information...
          </p>

        </div>
      </main>
    );
  }

  /* =======================================================
     FIND ORDER
  ======================================================= */

  const order = orders.find(
    (item) => item.id === orderId
  );

  /* =======================================================
     ORDER NOT FOUND
  ======================================================= */

  if (!order) {
    return (
      <main className="min-h-screen bg-[#FFF8F2] px-6 py-28">

        <div className="mx-auto max-w-xl rounded-2xl bg-white p-10 text-center shadow-md">

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF8F2]">
            <Package
              size={40}
              className="text-[#7B1E3A]"
            />
          </div>

          <h1 className="text-3xl font-bold text-[#7B1E3A]">
            Order Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            We couldnt find tracking information
            for this order.
          </p>

          <p className="mt-2 font-semibold">
            #{orderId}
          </p>

          <Link
            href="/orders"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#7B1E3A] px-6 py-3 font-semibold text-white transition hover:bg-[#641730]"
          >
            <ArrowLeft size={18} />
            Back to Orders
          </Link>

        </div>

      </main>
    );
  }

  /* =======================================================
     STATUS DATA
  ======================================================= */

  const statuses = [
    {
      name: "Confirmed",
      description:
        "Your order has been confirmed.",
      icon: CheckCircle,
    },
    {
      name: "Processing",
      description:
        "Your sarees are being prepared.",
      icon: Package,
    },
    {
      name: "Shipped",
      description:
        "Your order is on the way.",
      icon: Truck,
    },
    {
      name: "Delivered",
      description:
        "Your order has been delivered.",
      icon: MapPin,
    },
  ];

  const currentStatusIndex = Math.max(
    statuses.findIndex(
      (status) =>
        status.name === order.status
    ),
    0
  );

  const orderDate = new Date(
    order.createdAt
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#FFF8F2]">

      <section className="mx-auto max-w-5xl px-6 py-28">

        {/* BACK */}

        <Link
          href={`/orders/${order.id}`}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#7B1E3A] hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Order
        </Link>

        {/* HEADER */}

        <div className="mb-10">

          <p className="text-sm font-medium uppercase tracking-wider text-[#7B1E3A]">
            Varnika Sarees
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#7B1E3A]">
            Track Your Order
          </h1>

          <div className="mt-3 flex flex-col gap-1 text-gray-500 sm:flex-row sm:gap-4">

            <span>
              Order #{order.id}
            </span>

            <span className="hidden sm:block">
              •
            </span>

            <span>
              Placed on {orderDate}
            </span>

          </div>

        </div>

        {/* CURRENT STATUS */}

        <div className="mb-8 rounded-2xl bg-white p-6 shadow-md">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Current Status
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#7B1E3A]">
                {order.status}
              </h2>

            </div>

            <span className="w-fit rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">
              {order.status}
            </span>

          </div>

        </div>

        {/* PROGRESS */}

        <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">

          <h2 className="mb-8 text-2xl font-bold text-[#7B1E3A]">
            Order Progress
          </h2>

          <div>

            {statuses.map(
              (status, index) => {

                const Icon = status.icon;

                const completed =
                  index <=
                  currentStatusIndex;

                const current =
                  index ===
                  currentStatusIndex;

                return (
                  <div
                    key={status.name}
                    className="relative flex gap-5"
                  >

                    {/* LINE */}

                    {index <
                      statuses.length - 1 && (
                      <div
                        className={`absolute left-6 top-12 h-20 w-0.5 ${
                          index <
                          currentStatusIndex
                            ? "bg-[#7B1E3A]"
                            : "bg-gray-200"
                        }`}
                      />
                    )}

                    {/* ICON */}

                    <div
                      className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                        completed
                          ? "bg-[#7B1E3A] text-white"
                          : "bg-gray-100 text-gray-400"
                      } ${
                        current
                          ? "ring-4 ring-[#7B1E3A]/10"
                          : ""
                      }`}
                    >
                      <Icon size={22} />
                    </div>

                    {/* TEXT */}

                    <div className="pb-10">

                      <h3
                        className={`font-semibold ${
                          completed
                            ? "text-[#7B1E3A]"
                            : "text-gray-400"
                        }`}
                      >
                        {status.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {status.description}
                      </p>

                      {current && (
                        <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Current Status
                        </span>
                      )}

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>

        {/* DELIVERY INFORMATION */}

        <div className="mt-8 grid gap-8 md:grid-cols-2">

          {/* ADDRESS */}

          <div className="rounded-2xl bg-white p-6 shadow-md">

            <div className="mb-4 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF8F2]">
                <MapPin
                  size={20}
                  className="text-[#7B1E3A]"
                />
              </div>

              <h2 className="text-xl font-bold text-[#7B1E3A]">
                Delivery Address
              </h2>

            </div>

            <p className="font-semibold">
              {order.customer.fullName}
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              {order.customer.address}
              <br />
              {order.customer.city},{" "}
              {order.customer.state}
              <br />
              PIN: {order.customer.pinCode}
            </p>

          </div>

          {/* DELIVERY ESTIMATE */}

          <div className="rounded-2xl bg-white p-6 shadow-md">

            <div className="mb-4 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF8F2]">
                <Truck
                  size={20}
                  className="text-[#7B1E3A]"
                />
              </div>

              <h2 className="text-xl font-bold text-[#7B1E3A]">
                Delivery Estimate
              </h2>

            </div>

            <p className="text-2xl font-bold text-[#7B1E3A]">
              4–6 Business Days
            </p>

            <p className="mt-2 text-sm text-gray-500">
              We will keep you updated as your
              order moves through each stage.
            </p>

          </div>

        </div>

        {/* ORDER SUMMARY */}

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-md">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-xl font-bold text-[#7B1E3A]">
                Order Summary
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {order.items.length} product
                {order.items.length !== 1
                  ? "s"
                  : ""}
              </p>

            </div>

            <p className="text-2xl font-bold text-[#7B1E3A]">
              ₹
              {order.total.toLocaleString(
                "en-IN"
              )}
            </p>

          </div>

        </div>

        {/* BUTTONS */}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">

          <Link
            href={`/orders/${order.id}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#7B1E3A] px-6 py-4 font-semibold text-[#7B1E3A] transition hover:bg-[#7B1E3A] hover:text-white"
          >
            <Package size={18} />
            View Order Details
          </Link>

          <Link
            href="/shop"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#7B1E3A] px-6 py-4 font-semibold text-white transition hover:bg-[#641730]"
          >
            Continue Shopping
          </Link>

        </div>

      </section>

    </main>
  );
}