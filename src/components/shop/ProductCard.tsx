"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Heart,
  Star,
  Eye,
} from "lucide-react";

import { Product } from "@/types/product";
import { useWishlistStore } from "@/store/wishlistStore";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const toggleWishlist = useWishlistStore(
    (state) => state.toggleWishlist
  );

  const isWishlisted = useWishlistStore(
    (state) =>
      state.isWishlisted(product.id)
  );

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* =================================================
          IMAGE
      ================================================= */}

      <div className="relative h-80 overflow-hidden">

        {/* DISCOUNT */}

        {product.discount > 0 && (
          <span className="absolute left-3 top-3 z-20 rounded-full bg-[#7B1E3A] px-3 py-1 text-xs font-semibold text-white">
            {product.discount}% OFF
          </span>
        )}

        {/* =================================================
            WISHLIST
        ================================================= */}

        <button
          type="button"
          onClick={() =>
            toggleWishlist(product)
          }
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className="absolute right-3 top-3 z-20 rounded-full bg-white p-2 shadow-md transition hover:bg-red-50"
        >
          <Heart
            size={18}
            className={
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-[#7B1E3A]"
            }
          />
        </button>

        {/* =================================================
            PRODUCT IMAGE
        ================================================= */}

        <Link
          href={`/shop/product/${product.id}`}
          aria-label={`View ${product.name}`}
          className="block h-full"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        {/* =================================================
            QUICK VIEW
        ================================================= */}

        <Link
          href={`/shop/product/${product.id}`}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 opacity-0 transition group-hover:opacity-100"
        >
          <span className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium shadow-lg transition hover:bg-[#FFF8F2]">
            <Eye size={16} />
            Quick View
          </span>
        </Link>

      </div>

      {/* =================================================
          PRODUCT DETAILS
      ================================================= */}

      <div className="space-y-3 p-5">

        {/* NAME + FABRIC */}

        <Link
          href={`/shop/product/${product.id}`}
          className="block"
        >

          <h3 className="text-lg font-semibold text-gray-900 transition hover:text-[#7B1E3A]">
            {product.name}
          </h3>

          <p className="text-sm text-gray-500">
            {product.fabric}
            {" • "}
            {product.occasion}
          </p>

        </Link>

        {/* =================================================
            RATING
        ================================================= */}

        <div className="flex items-center gap-1">

          <Star
            size={15}
            fill="#FACC15"
            className="text-yellow-400"
          />

          <span className="text-sm font-medium">
            {product.rating}
          </span>

          <span className="text-sm text-gray-400">
            ({product.reviews})
          </span>

        </div>

        {/* =================================================
            PRICE
        ================================================= */}

        <div className="flex flex-wrap items-center gap-3">

          <span className="text-2xl font-bold text-[#7B1E3A]">
            ₹
            {product.price.toLocaleString(
              "en-IN"
            )}
          </span>

          {product.originalPrice >
            product.price && (
            <span className="text-sm text-gray-400 line-through">
              ₹
              {product.originalPrice.toLocaleString(
                "en-IN"
              )}
            </span>
          )}

        </div>

        {/* =================================================
            VIEW PRODUCT
        ================================================= */}

        <Link
          href={`/shop/product/${product.id}`}
          className="block w-full rounded-xl bg-[#7B1E3A] py-3 text-center font-medium text-white transition hover:bg-[#641730]"
        >
          View Product
        </Link>

      </div>

    </div>
  );
}