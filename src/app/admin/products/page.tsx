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
  Edit,
  Package,
  Plus,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";

import { useProductStore } from "@/store/productStore";

export default function AdminProductsPage() {
  const products = useProductStore(
    (state) => state.products
  );

  const deleteProduct = useProductStore(
    (state) => state.deleteProduct
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  /* =====================================================
     CATEGORY DROPDOWN
  ===================================================== */

  const [categoryOpen, setCategoryOpen] =
    useState(false);

  const categoryDropdownRef =
    useRef<HTMLDivElement>(null);

  /* =====================================================
     CATEGORIES
  ===================================================== */

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        products.map(
          (product) => product.category
        )
      )
    );

    return ["All", ...uniqueCategories];
  }, [products]);

  /* =====================================================
     CLOSE CATEGORY DROPDOWN
  ===================================================== */

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setCategoryOpen(false);
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
     FILTER PRODUCTS
  ===================================================== */

  const filteredProducts = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        searchValue === "" ||
        product.name
          .toLowerCase()
          .includes(searchValue) ||
        product.sku
          .toLowerCase()
          .includes(searchValue) ||
        product.fabric
          .toLowerCase()
          .includes(searchValue) ||
        product.color
          .toLowerCase()
          .includes(searchValue);

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [products, search, category]);

  /* =====================================================
     STATISTICS
  ===================================================== */

  const totalProducts = products.length;

  const featuredProducts = products.filter(
    (product) => product.featured
  ).length;

  const lowStockProducts = products.filter(
    (product) =>
      product.stock > 0 &&
      product.stock <= 5
  ).length;

  const outOfStockProducts = products.filter(
    (product) => product.stock === 0
  ).length;

  /* =====================================================
     DELETE PRODUCT
  ===================================================== */

  const handleDelete = (
    id: number,
    name: string
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmed) {
      return;
    }

    deleteProduct(id);
  };

  /* =====================================================
     CLEAR FILTERS
  ===================================================== */

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
  };

  const hasFilters =
    search.trim() !== "" ||
    category !== "All";

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <main className="min-h-screen bg-[#FFF8F2]">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            {/* HEADER TEXT */}

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
                Product Management
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Manage your saree collection and
                inventory.
              </p>

            </div>

            {/* ADD PRODUCT */}

            <Link
              href="/admin/products/add"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#7B1E3A] px-5 py-3 font-semibold text-white transition hover:bg-[#641730] sm:w-auto"
            >
              <Plus size={18} />
              Add Product
            </Link>

          </div>

        </div>

      </header>

      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">

        {/* =================================================
            STATISTICS
        ================================================= */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* TOTAL PRODUCTS */}

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-[#FFF0F4] p-3">

                <Package
                  size={23}
                  className="text-[#7B1E3A]"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Total Products
                </p>

                <p className="text-2xl font-bold text-[#7B1E3A]">
                  {totalProducts}
                </p>

              </div>

            </div>

          </div>

          {/* FEATURED */}

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-yellow-50 p-3">

                <Star
                  size={23}
                  className="text-yellow-600"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Featured
                </p>

                <p className="text-2xl font-bold text-[#7B1E3A]">
                  {featuredProducts}
                </p>

              </div>

            </div>

          </div>

          {/* LOW STOCK */}

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-orange-50 p-3">

                <Package
                  size={23}
                  className="text-orange-500"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Low Stock
                </p>

                <p className="text-2xl font-bold text-[#7B1E3A]">
                  {lowStockProducts}
                </p>

              </div>

            </div>

          </div>

          {/* OUT OF STOCK */}

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-red-50 p-3">

                <Package
                  size={23}
                  className="text-red-600"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Out of Stock
                </p>

                <p className="text-2xl font-bold text-[#7B1E3A]">
                  {outOfStockProducts}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            SEARCH & FILTER
        ================================================= */}

        <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row">

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
                placeholder="Search by product name, SKU, fabric or color..."
                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-10 text-sm outline-none transition focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A]"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100"
                >
                  <X size={17} />
                </button>
              )}

            </div>

            {/* =================================================
                CUSTOM CATEGORY DROPDOWN
            ================================================= */}

            <div
              ref={categoryDropdownRef}
              className="relative w-full lg:w-64"
            >

              <button
                type="button"
                onClick={() =>
                  setCategoryOpen(
                    !categoryOpen
                  )
                }
                aria-haspopup="listbox"
                aria-expanded={categoryOpen}
                className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-5 py-3 text-left text-sm font-medium transition hover:border-[#7B1E3A] focus:border-[#7B1E3A] focus:outline-none"
              >

                <span>
                  {category === "All"
                    ? "All Categories"
                    : category}
                </span>

                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`text-gray-500 transition-transform ${
                    categoryOpen
                      ? "rotate-180"
                      : ""
                  }`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>

              </button>

              {categoryOpen && (
                <div
                  role="listbox"
                  className="absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border border-gray-200 bg-white py-1 shadow-xl"
                >

                  {categories.map(
                    (categoryName) => {

                      const isSelected =
                        category ===
                        categoryName;

                      return (
                        <button
                          key={categoryName}
                          type="button"
                          role="option"
                          aria-selected={
                            isSelected
                          }
                          onClick={() => {
                            setCategory(
                              categoryName
                            );

                            setCategoryOpen(
                              false
                            );
                          }}
                          className={`flex w-full items-center justify-between px-5 py-3 text-left text-sm transition ${
                            isSelected
                              ? "bg-[#FFF0F4] font-semibold text-[#7B1E3A]"
                              : "text-gray-700 hover:bg-[#FFF8F2]"
                          }`}
                        >

                          <span>
                            {categoryName ===
                            "All"
                              ? "All Categories"
                              : categoryName}
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

          <p className="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-500">

            Showing{" "}

            <span className="font-semibold text-gray-800">
              {filteredProducts.length}
            </span>

            {" "}of{" "}

            <span className="font-semibold text-gray-800">
              {products.length}
            </span>

            {" "}products

          </p>

        </div>

        {/* =================================================
            PRODUCT TABLE
        ================================================= */}

        <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">

          {filteredProducts.length === 0 ? (

            <div className="py-16 text-center">

              <Search
                size={44}
                className="mx-auto text-gray-300"
              />

              <h2 className="mt-4 text-xl font-bold text-gray-700">
                No Products Found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Try another search or category.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-[#7B1E3A] px-5 py-3 text-sm font-semibold text-white"
              >
                Clear Filters
              </button>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1100px]">

                <thead>

                  <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm text-gray-500">

                    <th className="px-6 py-4 font-medium">
                      Product
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Category
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Price
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Stock
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Labels
                    </th>

                    <th className="px-6 py-4 text-right font-medium">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredProducts.map(
                    (product) => (

                      <tr
                        key={product.id}
                        className="border-b border-gray-100 last:border-0 hover:bg-[#FFF8F2]"
                      >

                        {/* PRODUCT */}

                        <td className="px-6 py-5">

                          <p className="font-semibold text-gray-900">
                            {product.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            SKU: {product.sku}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {product.fabric}
                            {" • "}
                            {product.color}
                          </p>

                        </td>

                        {/* CATEGORY */}

                        <td className="px-6 py-5">

                          <span className="rounded-full bg-[#FFF0F4] px-3 py-1 text-xs font-semibold text-[#7B1E3A]">
                            {product.category}
                          </span>

                        </td>

                        {/* PRICE */}

                        <td className="px-6 py-5">

                          <p className="font-bold text-[#7B1E3A]">
                            ₹
                            {product.price.toLocaleString(
                              "en-IN"
                            )}
                          </p>

                          {product.originalPrice >
                            product.price && (
                            <p className="mt-1 text-xs text-gray-400 line-through">
                              ₹
                              {product.originalPrice.toLocaleString(
                                "en-IN"
                              )}
                            </p>
                          )}

                        </td>

                        {/* STOCK */}

                        <td className="px-6 py-5">

                          {product.stock === 0 ? (

                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                              Out of Stock
                            </span>

                          ) : product.stock <= 5 ? (

                            <div>

                              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                                Low Stock
                              </span>

                              <p className="mt-2 text-xs text-gray-500">
                                {product.stock} left
                              </p>

                            </div>

                          ) : (

                            <div>

                              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                In Stock
                              </span>

                              <p className="mt-2 text-xs text-gray-500">
                                {product.stock} available
                              </p>

                            </div>

                          )}

                        </td>

                        {/* LABELS */}

                        <td className="px-6 py-5">

                          <div className="flex flex-wrap gap-2">

                            {product.featured && (
                              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                                Featured
                              </span>
                            )}

                            {product.bestseller && (
                              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                                Bestseller
                              </span>
                            )}

                            {!product.featured &&
                              !product.bestseller && (
                                <span className="text-xs text-gray-400">
                                  —
                                </span>
                              )}

                          </div>

                        </td>

                        {/* ACTIONS */}

                        <td className="px-6 py-5">

                          <div className="flex justify-end gap-2">

                            {/* EDIT */}

                            <Link
                              href={`/admin/products/edit/${product.id}`}
                              title="Edit product"
                              className="inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:border-[#7B1E3A] hover:bg-[#FFF0F4] hover:text-[#7B1E3A]"
                            >
                              <Edit size={17} />
                            </Link>

                            {/* DELETE */}

                            <button
                              type="button"
                              title="Delete product"
                              onClick={() =>
                                handleDelete(
                                  product.id,
                                  product.name
                                )
                              }
                              className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:border-red-500 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={17} />
                            </button>

                          </div>

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