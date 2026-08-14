"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ArrowLeft,
  ChevronDown,
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

const statuses: OrderStatus[] = [
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
];

export default function AdminOrdersPage() {
  const orders = useOrderStore(
    (state) => state.orders
  );

  const updateOrderStatus = useOrderStore(
    (state) => state.updateOrderStatus
  );

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<OrderStatus | "All">("All");

  /* =====================================================
     FILTER DROPDOWN
  ===================================================== */

  const [statusFilterOpen, setStatusFilterOpen] =
    useState(false);

  const statusFilterRef =
    useRef<HTMLDivElement>(null);

  /* =====================================================
     ORDER STATUS DROPDOWN
  ===================================================== */

  const [openOrderStatus, setOpenOrderStatus] =
    useState<string | null>(null);

  /* =====================================================
     FILTER ORDERS
  ===================================================== */

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
  }, [orders, search, statusFilter]);

  /* =====================================================
     CLOSE FILTER DROPDOWN WHEN CLICKING OUTSIDE
  ===================================================== */

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        statusFilterRef.current &&
        !statusFilterRef.current.contains(
          event.target as Node
        )
      ) {
        setStatusFilterOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =====================================================
     CLOSE ORDER STATUS DROPDOWNS
  ===================================================== */

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenOrderStatus(null);
    };

    if (openOrderStatus !== null) {
      document.addEventListener(
        "mousedown",
        handleClickOutside
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [openOrderStatus]);

  /* =====================================================
     CLEAR FILTERS
  ===================================================== */

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setStatusFilterOpen(false);
  };

  const hasFilters =
    search.trim() !== "" ||
    statusFilter !== "All";

  /* =====================================================
     STATUS COLOR
  ===================================================== */

  const getStatusClasses = (
    status: OrderStatus
  ) => {
    if (status === "Confirmed") {
      return "border-green-200 bg-green-50 text-green-700";
    }

    if (status === "Processing") {
      return "border-blue-200 bg-blue-50 text-blue-700";
    }

    if (status === "Shipped") {
      return "border-orange-200 bg-orange-50 text-orange-700";
    }

    return "border-purple-200 bg-purple-50 text-purple-700";
  };

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <main className="min-h-screen bg-[#FFF8F2]">

      {/* =================================================
          HEADER
      ================================================= */}

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

      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="mx-auto max-w-7xl px-6 py-10">

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

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

              <div className="rounded-xl bg-blue-50 p-3">

                <Package
                  size={22}
                  className="text-blue-600"
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

        {/* =================================================
            SEARCH + FILTER
        ================================================= */}

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
                  setSearch(event.target.value)
                }
                placeholder="Search by order ID, customer name or phone..."
                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-10 text-sm outline-none transition focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}

            </div>

            {/* =================================================
                CUSTOM STATUS FILTER
            ================================================= */}

            <div
              ref={statusFilterRef}
              className="relative w-full lg:w-64"
            >

              <button
                type="button"
                onClick={() =>
                  setStatusFilterOpen(
                    !statusFilterOpen
                  )
                }
                aria-haspopup="listbox"
                aria-expanded={statusFilterOpen}
                className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-3 text-left text-sm font-medium transition hover:border-[#7B1E3A] focus:border-[#7B1E3A] focus:outline-none"
              >

                <span>
                  {statusFilter === "All"
                    ? "All Statuses"
                    : statusFilter}
                </span>

                <ChevronDown
                  size={18}
                  className={`text-gray-500 transition-transform ${
                    statusFilterOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />

              </button>

              {statusFilterOpen && (
                <div
                  role="listbox"
                  className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
                >

                  {/* ALL */}

                  <button
                    type="button"
                    role="option"
                    aria-selected={
                      statusFilter === "All"
                    }
                    onClick={() => {
                      setStatusFilter("All");
                      setStatusFilterOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition ${
                      statusFilter === "All"
                        ? "bg-[#FFF0F4] font-semibold text-[#7B1E3A]"
                        : "text-gray-700 hover:bg-[#FFF8F2]"
                    }`}
                  >

                    <span>
                      All Statuses
                    </span>

                    {statusFilter === "All" && (
                      <span className="font-bold text-[#7B1E3A]">
                        ✓
                      </span>
                    )}

                  </button>

                  {/* STATUSES */}

                  {statuses.map((status) => {

                    const isSelected =
                      statusFilter === status;

                    return (
                      <button
                        key={status}
                        type="button"
                        role="option"
                        aria-selected={
                          isSelected
                        }
                        onClick={() => {
                          setStatusFilter(
                            status
                          );
                          setStatusFilterOpen(
                            false
                          );
                        }}
                        className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition ${
                          isSelected
                            ? "bg-[#FFF0F4] font-semibold text-[#7B1E3A]"
                            : "text-gray-700 hover:bg-[#FFF8F2]"
                        }`}
                      >

                        <span>
                          {status}
                        </span>

                        {isSelected && (
                          <span className="font-bold text-[#7B1E3A]">
                            ✓
                          </span>
                        )}

                      </button>
                    );
                  })}

                </div>
              )}

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

        {/* =================================================
            ORDERS TABLE
        ================================================= */}

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

                  {filteredOrders.map((order) => {

                    const totalItems =
                      order.items.reduce(
                        (sum, item) =>
                          sum + item.quantity,
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

                    const isStatusOpen =
                      openOrderStatus ===
                      order.id;

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
                            {order.customer.fullName}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {order.customer.phone}
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
                            CUSTOM ORDER STATUS
                        ================================================= */}

                        <td className="px-6 py-5">

                          <div className="relative w-40">

                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();

                                setOpenOrderStatus(
                                  isStatusOpen
                                    ? null
                                    : order.id
                                );
                              }}
                              className={`flex w-full items-center justify-between rounded-xl border px-4 py-2 text-sm font-semibold outline-none transition ${getStatusClasses(
                                order.status
                              )}`}
                            >

                              <span>
                                {order.status}
                              </span>

                              <ChevronDown
                                size={16}
                                className={`transition-transform ${
                                  isStatusOpen
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />

                            </button>

                            {isStatusOpen && (
                              <div
                                className="absolute left-0 top-full z-[60] mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
                                onMouseDown={(event) =>
                                  event.stopPropagation()
                                }
                              >

                                {statuses.map(
                                  (status) => {

                                    const isSelected =
                                      order.status ===
                                      status;

                                    return (
                                      <button
                                        key={status}
                                        type="button"
                                        onClick={() => {
                                          updateOrderStatus(
                                            order.id,
                                            status
                                          );

                                          setOpenOrderStatus(
                                            null
                                          );
                                        }}
                                        className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition ${
                                          isSelected
                                            ? "bg-[#FFF0F4] font-semibold text-[#7B1E3A]"
                                            : "text-gray-700 hover:bg-[#FFF8F2]"
                                        }`}
                                      >

                                        <span>
                                          {status}
                                        </span>

                                        {isSelected && (
                                          <span className="font-bold text-[#7B1E3A]">
                                            ✓
                                          </span>
                                        )}

                                      </button>
                                    );
                                  }
                                )}

                              </div>
                            )}

                          </div>

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
                  })}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}