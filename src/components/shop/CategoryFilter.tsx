"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type CategoryFilterProps = {
  category: string;
  setCategory: (category: string) => void;
};

const categories = [
  "All",
  "Kanchipuram",
  "Banarasi",
  "Bridal",
  "Designer",
  "Cotton",
  "Festive",
];

export default function CategoryFilter({
  category,
  setCategory,
}: CategoryFilterProps) {
  const [open, setOpen] = useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

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

  const selectedLabel =
    category === "All"
      ? "All Categories"
      : category;

  return (
    <div
      ref={dropdownRef}
      className="relative w-full sm:w-48"
    >
      {/* =========================================
          BUTTON
      ========================================= */}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex
          h-11
          w-full
          items-center
          justify-between
          rounded-lg
          border
          border-gray-300
          bg-white
          px-3
          text-sm
          text-gray-700
          shadow-sm
          outline-none
          transition
          hover:border-[#7B1E3A]
          focus:border-[#7B1E3A]
        "
      >
        <span className="truncate">
          {selectedLabel}
        </span>

        <ChevronDown
          size={16}
          className={`ml-2 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* =========================================
          DROPDOWN
      ========================================= */}

      {open && (
        <div
          className="
            absolute
            left-0
            right-0
            top-full
            z-50
            mt-2
            max-h-64
            overflow-y-auto
            rounded-xl
            border
            border-gray-200
            bg-white
            p-1
            shadow-xl
          "
        >
          {categories.map((item) => {
            const isSelected =
              category === item;

            const label =
              item === "All"
                ? "All Categories"
                : item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setCategory(item);
                  setOpen(false);
                }}
                className={`
                  flex
                  w-full
                  items-center
                  rounded-lg
                  px-3
                  py-2.5
                  text-left
                  text-sm
                  transition
                  ${
                    isSelected
                      ? "bg-[#FFF0F4] font-semibold text-[#7B1E3A]"
                      : "text-gray-700 hover:bg-[#FFF8F2]"
                  }
                `}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}