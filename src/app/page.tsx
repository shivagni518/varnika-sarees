import Navbar from "@/components/layout/Navbar";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import BestSellers from "@/components/home/BestSellers";
import CustomerReviews from "@/components/home/CustomerReviews";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="pt-24 bg-gradient-to-br from-[#FFF8F0] via-[#FFFDF8] to-[#F7EFE7]">

        {/* Hero Section */}
        <section className="min-h-[90vh] flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">

            {/* Left Content */}
            <div>

              <span className="text-[#D4AF37] font-semibold tracking-wide uppercase">
                Premium Saree Collection
              </span>

              <h1 className="mt-4 text-[#7B1E3A] font-bold leading-tight text-6xl lg:text-8xl">
                Elegance
                <br />
                Woven
                <br />
                Into Every
                <br />
                Thread
              </h1>

              <p className="mt-6 text-gray-600 text-lg max-w-xl leading-relaxed">
                Discover handcrafted silk, bridal and designer sarees
                that blend heritage, luxury and modern elegance.
              </p>

              <div className="flex gap-5 mt-10">

                <button className="bg-[#7B1E3A] text-white px-8 py-4 rounded-xl font-medium hover:scale-105 transition-all">
                  Shop Now
                </button>

                <button className="border-2 border-[#7B1E3A] text-[#7B1E3A] px-8 py-4 rounded-xl font-medium hover:bg-[#7B1E3A] hover:text-white transition-all">
                  Explore Collection
                </button>

              </div>

              <div className="flex flex-wrap gap-6 mt-8 text-sm text-gray-600">
                <span>✓ Free Shipping</span>
                <span>✓ Secure Payments</span>
                <span>✓ Easy Returns</span>
              </div>

              <div className="flex gap-10 mt-12">

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

            {/* Right Content */}
            <div className="relative flex justify-center">

              <div className="absolute top-10 -left-6 bg-white shadow-xl rounded-2xl px-5 py-3 z-20">
                ⭐ 4.9 Customer Rating
              </div>

              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000"
                alt="Premium Saree"
                className="h-[650px] rounded-[40px] object-cover shadow-2xl hover:scale-105 transition duration-500"
              />

              <div className="absolute bottom-10 -right-8 bg-white shadow-xl rounded-2xl px-6 py-4 z-20">
                <p className="font-semibold text-[#7B1E3A]">
                  10,000+
                </p>
                <p className="text-sm text-gray-500">
                  Happy Customers
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* Collections */}
        <FeaturedCollections />

        {/* Best Sellers */}
        <BestSellers />

        <CustomerReviews />
        <WhyChooseUs />
        <Newsletter />
        <div className="h-px bg-[#D4AF37]/30"></div>
<Footer />

      </main>
    </>
  );
}