import { create } from "zustand";
import { persist } from "zustand/middleware";

import { useCustomerStore } from "@/store/customerStore";

export type UserRole = "customer" | "admin";

export type User = {
  email: string;
  role: UserRole;
};

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;

  login: (email: string, password: string) => boolean;
  logout: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      hasHydrated: false,

      login: (email, password) => {
        const normalizedEmail = email.trim().toLowerCase();

        if (
          normalizedEmail === "admin@varnika.com" &&
          password === "admin123"
        ) {
          set({
            user: {
              email: normalizedEmail,
              role: "admin",
            },
            isAuthenticated: true,
          });

          return true;
        }

        const customer =
          useCustomerStore
            .getState()
            .getCustomerByEmail(normalizedEmail);

        if (!customer) {
          return false;
        }

        if (customer.password !== password) {
          return false;
        }

        set({
          user: {
            email: customer.email.trim().toLowerCase(),
            role: "customer",
          },
          isAuthenticated: true,
        });

        return true;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      setHasHydrated: (value) => {
        set({
          hasHydrated: value,
        });
      },
    }),

    {
      name: "varnika-auth",

      onRehydrateStorage: () => {
        return () => {
          useAuthStore
            .getState()
            .setHasHydrated(true);
        };
      },
    }
  )
);
