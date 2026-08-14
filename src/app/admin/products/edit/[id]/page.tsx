"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Package,
  Save,
} from "lucide-react";

import { useProductStore } from "@/store/productStore";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const productId = Number(params.id);

  const product = useProductStore(
    (state) =>
      state.products.find(
        (item) => item.id === productId
      )
  );

  const updateProduct = useProductStore(
    (state) => state.updateProduct
  );

  /*
   * -------------------------------------------------------
   * FORM STATE
   * -------------------------------------------------------
   */

  const [name, setName] = useState(
    product?.name ?? ""
  );

  const [sku, setSku] = useState(
    product?.sku ?? ""
  );

  const [slug, setSlug] = useState(
    product?.slug ?? ""
  );

  const [description, setDescription] =
    useState(
      product?.description ?? ""
    );

  const [category, setCategory] =
    useState(
      product?.category ?? ""
    );

  const [fabric, setFabric] =
    useState(
      product?.fabric ?? ""
    );

  const [occasion, setOccasion] =
    useState(
      product?.occasion ?? ""
    );

  const [color, setColor] =
    useState(
      product?.color ?? ""
    );

  const [price, setPrice] =
    useState(
      product
        ? String(product.price)
        : ""
    );

  const [originalPrice, setOriginalPrice] =
    useState(
      product
        ? String(product.originalPrice)
        : ""
    );

  const [discount, setDiscount] =
    useState(
      product
        ? String(product.discount)
        : ""
    );

  const [rating, setRating] =
    useState(
      product
        ? String(product.rating)
        : ""
    );

  const [reviews, setReviews] =
    useState(
      product
        ? String(product.reviews)
        : ""
    );

  const [stock, setStock] =
    useState(
      product
        ? String(product.stock)
        : ""
    );

  const [featured, setFeatured] =
    useState(
      product?.featured ?? false
    );

  const [bestseller, setBestseller] =
    useState(
      product?.bestseller ?? false
    );

  const [images, setImages] =
    useState(
      product
        ? product.images.join("\n")
        : ""
    );

  const [error, setError] =
    useState("");

  /*
   * -------------------------------------------------------
   * PRODUCT NOT FOUND
   * -------------------------------------------------------
   */

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFF8F2] px-6">

        <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-lg">

          <Package
            size={48}
            className="mx-auto text-gray-300"
          />

          <h1 className="mt-5 text-2xl font-bold text-[#7B1E3A]">
            Product Not Found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            The product you are trying to edit
            could not be found.
          </p>

          <Link
            href="/admin/products"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#7B1E3A] px-6 py-3 font-semibold text-white transition hover:bg-[#641730]"
          >
            <ArrowLeft size={18} />
            Back to Products
          </Link>

        </div>

      </main>
    );
  }

  /*
   * -------------------------------------------------------
   * SAVE PRODUCT
   * -------------------------------------------------------
   */

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    /*
     * Required fields
     */

    if (
      !name.trim() ||
      !sku.trim() ||
      !slug.trim() ||
      !description.trim() ||
      !category.trim() ||
      !fabric.trim() ||
      !occasion.trim() ||
      !color.trim()
    ) {
      setError(
        "Please fill in all required product details."
      );

      return;
    }

    /*
     * Convert numbers
     */

    const priceNumber =
      Number(price);

    const originalPriceNumber =
      Number(originalPrice);

    const discountNumber =
      Number(discount);

    const ratingNumber =
      Number(rating);

    const reviewsNumber =
      Number(reviews);

    const stockNumber =
      Number(stock);

    /*
     * Validate price
     */

    if (
      !Number.isFinite(priceNumber) ||
      priceNumber < 0
    ) {
      setError(
        "Please enter a valid selling price."
      );

      return;
    }

    /*
     * Validate original price
     */

    if (
      !Number.isFinite(
        originalPriceNumber
      ) ||
      originalPriceNumber < 0
    ) {
      setError(
        "Please enter a valid original price."
      );

      return;
    }

    /*
     * Validate discount
     */

    if (
      !Number.isFinite(discountNumber) ||
      discountNumber < 0 ||
      discountNumber > 100
    ) {
      setError(
        "Discount must be between 0 and 100."
      );

      return;
    }

    /*
     * Validate rating
     */

    if (
      !Number.isFinite(ratingNumber) ||
      ratingNumber < 0 ||
      ratingNumber > 5
    ) {
      setError(
        "Rating must be between 0 and 5."
      );

      return;
    }

    /*
     * Validate reviews
     */

    if (
      !Number.isFinite(reviewsNumber) ||
      reviewsNumber < 0
    ) {
      setError(
        "Reviews cannot be negative."
      );

      return;
    }

    /*
     * Validate stock
     */

    if (
      !Number.isFinite(stockNumber) ||
      stockNumber < 0
    ) {
      setError(
        "Stock cannot be negative."
      );

      return;
    }

    /*
     * Convert image text into array
     */

    const imageArray = images
      .split("\n")
      .map((image: string) => image.trim())
      .filter(Boolean);

    /*
     * Update product
     */

    updateProduct(product.id, {
      name: name.trim(),
      sku: sku.trim(),
      slug: slug.trim(),
      description:
        description.trim(),

      category:
        category.trim(),

      fabric:
        fabric.trim(),

      occasion:
        occasion.trim(),

      color:
        color.trim(),

      price:
        priceNumber,

      originalPrice:
        originalPriceNumber,

      discount:
        discountNumber,

      rating:
        ratingNumber,

      reviews:
        reviewsNumber,

      stock:
        stockNumber,

      featured,

      bestseller,

      images:
        imageArray,
    });

    /*
     * Return to products
     */

    router.push(
      "/admin/products"
    );
  };

  /*
   * -------------------------------------------------------
   * PAGE
   * -------------------------------------------------------
   */

  return (
    <main className="min-h-screen bg-[#FFF8F2]">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-6">

          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#7B1E3A] hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[3px] text-[#D4AF37]">
            Varnika Sarees
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#7B1E3A]">
            Edit Product
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Update the details of your saree product.
          </p>

        </div>

      </header>

      {/* =================================================
          FORM
      ================================================= */}

      <section className="mx-auto max-w-5xl px-6 py-10">

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* =================================================
              BASIC INFORMATION
          ================================================= */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-[#7B1E3A]">
              Basic Information
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              {/* Product Name */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Product Name *
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A]"
                />

              </div>

              {/* SKU */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  SKU *
                </label>

                <input
                  type="text"
                  value={sku}
                  onChange={(event) =>
                    setSku(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#7B1E3A]"
                />

              </div>

              {/* Slug */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Slug *
                </label>

                <input
                  type="text"
                  value={slug}
                  onChange={(event) =>
                    setSlug(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#7B1E3A]"
                />

              </div>

              {/* Description */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Description *
                </label>

                <textarea
                  rows={5}
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  className="w-full resize-none rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#7B1E3A]"
                />

              </div>

            </div>

          </div>

          {/* =================================================
              PRODUCT DETAILS
          ================================================= */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-[#7B1E3A]">
              Product Details
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              {/* Category */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Category *
                </label>

                <input
                  type="text"
                  value={category}
                  onChange={(event) =>
                    setCategory(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#7B1E3A]"
                />

              </div>

              {/* Fabric */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Fabric *
                </label>

                <input
                  type="text"
                  value={fabric}
                  onChange={(event) =>
                    setFabric(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#7B1E3A]"
                />

              </div>

              {/* Occasion */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Occasion *
                </label>

                <input
                  type="text"
                  value={occasion}
                  onChange={(event) =>
                    setOccasion(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#7B1E3A]"
                />

              </div>

              {/* Color */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Color *
                </label>

                <input
                  type="text"
                  value={color}
                  onChange={(event) =>
                    setColor(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#7B1E3A]"
                />

              </div>

            </div>

          </div>

          {/* =================================================
              PRICE & INVENTORY
          ================================================= */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-[#7B1E3A]">
              Price & Inventory
            </h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {/* Price */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Selling Price *
                </label>

                <input
                  type="number"
                  min="0"
                  value={price}
                  onChange={(event) =>
                    setPrice(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#7B1E3A]"
                />

              </div>

              {/* Original Price */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Original Price *
                </label>

                <input
                  type="number"
                  min="0"
                  value={originalPrice}
                  onChange={(event) =>
                    setOriginalPrice(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#7B1E3A]"
                />

              </div>

              {/* Discount */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Discount (%)
                </label>

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(event) =>
                    setDiscount(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#7B1E3A]"
                />

              </div>

              {/* Stock */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Stock *
                </label>

                <input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(event) =>
                    setStock(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#7B1E3A]"
                />

              </div>

              {/* Rating */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Rating
                </label>

                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={rating}
                  onChange={(event) =>
                    setRating(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#7B1E3A]"
                />

              </div>

              {/* Reviews */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Reviews
                </label>

                <input
                  type="number"
                  min="0"
                  value={reviews}
                  onChange={(event) =>
                    setReviews(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#7B1E3A]"
                />

              </div>

            </div>

          </div>

          {/* =================================================
              STATUS
          ================================================= */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-[#7B1E3A]">
              Product Status
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              {/* Featured */}

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-[#7B1E3A]">

                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(event) =>
                    setFeatured(
                      event.target.checked
                    )
                  }
                  className="h-5 w-5 accent-[#7B1E3A]"
                />

                <div>

                  <p className="font-semibold text-gray-800">
                    Featured Product
                  </p>

                  <p className="text-sm text-gray-500">
                    Show this product in featured collections.
                  </p>

                </div>

              </label>

              {/* Bestseller */}

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-[#7B1E3A]">

                <input
                  type="checkbox"
                  checked={bestseller}
                  onChange={(event) =>
                    setBestseller(
                      event.target.checked
                    )
                  }
                  className="h-5 w-5 accent-[#7B1E3A]"
                />

                <div>

                  <p className="font-semibold text-gray-800">
                    Bestseller
                  </p>

                  <p className="text-sm text-gray-500">
                    Mark this product as a bestseller.
                  </p>

                </div>

              </label>

            </div>

          </div>

          {/* =================================================
              IMAGES
          ================================================= */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-[#7B1E3A]">
              Product Images
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Enter one image path or URL per line.
            </p>

            <textarea
              rows={5}
              value={images}
              onChange={(event) =>
                setImages(
                  event.target.value
                )
              }
              placeholder="/images/products/saree.jpg"
              className="mt-5 w-full resize-none rounded-xl border border-gray-300 p-3 font-mono text-sm outline-none transition focus:border-[#7B1E3A]"
            />

          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              {error}
            </div>

          )}

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              href="/admin/products"
              className="rounded-xl border border-gray-300 px-6 py-3 text-center font-semibold text-gray-600 transition hover:border-[#7B1E3A] hover:text-[#7B1E3A]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7B1E3A] px-7 py-3 font-semibold text-white transition hover:bg-[#641730]"
            >
              <Save size={18} />
              Save Changes
            </button>

          </div>

        </form>

      </section>

    </main>
  );
}