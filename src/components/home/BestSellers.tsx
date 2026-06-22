import { Heart, ShoppingCart, Star } from "lucide-react";

const products = [
    {
        name: "Kanchipuram Silk Saree",
        price: "₹4,999",
        rating: "4.8",
        image:
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000",
    },
    {
        name: "Banarasi Saree",
        price: "₹5,999",
        rating: "4.9",
        image:
            "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg",
    },
    {
        name: "Bridal Silk Saree",
        price: "₹8,999",
        rating: "5.0",
        image:
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000",
    },
    {
      name: "Designer Saree",
      price: "₹3,999",
      rating: "4.7",
      image:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1000",
    },
];

export default function BestSellers() {
    return (
        <section className="py-28 bg-[#FFF8F0]">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-16">
                    <span className="text-[#D4AF37] font-semibold">
                        Customer Favorites
                    </span>

                    <h2 className="font-[var(--font-playfair)] text-5xl font-bold text-[#7B1E3A] mt-4">
                        Best Sellers
                    </h2>

                    <p className="text-gray-600 mt-4">
                        Most loved sarees by our customers
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500"
                        >
                            <div className="relative">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-96 w-full object-cover"
                                />

                                <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow">
                                    <Heart size={18} />
                                </button>

                            </div>

                            <div className="p-5">

                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star size={16} fill="currentColor" />
                                    <span>{product.rating}</span>
                                </div>

                                <h3 className="text-xl font-semibold text-[#7B1E3A] mt-2">
                                    {product.name}
                                </h3>

                                <p className="text-2xl font-bold mt-2">
                                    {product.price}
                                </p>

                                <button className="mt-4 w-full bg-[#7B1E3A] text-white py-3 rounded-xl flex justify-center items-center gap-2 hover:opacity-90">
                                    <ShoppingCart size={18} />
                                    Add To Cart
                                </button>

                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}