"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  User,
  Mail,
  Lock,
  Phone,
  ArrowLeft,
} from "lucide-react";

import { useCustomerStore } from "@/store/customerStore";

export default function RegisterPage() {
  const router = useRouter();

  const registerCustomer = useCustomerStore(
    (state) => state.registerCustomer
  );

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* =====================================================
     EMAIL VALIDATION
  ===================================================== */

  const isValidEmail = (
    value: string
  ) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      value
    );
  };

  /* =====================================================
     PHONE VALIDATION
  ===================================================== */

  const isValidPhone = (
    value: string
  ) => {
    return /^\d{10}$/.test(value);
  };

  /* =====================================================
     REGISTER
  ===================================================== */

  const handleRegister = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    /* =========================================
       FULL NAME
    ========================================= */

    if (!fullName.trim()) {
      setError(
        "Please enter your full name."
      );

      return;
    }

    /* =========================================
       EMAIL
    ========================================= */

    const normalizedEmail =
      email.trim().toLowerCase();

    if (!isValidEmail(normalizedEmail)) {
      setError(
        "Please enter a valid email address."
      );

      return;
    }

    /* =========================================
       PHONE
    ========================================= */

    if (!isValidPhone(phone)) {
      setError(
        "Phone number must contain exactly 10 digits."
      );

      return;
    }

    /* =========================================
       PASSWORD
    ========================================= */

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );

      return;
    }

    /* =========================================
       CONFIRM PASSWORD
    ========================================= */

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    /* =========================================
       START LOADING
    ========================================= */

    setLoading(true);

    /* =========================================
       SAVE CUSTOMER
    ========================================= */

    const result =
      registerCustomer(
        fullName,
        normalizedEmail,
        phone,
        password
      );

    /* =========================================
       REGISTRATION FAILED
    ========================================= */

    if (!result.success) {
      setLoading(false);

      setError(result.message);

      return;
    }

    /* =========================================
       SUCCESS
    ========================================= */

    router.replace("/login");
  };

  return (
    <main className="min-h-screen bg-[#FFF8F2] px-6 py-32">

      <div className="mx-auto max-w-md">

        {/* =================================================
            BACK TO LOGIN
        ================================================= */}

        <Link
          href="/login"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#7B1E3A] hover:underline"
        >
          <ArrowLeft size={17} />

          Back to Login
        </Link>

        {/* =================================================
            REGISTER CARD
        ================================================= */}

        <div className="rounded-3xl bg-white p-8 shadow-xl sm:p-10">

          {/* =================================================
              HEADING
          ================================================= */}

          <div className="text-center">

            <p className="text-xs font-semibold uppercase tracking-[2px] text-[#B18A2B]">
              Varnika Sarees
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#7B1E3A]">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Join Varnika Sarees and start shopping
            </p>

          </div>

          {/* =================================================
              ERROR MESSAGE
          ================================================= */}

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleRegister}
            className="mt-8 space-y-5"
          >

            {/* =============================================
                FULL NAME
            ============================================= */}

            <div>

              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(
                      e.target.value
                    )
                  }
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A]"
                />

              </div>

            </div>

            {/* =============================================
                EMAIL
            ============================================= */}

            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A]"
                />

              </div>

              {email.length > 0 &&
                !isValidEmail(email) && (
                  <p className="mt-1 text-xs text-red-500">
                    Please enter a valid email
                    address.
                  </p>
                )}

            </div>

            {/* =============================================
                PHONE
            ============================================= */}

            <div>

              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>

              <div className="relative">

                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {

                    const value =
                      e.target.value.replace(
                        /\D/g,
                        ""
                      );

                    if (
                      value.length <= 10
                    ) {
                      setPhone(value);
                    }

                  }}
                  placeholder="Enter 10-digit phone number"
                  autoComplete="tel"
                  required
                  maxLength={10}
                  inputMode="numeric"
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A]"
                />

              </div>

              {phone.length > 0 &&
                phone.length !== 10 && (
                  <p className="mt-1 text-xs text-red-500">
                    Phone number must contain
                    exactly 10 digits.
                  </p>
                )}

              {phone.length === 10 && (
                <p className="mt-1 text-xs text-green-600">
                  ✓ Valid phone number
                </p>
              )}

            </div>

            {/* =============================================
                PASSWORD
            ============================================= */}

            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A]"
                />

              </div>

              <p className="mt-1 text-xs text-gray-400">
                Minimum 6 characters
              </p>

            </div>

            {/* =============================================
                CONFIRM PASSWORD
            ============================================= */}

            <div>

              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A]"
                />

              </div>

              {confirmPassword.length > 0 &&
                password !==
                  confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    Passwords do not match.
                  </p>
                )}

              {confirmPassword.length > 0 &&
                password ===
                  confirmPassword && (
                  <p className="mt-1 text-xs text-green-600">
                    ✓ Passwords match
                  </p>
                )}

            </div>

            {/* =============================================
                REGISTER BUTTON
            ============================================= */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#7B1E3A] py-3.5 font-semibold text-white transition hover:bg-[#641730] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          {/* =================================================
              LOGIN LINK
          ================================================= */}

          <div className="mt-6 text-center text-sm text-gray-500">

            Already have an account?

            <Link
              href="/login"
              className="ml-1 font-semibold text-[#7B1E3A] hover:underline"
            >
              Login
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}