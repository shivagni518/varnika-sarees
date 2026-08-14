"use client";

import Image from "next/image";
import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import {
  CartItem as Item,
  useCartStore,
} from "@/store/cartStore";

type Props = {
  item: Item;
};

export default function CartItem({
  item,
}: Props) {
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );

  const itemTotal =
    item.product.price * item.quantity;

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#EDE3D7] bg-white shadow-sm transition hover:shadow-md">

      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <div className="flex gap-4 p-4 sm:gap-6 sm:p-5">

        {/* =======================================
            PRODUCT IMAGE
        ======================================= */}

        <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-[#F5EFE8] sm:h-36 sm:w-28">

          {item.product.images?.[0] ? (

            <Image
              src={item.product.images[0]}
              alt={item.product.name}
              fill
              sizes="(max-width: 640px) 96px, 112px"
              className="object-cover"
            />

          ) : (

            <div className="flex h-full items-center justify-center text-xs text-gray-400">
              No Image
            </div>

          )}

          {/* DISCOUNT */}

          {item.product.discount > 0 && (
            <span className="absolute left-2 top-2 rounded-full bg-[#7B1E3A] px-2 py-1 text-[10px] font-semibold text-white">
              {item.product.discount}% OFF
            </span>
          )}

        </div>

        {/* =======================================
            PRODUCT INFORMATION
        ======================================= */}

        <div className="min-w-0 flex-1">

          {/* CATEGORY */}

          <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#B18A2B] sm:text-xs">
            {item.product.category}
          </p>

          {/* PRODUCT NAME */}

          <h2 className="mt-1 line-clamp-2 text-base font-bold leading-5 text-[#7B1E3A] sm:text-xl sm:leading-6">
            {item.product.name}
          </h2>

          {/* FABRIC + COLOR */}

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            {item.product.fabric}
            {" • "}
            {item.product.color}
          </p>

          {/* PRICE */}

          <p className="mt-3 text-lg font-bold text-gray-900 sm:text-xl">
            ₹
            {item.product.price.toLocaleString(
              "en-IN"
            )}
          </p>

          {/* MOBILE CONTROLS */}

          <div className="mt-4 flex flex-wrap items-center gap-3 sm:hidden">

            {/* QUANTITY */}

            <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">

              <button
                type="button"
                onClick={() =>
                  decreaseQuantity(
                    item.product.id
                  )
                }
                disabled={item.quantity <= 1}
                aria-label="Decrease quantity"
                className="p-2.5 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus size={15} />
              </button>

              <span className="min-w-9 text-center text-sm font-semibold">
                {item.quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  increaseQuantity(
                    item.product.id
                  )
                }
                disabled={
                  item.quantity >=
                  item.product.stock
                }
                aria-label="Increase quantity"
                className="p-2.5 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus size={15} />
              </button>

            </div>

            {/* REMOVE */}

            <button
              type="button"
              onClick={() =>
                removeFromCart(
                  item.product.id
                )
              }
              className="flex items-center gap-1.5 text-xs font-medium text-red-500 transition hover:text-red-700"
            >
              <Trash2 size={15} />
              Remove
            </button>

          </div>

        </div>

        {/* =======================================
            DESKTOP CONTROLS
        ======================================= */}

        <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">

          {/* QUANTITY */}

          <div className="flex items-center overflow-hidden rounded-xl border border-gray-300">

            <button
              type="button"
              onClick={() =>
                decreaseQuantity(
                  item.product.id
                )
              }
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
              className="p-3 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus size={16} />
            </button>

            <span className="min-w-12 text-center font-semibold">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() =>
                increaseQuantity(
                  item.product.id
                )
              }
              disabled={
                item.quantity >=
                item.product.stock
              }
              aria-label="Increase quantity"
              className="p-3 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus size={16} />
            </button>

          </div>

          {/* REMOVE */}

          <button
            type="button"
            onClick={() =>
              removeFromCart(
                item.product.id
              )
            }
            className="flex items-center gap-2 text-sm font-medium text-red-500 transition hover:text-red-700"
          >
            <Trash2 size={17} />
            Remove
          </button>

        </div>

      </div>

      {/* =========================================
          ITEM TOTAL
      ========================================= */}

      <div className="flex items-center justify-between border-t border-[#EDE3D7] bg-[#FFFCF8] px-4 py-3 sm:px-5">

        <span className="text-xs text-gray-500 sm:text-sm">
          Item Total
        </span>

        <span className="text-base font-bold text-[#7B1E3A] sm:text-lg">
          ₹
          {itemTotal.toLocaleString(
            "en-IN"
          )}
        </span>

      </div>

    </div>
  );
}