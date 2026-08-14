"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

type SortDropdownProps = {
  sort: string;
  setSort: (sort: string) => void;
};

const options = [
  {
    value: "default",
    label: "Sort By",
  },
  {
    value: "newest",
    label: "Newest",
  },
  {
    value: "low-high",
    label: "Price: Low to High",
  },
  {
    value: "high-low",
    label: "Price: High to Low",
  },
  {
    value: "best-selling",
    label: "Best Selling",
  },
  {
    value: "highest-rated",
    label: "Highest Rated",
  },
];

export default function SortDropdown({
  sort,
  setSort,
}: SortDropdownProps) {
  const [open, setOpen] = useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  const selectedOption =
    options.find(
      (option) => option.value === sort
    ) ?? options[0];

  /* =====================================================
     CLOSE WHEN CLICKING OUTSIDE
  ===================================================== */

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =====================================================
     SELECT OPTION
  ===================================================== */

  const handleSelect = (value: string) => {
    setSort(value);
    setOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative w-full"
    >

      {/* =================================================
          DROPDOWN BUTTON
      ================================================= */}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left text-sm shadow-sm transition hover:border-[#7B1E3A] focus:border-[#7B1E3A] focus:outline-none"
      >

        <span
          className={
            sort === "default"
              ? "text-gray-600"
              : "text-gray-900"
          }
        >
          {selectedOption.label}
        </span>

        <ChevronDown
          size={18}
          className={`text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />

      </button>

      {/* =================================================
          DROPDOWN OPTIONS
      ================================================= */}

      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
        >

          {options.map((option) => {

            const isSelected =
              sort === option.value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() =>
                  handleSelect(
                    option.value
                  )
                }
                className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition ${
                  isSelected
                    ? "bg-[#FFF0F4] font-semibold text-[#7B1E3A]"
                    : "text-gray-700 hover:bg-[#FFF8F2]"
                }`}
              >

                <span>
                  {option.label}
                </span>

                {isSelected && (
                  <Check
                    size={17}
                    className="text-[#7B1E3A]"
                  />
                )}

              </button>
            );
          })}

        </div>
      )}

    </div>
  );
}