export const COLOR = {
  MAROON: "Maroon",
  RED: "Red",
  GREEN: "Green",
  BLUE: "Blue",
  NAVY_BLUE: "Navy Blue",
  PURPLE: "Purple",
  PINK: "Pink",
  MAGENTA: "Magenta",
  GOLD: "Gold",
  YELLOW: "Yellow",
  ORANGE: "Orange",
  WHITE: "White",
  BLACK: "Black",
} as const;

export type Color =
  (typeof COLOR)[keyof typeof COLOR];