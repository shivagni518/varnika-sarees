"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  Check,
  ShieldCheck,
  Truck,
  Wallet,
  Smartphone,
  CreditCard,
  Building2,
  LockKeyhole,
} from "lucide-react";

import CheckoutHeader from "./CheckoutHeader";
import CheckoutForm from "./CheckoutForm";

import { useCartStore } from "@/store/cartStore";

import {
  useOrderStore,
  CustomerDetails,
} from "@/store/orderStore";

/* =========================================================
   PAYMENT METHOD
========================================================= */

type PaymentMethod =
  | "cod"
  | "upi"
  | "card"
  | "netbanking";

/* =========================================================
   PAYMENT OPTIONS
========================================================= */

const paymentMethods = [
  {
    id: "cod" as PaymentMethod,
    title: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: Wallet,
    available: true,
  },
  {
    id: "upi" as PaymentMethod,
    title: "UPI",
    description: "Google Pay, PhonePe, Paytm and more",
    icon: Smartphone,
    available: false,
  },
  {
    id: "card" as PaymentMethod,
    title: "Credit / Debit Card",
    description: "Visa, Mastercard and other cards",
    icon: CreditCard,
    available: false,
  },
  {
    id: "netbanking" as PaymentMethod,
    title: "Net Banking",
    description: "Pay securely through your bank",
    icon: Building2,
    available: false,
  },
];

/* =========================================================
   CHECKOUT CONTENT
========================================================= */

export default function CheckoutContent() {
  const router = useRouter();

  /* =======================================================
     CART
  ======================================================= */

  const cart = useCartStore(
    (state) => state.cart
  );

  const totalItems = useCartStore(
    (state) => state.totalItems()
  );

  const totalPrice = useCartStore(
    (state) => state.totalPrice()
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  /* =======================================================
     ORDER
  ======================================================= */

  const createOrder = useOrderStore(
    (state) => state.createOrder
  );

  /* =======================================================
     CUSTOMER
  ======================================================= */

  const [customer, setCustomer] =
    useState<CustomerDetails>({
      fullName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
    });

  /* =======================================================
     PAYMENT
  ======================================================= */

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cod");

  /* =======================================================
     ERROR
  ======================================================= */

  const [error, setError] =
    useState("");

  /* =======================================================
     CUSTOMER CHANGE
  ======================================================= */

  const handleCustomerChange = (
    field: keyof CustomerDetails,
    value: string
  ) => {
    setCustomer((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  /* =======================================================
     PAYMENT CHANGE
  ======================================================= */

  const handlePaymentChange = (
    method: PaymentMethod
  ) => {
    setPaymentMethod(method);
    setError("");
  };

  /* =======================================================
     PLACE ORDER
  ======================================================= */

  const handlePlaceOrder = (
    submittedCustomer: CustomerDetails
  ) => {
    setError("");

    /* =====================================================
       EMPTY CART
    ===================================================== */

    if (cart.length === 0) {
      setError(
        "Your cart is empty."
      );

      return;
    }

    /* =====================================================
       REQUIRED FIELDS
    ===================================================== */

    if (
      !submittedCustomer.fullName ||
      !submittedCustomer.phone ||
      !submittedCustomer.email ||
      !submittedCustomer.address ||
      !submittedCustomer.city ||
      !submittedCustomer.state ||
      !submittedCustomer.pinCode
    ) {
      setError(
        "Please fill in all shipping details."
      );

      return;
    }

    /* =====================================================
       PHONE VALIDATION
    ===================================================== */

    if (
      !/^[0-9]{10}$/.test(
        submittedCustomer.phone
      )
    ) {
      setError(
        "Please enter a valid 10-digit phone number."
      );

      return;
    }

    /* =====================================================
       PIN CODE VALIDATION
    ===================================================== */

    if (
      !/^[0-9]{6}$/.test(
        submittedCustomer.pinCode
      )
    ) {
      setError(
        "Please enter a valid 6-digit PIN code."
      );

      return;
    }

    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        submittedCustomer.email
      )
    ) {
      setError(
        "Please enter a valid email address."
      );

      return;
    }

    /* =====================================================
       PAYMENT VALIDATION
    ===================================================== */

    if (paymentMethod !== "cod") {
      setError(
        "Online payment is not available yet. Please select Cash on Delivery."
      );

      return;
    }

    /* =====================================================
       SYNC CUSTOMER STATE
    ===================================================== */

    setCustomer(
      submittedCustomer
    );

    /* =====================================================
       CREATE ORDER
    ===================================================== */

    const order = createOrder(
      cart,
      submittedCustomer,
      totalPrice
    );

    /* =====================================================
       CLEAR CART
    ===================================================== */

    clearCart();

    /* =====================================================
       SUCCESS PAGE
    ===================================================== */

    router.push(
      `/order-success?orderId=${order.id}`
    );
  };

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#FFF8F2]">

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:py-32">

        {/* =================================================
            HEADER
        ================================================= */}

        <CheckoutHeader />

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="mt-8 grid gap-6 lg:grid-cols-3 lg:gap-10">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="min-w-0 lg:col-span-2">

            {/* =================================================
                SHIPPING ADDRESS
            ================================================= */}

            <div className="rounded-3xl border border-[#EDE3D7] bg-white shadow-sm">

              {/* GOLD ACCENT */}

              <div className="h-1.5 rounded-t-3xl bg-[#D4AF37]" />

              <div className="p-5 sm:p-7 lg:p-8">

                {/* TITLE */}

                <div className="mb-7">

                  <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#B18A2B]">
                    Delivery Details
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-[#7B1E3A]">
                    Shipping Address
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Enter your details to receive
                    your beautiful saree.
                  </p>

                </div>

                {/* FORM */}

                <CheckoutForm
                  value={customer}
                  onChange={
                    handleCustomerChange
                  }
                  onSubmit={
                    handlePlaceOrder
                  }
                />

              </div>

            </div>

            {/* =================================================
                PAYMENT METHOD
            ================================================= */}

            <div className="mt-6 overflow-hidden rounded-3xl border border-[#EDE3D7] bg-white shadow-sm">

              {/* GOLD ACCENT */}

              <div className="h-1.5 bg-[#D4AF37]" />

              <div className="p-5 sm:p-7 lg:p-8">

                {/* PAYMENT HEADER */}

                <div className="mb-6">

                  <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#B18A2B]">
                    Secure Payment
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-[#7B1E3A]">
                    Payment Method
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Choose how you would like to
                    pay for your order.
                  </p>

                </div>

                {/* PAYMENT OPTIONS */}

                <div className="space-y-3">

                  {paymentMethods.map(
                    (method) => {

                      const Icon =
                        method.icon;

                      const selected =
                        paymentMethod ===
                        method.id;

                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() =>
                            handlePaymentChange(
                              method.id
                            )
                          }
                          className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                            selected
                              ? "border-[#7B1E3A] bg-[#FFF8F2] shadow-sm"
                              : "border-gray-200 bg-white hover:border-[#B18A2B]"
                          }`}
                        >

                          {/* RADIO */}

                          <div
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                              selected
                                ? "border-[#7B1E3A]"
                                : "border-gray-300"
                            }`}
                          >

                            {selected && (
                              <div className="h-2.5 w-2.5 rounded-full bg-[#7B1E3A]" />
                            )}

                          </div>

                          {/* ICON */}

                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                              selected
                                ? "bg-[#FFF0F4]"
                                : "bg-gray-50"
                            }`}
                          >

                            <Icon
                              size={21}
                              className={
                                selected
                                  ? "text-[#7B1E3A]"
                                  : "text-gray-500"
                              }
                            />

                          </div>

                          {/* TEXT */}

                          <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-center gap-2">

                              <p
                                className={`font-semibold ${
                                  selected
                                    ? "text-[#7B1E3A]"
                                    : "text-gray-800"
                                }`}
                              >
                                {method.title}
                              </p>

                              {!method.available && (
                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-gray-500">
                                  Coming Soon
                                </span>
                              )}

                              {method.available && (
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-green-700">
                                  Available
                                </span>
                              )}

                            </div>

                            <p className="mt-1 text-xs text-gray-500">
                              {method.description}
                            </p>

                          </div>

                        </button>
                      );
                    }
                  )}

                </div>

                {/* COD INFORMATION */}

                {paymentMethod === "cod" && (
                  <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-4">

                    <div className="flex gap-3">

                      <Check
                        size={18}
                        className="mt-0.5 shrink-0 text-green-600"
                      />

                      <div>

                        <p className="text-sm font-semibold text-green-700">
                          Cash on Delivery selected
                        </p>

                        <p className="mt-1 text-xs leading-5 text-green-600">
                          You can pay when your
                          order is delivered to your
                          address.
                        </p>

                      </div>

                    </div>

                  </div>
                )}

                {/* ONLINE PAYMENT INFORMATION */}

                {paymentMethod !== "cod" && (
                  <div className="mt-5 rounded-2xl border border-[#EDE3D7] bg-[#FFFCF8] p-4">

                    <div className="flex gap-3">

                      <LockKeyhole
                        size={18}
                        className="mt-0.5 shrink-0 text-[#7B1E3A]"
                      />

                      <div>

                        <p className="text-sm font-semibold text-[#7B1E3A]">
                          Online payment coming soon
                        </p>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          UPI, cards and net banking
                          will be available once
                          online payment processing is
                          connected.
                        </p>

                      </div>

                    </div>

                  </div>
                )}

                {/* PAYMENT SECURITY */}

                <div className="mt-6 flex items-center gap-3 border-t border-[#EDE3D7] pt-5">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF0F4]">

                    <ShieldCheck
                      size={18}
                      className="text-[#7B1E3A]"
                    />

                  </div>

                  <div>

                    <p className="text-xs font-semibold text-gray-700">
                      Secure Payment
                    </p>

                    <p className="text-[10px] text-gray-400">
                      Your payment information is
                      protected.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                TRUST INFORMATION
            ================================================= */}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">

              {/* SECURE */}

              <div className="flex items-center gap-3 rounded-2xl border border-[#EDE3D7] bg-white p-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF0F4]">

                  <ShieldCheck
                    size={18}
                    className="text-[#7B1E3A]"
                  />

                </div>

                <div>

                  <p className="text-xs font-semibold text-gray-700">
                    Secure Information
                  </p>

                  <p className="text-[10px] text-gray-400">
                    Your details are protected
                  </p>

                </div>

              </div>

              {/* DELIVERY */}

              <div className="flex items-center gap-3 rounded-2xl border border-[#EDE3D7] bg-white p-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF8E7]">

                  <Truck
                    size={18}
                    className="text-[#B18A2B]"
                  />

                </div>

                <div>

                  <p className="text-xs font-semibold text-gray-700">
                    Free Delivery
                  </p>

                  <p className="text-[10px] text-gray-400">
                    Shipping included
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

          </div>

          {/* =================================================
              RIGHT SIDE - ORDER SUMMARY
          ================================================= */}

          <div className="h-fit min-w-0 lg:sticky lg:top-24">

            <div className="overflow-hidden rounded-3xl border border-[#EDE3D7] bg-white shadow-sm">

              {/* GOLD ACCENT */}

              <div className="h-1.5 bg-[#D4AF37]" />

              <div className="p-5 sm:p-6">

                {/* SUMMARY HEADER */}

                <div className="mb-6">

                  <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#B18A2B]">
                    Your Order
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-[#7B1E3A]">
                    Order Summary
                  </h2>

                </div>

                {/* CART ITEMS */}

                <div className="max-h-80 space-y-3 overflow-y-auto pr-1">

                  {cart.length === 0 ? (

                    <p className="py-5 text-center text-sm text-gray-500">
                      Your cart is empty.
                    </p>

                  ) : (

                    cart.map((item) => (

                      <div
                        key={item.product.id}
                        className="flex gap-3 rounded-xl border border-[#EDE3D7] bg-[#FFFCF8] p-3"
                      >

                        {/* IMAGE */}

                        <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-[#F5EFE8]">

                          {item.product.images?.[0] ? (

                            <Image
                              src={
                                item.product
                                  .images[0]
                              }
                              alt={
                                item.product
                                  .name
                              }
                              fill
                              sizes="48px"
                              className="object-cover"
                            />

                          ) : (

                            <div className="flex h-full items-center justify-center text-[9px] text-gray-400">
                              No Image
                            </div>

                          )}

                        </div>

                        {/* INFO */}

                        <div className="min-w-0 flex-1">

                          <h4 className="line-clamp-2 text-sm font-semibold text-gray-800">
                            {item.product.name}
                          </h4>

                          <p className="mt-1 text-xs text-gray-500">
                            Qty:{" "}
                            {item.quantity}
                          </p>

                        </div>

                        {/* PRICE */}

                        <span className="shrink-0 self-center text-sm font-bold text-[#7B1E3A]">
                          ₹
                          {(
                            item.product.price *
                            item.quantity
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </span>

                      </div>

                    ))

                  )}

                </div>

                {/* DIVIDER */}

                <div className="my-6 border-t border-[#EDE3D7]" />

                {/* PRICE DETAILS */}

                <div className="space-y-4">

                  {/* ITEMS */}

                  <div className="flex justify-between text-sm">

                    <span className="text-gray-500">
                      Items
                    </span>

                    <span className="font-semibold text-gray-800">
                      {totalItems}
                    </span>

                  </div>

                  {/* SUBTOTAL */}

                  <div className="flex justify-between text-sm">

                    <span className="text-gray-500">
                      Subtotal
                    </span>

                    <span className="font-semibold text-gray-800">
                      ₹
                      {totalPrice.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>

                  {/* SHIPPING */}

                  <div className="flex justify-between text-sm">

                    <span className="flex items-center gap-2 text-gray-500">
                      <Truck size={15} />
                      Shipping
                    </span>

                    <span className="font-semibold text-green-600">
                      FREE
                    </span>

                  </div>

                  {/* PAYMENT */}

                  <div className="flex justify-between text-sm">

                    <span className="text-gray-500">
                      Payment
                    </span>

                    <span className="font-semibold text-[#7B1E3A]">
                      {
                        paymentMethods.find(
                          (method) =>
                            method.id ===
                            paymentMethod
                        )?.title
                      }
                    </span>

                  </div>

                  {/* DIVIDER */}

                  <div className="border-t border-[#EDE3D7]" />

                  {/* TOTAL */}

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm text-gray-500">
                        Total
                      </p>

                      <p className="mt-1 text-2xl font-bold text-[#7B1E3A]">
                        ₹
                        {totalPrice.toLocaleString(
                          "en-IN"
                        )}
                      </p>

                    </div>

                    <div className="rounded-full bg-[#FFF0F4] px-3 py-1 text-xs font-semibold text-[#7B1E3A]">

                      {totalItems}{" "}

                      {totalItems === 1
                        ? "Item"
                        : "Items"}

                    </div>

                  </div>

                </div>

                {/* FREE SHIPPING */}

                {cart.length > 0 && (

                  <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#F5FAF5] px-3 py-3 text-xs font-medium text-green-700">

                    <Check
                      size={15}
                      className="shrink-0"
                    />

                    Free shipping included
                    with your order

                  </div>

                )}

                {/* PLACE ORDER */}

                <button
                  type="submit"
                  form="checkout-form"
                  disabled={
                    cart.length === 0
                  }
                  className={`mt-6 flex w-full items-center justify-center rounded-xl py-3.5 font-semibold text-white transition ${
                    cart.length === 0
                      ? "cursor-not-allowed bg-gray-300 text-gray-500"
                      : "bg-[#7B1E3A] hover:bg-[#641730]"
                  }`}
                >

                  {cart.length === 0
                    ? "Cart is Empty"
                    : paymentMethod === "cod"
                      ? `Place Order • ₹${totalPrice.toLocaleString(
                          "en-IN"
                        )}`
                      : "Select Cash on Delivery"}

                </button>

                {/* SECURITY */}

                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-400">

                  <ShieldCheck size={13} />

                  Secure checkout & protected
                  information

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}