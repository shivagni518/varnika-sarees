"use client";

import dynamic from "next/dynamic";

const CheckoutContent = dynamic(
  () => import("@/components/checkout/CheckoutContent"),
  {
    ssr: false,
  }
);

export default function CheckoutPage() {
  return <CheckoutContent />;
}