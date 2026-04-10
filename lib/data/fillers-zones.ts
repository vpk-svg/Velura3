/**
 * Fillers zone data with pricing.
 * Each item represents a specific filler treatment with ML quantity.
 */

export interface FillersZone {
  id: string;
  nameKey: string;
  descKey?: string;
  priceCents: number;
  description?: string;
}

export const FILLERS_ZONES: FillersZone[] = [
  { id: 'lippen-05-ml', nameKey: 'zone_lippen_05ml', descKey: 'desc_lippen_05ml', priceCents: 16500 },
  { id: 'lippen-10-ml', nameKey: 'zone_lippen_10ml', descKey: 'desc_lippen_10ml', priceCents: 29000 },
  { id: 'cheeks-10-ml', nameKey: 'zone_cheeks_10ml', descKey: 'desc_cheeks_10ml', priceCents: 29000 },
  { id: 'cheeks-20-ml', nameKey: 'zone_cheeks_20ml', descKey: 'desc_cheeks_20ml', priceCents: 58000 },
  { id: 'cheeks-30-ml', nameKey: 'zone_cheeks_30ml', descKey: 'desc_cheeks_30ml', priceCents: 87000 },
  { id: 'jawline-10-ml', nameKey: 'zone_jawline_10ml', descKey: 'desc_jawline_10ml', priceCents: 29000 },
  { id: 'jawline-20-ml', nameKey: 'zone_jawline_20ml', descKey: 'desc_jawline_20ml', priceCents: 58000 },
  { id: 'jawline-30-ml', nameKey: 'zone_jawline_30ml', descKey: 'desc_jawline_30ml', priceCents: 87000 },
  { id: 'jawline-40-ml', nameKey: 'zone_jawline_40ml', descKey: 'desc_jawline_40ml', priceCents: 116000 },
  { id: 'chin-10-ml', nameKey: 'zone_chin_10ml', descKey: 'desc_chin_10ml', priceCents: 29000 },
  { id: 'chin-20-ml', nameKey: 'zone_chin_20ml', descKey: 'desc_chin_20ml', priceCents: 58000 },
  { id: 'neus-lippenplooi-10-ml', nameKey: 'zone_neus_lippenplooi_10ml', descKey: 'desc_neus_lippenplooi_10ml', priceCents: 29000 },
  { id: 'neus-lippenplooi-20-ml', nameKey: 'zone_neus_lippenplooi_20ml', descKey: 'desc_neus_lippenplooi_20ml', priceCents: 58000 },
  { id: 'traangoot', nameKey: 'zone_traangoot_ml', descKey: 'desc_traangoot', priceCents: 29000 },
  { id: 'signature-20-ml', nameKey: 'zone_signature_20ml', descKey: 'desc_signature_20ml', priceCents: 58000 },
  { id: 'signature-30-ml', nameKey: 'zone_signature_30ml', descKey: 'desc_signature_30ml', priceCents: 87000 },
  { id: 'signature-40-ml', nameKey: 'zone_signature_40ml', descKey: 'desc_signature_40ml', priceCents: 116000 },
  { id: 'signature-50-ml', nameKey: 'zone_signature_50ml', descKey: 'desc_signature_50ml', priceCents: 145000 },
  { id: 'buttfiller-100ml', nameKey: 'zone_buttfiller_100ml', descKey: 'desc_buttfiller_100ml', priceCents: 275000 },
];
