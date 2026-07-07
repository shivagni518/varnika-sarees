import { MapPin, Phone, Mail } from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#5B1733] text-white">

      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>

            <h2 className="text-4xl font-bold font-[var(--font-playfair)]">
              Varnika
            </h2>

            <p className="text-[#D4AF37] mt-1 tracking-[4px] uppercase text-sm">
              Luxury Sarees
            </p>

            <p className="text-gray-300 mt-6 leading-8">
                Elegant sarees crafted with tradition and grace.
              
            </p>

            <div className="flex gap-4 mt-8">

              <div className="w-10 h-10 rounded-full bg-[#7B1E3A] hover:bg-[#D4AF37] transition flex items-center justify-center cursor-pointer">
                
                <FaInstagram size={18} />
                
              </div>

              <div className="w-10 h-10 rounded-full bg-[#7B1E3A] hover:bg-[#D4AF37] transition flex items-center justify-center cursor-pointer">
                <FaFacebookF size={18} />
              </div>

              <div className="w-10 h-10 rounded-full bg-[#7B1E3A] hover:bg-[#D4AF37] transition flex items-center justify-center cursor-pointer">
                <FaYoutube size={18} />
              </div>

            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-xl font-semibold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-gray-300">

              <li className="hover:text-[#D4AF37] cursor-pointer">Home</li>
              <li className="hover:text-[#D4AF37] cursor-pointer">Collections</li>
              <li className="hover:text-[#D4AF37] cursor-pointer">About</li>
              <li className="hover:text-[#D4AF37] cursor-pointer">Contact</li>

            </ul>

          </div>

          {/* Customer Care */}

          <div>

            <h3 className="text-xl font-semibold mb-6">
              Customer Care
            </h3>

            <ul className="space-y-4 text-gray-300">

              <li className="hover:text-[#D4AF37] cursor-pointer">
                FAQs
              </li>

              <li className="hover:text-[#D4AF37] cursor-pointer">
                Shipping
              </li>

              <li className="hover:text-[#D4AF37] cursor-pointer">
                Returns
              </li>

              <li className="hover:text-[#D4AF37] cursor-pointer">
                Privacy Policy
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold mb-6">
              Contact
            </h3>

            <div className="space-y-5 text-gray-300">

              <div className="flex gap-3 items-start">
                <MapPin size={18} className="mt-1 text-[#D4AF37]" />
                <span>Puttur, Karnataka</span>
              </div>

              <div className="flex gap-3 items-center">
                <Phone size={18} className="text-[#D4AF37]" />
                <a
  href="tel:+917760564518"
  className="hover:text-[#D4AF37] transition"
>
  +91 7760564518
</a>
              </div>

              <div className="flex gap-3 items-center">
                <Mail size={18} className="text-[#D4AF37]" />
                <a
  href="mailto:support@varnika.com"
  className="hover:text-[#D4AF37] transition"
>
  support@varnika.com
</a>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-[#D4AF37]/30">

        <div className="max-w-7xl mx-auto px-6 pt-12 pb-20 flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm">

          <p>
            © 2026 Varnika Sarees. Crafted with ❤️ in India.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">

            <span className="hover:text-[#D4AF37] cursor-pointer">
              Privacy
            </span>

            <span className="hover:text-[#D4AF37] cursor-pointer">
              Terms
            </span>

            <span className="hover:text-[#D4AF37] cursor-pointer">
              Refund Policy
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
}