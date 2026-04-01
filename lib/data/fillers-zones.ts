/**
 * Fillers zone data with pricing.
 */

export interface FillersZone {
  id: string;
  nameKey: string;
  priceCents: number;
  description?: string;
}

export const FILLERS_ZONES: FillersZone[] = [
  { id: 'lippen', nameKey: 'zone_lippen', priceCents: 35000 },
  { id: 'kin', nameKey: 'zone_kin', priceCents: 35000 },
  { id: 'kaaklijn', nameKey: 'zone_kaaklijn', priceCents: 45000 },
  { id: 'neuslippenplooi', nameKey: 'zone_neuslippenplooi', priceCents: 30000 },
  { id: 'wangen', nameKey: 'zone_wangen', priceCents: 45000 },
  { id: 'tranen-trog', nameKey: 'zone_tranen_trog', priceCents: 40000 },
  { id: 'slapen', nameKey: 'zone_slapen', priceCents: 35000 },
  { id: 'neus', nameKey: 'zone_neus', priceCents: 35000 },
  { id: 'marionetten', nameKey: 'zone_marionetten', priceCents: 30000 },
];
