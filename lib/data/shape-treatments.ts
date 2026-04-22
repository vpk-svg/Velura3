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
  shortDescKey: string;
  whyKey: string;
  description?: string;
}

export const SHAPE_TREATMENTS: ShapeTreatment[] = [
  {
    id: 'butt-contour',
    nameKey: 'treatment_bbl',
    variants: [
      { id: 'butt-standard', nameKey: 'treatment_bbl_variant_standard', priceCents: 220000, shortDescKey: 'treatment_bbl_variant_standard_short', whyKey: 'treatment_bbl_variant_standard_why' },
      { id: 'butt-premium', nameKey: 'treatment_bbl_variant_premium', priceCents: 420000, shortDescKey: 'treatment_bbl_variant_premium_short', whyKey: 'treatment_bbl_variant_premium_why' },
    ],
  },
];

/**
 * Flattened variant list for use with ZoneSelector/FloatingCart.
 */
export const SHAPE_VARIANTS_FLAT = SHAPE_TREATMENTS.flatMap((t) =>
  t.variants.map((v) => ({ id: v.id, nameKey: v.nameKey, priceCents: v.priceCents, shortDescKey: v.shortDescKey, whyKey: v.whyKey })),
);
