const collections = [
  {
    title: "Silk Sarees",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000",
  },
  {
    title: "Bridal Collection",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1000",
  },
  {
    title: "Designer Sarees",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000",
  },
  {
    title: "Festive Collection",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1000",
  },
];

export default function FeaturedCollections() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-semibold">
            Discover Luxury
          </span>

          <h2 className="font-[var(--font-playfair)] text-5xl font-bold text-[#7B1E3A] mt-4">
            Featured Collections
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore our handpicked collections crafted for every occasion.
          </p>
        </div>

        {/* Collection Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {collections.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-96 w-full object-cover group-hover:scale-110 transition duration-700"
                />
              </div>

              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-[#7B1E3A]">
                  {item.title}
                </h3>

                <button className="mt-4 text-[#D4AF37] font-semibold hover:underline">
                  Explore →
                </button>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}