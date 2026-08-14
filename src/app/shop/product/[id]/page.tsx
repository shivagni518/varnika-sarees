"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useState,
  useSyncExternalStore,
} from "react";

import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  X,
} from "lucide-react";

import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";

export default function ProductDetailsPage() {
  const params = useParams();

  const id = Number(params.id);

  /* =========================================
     PRODUCT STORE HYDRATION
  ========================================= */

  const hydrated = useSyncExternalStore(
    (callback) => {
      return useProductStore.persist.onFinishHydration(
        callback
      );
    },
    () =>
      useProductStore.persist.hasHydrated(),
    () => false
  );

  /* =========================================
     PRODUCT
  ========================================= */

  const product = useProductStore((state) =>
    state.getProduct(id)
  );

  /* =========================================
     CART
  ========================================= */

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  /* =========================================
     LOCAL STATE
  ========================================= */

  const [quantity, setQuantity] = useState(1);

  const [selectedImage, setSelectedImage] =
    useState(0);

  const [wishlist, setWishlist] =
    useState(false);

  const [showCartModal, setShowCartModal] =
    useState(false);

  /* =========================================
     LOADING
  ========================================= */

  if (!hydrated) {
    return (
      <main className="min-h-screen bg-[#FFF8F2]">

        <div className="mx-auto max-w-7xl px-6 py-10">

          {/* Back skeleton */}

          <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />

          <div className="mt-8 grid gap-10 lg:grid-cols-2">

            {/* Image skeleton */}

            <div className="aspect-square animate-pulse rounded-3xl bg-gray-200" />

            {/* Details skeleton */}

            <div className="space-y-5">

              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

              <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200" />

              <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />

              <div className="h-24 animate-pulse rounded-xl bg-gray-200" />

              <div className="grid grid-cols-2 gap-3">

                <div className="h-20 animate-pulse rounded-xl bg-gray-200" />

                <div className="h-20 animate-pulse rounded-xl bg-gray-200" />

                <div className="h-20 animate-pulse rounded-xl bg-gray-200" />

                <div className="h-20 animate-pulse rounded-xl bg-gray-200" />

              </div>

            </div>

          </div>

        </div>

      </main>
    );
  }

  /* =========================================
     PRODUCT NOT FOUND
  ========================================= */

  if (!product) {
    return (
      <main className="min-h-screen bg-[#FFF8F2] px-6 py-32">

        <div className="mx-auto max-w-xl text-center">

          <h1 className="text-3xl font-bold text-[#7B1E3A]">
            Product Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            Sorry, this product is no longer
            available.
          </p>

          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#7B1E3A] px-6 py-3 font-semibold text-white transition hover:bg-[#641730]"
          >
            <ArrowLeft size={18} />
            Back to Shop
          </Link>

        </div>

      </main>
    );
  }

  /* =========================================
     QUANTITY - DECREASE
  ========================================= */

  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  };

  /* =========================================
     QUANTITY - INCREASE
  ========================================= */

  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(product.stock, current + 1)
    );
  };

  /* =========================================
     ADD TO CART
  ========================================= */

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      return;
    }

    addToCart(product, quantity);

    setShowCartModal(true);
  };

  /* =========================================
     PAGE
  ========================================= */

  return (
    <main className="min-h-screen bg-[#FFF8F2]">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-5">

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#7B1E3A] transition hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Shop
          </Link>

        </div>

      </header>

      {/* =====================================
          PRODUCT CONTENT
      ===================================== */}

      <section className="mx-auto max-w-7xl px-6 py-8 sm:py-12">

        <div className="grid gap-10 lg:grid-cols-2">

          {/* =================================
              PRODUCT IMAGES
          ================================= */}

          <div>

            {/* Main Image */}

            <div className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-sm">

              {product.images?.[selectedImage] ? (

                <Image
                  src={
                    product.images[
                      selectedImage
                    ]
                  }
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

              ) : (

                <div className="flex h-full items-center justify-center text-gray-400">
                  No Image
                </div>

              )}

              {/* Discount */}

              {product.discount > 0 && (

                <div className="absolute left-4 top-4 rounded-full bg-[#7B1E3A] px-3 py-1.5 text-xs font-bold text-white">
                  {product.discount}% OFF
                </div>

              )}

            </div>

            {/* =================================
                IMAGE THUMBNAILS
            ================================= */}

            {product.images &&
              product.images.length > 1 && (

                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">

                  {product.images.map(
                    (image: string, index:number) => (

                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() =>
                          setSelectedImage(
                            index
                          )
                        }
                        className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                          selectedImage === index
                            ? "border-[#7B1E3A]"
                            : "border-transparent"
                        }`}
                      >

                        <Image
                          src={image}
                          alt={`${product.name} ${
                            index + 1
                          }`}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />

                      </button>

                    )
                  )}

                </div>

              )}

          </div>

          {/* =================================
              PRODUCT INFORMATION
          ================================= */}

          <div className="flex flex-col">

            {/* Category */}

            <p className="text-xs font-semibold uppercase tracking-[3px] text-[#D4AF37]">
              {product.category}
            </p>

            {/* Product Name */}

            <h1 className="mt-2 text-3xl font-bold leading-tight text-[#7B1E3A] sm:text-4xl">
              {product.name}
            </h1>

            {/* =================================
                RATING
            ================================= */}

            <div className="mt-4 flex flex-wrap items-center gap-3">

              <div className="flex items-center gap-1">

                {Array.from({
                  length: 5,
                }).map((_, index) => (

                  <Star
                    key={index}
                    size={18}
                    className={
                      index <
                      Math.round(
                        product.rating
                      )
                        ? "fill-[#D4AF37] text-[#D4AF37]"
                        : "text-gray-300"
                    }
                  />

                ))}

              </div>

              <span className="text-sm font-medium text-gray-600">
                {product.rating.toFixed(1)}
              </span>

              <span className="text-sm text-gray-400">
                ({product.reviews} reviews)
              </span>

            </div>

            {/* =================================
                PRICE
            ================================= */}

            <div className="mt-6 flex flex-wrap items-center gap-3">

              <span className="text-3xl font-bold text-[#7B1E3A]">
                ₹
                {product.price.toLocaleString(
                  "en-IN"
                )}
              </span>

              {product.originalPrice >
                product.price && (

                <span className="text-lg text-gray-400 line-through">
                  ₹
                  {product.originalPrice.toLocaleString(
                    "en-IN"
                  )}
                </span>

              )}

              {product.discount > 0 && (

                <span className="rounded-full bg-[#FFF0F4] px-3 py-1 text-sm font-semibold text-[#7B1E3A]">
                  Save {product.discount}%
                </span>

              )}

            </div>

            {/* =================================
                DESCRIPTION
            ================================= */}

            <div className="mt-7 border-t border-gray-200 pt-6">

              <h2 className="text-lg font-bold text-gray-900">
                Description
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                {product.description}
              </p>

            </div>

            {/* =================================
                PRODUCT DETAILS
            ================================= */}

            <div className="mt-6 grid grid-cols-2 gap-3">

              {/* Fabric */}

              <div className="rounded-xl bg-white p-4 shadow-sm">

                <p className="text-xs text-gray-400">
                  Fabric
                </p>

                <p className="mt-1 font-semibold text-gray-800">
                  {product.fabric}
                </p>

              </div>

              {/* Occasion */}

              <div className="rounded-xl bg-white p-4 shadow-sm">

                <p className="text-xs text-gray-400">
                  Occasion
                </p>

                <p className="mt-1 font-semibold text-gray-800">
                  {product.occasion}
                </p>

              </div>

              {/* Color */}

              <div className="rounded-xl bg-white p-4 shadow-sm">

                <p className="text-xs text-gray-400">
                  Color
                </p>

                <p className="mt-1 font-semibold text-gray-800">
                  {product.color}
                </p>

              </div>

              {/* SKU */}

              <div className="rounded-xl bg-white p-4 shadow-sm">

                <p className="text-xs text-gray-400">
                  SKU
                </p>

                <p className="mt-1 font-semibold text-gray-800">
                  {product.sku}
                </p>

              </div>

            </div>

            {/* =================================
                STOCK
            ================================= */}

            <div className="mt-6">

              {product.stock > 0 ? (

                <p className="text-sm font-semibold text-green-600">
                  ✓ {product.stock} available in
                  stock
                </p>

              ) : (

                <p className="text-sm font-semibold text-red-600">
                  Out of stock
                </p>

              )}

            </div>

            {/* =================================
                QUANTITY
            ================================= */}

            {product.stock > 0 && (

              <div className="mt-6">

                <p className="mb-2 text-sm font-semibold text-gray-700">
                  Quantity
                </p>

                <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-300 bg-white">

                  {/* Minus */}

                  <button
                    type="button"
                    onClick={
                      decreaseQuantity
                    }
                    disabled={quantity <= 1}
                    className="p-3 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Minus size={18} />
                  </button>

                  {/* Quantity */}

                  <span className="min-w-12 text-center font-semibold">
                    {quantity}
                  </span>

                  {/* Plus */}

                  <button
                    type="button"
                    onClick={
                      increaseQuantity
                    }
                    disabled={
                      quantity >=
                      product.stock
                    }
                    className="p-3 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Plus size={18} />
                  </button>

                </div>

              </div>

            )}

            {/* =================================
                ACTION BUTTONS
            ================================= */}

            <div className="mt-7 flex gap-3">

              {/* Wishlist */}

              <button
                type="button"
                onClick={() =>
                  setWishlist(!wishlist)
                }
                aria-label={
                  wishlist
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition ${
                  wishlist
                    ? "border-[#7B1E3A] bg-[#FFF0F4] text-[#7B1E3A]"
                    : "border-gray-300 bg-white text-gray-600 hover:border-[#7B1E3A] hover:text-[#7B1E3A]"
                }`}
              >

                <Heart
                  size={21}
                  className={
                    wishlist
                      ? "fill-[#7B1E3A]"
                      : ""
                  }
                />

              </button>

              {/* Add to Cart */}

              <button
                type="button"
                disabled={
                  product.stock === 0
                }
                onClick={
                  handleAddToCart
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#7B1E3A] px-5 py-3 font-semibold text-white transition hover:bg-[#641730] disabled:cursor-not-allowed disabled:bg-gray-400"
              >

                <ShoppingBag size={20} />

                {product.stock === 0
                  ? "Out of Stock"
                  : "Add to Cart"}

              </button>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          PREMIUM ADDED TO CART MODAL
      ================================================= */}

      {showCartModal && (

        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/45 px-4 pb-4 sm:items-center sm:px-6 sm:pb-0"
          onClick={() =>
            setShowCartModal(false)
          }
        >

          <div
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#FFFDF9] shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* =====================================
                GOLD TOP ACCENT
            ===================================== */}

            <div className="h-1.5 w-full bg-[#D4AF37]" />

            {/* =====================================
                CLOSE BUTTON
            ===================================== */}

            <button
              type="button"
              onClick={() =>
                setShowCartModal(false)
              }
              aria-label="Close"
              className="absolute right-4 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition hover:bg-gray-100 hover:text-gray-800"
            >
              <X size={18} />
            </button>

            {/* =====================================
                MODAL CONTENT
            ===================================== */}

            <div className="p-6 sm:p-7">

              {/* ===================================
                  SUCCESS HEADER
              =================================== */}

              <div className="flex items-center gap-3">

                {/* Success icon */}

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F5EBD7]">

                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7B1E3A] text-sm font-bold text-white">
                    ✓
                  </div>

                </div>

                {/* Heading */}

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[2px] text-[#B18A2B]">
                    Shopping Bag
                  </p>

                  <h2 className="mt-0.5 text-xl font-bold text-[#7B1E3A]">
                    Added to your bag
                  </h2>

                </div>

              </div>

              {/* ===================================
                  PRODUCT CARD
              =================================== */}

              <div className="mt-6 flex gap-4 rounded-2xl border border-[#EDE3D7] bg-white p-3">

                {/* Product image */}

                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F5EFE8]">

                  {product.images?.[0] ? (

                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />

                  ) : (

                    <div className="flex h-full items-center justify-center text-xs text-gray-400">
                      No Image
                    </div>

                  )}

                </div>

                {/* Product information */}

                <div className="flex min-w-0 flex-1 flex-col justify-center">

                  <p className="text-xs font-medium uppercase tracking-wider text-[#B18A2B]">
                    {product.category}
                  </p>

                  <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-gray-900">
                    {product.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-3">

                    <span className="text-sm font-bold text-[#7B1E3A]">
                      ₹
                      {(
                        product.price *
                        quantity
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    <span className="text-xs text-gray-500">
                      Qty: {quantity}
                    </span>

                  </div>

                </div>

              </div>

              {/* ===================================
                  MESSAGE
              =================================== */}

              <p className="mt-5 text-center text-sm leading-6 text-gray-500">
                Your beautiful saree has been
                added to your shopping bag.
              </p>

              {/* ===================================
                  ACTION BUTTONS
              =================================== */}

              <div className="mt-6 grid grid-cols-2 gap-3">

                {/* Continue Shopping */}

                <button
                  type="button"
                  onClick={() =>
                    setShowCartModal(false)
                  }
                  className="rounded-xl border border-[#7B1E3A] bg-white px-4 py-3.5 text-sm font-semibold text-[#7B1E3A] transition hover:bg-[#FFF5F7]"
                >
                  Continue Shopping
                </button>

                {/* Go to Cart */}

                <Link
                  href="/cart"
                  onClick={() =>
                    setShowCartModal(false)
                  }
                  className="flex items-center justify-center rounded-xl bg-[#7B1E3A] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#641730]"
                >
                  Go to Cart
                </Link>

              </div>

              {/* ===================================
                  TRUST INFORMATION
              =================================== */}

              <div className="mt-5 flex items-center justify-center gap-3 text-[11px] text-gray-400">

                <span>
                  ✓ Secure Checkout
                </span>

                <span>•</span>

                <span>
                  ✓ Easy Returns
                </span>

              </div>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}