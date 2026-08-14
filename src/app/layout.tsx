import type { Metadata } from "next";
import {
  Inter,
  Playfair_Display,
} from "next/font/google";

import ProductStoreHydration from "@/components/ProductStoreHydration";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Varnika Sarees",
  description: "Premium Saree Collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >

        {/* Zustand Product Store Hydration */}
        <ProductStoreHydration />

        {/* Application */}
        {children}

      </body>

    </html>
  );
}