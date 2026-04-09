/**
 * Shape treatment data.
 */

export interface ShapeTreatment {
  id: string;
  nameKey: string;
  variants: ShapeVariant[];
}

export interface ShapeVariant {
  id: string;
  nameKey: string;
  priceCents: number;
  description?: string;
}

export const SHAPE_TREATMENTS: ShapeTreatment[] = [
  {
    id: 'butt-contour',
    nameKey: 'treatment_bbl',
    variants: [
      { id: 'butt-standard', nameKey: 'treatment_bbl_variant_standard', priceCents: 220000 },
      { id: 'butt-premium', nameKey: 'treatment_bbl_variant_premium', priceCents: 420000 },
    ],
  },
  {
    id: 'ooglidcorrectie',
    nameKey: 'treatment_eyelid',
    variants: [
      { id: 'ooglid-boven', nameKey: 'treatment_eyelid_variant_upper', priceCents: 150000 },
      { id: 'ooglid-onder', nameKey: 'treatment_eyelid_variant_lower', priceCents: 175000 },
      { id: 'ooglid-beide', nameKey: 'treatment_eyelid_variant_both', priceCents: 280000 },
    ],
  },
  {
    id: 'vet-onderkin',
    nameKey: 'treatment_double_chin',
    variants: [
      { id: 'onderkin-injection', nameKey: 'treatment_double_chin_variant_injection', priceCents: 95000 },
    ],
  },
];

/**
 * Flattened variant list for use with ZoneSelector/FloatingCart.
 */
export const SHAPE_VARIANTS_FLAT = SHAPE_TREATMENTS.flatMap((t) =>
  t.variants.map((v) => ({ id: v.id, nameKey: v.nameKey, priceCents: v.priceCents })),
);
