"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Search,
  ShoppingBag,
  Trash2,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import { useCustomerStore } from "@/store/customerStore";

export default function AdminCustomersPage() {
  const customers = useCustomerStore(
    (state) => state.customers
  );

  const deleteCustomer = useCustomerStore(
    (state) => state.deleteCustomer
  );

  const [search, setSearch] =
    useState("");

  /* =====================================================
     FILTER CUSTOMERS
  ===================================================== */

  const filteredCustomers = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) {
      return customers;
    }

    return customers.filter(
      (customer) =>
        customer.fullName
          .toLowerCase()
          .includes(query) ||
        customer.email
          .toLowerCase()
          .includes(query) ||
        customer.phone.includes(query)
    );
  }, [customers, search]);

  /* =====================================================
     TOTAL ORDERS
  ===================================================== */

  const totalOrders = customers.reduce(
    (total, customer) =>
      total + customer.totalOrders,
    0
  );

  /* =====================================================
     TOTAL REVENUE
  ===================================================== */

  const totalRevenue = customers.reduce(
    (total, customer) =>
      total + customer.totalSpent,
    0
  );

  /* =====================================================
     DELETE CUSTOMER
  ===================================================== */

  const handleDelete = (
    id: string,
    name: string
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete ${name}?`
      );

    if (!confirmed) {
      return;
    }

    deleteCustomer(id);
  };

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <main className="min-h-screen bg-[#FFF8F2]">

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">

          <Link
            href="/admin"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#7B1E3A] hover:underline"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>

          <p className="text-xs font-semibold uppercase tracking-[2px] text-[#B18A2B]">
            Varnika Sarees
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <h1 className="text-3xl font-bold text-[#7B1E3A] sm:text-4xl">
                Customers
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Manage your registered customers
                and view their activity.
              </p>

            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[#EDE3D7] bg-white px-4 py-3 shadow-sm">

              <Users
                size={18}
                className="text-[#7B1E3A]"
              />

              <span className="text-sm font-semibold">
                {customers.length}{" "}
                {customers.length === 1
                  ? "Customer"
                  : "Customers"}
              </span>

            </div>

          </div>

        </div>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <div className="mb-8 grid gap-4 sm:grid-cols-3">

          {/* CUSTOMERS */}

          <div className="rounded-2xl border border-[#EDE3D7] bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF0F4]">

                <Users
                  size={20}
                  className="text-[#7B1E3A]"
                />

              </div>

              <span className="text-xs font-medium text-gray-400">
                Total
              </span>

            </div>

            <p className="mt-4 text-sm text-gray-500">
              Registered Customers
            </p>

            <p className="mt-1 text-2xl font-bold text-[#7B1E3A]">
              {customers.length}
            </p>

          </div>

          {/* ORDERS */}

          <div className="rounded-2xl border border-[#EDE3D7] bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF8E7]">

                <ShoppingBag
                  size={20}
                  className="text-[#B18A2B]"
                />

              </div>

              <span className="text-xs font-medium text-gray-400">
                Orders
              </span>

            </div>

            <p className="mt-4 text-sm text-gray-500">
              Total Customer Orders
            </p>

            <p className="mt-1 text-2xl font-bold text-[#7B1E3A]">
              {totalOrders}
            </p>

          </div>

          {/* REVENUE */}

          <div className="rounded-2xl border border-[#EDE3D7] bg-white p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5FAF5]">

                <span className="text-lg font-bold text-green-600">
                  ₹
                </span>

              </div>

              <span className="text-xs font-medium text-gray-400">
                Revenue
              </span>

            </div>

            <p className="mt-4 text-sm text-gray-500">
              Total Customer Spending
            </p>

            <p className="mt-1 text-2xl font-bold text-[#7B1E3A]">
              ₹
              {totalRevenue.toLocaleString(
                "en-IN"
              )}
            </p>

          </div>

        </div>

        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="mb-6 rounded-2xl border border-[#EDE3D7] bg-white p-4 shadow-sm">

          <div className="relative">

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
              placeholder="Search by name, email or phone..."
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A]"
            />

          </div>

        </div>

        {/* =================================================
            CUSTOMER LIST
        ================================================= */}

        {filteredCustomers.length === 0 ? (

          <div className="rounded-3xl border border-[#EDE3D7] bg-white p-10 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF0F4]">

              <Users
                size={28}
                className="text-[#7B1E3A]"
              />

            </div>

            <h2 className="mt-5 text-xl font-bold text-[#7B1E3A]">
              {customers.length === 0
                ? "No Customers Yet"
                : "No Customers Found"}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {customers.length === 0
                ? "Registered customers will appear here."
                : "Try a different search term."}
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {filteredCustomers.map(
              (customer) => {

                const registeredDate =
                  new Date(
                    customer.createdAt
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
                    key={customer.id}
                    className="overflow-hidden rounded-3xl border border-[#EDE3D7] bg-white shadow-sm transition hover:shadow-md"
                  >

                    {/* GOLD ACCENT */}

                    <div className="h-1 bg-[#D4AF37]" />

                    <div className="p-5 sm:p-6">

                      {/* TOP */}

                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                        {/* CUSTOMER INFO */}

                        <div className="flex min-w-0 items-start gap-4">

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFF0F4] text-lg font-bold text-[#7B1E3A]">
                            {customer.fullName
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0">

                            <div className="flex flex-wrap items-center gap-2">

                              <h2 className="text-lg font-bold text-gray-800">
                                {customer.fullName}
                              </h2>

                              <span className="rounded-full bg-[#F5FAF5] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-green-700">
                                Customer
                              </span>

                            </div>

                            <p className="mt-1 text-xs text-gray-400">
                              ID: {customer.id}
                            </p>

                          </div>

                        </div>

                        {/* ACTIONS */}

                        <div className="flex gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                customer.id,
                                customer.fullName
                              )
                            }
                            className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                          >

                            <Trash2 size={16} />

                            Delete

                          </button>

                        </div>

                      </div>

                      {/* DIVIDER */}

                      <div className="my-5 border-t border-[#EDE3D7]" />

                      {/* DETAILS */}

                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        {/* EMAIL */}

                        <div className="rounded-xl bg-[#FFFCF8] p-4">

                          <div className="flex items-center gap-2 text-gray-400">

                            <Mail size={15} />

                            <span className="text-xs">
                              Email
                            </span>

                          </div>

                          <p className="mt-2 break-all text-sm font-medium text-gray-700">
                            {customer.email}
                          </p>

                        </div>

                        {/* PHONE */}

                        <div className="rounded-xl bg-[#FFFCF8] p-4">

                          <div className="flex items-center gap-2 text-gray-400">

                            <Phone size={15} />

                            <span className="text-xs">
                              Phone
                            </span>

                          </div>

                          <p className="mt-2 text-sm font-medium text-gray-700">
                            {customer.phone}
                          </p>

                        </div>

                        {/* ORDERS */}

                        <div className="rounded-xl bg-[#FFFCF8] p-4">

                          <div className="flex items-center gap-2 text-gray-400">

                            <ShoppingBag
                              size={15}
                            />

                            <span className="text-xs">
                              Orders
                            </span>

                          </div>

                          <p className="mt-2 text-sm font-bold text-[#7B1E3A]">
                            {customer.totalOrders}
                          </p>

                        </div>

                        {/* SPENT */}

                        <div className="rounded-xl bg-[#FFFCF8] p-4">

                          <div className="flex items-center gap-2 text-gray-400">

                            <span className="text-sm font-bold">
                              ₹
                            </span>

                            <span className="text-xs">
                              Total Spent
                            </span>

                          </div>

                          <p className="mt-2 text-sm font-bold text-[#7B1E3A]">
                            ₹
                            {customer.totalSpent.toLocaleString(
                              "en-IN"
                            )}
                          </p>

                        </div>

                      </div>

                      {/* FOOTER */}

                      <div className="mt-5 flex flex-col gap-3 border-t border-[#EDE3D7] pt-4 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">

                        <span>
                          Registered on{" "}
                          {registeredDate}
                        </span>

                        <span>
                          Customer ID:{" "}
                          {customer.id}
                        </span>

                      </div>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        )}

      </section>

    </main>
  );
}