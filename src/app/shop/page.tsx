"use client";

import { useMemo, useState } from "react";

import ShopHero from "@/components/shop/ShopHero";
import SearchBar from "@/components/shop/SearchBar";
import CategoryFilter from "@/components/shop/CategoryFilter";
import SortDropdown from "@/components/shop/SortDropdown";
import ProductGrid from "@/components/shop/ProductGrid";

import { useProductStore } from "@/store/productStore";

export default function ShopPage() {
  const products = useProductStore(
    (state) => state.products
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  /* =====================================================
     FILTER + SEARCH + SORT
  ===================================================== */

  const filteredProducts = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    const filtered = products.filter(
      (product) => {
        const matchesSearch =
          query === "" ||
          product.name
            .toLowerCase()
            .includes(query) ||
          product.category
            .toLowerCase()
            .includes(query) ||
          product.fabric
            .toLowerCase()
            .includes(query) ||
          product.occasion
            .toLowerCase()
            .includes(query) ||
          product.color
            .toLowerCase()
            .includes(query);

        const matchesCategory =
          category === "All" ||
          product.category.toLowerCase() ===
            category.toLowerCase();

        return (
          matchesSearch &&
          matchesCategory
        );
      }
    );

    /* =================================================
       SORT
    ================================================= */

    switch (sort) {
      case "low-high":
        filtered.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "high-low":
        filtered.sort(
          (a, b) => b.price - a.price
        );
        break;

      case "highest-rated":
        filtered.sort(
          (a, b) => b.rating - a.rating
        );
        break;

      case "best-selling":
        filtered.sort(
          (a, b) => b.reviews - a.reviews
        );
        break;

      case "newest":
        filtered.sort(
          (a, b) => b.id - a.id
        );
        break;

      case "default":
      default:
        break;
    }

    return filtered;
  }, [
    products,
    search,
    category,
    sort,
  ]);

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <main className="min-h-screen bg-[#FFF8F2]">

      <ShopHero />

      <section className="mx-auto max-w-7xl px-6 py-12">

        {/* =================================================
            SEARCH & FILTERS
        ================================================= */}

        <div className="mb-12 flex flex-col items-center justify-between gap-6 lg:flex-row">

          {/* SEARCH */}

          <div className="w-full lg:w-2/5">

            <SearchBar
              search={search}
              setSearch={setSearch}
            />

          </div>

          {/* FILTERS */}

          <div className="flex gap-4">

            <CategoryFilter
              category={category}
              setCategory={setCategory}
            />

            <SortDropdown
              sort={sort}
              setSort={setSort}
            />

          </div>

        </div>

        {/* =================================================
            PRODUCT GRID
        ================================================= */}

        <ProductGrid
          products={filteredProducts}
        />

      </section>

    </main>
  );
}