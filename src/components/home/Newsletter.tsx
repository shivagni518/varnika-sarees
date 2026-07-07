import { Mail } from "lucide-react";

export default function Newsletter() {
    return (
        <section className="py-32 bg-gradient-to-r from-[#7B1E3A] to-[#5A132A]">
            <div className="max-w-7xl mx-auto px-6">

                <div className="bg-white rounded-[40px] p-12 md:p-16 shadow-2xl transition-all
duration-500
hover:-translate-y-2
hover:shadow-[0_35px_80px_rgba(0,0,0,0.18)] ">

                    <div className="text-center">

                        <div className="w-20 h-20 bg-[#7B1E3A] shadow-[0_0_30px_rgba(212,175,55,0.45)] rounded-full flex items-center justify-center mx-auto mb-8">

                            <Mail size={38} className="text-white" />

                        </div>

                        <span className="uppercase tracking-widest text-[#D4AF37] font-semibold">
                            Stay Updated
                        </span>

                        <h2 className="font-[var(--font-playfair)] text-5xl font-bold text-[#7B1E3A] mt-5">
                            Join the Varnika Family
                        </h2>

                        <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full mt-5"></div>

                        <p className="text-gray-600 text-lg mt-8 max-w-2xl mx-auto leading-8">
                            Be the first to discover our latest saree collections,
                            exclusive offers, festive launches and luxury fashion updates.
                        </p>

                        {/* Email Form */}

                        <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">

                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="
w-full md:w-[450px]
px-6
py-4
rounded-xl
border
border-gray-300
outline-none
transition-all
duration-300
focus:border-[#7B1E3A]
focus:ring-4
focus:ring-[#7B1E3A]/20
"
                            />

                            <button className="
bg-[#7B1E3A]
text-white
px-12
py-4
rounded-xl
font-semibold
transition-all
duration-300
hover:bg-[#5A132A]
hover:-translate-y-1
hover:shadow-2xl
active:scale-95
">
                                Subscribe
                            </button>



                        </div>

                        <p className="text-gray-500 mt-6 text-sm">
                            No spam. Only exclusive offers and new arrivals.
                        </p>

                    </div>

                </div>

            </div>
        </section>
    );
}