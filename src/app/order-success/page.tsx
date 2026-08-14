import { Suspense } from "react";

import OrderSuccessContent from "@/components/order-success/OrderSuccessContent";

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#FFF8F2] px-6">
          <div className="text-center">

            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#7B1E3A]/20 border-t-[#7B1E3A]" />

            <p className="mt-4 text-sm text-gray-500">
              Loading order details...
            </p>

          </div>
        </main>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}