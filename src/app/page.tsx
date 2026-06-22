import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-gradient-to-br from-[#FFF8F0] via-[#FFFDF8] to-[#F7EFE7]">

        {/* Hero Section */}
        <section className="min-h-screen flex items-center pt-20">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

            {/* Left Side */}
            <div>

              <span className="text-[#D4AF37] font-semibold text-lg">
                Premium Saree Collection
              </span>

              <h1 className="font-[var(--font-playfair)] text-6xl md:text-8xl font-bold text-[#7B1E3A] mt-4 leading-tight">
                Elegance Woven
                <br />
                Into Every
                <br />
                Thread
              </h1>

              <p className="text-gray-600 mt-6 text-xl leading-relaxed max-w-xl">
                Discover handcrafted silk, bridal and designer sarees that
                blend heritage, luxury and modern elegance.
              </p>

              <div className="flex gap-4 mt-8">
                <button className="bg-[#7B1E3A] text-white px-8 py-4 rounded-xl font-medium hover:scale-105 transition">
                  Shop Now
                </button>

                <button className="border-2 border-[#7B1E3A] text-[#7B1E3A] px-8 py-4 rounded-xl font-medium hover:bg-[#7B1E3A] hover:text-white transition">
                  Explore Collection
                </button>
              </div>

              <div className="flex gap-6 mt-8 text-sm text-gray-600">
                <span>✓ Free Shipping</span>
                <span>✓ Secure Payments</span>
                <span>✓ Easy Returns</span>
              </div>

              <div className="flex gap-12 mt-12">

                <div>
                  <h3 className="text-3xl font-bold text-[#7B1E3A]">
                    500+
                  </h3>
                  <p className="text-gray-500">
                    Premium Sarees
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-[#7B1E3A]">
                    10K+
                  </h3>
                  <p className="text-gray-500">
                    Happy Customers
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-[#7B1E3A]">
                    50+
                  </h3>
                  <p className="text-gray-500">
                    Collections
                  </p>
                </div>

              </div>

            </div>

            {/* Right Side */}
            <div className="relative flex justify-center">

              <div className="absolute -top-6 -left-6 bg-white shadow-xl rounded-2xl px-5 py-3 z-10">
                ⭐ 4.9 Rating
              </div>

              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000"
                alt="Premium Saree"
                className="rounded-[40px] shadow-2xl h-[700px] object-cover"
              />

              <div className="absolute bottom-8 -right-4 bg-white shadow-xl rounded-2xl px-5 py-3 z-10">
                10,000+ Happy Customers
              </div>

            </div>

          </div>
        </section>

      </main>
    </>
  );
}