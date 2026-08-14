import { create } from "zustand";
import { persist } from "zustand/middleware";

import { useCustomerStore } from "@/store/customerStore";

/* =========================================================
   USER ROLE
========================================================= */

export type UserRole =
  | "customer"
  | "admin";

/* =========================================================
   USER
========================================================= */

export type User = {
  email: string;
  role: UserRole;
};

/* =========================================================
   AUTH STORE
========================================================= */

type AuthStore = {
  user: User | null;

  isAuthenticated: boolean;

  hasHydrated: boolean;

  login: (
    email: string,
    password: string
  ) => boolean;

  logout: () => void;

  setHasHydrated: (
    value: boolean
  ) => void;
};

/* =========================================================
   STORE
========================================================= */

export const useAuthStore =
  create<AuthStore>()(
    persist(
      (set) => ({

        /* =================================================
           INITIAL STATE
        ================================================= */

        user: null,

        isAuthenticated: false,

        hasHydrated: false,

        /* =================================================
           LOGIN
        ================================================= */

        login: (
          email,
          password
        ) => {

          const normalizedEmail =
            email
              .trim()
              .toLowerCase();

          /* ===============================================
             ADMIN LOGIN
          =============================================== */

          if (
            normalizedEmail ===
              "admin@varnika.com" &&
            password === "admin123"
          ) {

            set({
              user: {
                email:
                  normalizedEmail,

                role: "admin",
              },

              isAuthenticated:
                true,
            });

            return true;
          }

          /* ===============================================
             CUSTOMER LOGIN
          =============================================== */

          const customer =
            useCustomerStore
              .getState()
              .getCustomerByEmail(
                normalizedEmail
              );

          /* ===============================================
             CUSTOMER NOT FOUND
          =============================================== */

          if (!customer) {
            return false;
          }

          /* ===============================================
             PASSWORD CHECK
          =============================================== */

          if (
            customer.password !==
            password
          ) {
            return false;
          }

          /* ===============================================
             CUSTOMER LOGIN SUCCESS
          =============================================== */

          set({
            user: {
              email:
                customer.email,

              role: "customer",
            },

            isAuthenticated:
              true,
          });

          return true;
        },

        /* =================================================
           LOGOUT
        ================================================= */

        logout: () => {

          set({
            user: null,

            isAuthenticated:
              false,
          });

        },

        /* =================================================
           HYDRATION
        ================================================= */

        setHasHydrated: (
          value
        ) => {

          set({
            hasHydrated:
              value,
          });

        },

      }),

      /* ===================================================
         PERSIST
      =================================================== */

      {
        name: "varnika-auth",

        /*
         * IMPORTANT
         *
         * We disable automatic hydration.
         * AdminLayout will explicitly call:
         *
         * useAuthStore.persist.rehydrate()
         */
        skipHydration: true,
      }
    )
  );