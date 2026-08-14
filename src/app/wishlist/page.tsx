"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Heart,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { toast } from "sonner";

import { Product } from "@/types/product";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";

export default function WishlistPage() {
  const wishlist = useWishlistStore(
    (state) => state.wishlist
  );

  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const handleMoveToCart = (product: Product) => {
    addToCart(product, 1);

    removeFromWishlist(product.id);

    toast.success("Added to Cart", {
      description: product.name,
    });
  };

  const handleRemove = (product: Product) => {
    removeFromWishlist(product.id);

    toast.success("Removed from Wishlist", {
      description: product.name,
    });
  };

  return (
    <main className="min-h-screen bg-[#FFF8F2]">
      <section className="mx-auto max-w-7xl px-6 py-32">
        <h1 className="mb-2 text-4xl font-bold text-[#7B1E3A]">
          My Wishlist
        </h1>

        <p className="mb-10 text-gray-500">
          Your favourite sarees in one place.
        </p>

        {wishlist.length === 0 ? (
          <div className="rounded-2xl bg-white p-16 text-center shadow-md">
            <Heart
              size={60}
              className="mx-auto mb-5 text-[#7B1E3A]"
            />

            <h2 className="mb-3 text-2xl font-bold">
              Your wishlist is empty
            </h2>

            <p className="mb-8 text-gray-500">
              Start adding your favourite sarees.
            </p>

            <Link
              href="/shop"
              className="inline-block rounded-xl bg-[#7B1E3A] px-6 py-3 font-semibold text-white transition hover:bg-[#641730]"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative mb-4 h-80 w-full">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>

                <h2 className="text-xl font-bold">
                  {product.name}
                </h2>

                <p className="mt-2 text-gray-500">
                  {product.fabric}
                </p>

                <h3 className="mt-4 text-2xl font-bold text-[#7B1E3A]">
                  ₹{product.price.toLocaleString("en-IN")}
                </h3>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7B1E3A] py-3 font-semibold text-white transition hover:bg-[#641730]"
                  >
                    <ShoppingCart size={18} />
                    Move to Cart
                  </button>

                  <button
                    onClick={() => handleRemove(product)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500 py-3 font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 size={18} />
                    Remove
                  </button>

                  <Link
                    href={`/shop/${product.slug}`}
                    className="block rounded-xl border border-gray-300 py-3 text-center font-semibold transition hover:bg-gray-100"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}