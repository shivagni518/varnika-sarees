"use client";

import {
  ReactNode,
  useEffect,
} from "react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import { useAuthStore } from "@/store/authStore";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {

  const router = useRouter();

  const pathname =
    usePathname();

  /* =====================================================
     AUTH STATE
  ===================================================== */

  const user = useAuthStore(
    (state) => state.user
  );

  const isAuthenticated =
    useAuthStore(
      (state) =>
        state.isAuthenticated
    );

  const hasHydrated =
    useAuthStore(
      (state) =>
        state.hasHydrated
    );

  const setHasHydrated =
    useAuthStore(
      (state) =>
        state.setHasHydrated
    );

  /* =====================================================
     START AUTH HYDRATION
  ===================================================== */

  useEffect(() => {

    /*
     * If already hydrated,
     * nothing needs to be done.
     */

    if (
      useAuthStore.persist.hasHydrated()
    ) {

      setHasHydrated(true);

      return;

    }

    /*
     * Listen for hydration completion.
     */

    const unsubscribe =
      useAuthStore.persist.onFinishHydration(
        () => {

          setHasHydrated(true);

        }
      );

    /*
     * Explicitly start hydration.
     */

    useAuthStore.persist.rehydrate();

    return () => {

      unsubscribe();

    };

  }, [
    setHasHydrated,
  ]);

  /* =====================================================
     AUTHORIZATION
  ===================================================== */

  useEffect(() => {

    /*
     * Wait until persisted auth
     * has been restored.
     */

    if (!hasHydrated) {
      return;
    }

    /*
     * Not authenticated
     */

    if (!isAuthenticated) {

      router.replace(
        `/login?redirect=${encodeURIComponent(
          pathname
        )}`
      );

      return;

    }

    /*
     * Authenticated but not admin
     */

    if (
      user?.role !== "admin"
    ) {

      router.replace(
        `/login?redirect=${encodeURIComponent(
          pathname
        )}`
      );

    }

  }, [
    hasHydrated,
    isAuthenticated,
    user,
    pathname,
    router,
  ]);

  /* =====================================================
     HYDRATING
  ===================================================== */

  if (!hasHydrated) {

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFF8F2]">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#7B1E3A]/20 border-t-[#7B1E3A]" />

          <p className="mt-4 text-sm text-gray-500">
            Checking admin access...
          </p>

        </div>

      </main>
    );

  }

  /* =====================================================
     NOT AUTHENTICATED
  ===================================================== */

  if (!isAuthenticated) {

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFF8F2]">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#7B1E3A]/20 border-t-[#7B1E3A]" />

          <p className="mt-4 text-sm text-gray-500">
            Redirecting to login...
          </p>

        </div>

      </main>
    );

  }

  /* =====================================================
     NOT ADMIN
  ===================================================== */

  if (
    user?.role !== "admin"
  ) {

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFF8F2]">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#7B1E3A]/20 border-t-[#7B1E3A]" />

          <p className="mt-4 text-sm text-gray-500">
            Redirecting to login...
          </p>

        </div>

      </main>
    );

  }

  /* =====================================================
     ADMIN CONTENT
  ===================================================== */

  return <>{children}</>;

}