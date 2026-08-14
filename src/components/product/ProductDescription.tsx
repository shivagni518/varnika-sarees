import { Product } from "@/types/product";

type ProductDescriptionProps = {
  product: Product;
};

export default function ProductDescription({
  product,
}: ProductDescriptionProps) {
  return (
    <div className="mt-10">

      {/* Description */}

      <h2 className="mb-4 text-3xl font-bold text-[#7B1E3A]">
        Product Description
      </h2>

      <p className="leading-8 text-gray-600">
        {product.description}
      </p>

      {/* Highlights */}

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-md">

        <h3 className="mb-5 text-2xl font-semibold text-[#7B1E3A]">
          Highlights
        </h3>

        <ul className="space-y-3 text-gray-700">

          <li>✔ Premium Quality {product.fabric}</li>

          <li>✔ Suitable for {product.occasion}</li>

          <li>✔ Elegant {product.color} Color</li>

          <li>✔ Comfortable All-Day Wear</li>

          <li>✔ Perfect for Weddings & Festivals</li>

          <li>✔ Carefully Curated by Varnika Sarees</li>

        </ul>

      </div>

      {/* Shipping */}

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-md">

        <h3 className="mb-5 text-2xl font-semibold text-[#7B1E3A]">
          Shipping & Returns
        </h3>

        <ul className="space-y-3 text-gray-700">

          <li>🚚 Free Shipping Across India</li>

          <li>💳 Secure Online Payments</li>

          <li>↩ Easy 7-Day Returns</li>

          <li>📦 Premium Packaging</li>

        </ul>

      </div>

    </div>
  );
}