"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ShoppingBag,
  Users,
  Package,
  IndianRupee,
  ArrowRight,
  Clock,
  CheckCircle,
  LogOut,
} from "lucide-react";

import { useOrderStore } from "@/store/orderStore";
import { useAuthStore } from "@/store/authStore";

export default function AdminPage() {
  const router = useRouter();

  const orders = useOrderStore(
    (state) => state.orders
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  /* =====================================================
     STATISTICS
  ===================================================== */

  const totalOrders = orders.length;

  const totalSales = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  const activeOrders = orders.filter(
    (order) =>
      order.status === "Confirmed" ||
      order.status === "Processing" ||
      order.status === "Shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const recentOrders = orders.slice(0, 5);

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <main className="min-h-screen bg-[#FFF8F2]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            {/* BRAND */}

            <div>
              <p className="text-xs font-semibold uppercase tracking-[3px] text-[#D4AF37]">
                Varnika Sarees
              </p>

              <h1 className="mt-1 text-2xl font-bold text-[#7B1E3A] sm:text-3xl">
                Admin Dashboard
              </h1>
            </div>

            {/* HEADER ACTIONS */}

            <div className="flex w-full gap-3 sm:w-auto">

              {/* VIEW STORE */}

              <Link
                href="/"
                className="flex flex-1 items-center justify-center rounded-xl border border-[#7B1E3A] px-4 py-3 text-sm font-semibold text-[#7B1E3A] transition hover:bg-[#7B1E3A] hover:text-white sm:flex-none sm:px-5 sm:py-2"
              >
                View Store
              </Link>

              {/* LOGOUT */}

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#7B1E3A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#641730] sm:flex-none sm:px-5 sm:py-2"
              >
                <LogOut size={17} />

                Logout
              </button>

            </div>

          </div>

        </div>

      </header>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">

        {/* ===================================================
            OVERVIEW
        =================================================== */}

        <div className="mb-8">

          <h2 className="text-2xl font-bold text-gray-900">
            Overview
          </h2>

          <p className="mt-1 text-gray-500">
            Manage your Varnika Sarees store.
          </p>

        </div>

        {/* ===================================================
            STATISTICS
        =================================================== */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* TOTAL ORDERS */}

          <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Total Orders
                </p>

                <p className="mt-2 text-3xl font-bold text-[#7B1E3A]">
                  {totalOrders}
                </p>

              </div>

              <div className="rounded-xl bg-[#FFF0F4] p-3">

                <ShoppingBag
                  size={24}
                  className="text-[#7B1E3A]"
                />

              </div>

            </div>

          </div>

          {/* TOTAL SALES */}

          <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Total Sales
                </p>

                <p className="mt-2 text-2xl font-bold text-[#7B1E3A] sm:text-3xl">
                  ₹
                  {totalSales.toLocaleString(
                    "en-IN"
                  )}
                </p>

              </div>

              <div className="rounded-xl bg-[#FFF0F4] p-3">

                <IndianRupee
                  size={24}
                  className="text-[#7B1E3A]"
                />

              </div>

            </div>

          </div>

          {/* ACTIVE ORDERS */}

          <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Active Orders
                </p>

                <p className="mt-2 text-3xl font-bold text-[#7B1E3A]">
                  {activeOrders}
                </p>

              </div>

              <div className="rounded-xl bg-[#FFF0F4] p-3">

                <Clock
                  size={24}
                  className="text-[#7B1E3A]"
                />

              </div>

            </div>

          </div>

          {/* DELIVERED ORDERS */}

          <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Delivered
                </p>

                <p className="mt-2 text-3xl font-bold text-[#7B1E3A]">
                  {deliveredOrders}
                </p>

              </div>

              <div className="rounded-xl bg-[#FFF0F4] p-3">

                <CheckCircle
                  size={24}
                  className="text-[#7B1E3A]"
                />

              </div>

            </div>

          </div>

        </div>

        {/* ===================================================
            QUICK ACTIONS
        =================================================== */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold text-gray-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-gray-500">
            Manage your store from here.
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {/* PRODUCTS */}

            <Link
              href="/admin/products"
              className="group rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6"
            >

              <div className="flex items-center justify-between">

                <div className="rounded-xl bg-[#FFF0F4] p-3">

                  <Package
                    size={25}
                    className="text-[#7B1E3A]"
                  />

                </div>

                <ArrowRight
                  size={20}
                  className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#7B1E3A]"
                />

              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Products
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Add, edit and delete saree products.
              </p>

            </Link>

            {/* ORDERS */}

            <Link
              href="/admin/orders"
              className="group rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6"
            >

              <div className="flex items-center justify-between">

                <div className="rounded-xl bg-[#FFF0F4] p-3">

                  <ShoppingBag
                    size={25}
                    className="text-[#7B1E3A]"
                  />

                </div>

                <ArrowRight
                  size={20}
                  className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#7B1E3A]"
                />

              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Orders
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                View and manage customer orders.
              </p>

            </Link>

            {/* CUSTOMERS */}

            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

              <div className="flex items-center justify-between">

                <div className="rounded-xl bg-[#FFF0F4] p-3">

                  <Users
                    size={25}
                    className="text-[#7B1E3A]"
                  />

                </div>

              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Customers
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Customer management will be available
                when we connect the database.
              </p>

            </div>

          </div>

        </div>

        {/* ===================================================
            RECENT ORDERS
        =================================================== */}

        <div className="mt-10">

          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-2xl font-bold text-gray-900">
                Recent Orders
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Latest customer orders
              </p>

            </div>

            <Link
              href="/admin/orders"
              className="flex w-fit items-center gap-2 text-sm font-semibold text-[#7B1E3A] hover:underline"
            >
              View All

              <ArrowRight size={16} />

            </Link>

          </div>

          {recentOrders.length === 0 ? (

            <div className="rounded-xl border border-dashed border-gray-300 bg-white py-12 text-center">

              <ShoppingBag
                size={40}
                className="mx-auto text-gray-300"
              />

              <p className="mt-3 font-medium text-gray-500">
                No orders yet
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">

              <table className="w-full min-w-[700px]">

                <thead>

                  <tr className="border-b border-gray-200 text-left text-sm text-gray-500">

                    <th className="px-6 py-4 font-medium">
                      Order ID
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Customer
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Items
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Total
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {recentOrders.map(
                    (order) => (

                      <tr
                        key={order.id}
                        className="border-b border-gray-100 last:border-0"
                      >

                        <td className="px-6 py-4">

                          <span className="font-semibold text-[#7B1E3A]">
                            #{order.id}
                          </span>

                        </td>

                        <td className="px-6 py-4">

                          <p className="font-medium text-gray-900">
                            {order.customer.fullName}
                          </p>

                          <p className="text-sm text-gray-500">
                            {order.customer.email}
                          </p>

                        </td>

                        <td className="px-6 py-4 text-gray-600">

                          {order.items.reduce(
                            (sum, item) =>
                              sum +
                              item.quantity,
                            0
                          )}

                        </td>

                        <td className="px-6 py-4 font-semibold text-gray-900">

                          ₹
                          {order.total.toLocaleString(
                            "en-IN"
                          )}

                        </td>

                        <td className="px-6 py-4">

                          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            {order.status}
                          </span>

                        </td>

                      </tr>

                    )
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