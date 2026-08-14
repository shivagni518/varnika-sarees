import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({
  products,
}: ProductGridProps) {
  return (
    <section>

      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">

        <div>
          <h2 className="text-3xl font-bold text-[#7B1E3A]">
            Featured Collection
          </h2>

          <p className="mt-2 text-gray-500">
            Discover our handcrafted premium sarees.
          </p>
        </div>

        <div className="rounded-full bg-[#7B1E3A]/10 px-5 py-2 text-sm font-medium text-[#7B1E3A]">
          {products.length} Products
        </div>

      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
}