export const OCCASION = {
  WEDDING: "Wedding",
  BRIDAL: "Bridal",
  FESTIVE: "Festive",
  PARTY_WEAR: "Party Wear",
  TRADITIONAL: "Traditional",
  CASUAL: "Casual",
} as const;

export type Occasion =
  (typeof OCCASION)[keyof typeof OCCASION];