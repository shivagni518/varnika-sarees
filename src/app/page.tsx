import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FFF8F0]">
        <section className="flex flex-col items-center justify-center h-screen text-center">
          <h1 className="text-6xl font-bold text-[#7B1E3A]">
            Varnika Sarees
          </h1>

          <p className="mt-4 text-xl text-gray-700">
            Weaving Elegance Into Every Thread
          </p>

          <button className="mt-8 bg-[#7B1E3A] text-white px-6 py-3 rounded-xl">
            Explore Collection
          </button>
        </section>
      </main>
    </>
  );
}