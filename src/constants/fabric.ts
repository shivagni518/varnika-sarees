export const FABRIC = {
  PURE_SILK: "Pure Silk",
  BANARASI_SILK: "Banarasi Silk",
  SILK: "Silk",
  COTTON: "Cotton",
  LINEN: "Linen",
  ORGANZA: "Organza",
  GEORGETTE: "Georgette",
} as const;

export type Fabric = (typeof FABRIC)[keyof typeof FABRIC];