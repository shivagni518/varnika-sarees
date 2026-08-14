"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F2] px-6 py-32">

      <div className="mx-auto max-w-5xl">

        {/* Back */}

        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#7B1E3A]"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        {/* Heading */}

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-[3px] text-[#D4AF37]">
            Get In Touch
          </p>

          <h1 className="mt-3 text-4xl font-bold text-[#7B1E3A] sm:text-5xl">
            Contact Varnika
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Have a question about our sarees, orders or
            collections? We do love to hear from you.
          </p>

        </div>

        {/* Contact Cards */}

        <div className="mt-12 grid gap-6 md:grid-cols-3">

          {/* Phone */}

          <div className="rounded-2xl bg-white p-7 text-center shadow-md">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF0F4]">

              <Phone
                size={24}
                className="text-[#7B1E3A]"
              />

            </div>

            <h3 className="mt-5 font-semibold text-gray-900">
              Call Us
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              +91 7760564518
            </p>

          </div>

          {/* Email */}

          <div className="rounded-2xl bg-white p-7 text-center shadow-md">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF0F4]">

              <Mail
                size={24}
                className="text-[#7B1E3A]"
              />

            </div>

            <h3 className="mt-5 font-semibold text-gray-900">
              Email Us
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              support@varnikasarees.com
            </p>

          </div>

          {/* Location */}

          <div className="rounded-2xl bg-white p-7 text-center shadow-md">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF0F4]">

              <MapPin
                size={24}
                className="text-[#7B1E3A]"
              />

            </div>

            <h3 className="mt-5 font-semibold text-gray-900">
              Visit Us
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Puttur, Karnataka, India
            </p>

          </div>

        </div>

        {/* Message */}

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-md sm:p-10">

          <h2 className="text-2xl font-bold text-[#7B1E3A]">
            We do love to hear from you
          </h2>

          <p className="mt-3 leading-7 text-gray-500">
            For questions about products, orders,
            delivery or returns, please contact our
            support team. We will be happy to help.
          </p>

        </div>

      </div>

    </main>
  );
}