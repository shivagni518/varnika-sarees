"use client";

import { useState } from "react";

import {
  Heart,
  ShoppingCart,
  Bolt,
  Minus,
  Plus,
} from "lucide-react";

import { Product } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

type ProductActionsProps = {
  product: Product;
};

export default function ProductActions({
  product,
}: ProductActionsProps) {
  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);

    toast.success("Added to Cart", {
      description: `${quantity} × ${product.name}`,
    });
  };





  return (
    <div className="mt-10">

      {/* Quantity */}

      <div className="mb-8">

        <h3 className="mb-3 text-lg font-semibold text-[#7B1E3A]">
          Quantity
        </h3>

        <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-300">

          <button
            onClick={decreaseQuantity}
            className="bg-gray-100 p-4 transition hover:bg-gray-200"
          >
            <Minus size={18} />
          </button>

          <div className="w-16 text-center text-lg font-semibold">
            {quantity}
          </div>

          <button
            onClick={increaseQuantity}
            className="bg-gray-100 p-4 transition hover:bg-gray-200"
          >
            <Plus size={18} />
          </button>

        </div>

      </div>

      {/* Buttons */}

      <div className="flex flex-wrap gap-4">

        <button className="flex items-center gap-2 rounded-xl border border-[#7B1E3A] px-6 py-4 font-semibold text-[#7B1E3A] transition hover:bg-[#7B1E3A] hover:text-white">

          <Heart size={20} />

          Wishlist

        </button>

        <button
          onClick={handleAddToCart}
          className="flex items-center gap-2 rounded-xl bg-[#7B1E3A] px-8 py-4 font-semibold text-white transition hover:bg-[#641730]"
        >

          <ShoppingCart size={20} />

          Add to Cart

        </button>

        <button className="flex items-center gap-2 rounded-xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700">

          <Bolt size={20} />

          Buy Now

        </button>

      </div>

    </div>
  );
}