"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
} from "lucide-react";

import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export default function ProductDetailsPage() {
  const params = useParams();

  const slug = String(params.slug);

  /* =====================================================
     PRODUCT STORE
  ===================================================== */

  const products = useProductStore(
    (state) => state.products
  );

  /* =====================================================
     CART STORE
  ===================================================== */

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  /* =====================================================
     WISHLIST STORE
  ===================================================== */

  const toggleWishlist = useWishlistStore(
    (state) => state.toggleWishlist
  );

  const isWishlisted = useWishlistStore(
    (state) => {
      const currentProduct =
        products.find(
          (item) => item.slug === slug
        );

      return currentProduct
        ? state.isWishlisted(
            currentProduct.id
          )
        : false;
    }
  );

  /* =====================================================
     STATE
  ===================================================== */

  const [selectedImage, setSelectedImage] =
    useState(0);

  const [quantity, setQuantity] =
    useState(1);

  const [addedToCart, setAddedToCart] =
    useState(false);

  /* =====================================================
     FIND PRODUCT
  ===================================================== */

  const product = products.find(
    (item) => item.slug === slug
  );

  /* =====================================================
     PRODUCT NOT FOUND
  ===================================================== */

  if (!product) {
    return (
      <main className="min-h-screen bg-[#FFF8F2] px-6 py-32">

        <div className="mx-auto max-w-2xl text-center">

          <h1 className="text-4xl font-bold text-[#7B1E3A]">
            Product Not Found
          </h1>

          <p className="mt-4 text-gray-500">
            Sorry, we couldnt find the saree you are looking for.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#7B1E3A] px-6 py-3 font-semibold text-white transition hover:bg-[#641730]"
          >
            <ArrowLeft size={18} />
            Back to Shop
          </Link>

        </div>

      </main>
    );
  }

  /* =====================================================
     ADD TO CART
  ===================================================== */

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      return;
    }

    addToCart(
      product,
      quantity
    );

    setAddedToCart(true);
  };

  /* =====================================================
     QUANTITY
  ===================================================== */

  const increaseQuantity = () => {
    if (
      quantity < product.stock
    ) {
      setQuantity(
        (current) => current + 1
      );
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(
        (current) => current - 1
      );
    }
  };

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <main className="min-h-screen bg-[#FFF8F2]">

      {/* =================================================
          PRODUCT SECTION
      ================================================= */}

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-32">

        {/* BACK TO SHOP */}

        <Link
          href="/shop"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#7B1E3A] hover:underline"
        >
          <ArrowLeft size={17} />
          Back to Shop
        </Link>

        {/* =================================================
            PRODUCT LAYOUT
        ================================================= */}

        <div className="grid gap-12 lg:grid-cols-2">

          {/* =================================================
              IMAGES
          ================================================= */}

          <div>

            {/* MAIN IMAGE */}

            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-md">

              {/* DISCOUNT */}

              {product.discount > 0 && (
                <span className="absolute left-4 top-4 z-20 rounded-full bg-[#7B1E3A] px-4 py-2 text-sm font-semibold text-white">
                  {product.discount}% OFF
                </span>
              )}

              {/* WISHLIST */}

              <button
                type="button"
                onClick={() =>
                  toggleWishlist(product)
                }
                aria-label="Add to wishlist"
                className="absolute right-4 top-4 z-20 rounded-full bg-white p-3 shadow-md transition hover:bg-red-50"
              >

                <Heart
                  size={22}
                  className={
                    isWishlisted
                      ? "fill-red-500 text-red-500"
                      : "text-[#7B1E3A]"
                  }
                />

              </button>

              {/* IMAGE */}

              <Image
                src={
                  product.images[
                    selectedImage
                  ] ||
                  product.images[0]
                }
                alt={product.name}
                fill
                priority
                className="object-cover"
              />

            </div>

            {/* =================================================
                THUMBNAILS
            ================================================= */}

            {product.images.length > 1 && (

              <div className="mt-4 grid grid-cols-4 gap-3">

                {product.images.map(
                  (image: string, index: number) => (

                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() =>
                        setSelectedImage(index)
                      }
                      className={`relative aspect-square overflow-hidden rounded-xl border-2 ${
                        selectedImage === index
                          ? "border-[#7B1E3A]"
                          : "border-transparent"
                      }`}
                    >

                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />

                    </button>

                  )
                )}

              </div>

            )}

          </div>

          {/* =================================================
              PRODUCT INFORMATION
          ================================================= */}

          <div className="flex flex-col justify-center">

            {/* CATEGORY */}

            <p className="text-sm font-semibold uppercase tracking-[2px] text-[#D4AF37]">
              {product.category}
            </p>

            {/* NAME */}

            <h1 className="mt-3 text-4xl font-bold text-[#7B1E3A]">
              {product.name}
            </h1>

            {/* SKU */}

            <p className="mt-2 text-sm text-gray-500">
              SKU: {product.sku}
            </p>

            {/* RATING */}

            <div className="mt-5 flex items-center gap-2">

              <div className="flex items-center gap-1">

                <Star
                  size={18}
                  fill="#FACC15"
                  className="text-yellow-400"
                />

                <span className="font-semibold">
                  {product.rating}
                </span>

              </div>

              <span className="text-gray-400">
                ({product.reviews} reviews)
              </span>

            </div>

            {/* PRICE */}

            <div className="mt-6 flex items-center gap-4">

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

            </div>

            {/* DESCRIPTION */}

            <p className="mt-6 leading-7 text-gray-600">
              {product.description}
            </p>

            {/* =================================================
                PRODUCT DETAILS
            ================================================= */}

            <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl bg-white p-5 shadow-sm">

              <div>

                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Fabric
                </p>

                <p className="mt-1 font-semibold text-gray-800">
                  {product.fabric}
                </p>

              </div>

              <div>

                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Color
                </p>

                <p className="mt-1 font-semibold text-gray-800">
                  {product.color}
                </p>

              </div>

              <div>

                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Occasion
                </p>

                <p className="mt-1 font-semibold text-gray-800">
                  {product.occasion}
                </p>

              </div>

              <div>

                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Stock
                </p>

                <p
                  className={`mt-1 font-semibold ${
                    product.stock > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} Available`
                    : "Out of Stock"}
                </p>

              </div>

            </div>

            {/* =================================================
                QUANTITY
            ================================================= */}

            {product.stock > 0 && (

              <div className="mt-8">

                <p className="mb-3 text-sm font-semibold">
                  Quantity
                </p>

                <div className="flex w-fit items-center overflow-hidden rounded-xl border border-gray-300">

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="px-5 py-3 text-lg hover:bg-gray-100"
                  >
                    −
                  </button>

                  <span className="min-w-12 text-center font-semibold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="px-5 py-3 text-lg hover:bg-gray-100"
                  >
                    +
                  </button>

                </div>

              </div>

            )}

            {/* =================================================
                ACTION BUTTONS
            ================================================= */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              {/* ADD TO CART */}

              <button
                type="button"
                disabled={
                  product.stock === 0
                }
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#7B1E3A] px-6 py-4 font-semibold text-white transition hover:bg-[#641730] disabled:cursor-not-allowed disabled:bg-gray-400"
              >

                <ShoppingBag size={19} />

                {product.stock === 0
                  ? "Out of Stock"
                  : addedToCart
                  ? "Added to Cart ✓"
                  : "Add to Cart"}

              </button>

              {/* WISHLIST */}

              <button
                type="button"
                onClick={() =>
                  toggleWishlist(product)
                }
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#7B1E3A] px-6 py-4 font-semibold text-[#7B1E3A] transition hover:bg-[#FFF0F4]"
              >

                <Heart
                  size={19}
                  className={
                    isWishlisted
                      ? "fill-red-500 text-red-500"
                      : ""
                  }
                />

                Wishlist

              </button>

            </div>

            {/* =================================================
                ADDED TO CART OPTIONS
            ================================================= */}

            {addedToCart && (

              <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-5">

                {/* SUCCESS */}

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 font-bold text-white">
                    ✓
                  </div>

                  <div>

                    <p className="font-semibold text-green-800">
                      Added to Cart
                    </p>

                    <p className="text-sm text-green-700">
                      {quantity} item
                      {quantity > 1
                        ? "s"
                        : ""}{" "}
                      added successfully.
                    </p>

                  </div>

                </div>

                {/* OPTIONS */}

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">

                  <Link
                    href="/cart"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#7B1E3A] px-5 py-3 font-semibold text-white transition hover:bg-[#641730]"
                  >
                    <ShoppingBag size={17} />
                    Go to Cart
                  </Link>

                  <Link
                    href="/shop"
                    className="flex flex-1 items-center justify-center rounded-xl border-2 border-[#7B1E3A] bg-white px-5 py-3 font-semibold text-[#7B1E3A] transition hover:bg-[#FFF0F4]"
                  >
                    Continue Shopping
                  </Link>

                </div>

              </div>

            )}

            {/* =================================================
                BENEFITS
            ================================================= */}

            <div className="mt-8 grid gap-4 sm:grid-cols-3">

              <div className="flex items-center gap-3">

                <Truck
                  size={22}
                  className="text-[#7B1E3A]"
                />

                <div>

                  <p className="text-sm font-semibold">
                    Free Shipping
                  </p>

                  <p className="text-xs text-gray-500">
                    On all orders
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <ShieldCheck
                  size={22}
                  className="text-[#7B1E3A]"
                />

                <div>

                  <p className="text-sm font-semibold">
                    Secure Payment
                  </p>

                  <p className="text-xs text-gray-500">
                    100% secure
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Heart
                  size={22}
                  className="text-[#7B1E3A]"
                />

                <div>

                  <p className="text-sm font-semibold">
                    Premium Quality
                  </p>

                  <p className="text-xs text-gray-500">
                    Handpicked sarees
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}