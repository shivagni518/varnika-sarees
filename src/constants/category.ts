export const CATEGORY = {
  KANCHIPURAM: "Kanchipuram",
  BANARASI: "Banarasi",
  BRIDAL: "Bridal",
  DESIGNER: "Designer",
  COTTON: "Cotton",
  FESTIVE: "Festive",
} as const;

export type Category =
  (typeof CATEGORY)[keyof typeof CATEGORY];