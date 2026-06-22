import {
  Search,
  Heart,
  ShoppingBag,
  User,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <div>
            <h1 className="font-[var(--font-playfair)] text-3xl font-bold text-[#7B1E3A]">
              Varnika
            </h1>

            <p className="text-xs tracking-[3px] text-[#D4AF37] uppercase">
              Luxury Sarees
            </p>
          </div>

          {/* Menu */}
          <nav className="hidden lg:flex gap-8 text-gray-700 font-medium">
            <a href="#">Home</a>
            <a href="#">Collections</a>
            <a href="#">Silk</a>
            <a href="#">Bridal</a>
            <a href="#">Designer</a>
            <a href="#">Contact</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-5">

            <Search
              size={22}
              className="cursor-pointer hover:text-[#7B1E3A]"
            />

            <Heart
              size={22}
              className="cursor-pointer hover:text-[#7B1E3A]"
            />

            <ShoppingBag
              size={22}
              className="cursor-pointer hover:text-[#7B1E3A]"
            />

            <User
              size={22}
              className="cursor-pointer hover:text-[#7B1E3A]"
            />

            <button className="bg-[#7B1E3A] text-white px-5 py-2 rounded-xl">
              Login
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}