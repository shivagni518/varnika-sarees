import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-16 shadow-lg">

      <div className="mb-6 rounded-full bg-[#FFF4F6] p-8">
        <ShoppingBag
          size={70}
          className="text-[#7B1E3A]"
        />
      </div>

      <h2 className="mb-3 text-3xl font-bold text-[#7B1E3A]">
        Your cart is empty
      </h2>

      <p className="mb-8 max-w-md text-center text-gray-500">
        Looks like you havent added any beautiful sarees yet.
        Explore our premium collection and find your perfect match.
      </p>

      <Link
        href="/shop"
        className="rounded-xl bg-[#7B1E3A] px-8 py-4 font-semibold text-white transition hover:bg-[#641730]"
      >
        Continue Shopping
      </Link>

    </div>
  );
}