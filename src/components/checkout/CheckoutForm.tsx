"use client";

import type { CustomerDetails } from "@/store/orderStore";

interface CheckoutFormProps {
  value: CustomerDetails;

  onChange: (
    field: keyof CustomerDetails,
    value: string
  ) => void;

  onSubmit: (
    customer: CustomerDetails
  ) => void;
}

export default function CheckoutForm({
  value,
  onChange,
  onSubmit,
}: CheckoutFormProps) {
  /* =========================================
     FORM SUBMIT
  ========================================= */

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(
      event.currentTarget
    );

    const customer: CustomerDetails = {
      fullName: String(
        formData.get("fullName") || ""
      ).trim(),

      phone: String(
        formData.get("phone") || ""
      ).trim(),

      email: String(
        formData.get("email") || ""
      ).trim(),

      address: String(
        formData.get("address") || ""
      ).trim(),

      city: String(
        formData.get("city") || ""
      ).trim(),

      state: String(
        formData.get("state") || ""
      ).trim(),

      pinCode: String(
        formData.get("pinCode") || ""
      ).trim(),
    };

    onSubmit(customer);
  };

  /* =========================================
     INPUT STYLE
  ========================================= */

  const inputClassName =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A]";

  const labelClassName =
    "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <form
      id="checkout-form"
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* =======================================
          PERSONAL DETAILS
      ======================================= */}

      <div>

        <div className="mb-4">

          <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#B18A2B]">
            Personal Information
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Enter the details we can use to contact
            you about your order.
          </p>

        </div>

        {/* FULL NAME + PHONE */}

        <div className="grid gap-5 md:grid-cols-2">

          {/* FULL NAME */}

          <div>

            <label
              htmlFor="fullName"
              className={labelClassName}
            >
              Full Name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              value={value.fullName}
              onChange={(event) =>
                onChange(
                  "fullName",
                  event.target.value
                )
              }
              placeholder="Enter your full name"
              autoComplete="name"
              required
              className={inputClassName}
            />

          </div>

          {/* PHONE */}

          <div>

            <label
              htmlFor="phone"
              className={labelClassName}
            >
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={value.phone}
              onChange={(event) =>
                onChange(
                  "phone",
                  event.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
              placeholder="9876543210"
              maxLength={10}
              inputMode="numeric"
              autoComplete="tel"
              required
              className={inputClassName}
            />

          </div>

        </div>

      </div>

      {/* =======================================
          EMAIL
      ======================================= */}

      <div>

        <label
          htmlFor="email"
          className={labelClassName}
        >
          Email Address
        </label>

        <input
          id="email"
          name="email"
          type="email"
          value={value.email}
          onChange={(event) =>
            onChange(
              "email",
              event.target.value
            )
          }
          placeholder="example@gmail.com"
          autoComplete="email"
          required
          className={inputClassName}
        />

      </div>

      {/* =======================================
          SHIPPING ADDRESS
      ======================================= */}

      <div>

        <div className="mb-4">

          <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#B18A2B]">
            Delivery Address
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Where should we deliver your order?
          </p>

        </div>

        {/* ADDRESS */}

        <div>

          <label
            htmlFor="address"
            className={labelClassName}
          >
            Address
          </label>

          <textarea
            id="address"
            name="address"
            rows={4}
            value={value.address}
            onChange={(event) =>
              onChange(
                "address",
                event.target.value
              )
            }
            placeholder="House No, Street, Area..."
            autoComplete="street-address"
            required
            className={`${inputClassName} resize-none`}
          />

        </div>

      </div>

      {/* =======================================
          CITY / STATE / PIN
      ======================================= */}

      <div className="grid gap-5 md:grid-cols-3">

        {/* CITY */}

        <div>

          <label
            htmlFor="city"
            className={labelClassName}
          >
            City
          </label>

          <input
            id="city"
            name="city"
            type="text"
            value={value.city}
            onChange={(event) =>
              onChange(
                "city",
                event.target.value
              )
            }
            placeholder="Mangalore"
            autoComplete="address-level2"
            required
            className={inputClassName}
          />

        </div>

        {/* STATE */}

        <div>

          <label
            htmlFor="state"
            className={labelClassName}
          >
            State
          </label>

          <input
            id="state"
            name="state"
            type="text"
            value={value.state}
            onChange={(event) =>
              onChange(
                "state",
                event.target.value
              )
            }
            placeholder="Karnataka"
            autoComplete="address-level1"
            required
            className={inputClassName}
          />

        </div>

        {/* PIN CODE */}

        <div>

          <label
            htmlFor="pinCode"
            className={labelClassName}
          >
            PIN Code
          </label>

          <input
            id="pinCode"
            name="pinCode"
            type="text"
            value={value.pinCode}
            onChange={(event) =>
              onChange(
                "pinCode",
                event.target.value.replace(
                  /\D/g,
                  ""
                )
              )
            }
            placeholder="574201"
            maxLength={6}
            inputMode="numeric"
            autoComplete="postal-code"
            required
            className={inputClassName}
          />

        </div>

      </div>

    </form>
  );
}