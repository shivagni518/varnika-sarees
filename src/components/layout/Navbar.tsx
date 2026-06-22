export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <div>

                    <h1 className="font-[var(--font-playfair)] text-3xl font-bold text-[#7B1E3A]">
                        Varnika Sarees
                    </h1>
                </div>

                <div className="hidden md:flex gap-8 text-gray-700">
                    <a href="#">Home</a>
                    <a href="#">Shop</a>
                    <a href="#">Collections</a>
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                </div>

                <button className="bg-[#7B1E3A] text-white px-4 py-2 rounded-lg">
                    Login
                </button>

            </div>
        </nav>
    );
}