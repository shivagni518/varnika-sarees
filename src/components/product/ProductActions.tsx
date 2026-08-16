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

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const authHasHydrated = useAuthStore(
    (state) => state.hasHydrated
  );

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(product.stock, current + 1)
    );
  };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  };

  const goToLogin = () => {
    const currentPath =
      `${window.location.pathname}${window.location.search}`;

    router.push(
      `/login?redirect=${encodeURIComponent(currentPath)}`
    );
  };

  const requireCustomerLogin = async () => {
    if (!authHasHydrated) {
      await useAuthStore.persist.rehydrate();
    }

    const auth = useAuthStore.getState();

    if (
      !auth.isAuthenticated ||
      !auth.user ||
      auth.user.role !== "customer"
    ) {
      toast.error("Login Required", {
        description:
          "Please login or create an account before continuing.",
      });

      goToLogin();
      return false;
    }

    return true;
  };

  const handleAddToCart = async () => {
    if (product.stock <= 0) {
      return;
    }

    const allowed =
      await requireCustomerLogin();

    if (!allowed) {
      return;
    }

    addToCart(product, quantity);

    toast.success("Added to Cart", {
      description:
        `${quantity} × ${product.name}`,
    });
  };

  const handleBuyNow = async () => {
    if (product.stock <= 0) {
      return;
    }

    const allowed =
      await requireCustomerLogin();

    if (!allowed) {
      return;
    }

    addToCart(product, quantity);
    router.push("/checkout");
  };

  const handleWishlist = async () => {
    const allowed =
      await requireCustomerLogin();

    if (!allowed) {
      return;
    }

    toast.info("Wishlist", {
      description:
        "Wishlist functionality is coming soon.",
    });
  };

  return (
    <div className="mt-10">

      <div className="mb-8">
        <h3 className="mb-3 text-lg font-semibold text-[#7B1E3A]">
          Quantity
        </h3>

        <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-300">
          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
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
              quantity >= product.stock ||
              product.stock <= 0
            }
            aria-label="Increase quantity"
            className="bg-gray-100 p-4 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={18} />
          </button>
        </div>

        {product.stock > 0 && (
          <p className="mt-2 text-sm text-gray-500">
            {product.stock} available in stock
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-4">

        <button
          type="button"
          onClick={handleWishlist}
          className="flex items-center gap-2 rounded-xl border border-[#7B1E3A] px-6 py-4 font-semibold text-[#7B1E3A] transition hover:bg-[#7B1E3A] hover:text-white"
        >
          <Heart size={20} />
          Wishlist
        </button>

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
