"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
} from "lucide-react";

import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const cart = useCartStore(
    (state) => state.cart
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md">

      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* =================================================
            MAIN NAVBAR
        ================================================= */}

        <div className="flex h-20 items-center justify-between">

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            href="/"
            onClick={closeMenu}
            className="shrink-0"
          >
            <div>

              <h1 className="font-[var(--font-playfair)] text-2xl font-bold text-[#7B1E3A] sm:text-3xl">
                Varnika
              </h1>

              <p className="text-[9px] uppercase tracking-[2.5px] text-[#D4AF37] sm:text-xs sm:tracking-[3px]">
                Luxury Sarees
              </p>

            </div>
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav className="hidden items-center gap-7 font-medium text-gray-700 lg:flex">

            <Link
              href="/"
              className="transition hover:text-[#7B1E3A]"
            >
              Home
            </Link>

            <Link
              href="/shop"
              className="transition hover:text-[#7B1E3A]"
            >
              Shop
            </Link>

            <Link
              href="/shop?category=Silk"
              className="transition hover:text-[#7B1E3A]"
            >
              Silk
            </Link>

            <Link
              href="/shop?category=Bridal"
              className="transition hover:text-[#7B1E3A]"
            >
              Bridal
            </Link>

            <Link
              href="/shop?category=Designer"
              className="transition hover:text-[#7B1E3A]"
            >
              Designer
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-[#7B1E3A]"
            >
              Contact
            </Link>

          </nav>

          {/* =================================================
              DESKTOP ACTIONS
          ================================================= */}

          <div className="hidden items-center gap-5 lg:flex">

            {/* Search */}

            <Link href="/shop">
              <Search
                size={21}
                className="transition hover:text-[#7B1E3A]"
              />
            </Link>

            {/* Wishlist */}

            <Link href="/wishlist">
              <Heart
                size={21}
                className="transition hover:text-[#7B1E3A]"
              />
            </Link>

            {/* Cart */}

            <Link
              href="/cart"
              className="relative"
            >
              <ShoppingBag
                size={21}
                className="transition hover:text-[#7B1E3A]"
              />

              {totalItems > 0 && (
                <span className="absolute -right-2.5 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#7B1E3A] text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User */}

            <Link href="/login">
              <User
                size={21}
                className="transition hover:text-[#7B1E3A]"
              />
            </Link>

            {/* Login */}

            <Link
              href="/login"
              className="rounded-xl bg-[#7B1E3A] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#641730]"
            >
              Login
            </Link>

          </div>

          {/* =================================================
              MOBILE ACTIONS
          ================================================= */}

          <div className="flex items-center gap-4 lg:hidden">

            {/* Cart */}

            <Link
              href="/cart"
              className="relative"
            >
              <ShoppingBag
                size={22}
                className="text-gray-800"
              />

              {totalItems > 0 && (
                <span className="absolute -right-2.5 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#7B1E3A] text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Menu Button */}

            <button
              type="button"
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              aria-label={
                menuOpen
                  ? "Close menu"
                  : "Open menu"
              }
              className="rounded-lg p-1 text-gray-800 transition hover:bg-gray-100"
            >
              {menuOpen ? (
                <X size={25} />
              ) : (
                <Menu size={25} />
              )}
            </button>

          </div>

        </div>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        {menuOpen && (
          <div className="border-t border-gray-100 py-5 lg:hidden">

            <nav className="flex flex-col">

              {/* Home */}

              <Link
                href="/"
                onClick={closeMenu}
                className="border-b border-gray-100 px-2 py-3 font-medium text-gray-700 transition hover:text-[#7B1E3A]"
              >
                Home
              </Link>

              {/* Shop */}

              <Link
                href="/shop"
                onClick={closeMenu}
                className="border-b border-gray-100 px-2 py-3 font-medium text-gray-700 transition hover:text-[#7B1E3A]"
              >
                Shop
              </Link>

              {/* Silk */}

              <Link
                href="/shop?category=Silk"
                onClick={closeMenu}
                className="border-b border-gray-100 px-2 py-3 font-medium text-gray-700 transition hover:text-[#7B1E3A]"
              >
                Silk
              </Link>

              {/* Bridal */}

              <Link
                href="/shop?category=Bridal"
                onClick={closeMenu}
                className="border-b border-gray-100 px-2 py-3 font-medium text-gray-700 transition hover:text-[#7B1E3A]"
              >
                Bridal
              </Link>

              {/* Designer */}

              <Link
                href="/shop?category=Designer"
                onClick={closeMenu}
                className="border-b border-gray-100 px-2 py-3 font-medium text-gray-700 transition hover:text-[#7B1E3A]"
              >
                Designer
              </Link>

              {/* Contact */}

              <Link
                href="/contact"
                onClick={closeMenu}
                className="border-b border-gray-100 px-2 py-3 font-medium text-gray-700 transition hover:text-[#7B1E3A]"
              >
                Contact
              </Link>

              {/* Search */}

              <Link
                href="/shop"
                onClick={closeMenu}
                className="flex items-center gap-3 border-b border-gray-100 px-2 py-3 font-medium text-gray-700 transition hover:text-[#7B1E3A]"
              >
                <Search size={19} />
                Search
              </Link>

              {/* Wishlist */}

              <Link
                href="/wishlist"
                onClick={closeMenu}
                className="flex items-center gap-3 border-b border-gray-100 px-2 py-3 font-medium text-gray-700 transition hover:text-[#7B1E3A]"
              >
                <Heart size={19} />
                Wishlist
              </Link>

              {/* My Orders */}

              <Link
                href="/orders"
                onClick={closeMenu}
                className="flex items-center gap-3 border-b border-gray-100 px-2 py-3 font-medium text-gray-700 transition hover:text-[#7B1E3A]"
              >
                <ShoppingBag size={19} />
                My Orders
              </Link>

              {/* Login */}

              <Link
                href="/login"
                onClick={closeMenu}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#7B1E3A] px-5 py-3 font-semibold text-white transition hover:bg-[#641730]"
              >
                <User size={18} />
                Login
              </Link>

            </nav>

          </div>
        )}

      </div>

    </header>
  );
}