import { create } from "zustand";
import { persist } from "zustand/middleware";

/* =========================================================
   CUSTOMER
========================================================= */

export type Customer = {
  id: string;

  fullName: string;

  email: string;

  phone: string;

  password: string;

  role: "customer";

  createdAt: string;

  totalOrders: number;

  totalSpent: number;
};

/* =========================================================
   CUSTOMER STORE
========================================================= */

type CustomerStore = {
  customers: Customer[];

  registerCustomer: (
    fullName: string,
    email: string,
    phone: string,
    password: string
  ) => {
    success: boolean;
    message: string;
  };

  getCustomerByEmail: (
    email: string
  ) => Customer | undefined;

  getCustomerById: (
    id: string
  ) => Customer | undefined;

  updateCustomer: (
    id: string,
    data: Partial<Customer>
  ) => void;

  updateCustomerStats: (
    email: string,
    orderAmount: number
  ) => void;

  deleteCustomer: (
    id: string
  ) => void;

  clearCustomers: () => void;
};

/* =========================================================
   STORE
========================================================= */

export const useCustomerStore =
  create<CustomerStore>()(
    persist(
      (set, get) => ({

        /* ===============================================
           INITIAL STATE
        =============================================== */

        customers: [],

        /* ===============================================
           REGISTER CUSTOMER
        =============================================== */

        registerCustomer: (
          fullName,
          email,
          phone,
          password
        ) => {

          const normalizedEmail =
            email.trim().toLowerCase();

          const existingCustomer =
            get().customers.find(
              (customer) =>
                customer.email ===
                normalizedEmail
            );

          /* ---------------------------------------------
             CHECK EXISTING CUSTOMER
          --------------------------------------------- */

          if (existingCustomer) {
            return {
              success: false,
              message:
                "An account with this email already exists.",
            };
          }

          /* ---------------------------------------------
             CREATE CUSTOMER ID
          --------------------------------------------- */

          const customerId =
            `CUS-${Date.now()
              .toString()
              .slice(-8)}`;

          /* ---------------------------------------------
             CREATE CUSTOMER
          --------------------------------------------- */

          const customer: Customer = {
            id: customerId,

            fullName:
              fullName.trim(),

            email:
              normalizedEmail,

            phone:
              phone.trim(),

            password,

            role: "customer",

            createdAt:
              new Date().toISOString(),

            totalOrders: 0,

            totalSpent: 0,
          };

          /* ---------------------------------------------
             SAVE CUSTOMER
          --------------------------------------------- */

          set((state) => ({
            customers: [
              ...state.customers,
              customer,
            ],
          }));

          return {
            success: true,
            message:
              "Account created successfully.",
          };
        },

        /* ===============================================
           GET CUSTOMER BY EMAIL
        =============================================== */

        getCustomerByEmail: (
          email
        ) => {

          const normalizedEmail =
            email.trim().toLowerCase();

          return get().customers.find(
            (customer) =>
              customer.email ===
              normalizedEmail
          );
        },

        /* ===============================================
           GET CUSTOMER BY ID
        =============================================== */

        getCustomerById: (
          id
        ) => {

          return get().customers.find(
            (customer) =>
              customer.id === id
          );
        },

        /* ===============================================
           UPDATE CUSTOMER
        =============================================== */

        updateCustomer: (
          id,
          data
        ) => {

          set((state) => ({
            customers:
              state.customers.map(
                (customer) =>
                  customer.id === id
                    ? {
                        ...customer,
                        ...data,
                      }
                    : customer
              ),
          }));
        },

        /* ===============================================
           UPDATE ORDER STATISTICS
        =============================================== */

        updateCustomerStats: (
          email,
          orderAmount
        ) => {

          const normalizedEmail =
            email.trim().toLowerCase();

          set((state) => ({
            customers:
              state.customers.map(
                (customer) =>
                  customer.email ===
                  normalizedEmail
                    ? {
                        ...customer,

                        totalOrders:
                          customer.totalOrders +
                          1,

                        totalSpent:
                          customer.totalSpent +
                          orderAmount,
                      }
                    : customer
              ),
          }));
        },

        /* ===============================================
           DELETE CUSTOMER
        =============================================== */

        deleteCustomer: (
          id
        ) => {

          set((state) => ({
            customers:
              state.customers.filter(
                (customer) =>
                  customer.id !== id
              ),
          }));
        },

        /* ===============================================
           CLEAR CUSTOMERS
        =============================================== */

        clearCustomers: () => {

          set({
            customers: [],
          });

        },

      }),

      /* ===============================================
         PERSIST
      =============================================== */

      {
        name: "varnika-customers",
      }
    )
  );