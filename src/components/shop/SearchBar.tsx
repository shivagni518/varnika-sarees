type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {
  return (
    <div className="w-full lg:max-w-lg">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Search Products
      </label>

      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition focus-within:ring-2 focus-within:ring-[#7B1E3A]/30">
        <input
        
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Banarasi, Bridal, Cotton..."
          className="w-full bg-transparent px-5 py-4 pr-14 text-gray-700 placeholder-gray-400 outline-none"
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-[#7B1E3A] p-2 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}