import { Star } from "lucide-react";

const reviews = [
  {
    name: "Priya Sharma",
    location: "Bengaluru",
    rating: 5,
    review:
      "The silk saree quality exceeded my expectations. Beautiful craftsmanship and timely delivery.",
  },
  {
    name: "Ananya Rao",
    location: "Mysuru",
    rating: 5,
    review:
      "Absolutely loved the bridal collection. The fabric and design were elegant and premium.",
  },
  {
    name: "Sneha Patel",
    location: "Mumbai",
    rating: 5,
    review:
      "Shopping was seamless, and the saree looked exactly like the photos. Highly recommended!",
  },
];

export default function CustomerReviews() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-semibold uppercase tracking-wider">
            Testimonials
          </span>

          <h2 className="font-[var(--font-playfair)] text-5xl font-bold text-[#7B1E3A] mt-4">
            What Our Customers Say
          </h2>

          <p className="text-gray-600 mt-4">
            Trusted by thousands of happy customers across India.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-[#FFF8F0] rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>

              <p className="text-gray-700 leading-7 italic">
                "{review.review}"
              </p>

              <div className="mt-8">
                <h4 className="font-semibold text-[#7B1E3A] text-lg">
                  {review.name}
                </h4>

                <p className="text-gray-500 text-sm">
                  {review.location}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}