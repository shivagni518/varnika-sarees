import { Star } from "lucide-react";

import { Product } from "@/types/product";

type ProductInfoProps = {
  product: Product;
};

export default function ProductInfo({
  product,
}: ProductInfoProps) {
  return (
    <div>

      {/* Product Name */}

      <h1 className="text-5xl font-bold text-[#7B1E3A]">
        {product.name}
      </h1>

      {/* Rating */}

      <div className="mt-5 flex items-center gap-2">

        <Star
          size={20}
          fill="#FACC15"
          className="text-yellow-400"
        />

        <span className="font-semibold">
          {product.rating}
        </span>

        <span className="text-gray-500">
          ({product.reviews} Reviews)
        </span>

      </div>

      {/* Price */}

      <div className="mt-8 flex items-center gap-4">

        <span className="text-5xl font-bold text-[#7B1E3A]">
          ₹{product.price.toLocaleString("en-IN")}
        </span>

        <span className="text-2xl text-gray-400 line-through">
          ₹{product.originalPrice.toLocaleString("en-IN")}
        </span>

        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          {product.discount}% OFF
        </span>

      </div>

      {/* Product Details */}

      <div className="mt-10 rounded-2xl bg-white p-6 shadow-md">

        <div className="space-y-5">

          <div className="flex justify-between">

            <span className="font-semibold">
              Category
            </span>

            <span>{product.category}</span>

          </div>

          <div className="flex justify-between">

            <span className="font-semibold">
              Fabric
            </span>

            <span>{product.fabric}</span>

          </div>

          <div className="flex justify-between">

            <span className="font-semibold">
              Occasion
            </span>

            <span>{product.occasion}</span>

          </div>

          <div className="flex justify-between">

            <span className="font-semibold">
              Color
            </span>

            <span>{product.color}</span>

          </div>

          <div className="flex justify-between">

            <span className="font-semibold">
              Stock
            </span>

            <span className="font-medium text-green-600">
              {product.stock} Available
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}