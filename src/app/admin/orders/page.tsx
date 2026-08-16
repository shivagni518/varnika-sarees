"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  ArrowLeft,
  Eye,
  Package,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";

import {
  useOrderStore,
  type OrderStatus,
} from "@/store/orderStore";

/* =========================================================
   ORDER STATUSES
========================================================= */

const statuses: OrderStatus[] = [
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
];

/* =========================================================
   ADMIN ORDERS PAGE
========================================================= */

export default function AdminOrdersPage() {
  /* =========================================================
     ORDER STORE
  ========================================================= */

  const orders = useOrderStore(
    (state) => state.orders
  );

  const updateOrderStatus = useOrderStore(
    (state) => state.updateOrderStatus
  );

  /* =========================================================
     SEARCH
  ========================================================= */

  const [search, setSearch] = useState("");

  /* =========================================================
     STATUS FILTER
  ========================================================= */

  const [statusFilter, setStatusFilter] =
    useState<OrderStatus | "All">("All");

  /* =========================================================
     FILTER ORDERS
  ========================================================= */

  const filteredOrders = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        searchValue === "" ||
        order.id
          .toLowerCase()
          .includes(searchValue) ||
        order.customer.fullName
          .toLowerCase()
          .includes(searchValue) ||
        order.customer.phone
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    orders,
    search,
    statusFilter,
  ]);

  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
  };

  const hasFilters =
    search.trim() !== "" ||
    statusFilter !== "All";

  /* =========================================================
     STATUS COLORS
  ========================================================= */

  const getStatusClasses = (
    status: OrderStatus
  ) => {
    switch (status) {
      case "Confirmed":
        return "border-green-200 bg-green-50 text-green-700";

      case "Processing":
        return "border-blue-200 bg-blue-50 text-blue-700";

      case "Shipped":
        return "border-orange-200 bg-orange-50 text-orange-700";

      case "Delivered":
        return "border-purple-200 bg-purple-50 text-purple-700";

      default:
        return "border-gray-200 bg-gray-50 text-gray-700";
    }
  };

  /* =========================================================
     UPDATE STATUS
  ========================================================= */

  const handleStatusChange = (
    orderId: string,
    status: string
  ) => {
    const validStatus =
      statuses.find(
        (item) => item === status
      );

    if (!validStatus) {
      return;
    }

    updateOrderStatus(
      orderId,
      validStatus
    );
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#FFF8F2]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-gray-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

          <div>

            <Link
              href="/admin"
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-[#7B1E3A] hover:underline"
            >
              <ArrowLeft size={16} />
              Admin Dashboard
            </Link>

            <p className="text-xs font-semibold uppercase tracking-[3px] text-[#D4AF37]">
              Varnika Sarees
            </p>

            <h1 className="mt-1 text-3xl font-bold text-[#7B1E3A]">
              Manage Orders
            </h1>

          </div>

          <Link
            href="/"
            className="hidden rounded-xl border border-[#7B1E3A] px-5 py-2 text-sm font-semibold text-[#7B1E3A] transition hover:bg-[#7B1E3A] hover:text-white sm:block"
          >
            View Store
          </Link>

        </div>

      </header>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-10">

        {/* ===================================================
            SUMMARY CARDS
        =================================================== */}

        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* TOTAL */}

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-[#FFF0F4] p-3">

                <ShoppingBag
                  size={22}
                  className="text-[#7B1E3A]"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Total Orders
                </p>

                <p className="text-2xl font-bold text-[#7B1E3A]">
                  {orders.length}
                </p>

              </div>

            </div>

          </div>

          {/* CONFIRMED */}

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-green-50 p-3">

                <Package
                  size={22}
                  className="text-green-600"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Confirmed
                </p>

                <p className="text-2xl font-bold text-[#7B1E3A]">
                  {
                    orders.filter(
                      (order) =>
                        order.status ===
                        "Confirmed"
                    ).length
                  }
                </p>

              </div>

            </div>

          </div>

          {/* SHIPPED */}

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-orange-50 p-3">

                <Package
                  size={22}
                  className="text-orange-500"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Shipped
                </p>

                <p className="text-2xl font-bold text-[#7B1E3A]">
                  {
                    orders.filter(
                      (order) =>
                        order.status ===
                        "Shipped"
                    ).length
                  }
                </p>

              </div>

            </div>

          </div>

          {/* DELIVERED */}

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-purple-50 p-3">

                <Package
                  size={22}
                  className="text-purple-600"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Delivered
                </p>

                <p className="text-2xl font-bold text-[#7B1E3A]">
                  {
                    orders.filter(
                      (order) =>
                        order.status ===
                        "Delivered"
                    ).length
                  }
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ===================================================
            SEARCH + FILTER
        =================================================== */}

        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

            {/* SEARCH */}

            <div className="relative flex-1">

              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search by order ID, customer name or phone..."
                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-10 text-sm outline-none transition focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    setSearch("")
                  }
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                >
                  <X size={17} />
                </button>
              )}

            </div>

            {/* STATUS FILTER */}

            <div className="w-full lg:w-64">

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target
                      .value as
                      | OrderStatus
                      | "All"
                  )
                }
                className="w-full cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A]"
              >

                <option value="All">
                  All Statuses
                </option>

                {statuses.map(
                  (status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  )
                )}

              </select>

            </div>

            {/* CLEAR */}

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:border-[#7B1E3A] hover:text-[#7B1E3A]"
              >
                Clear
              </button>
            )}

          </div>

          {/* RESULT COUNT */}

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">

            <p className="text-sm text-gray-500">

              Showing{" "}

              <span className="font-semibold text-gray-800">
                {filteredOrders.length}
              </span>

              {" "}of{" "}

              <span className="font-semibold text-gray-800">
                {orders.length}
              </span>

              {" "}orders

            </p>

            {hasFilters && (
              <p className="text-xs text-[#7B1E3A]">
                Filters applied
              </p>
            )}

          </div>

        </div>

        {/* ===================================================
            ORDERS TABLE
        =================================================== */}

        <div className="rounded-2xl bg-white shadow-sm">

          {orders.length === 0 ? (

            <div className="px-6 py-16 text-center">

              <ShoppingBag
                size={48}
                className="mx-auto text-gray-300"
              />

              <h2 className="mt-4 text-xl font-bold text-gray-700">
                No Orders Yet
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Customer orders will appear here.
              </p>

            </div>

          ) : filteredOrders.length === 0 ? (

            <div className="px-6 py-16 text-center">

              <Search
                size={44}
                className="mx-auto text-gray-300"
              />

              <h2 className="mt-4 text-xl font-bold text-gray-700">
                No Matching Orders
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Try a different search or status
                filter.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-[#7B1E3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#641730]"
              >
                Clear Filters
              </button>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1000px]">

                <thead>

                  <tr className="border-b border-gray-200 text-left text-sm text-gray-500">

                    <th className="px-6 py-5 font-medium">
                      Order
                    </th>

                    <th className="px-6 py-5 font-medium">
                      Customer
                    </th>

                    <th className="px-6 py-5 font-medium">
                      Items
                    </th>

                    <th className="px-6 py-5 font-medium">
                      Total
                    </th>

                    <th className="px-6 py-5 font-medium">
                      Status
                    </th>

                    <th className="px-6 py-5 text-right font-medium">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredOrders.map(
                    (order) => {

                      const totalItems =
                        order.items.reduce(
                          (sum, item) =>
                            sum +
                            item.quantity,
                          0
                        );

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

                        <tr
                          key={order.id}
                          className="border-b border-gray-100 last:border-0 hover:bg-[#FFF8F2]"
                        >

                          {/* ORDER */}

                          <td className="px-6 py-5">

                            <p className="font-semibold text-[#7B1E3A]">
                              #{order.id}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {orderDate}
                            </p>

                          </td>

                          {/* CUSTOMER */}

                          <td className="px-6 py-5">

                            <p className="font-medium text-gray-800">
                              {
                                order
                                  .customer
                                  .fullName
                              }
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {
                                order
                                  .customer
                                  .phone
                              }
                            </p>

                          </td>

                          {/* ITEMS */}

                          <td className="px-6 py-5">
                            {totalItems}
                          </td>

                          {/* TOTAL */}

                          <td className="px-6 py-5 font-semibold">
                            ₹
                            {order.total.toLocaleString(
                              "en-IN"
                            )}
                          </td>

                          {/* =================================================
                              STATUS DROPDOWN
                          ================================================= */}

                          <td className="px-6 py-5">

                            <select
                              value={
                                order.status
                              }
                              onChange={(
                                event
                              ) =>
                                handleStatusChange(
                                  order.id,
                                  event.target
                                    .value
                                )
                              }
                              className={`cursor-pointer rounded-xl border px-4 py-2 text-sm font-semibold outline-none transition ${getStatusClasses(
                                order.status
                              )}`}
                            >

                              {statuses.map(
                                (status) => (
                                  <option
                                    key={status}
                                    value={status}
                                  >
                                    {status}
                                  </option>
                                )
                              )}

                            </select>

                          </td>

                          {/* ACTION */}

                          <td className="px-6 py-5 text-right">

                            <Link
                              href={`/orders/${order.id}`}
                              className="inline-flex items-center gap-2 rounded-lg border border-[#7B1E3A] px-3 py-2 text-sm font-medium text-[#7B1E3A] transition hover:bg-[#7B1E3A] hover:text-white"
                            >

                              <Eye size={16} />

                              View

                            </Link>

                          </td>

                        </tr>

                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}