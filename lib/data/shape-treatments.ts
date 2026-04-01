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
    nameKey: 'butt_contour',
    variants: [
      { id: 'butt-standard', nameKey: 'butt_standard', priceCents: 220000 },
      { id: 'butt-premium', nameKey: 'butt_premium', priceCents: 420000 },
    ],
  },
  {
    id: 'ooglidcorrectie',
    nameKey: 'ooglidcorrectie',
    variants: [
      { id: 'ooglid-boven', nameKey: 'ooglid_boven', priceCents: 150000 },
      { id: 'ooglid-onder', nameKey: 'ooglid_onder', priceCents: 175000 },
      { id: 'ooglid-beide', nameKey: 'ooglid_beide', priceCents: 280000 },
    ],
  },
  {
    id: 'vet-onderkin',
    nameKey: 'vet_onderkin',
    variants: [
      { id: 'onderkin-standard', nameKey: 'onderkin_standard', priceCents: 95000 },
    ],
  },
];
