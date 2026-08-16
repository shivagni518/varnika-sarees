"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Heart,
  ShoppingCart,
  Bolt,
  Minus,
  Plus,
} from "lucide-react";

import { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

import { toast } from "sonner";

type ProductActionsProps = {
  product: Product;
};

export default function ProductActions({
  product,
}: ProductActionsProps) {
  const router = useRouter();

  /* =========================================================
     CART
  ========================================================= */

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  /* =========================================================
     AUTHENTICATION
  ========================================================= */

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  /* =========================================================
     QUANTITY
  ========================================================= */

  const [quantity, setQuantity] =
    useState(1);

  /* =========================================================
     INCREASE QUANTITY
  ========================================================= */

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(
        (previous) => previous + 1
      );
    }
  };

  /* =========================================================
     DECREASE QUANTITY
  ========================================================= */

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(
        (previous) => previous - 1
      );
    }
  };

  /* =========================================================
     LOGIN REQUIRED
  ========================================================= */

  const requireLogin = () => {
    toast.error("Login Required", {
      description:
        "Please login or create an account to continue.",
      action: {
        label: "Login",
        onClick: () => {
          router.push(
            `/login?redirect=${encodeURIComponent(
              window.location.pathname
            )}`
          );
        },
      },
    });
  };

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      requireLogin();
      return;
    }

    addToCart(
      product,
      quantity
    );

    toast.success("Added to Cart", {
      description: `${quantity} × ${product.name}`,
    });
  };

  /* =========================================================
     BUY NOW
  ========================================================= */

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      requireLogin();
      return;
    }

    addToCart(
      product,
      quantity
    );

    router.push("/checkout");
  };

  /* =========================================================
     WISHLIST
  ========================================================= */

  const handleWishlist = () => {
    if (!isAuthenticated) {
      requireLogin();
      return;
    }

    toast.info("Wishlist", {
      description:
        "Wishlist functionality is coming soon.",
    });
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="mt-10">

      {/* =====================================================
          QUANTITY
      ===================================================== */}

      <div className="mb-8">

        <h3 className="mb-3 text-lg font-semibold text-[#7B1E3A]">
          Quantity
        </h3>

        <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-300">

          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            className="bg-gray-100 p-4 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Minus size={18} />
          </button>

          <div className="w-16 text-center text-lg font-semibold">
            {quantity}
          </div>

          <button
            type="button"
            onClick={increaseQuantity}
            disabled={
              quantity >= product.stock
            }
            className="bg-gray-100 p-4 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={18} />
          </button>

        </div>

        {product.stock > 0 && (
          <p className="mt-2 text-sm text-gray-500">
            {product.stock} available
          </p>
        )}

      </div>

      {/* =====================================================
          BUTTONS
      ===================================================== */}

      <div className="flex flex-wrap gap-4">

        {/* ===================================================
            WISHLIST
        =================================================== */}

        <button
          type="button"
          onClick={handleWishlist}
          className="flex items-center gap-2 rounded-xl border border-[#7B1E3A] px-6 py-4 font-semibold text-[#7B1E3A] transition hover:bg-[#7B1E3A] hover:text-white"
        >
          <Heart size={20} />

          Wishlist
        </button>

        {/* ===================================================
            ADD TO CART
        =================================================== */}

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="flex items-center gap-2 rounded-xl bg-[#7B1E3A] px-8 py-4 font-semibold text-white transition hover:bg-[#641730] disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          <ShoppingCart size={20} />

          {product.stock <= 0
            ? "Out of Stock"
            : "Add to Cart"}
        </button>

        {/* ===================================================
            BUY NOW
        =================================================== */}

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={product.stock <= 0}
          className="flex items-center gap-2 rounded-xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          <Bolt size={20} />

          Buy Now
        </button>

      </div>

    </div>
  );
}