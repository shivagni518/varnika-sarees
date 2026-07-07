import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Gem,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Enjoy free delivery across India on every order.",
  },
  {
    icon: Gem,
    title: "Premium Quality",
    description: "Handpicked silk and designer sarees crafted with elegance.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day hassle-free return policy for complete satisfaction.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "100% safe and encrypted payment experience.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">

          <span className="text-[#D4AF37] uppercase tracking-wider font-semibold">
            Why Choose Us
          </span>

          <h2 className="mt-4 text-5xl font-bold text-[#7B1E3A] font-[var(--font-playfair)]">
            Why Choose Varnika
          </h2>

          <div className="w-24 h-1 bg-[#D4AF37] rounded-full mx-auto mt-5"></div>

          <p className="text-gray-600 mt-6">
            We combine tradition, luxury and trust to deliver an unforgettable shopping experience.
          </p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-[#FFF8F0] rounded-3xl p-10 text-center shadow-lg hover:shadow-2xl hover:-translate-y-3 hover:border hover:border-[#D4AF37] transition-all duration-300"
              >

                <div className="w-20 h-20 mx-auto rounded-full bg-[#7B1E3A] flex items-center justify-center mb-6">

                  <Icon size={36} className="text-white" />

                </div>

                <h3 className="text-2xl font-semibold text-[#7B1E3A]">
                  {feature.title}
                </h3>

                <p className="text-gray-600 mt-4 leading-7">
                  {feature.description}
                </p>

              </div>
            );

          })}

        </div>

      </div>
    </section>
  );
}