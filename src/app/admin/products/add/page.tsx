"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  ImagePlus,
  Save,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { useProductStore } from "@/store/productStore";

export default function AddProductPage() {
  const router = useRouter();

  const addProduct = useProductStore(
    (state) => state.addProduct
  );

  /* =====================================================
     FORM STATE
  ===================================================== */

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("Banarasi");

  const [fabric, setFabric] =
    useState("Silk");

  const [occasion, setOccasion] =
    useState("Festive");

  const [color, setColor] =
    useState("Red");

  const [price, setPrice] =
    useState("");

  const [originalPrice, setOriginalPrice] =
    useState("");

  const [discount, setDiscount] =
    useState("");

  const [rating, setRating] =
    useState("0");

  const [reviews, setReviews] =
    useState("0");

  const [stock, setStock] =
    useState("");

  const [images, setImages] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

  const [bestseller, setBestseller] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =====================================================
     AUTO SLUG
  ===================================================== */

  const handleNameChange = (
    value: string
  ) => {
    setName(value);

    if (!slug) {
      setSlug(
        value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      );
    }
  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    /* ---------------------------------------------
       VALIDATION
    --------------------------------------------- */

    if (
      !name.trim() ||
      !sku.trim() ||
      !slug.trim() ||
      !description.trim() ||
      !price ||
      !originalPrice ||
      !stock
    ) {
      setError(
        "Please fill in all required fields."
      );

      return;
    }

    const parsedPrice =
      Number(price);

    const parsedOriginalPrice =
      Number(originalPrice);

    const parsedDiscount =
      Number(discount || 0);

    const parsedRating =
      Number(rating || 0);

    const parsedReviews =
      Number(reviews || 0);

    const parsedStock =
      Number(stock);

    if (
      Number.isNaN(parsedPrice) ||
      parsedPrice < 0
    ) {
      setError(
        "Please enter a valid price."
      );

      return;
    }

    if (
      Number.isNaN(parsedOriginalPrice) ||
      parsedOriginalPrice < 0
    ) {
      setError(
        "Please enter a valid original price."
      );

      return;
    }

    if (
      Number.isNaN(parsedStock) ||
      parsedStock < 0
    ) {
      setError(
        "Please enter a valid stock quantity."
      );

      return;
    }

    if (
      parsedRating < 0 ||
      parsedRating > 5
    ) {
      setError(
        "Rating must be between 0 and 5."
      );

      return;
    }

    /* ---------------------------------------------
       IMAGES
    --------------------------------------------- */

    const imageList = images
      .split(",")
      .map((image) => image.trim())
      .filter(Boolean);

    if (imageList.length === 0) {
      setError(
        "Please add at least one product image path."
      );

      return;
    }

    /* ---------------------------------------------
       GENERATE ID
    --------------------------------------------- */

    const existingProducts =
      useProductStore.getState().products;

    const nextId =
      existingProducts.length > 0
        ? Math.max(
            ...existingProducts.map(
              (product) => product.id
            )
          ) + 1
        : 1;

    /* ---------------------------------------------
       CREATE PRODUCT
    --------------------------------------------- */

    addProduct({
      id: nextId,

      sku: sku.trim(),

      slug: slug.trim(),

      name: name.trim(),

      description:
        description.trim(),

      category,

      fabric,

      occasion,

      color,

      price: parsedPrice,

      originalPrice:
        parsedOriginalPrice,

      discount:
        parsedDiscount,

      rating:
        parsedRating,

      reviews:
        parsedReviews,

      stock:
        parsedStock,

      featured,

      bestseller,

      images: imageList,
    });

    /* ---------------------------------------------
       GO BACK TO PRODUCTS
    --------------------------------------------- */

    router.push(
      "/admin/products"
    );
  };

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <main className="min-h-screen bg-[#FFF8F2]">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-6">

          <Link
            href="/admin/products"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#7B1E3A] hover:underline"
          >
            <ArrowLeft size={17} />

            Back to Products
          </Link>

          <p className="text-xs font-semibold uppercase tracking-[3px] text-[#D4AF37]">
            Varnika Sarees
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#7B1E3A]">
            Add New Product
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Add a new saree to your Varnika collection.
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

            <p className="mt-1 text-sm text-gray-500">
              Enter the basic details of the saree.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              {/* NAME */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Product Name *
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    handleNameChange(
                      event.target.value
                    )
                  }
                  placeholder="Example: Royal Banarasi Silk Saree"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A]"
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
                  placeholder="VRN-BAN-001"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A]"
                />

              </div>

              {/* SLUG */}

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
                  placeholder="royal-banarasi-silk-saree"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A]"
                />

              </div>

              {/* DESCRIPTION */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Description *
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  rows={5}
                  placeholder="Describe the saree, fabric, design and craftsmanship..."
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A]"
                />

              </div>

            </div>

          </div>

          {/* =================================================
              CATEGORY & DETAILS
          ================================================= */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-[#7B1E3A]">
              Product Details
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              {/* CATEGORY */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Category *
                </label>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#7B1E3A]"
                >
                  <option value="Kanchipuram">
                    Kanchipuram
                  </option>

                  <option value="Banarasi">
                    Banarasi
                  </option>

                  <option value="Bridal">
                    Bridal
                  </option>

                  <option value="Designer">
                    Designer
                  </option>

                  <option value="Cotton">
                    Cotton
                  </option>

                  <option value="Festive">
                    Festive
                  </option>
                </select>

              </div>

              {/* FABRIC */}

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
                  placeholder="Silk"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#7B1E3A]"
                />

              </div>

              {/* OCCASION */}

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
                  placeholder="Wedding"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#7B1E3A]"
                />

              </div>

              {/* COLOR */}

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
                  placeholder="Red"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#7B1E3A]"
                />

              </div>

            </div>

          </div>

          {/* =================================================
              PRICING
          ================================================= */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-[#7B1E3A]">
              Pricing & Inventory
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {/* PRICE */}

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
                  placeholder="4999"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#7B1E3A]"
                />

              </div>

              {/* ORIGINAL PRICE */}

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
                  placeholder="6999"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#7B1E3A]"
                />

              </div>

              {/* DISCOUNT */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Discount %
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
                  placeholder="20"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#7B1E3A]"
                />

              </div>

              {/* STOCK */}

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
                  placeholder="10"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#7B1E3A]"
                />

              </div>

              {/* RATING */}

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
                  placeholder="4.5"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#7B1E3A]"
                />

              </div>

              {/* REVIEWS */}

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
                  placeholder="0"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#7B1E3A]"
                />

              </div>

            </div>

          </div>

          {/* =================================================
              IMAGES
          ================================================= */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-[#FFF0F4] p-3">
                <ImagePlus
                  size={22}
                  className="text-[#7B1E3A]"
                />
              </div>

              <div>

                <h2 className="text-xl font-bold text-[#7B1E3A]">
                  Product Images
                </h2>

                <p className="text-sm text-gray-500">
                  Add image paths separated by commas.
                </p>

              </div>

            </div>

            <div className="mt-6">

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Image Paths *
              </label>

              <textarea
                value={images}
                onChange={(event) =>
                  setImages(
                    event.target.value
                  )
                }
                rows={4}
                placeholder="/images/products/banarasi/product1.jpg, /images/products/banarasi/product1-2.jpg"
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 font-mono text-sm outline-none focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A]"
              />

              <p className="mt-2 text-xs text-gray-500">
                Example: /images/products/banarasi/saree1.jpg
              </p>

            </div>

          </div>

          {/* =================================================
              LABELS
          ================================================= */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-[#7B1E3A]">
              Product Labels
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              {/* FEATURED */}

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

                  <p className="font-semibold">
                    Featured Product
                  </p>

                  <p className="text-sm text-gray-500">
                    Show this product in featured collections.
                  </p>

                </div>

              </label>

              {/* BESTSELLER */}

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

                  <p className="font-semibold">
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
              ERROR
          ================================================= */}

          {error && (

            <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
              {error}
            </div>

          )}

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              href="/admin/products"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-center font-semibold text-gray-700 transition hover:border-[#7B1E3A] hover:text-[#7B1E3A]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7B1E3A] px-6 py-3 font-semibold text-white transition hover:bg-[#641730]"
            >
              <Save size={18} />

              Save Product
            </button>

          </div>

        </form>

      </section>

    </main>
  );
}