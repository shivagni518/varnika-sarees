export const SORT_OPTIONS = [
  {
    value: "featured",
    label: "Featured",
  },
  {
    value: "price-low",
    label: "Price: Low to High",
  },
  {
    value: "price-high",
    label: "Price: High to Low",
  },
  {
    value: "rating",
    label: "Top Rated",
  },
  {
    value: "newest",
    label: "Newest",
  },
] as const;

export type SortOption =
  (typeof SORT_OPTIONS)[number]["value"];