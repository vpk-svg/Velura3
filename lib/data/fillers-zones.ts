/**
 * Fillers zone data with pricing.
 * Each item represents a specific filler treatment with ML quantity.
 */

export interface FillersZone {
  id: string;
  nameKey: string;
  shortDescKey: string;
  whyKey: string;
  priceCents: number;
}

export const FILLERS_ZONES: FillersZone[] = [
  { id: 'lippen-05-ml', nameKey: 'zone_lippen_05ml', shortDescKey: 'zone_lippen_short', whyKey: 'zone_lippen_why', priceCents: 16500 },
  { id: 'lippen-10-ml', nameKey: 'zone_lippen_10ml', shortDescKey: 'zone_lippen_short', whyKey: 'zone_lippen_why', priceCents: 29000 },
  { id: 'cheeks-10-ml', nameKey: 'zone_cheeks_10ml', shortDescKey: 'zone_cheeks_short', whyKey: 'zone_cheeks_why', priceCents: 29000 },
  { id: 'cheeks-20-ml', nameKey: 'zone_cheeks_20ml', shortDescKey: 'zone_cheeks_short', whyKey: 'zone_cheeks_why', priceCents: 58000 },
  { id: 'cheeks-30-ml', nameKey: 'zone_cheeks_30ml', shortDescKey: 'zone_cheeks_short', whyKey: 'zone_cheeks_why', priceCents: 87000 },
  { id: 'jawline-10-ml', nameKey: 'zone_jawline_10ml', shortDescKey: 'zone_jawline_short', whyKey: 'zone_jawline_why', priceCents: 29000 },
  { id: 'jawline-20-ml', nameKey: 'zone_jawline_20ml', shortDescKey: 'zone_jawline_short', whyKey: 'zone_jawline_why', priceCents: 58000 },
  { id: 'jawline-30-ml', nameKey: 'zone_jawline_30ml', shortDescKey: 'zone_jawline_short', whyKey: 'zone_jawline_why', priceCents: 87000 },
  { id: 'jawline-40-ml', nameKey: 'zone_jawline_40ml', shortDescKey: 'zone_jawline_short', whyKey: 'zone_jawline_why', priceCents: 116000 },
  { id: 'chin-10-ml', nameKey: 'zone_chin_10ml', shortDescKey: 'zone_chin_short', whyKey: 'zone_chin_why', priceCents: 29000 },
  { id: 'chin-20-ml', nameKey: 'zone_chin_20ml', shortDescKey: 'zone_chin_short', whyKey: 'zone_chin_why', priceCents: 58000 },
  { id: 'neus-lippenplooi-10-ml', nameKey: 'zone_neus_lippenplooi_10ml', shortDescKey: 'zone_neus_lippenplooi_short', whyKey: 'zone_neus_lippenplooi_why', priceCents: 29000 },
  { id: 'neus-lippenplooi-20-ml', nameKey: 'zone_neus_lippenplooi_20ml', shortDescKey: 'zone_neus_lippenplooi_short', whyKey: 'zone_neus_lippenplooi_why', priceCents: 58000 },
  { id: 'traangoot', nameKey: 'zone_traangoot_ml', shortDescKey: 'zone_traangoot_short', whyKey: 'zone_traangoot_why', priceCents: 29000 },
  { id: 'signature-20-ml', nameKey: 'zone_signature_20ml', shortDescKey: 'zone_signature_short', whyKey: 'zone_signature_why', priceCents: 58000 },
  { id: 'signature-30-ml', nameKey: 'zone_signature_30ml', shortDescKey: 'zone_signature_short', whyKey: 'zone_signature_why', priceCents: 87000 },
  { id: 'signature-40-ml', nameKey: 'zone_signature_40ml', shortDescKey: 'zone_signature_short', whyKey: 'zone_signature_why', priceCents: 116000 },
  { id: 'signature-50-ml', nameKey: 'zone_signature_50ml', shortDescKey: 'zone_signature_short', whyKey: 'zone_signature_why', priceCents: 145000 },
  { id: 'buttfiller-100ml', nameKey: 'zone_buttfiller_100ml', shortDescKey: 'zone_buttfiller_short', whyKey: 'zone_buttfiller_why', priceCents: 275000 },
  { id: 'fillers-oplossen', nameKey: 'zone_fillers_oplossen', shortDescKey: 'zone_fillers_oplossen_short', whyKey: 'zone_fillers_oplossen_why', priceCents: 8000 },
];
