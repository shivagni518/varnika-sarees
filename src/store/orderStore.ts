import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Product } from "@/types/product";
import { useCustomerStore } from "@/store/customerStore";

/* =========================================================
   ORDER ITEM
========================================================= */

export interface OrderItem {
  product: Product;
  quantity: number;
}

/* =========================================================
   CUSTOMER DETAILS
========================================================= */

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
}

/* =========================================================
   ORDER STATUS
========================================================= */

export type OrderStatus =
  | "Confirmed"
  | "Processing"
  | "Shipped"
  | "Delivered";

/* =========================================================
   ORDER
========================================================= */

export interface Order {
  id: string;

  items: OrderItem[];

  customer: CustomerDetails;

  subtotal: number;

  shipping: number;

  total: number;

  status: OrderStatus;

  createdAt: string;
}

/* =========================================================
   ORDER STORE
========================================================= */

type OrderStore = {
  orders: Order[];

  lastOrder: Order | null;

  createOrder: (
    items: OrderItem[],
    customer: CustomerDetails,
    subtotal: number
  ) => Order;

  getOrder: (
    orderId: string
  ) => Order | undefined;

  updateOrderStatus: (
    orderId: string,
    status: OrderStatus
  ) => void;

  clearOrders: () => void;
};

/* =========================================================
   STORE
========================================================= */

export const useOrderStore =
  create<OrderStore>()(
    persist(
      (set, get) => ({

        /* =================================================
           INITIAL STATE
        ================================================= */

        orders: [],

        lastOrder: null,

        /* =================================================
           CREATE ORDER
        ================================================= */

        createOrder: (
          items,
          customer,
          subtotal
        ) => {

          /* -----------------------------------------------
             CREATE ORDER ID
          ----------------------------------------------- */

          const orderId =
            `VRN-${Date.now()
              .toString()
              .slice(-8)}`;

          /* -----------------------------------------------
             CREATE ORDER
          ----------------------------------------------- */

          const order: Order = {

            id: orderId,

            items: [...items],

            customer: {
              ...customer,
            },

            subtotal,

            shipping: 0,

            total: subtotal,

            status: "Confirmed",

            createdAt:
              new Date().toISOString(),

          };

          /* -----------------------------------------------
             SAVE ORDER
          ----------------------------------------------- */

          set((state) => ({

            orders: [
              order,
              ...state.orders,
            ],

            lastOrder: order,

          }));

          /* -----------------------------------------------
             UPDATE CUSTOMER STATISTICS
          ----------------------------------------------- */

          /*
           * The customer store already provides:
           *
           * updateCustomerStats(
           *   email,
           *   orderAmount
           * )
           *
           * So whenever a registered customer
           * successfully places an order:
           *
           * totalOrders -> +1
           * totalSpent  -> +order total
           */

          const customerStore =
            useCustomerStore.getState();

          const existingCustomer =
            customerStore.getCustomerByEmail(
              customer.email
            );

          if (existingCustomer) {

            customerStore.updateCustomerStats(
              customer.email,
              order.total
            );

          }

          /* -----------------------------------------------
             RETURN CREATED ORDER
          ----------------------------------------------- */

          return order;
        },

        /* =================================================
           GET ORDER
        ================================================= */

        getOrder: (
          orderId
        ) => {

          return get().orders.find(
            (order) =>
              order.id === orderId
          );

        },

        /* =================================================
           UPDATE ORDER STATUS
        ================================================= */

        updateOrderStatus: (
          orderId,
          status
        ) => {

          set((state) => {

            /* ---------------------------------------------
               UPDATE ORDERS
            --------------------------------------------- */

            const updatedOrders =
              state.orders.map(
                (order) =>
                  order.id === orderId
                    ? {
                        ...order,
                        status,
                      }
                    : order
              );

            /* ---------------------------------------------
               UPDATE LAST ORDER
            --------------------------------------------- */

            const updatedLastOrder =
              state.lastOrder?.id === orderId
                ? {
                    ...state.lastOrder,
                    status,
                  }
                : state.lastOrder;

            return {

              orders:
                updatedOrders,

              lastOrder:
                updatedLastOrder,

            };

          });

        },

        /* =================================================
           CLEAR ORDERS
        ================================================= */

        clearOrders: () => {

          set({

            orders: [],

            lastOrder: null,

          });

        },

      }),

      /* ===================================================
         PERSIST
      =================================================== */

      {
        name: "varnika-orders",
      }

    )
  );