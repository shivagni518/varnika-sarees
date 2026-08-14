"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  ArrowLeft,
  Lock,
  Mail,
} from "lucide-react";

import { useAuthStore } from "@/store/authStore";

/* =========================================================
   LOGIN CONTENT
========================================================= */

function LoginContent() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const login = useAuthStore(
    (state) => state.login
  );

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* =======================================================
     LOGIN
  ======================================================= */

  const handleLogin = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const success = login(
      email,
      password
    );

    /* =====================================================
       INVALID LOGIN
    ===================================================== */

    if (!success) {
      setError(
        "Invalid email or password. Password must contain at least 6 characters."
      );

      setLoading(false);

      return;
    }

    /* =====================================================
       GET LOGGED-IN USER
    ===================================================== */

    const user =
      useAuthStore.getState().user;

    /* =====================================================
       ADMIN LOGIN
    ===================================================== */

    if (user?.role === "admin") {
      router.replace("/admin");
      return;
    }

    /* =====================================================
       CUSTOMER LOGIN
    ===================================================== */

    const redirect =
      searchParams.get("redirect");

    if (redirect) {
      router.replace(redirect);
    } else {
      router.replace("/");
    }
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#FFF8F2] px-6 py-32">

      <div className="mx-auto max-w-md">

        {/* =================================================
            BACK TO HOME
        ================================================= */}

        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#7B1E3A] hover:underline"
        >
          <ArrowLeft size={17} />

          Back to Home
        </Link>

        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <div className="rounded-3xl bg-white p-8 shadow-xl sm:p-10">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="text-center">

            <h1 className="text-3xl font-bold text-[#7B1E3A]">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Login to your Varnika account
            </p>

          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >

            {/* =================================================
                EMAIL
            ================================================= */}

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
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A]"
                />

              </div>

            </div>

            {/* =================================================
                PASSWORD
            ================================================= */}

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
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-[#7B1E3A] focus:ring-1 focus:ring-[#7B1E3A]"
                />

              </div>

            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#7B1E3A] py-3.5 font-semibold text-white transition hover:bg-[#641730] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>

          {/* =================================================
              REGISTER
          ================================================= */}

          <div className="mt-6 text-center text-sm text-gray-500">

            Dont have an account?

            <Link
              href="/register"
              className="ml-1 font-semibold text-[#7B1E3A] hover:underline"
            >
              Create Account
            </Link>

          </div>

          {/* =================================================
              DEMO ADMIN CREDENTIALS
          ================================================= */}

          <div className="mt-6 rounded-xl bg-[#FFF8F2] p-4 text-center">

            <p className="text-xs font-semibold text-[#7B1E3A]">
              Demo Admin Login
            </p>

            <p className="mt-1 text-xs text-gray-500">
              admin@varnika.com
            </p>

            <p className="text-xs text-gray-500">
              Password: admin123
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}

/* =========================================================
   LOGIN PAGE
========================================================= */

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#FFF8F2] px-6">

          <div className="text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#7B1E3A]/20 border-t-[#7B1E3A]" />

            <p className="mt-4 text-sm text-gray-500">
              Loading login...
            </p>

          </div>

        </main>
      }
    >
      <LoginContent />
    </Suspense>
  );
}