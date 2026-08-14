"use client";

import { useEffect } from "react";

import { useProductStore } from "@/store/productStore";

export default function ProductStoreHydration() {
  useEffect(() => {
    if (!useProductStore.persist.hasHydrated()) {
      useProductStore.persist.rehydrate();
    }
  }, []);

  return null;
}