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

export interface TreatmentVariant {
  id: string;
  volumeLabel: string;
  priceCents: number;
}

export interface FillersGroup {
  id: string;
  nameKey: string;
  shortDescKey: string;
  whyKey: string;
  priceCents: number;
  variants?: TreatmentVariant[];
}

export const FILLERS_GROUPS: FillersGroup[] = [
  {
    id: 'lippen-group',
    nameKey: 'zone_lippen',
    shortDescKey: 'zone_lippen_short',
    whyKey: 'zone_lippen_why',
    priceCents: 16500,
    variants: [
      { id: 'lippen-05-ml', volumeLabel: '0,5 ML', priceCents: 16500 },
      { id: 'lippen-10-ml', volumeLabel: '1,0 ML', priceCents: 29000 },
    ]
  },
  {
    id: 'cheeks-group',
    nameKey: 'zone_wangen',
    shortDescKey: 'zone_cheeks_short',
    whyKey: 'zone_cheeks_why',
    priceCents: 29000,
    variants: [
      { id: 'cheeks-10-ml', volumeLabel: '1,0 ML', priceCents: 29000 },
      { id: 'cheeks-20-ml', volumeLabel: '2,0 ML', priceCents: 58000 },
      { id: 'cheeks-30-ml', volumeLabel: '3,0 ML', priceCents: 87000 },
    ]
  },
  {
    id: 'jawline-group',
    nameKey: 'zone_kaaklijn',
    shortDescKey: 'zone_jawline_short',
    whyKey: 'zone_jawline_why',
    priceCents: 29000,
    variants: [
      { id: 'jawline-10-ml', volumeLabel: '1,0 ML', priceCents: 29000 },
      { id: 'jawline-20-ml', volumeLabel: '2,0 ML', priceCents: 58000 },
      { id: 'jawline-30-ml', volumeLabel: '3,0 ML', priceCents: 87000 },
      { id: 'jawline-40-ml', volumeLabel: '4,0 ML', priceCents: 116000 },
    ]
  },
  {
    id: 'chin-group',
    nameKey: 'zone_kin',
    shortDescKey: 'zone_chin_short',
    whyKey: 'zone_chin_why',
    priceCents: 29000,
    variants: [
      { id: 'chin-10-ml', volumeLabel: '1,0 ML', priceCents: 29000 },
      { id: 'chin-20-ml', volumeLabel: '2,0 ML', priceCents: 58000 },
    ]
  },
  {
    id: 'neus-lippenplooi-group',
    nameKey: 'zone_neuslippenplooi',
    shortDescKey: 'zone_neus_lippenplooi_short',
    whyKey: 'zone_neus_lippenplooi_why',
    priceCents: 29000,
    variants: [
      { id: 'neus-lippenplooi-10-ml', volumeLabel: '1,0 ML', priceCents: 29000 },
      { id: 'neus-lippenplooi-20-ml', volumeLabel: '2,0 ML', priceCents: 58000 },
    ]
  },
  {
    id: 'traangoot-group',
    nameKey: 'zone_traangoot_ml',
    shortDescKey: 'zone_traangoot_short',
    whyKey: 'zone_traangoot_why',
    priceCents: 29000,
    variants: [
      { id: 'traangoot', volumeLabel: 'Standaard', priceCents: 29000 }
    ]
  },
  {
    id: 'signature-group',
    nameKey: 'zone_signature',
    shortDescKey: 'zone_signature_short',
    whyKey: 'zone_signature_why',
    priceCents: 58000,
    variants: [
      { id: 'signature-20-ml', volumeLabel: '2,0 ML', priceCents: 58000 },
      { id: 'signature-30-ml', volumeLabel: '3,0 ML', priceCents: 87000 },
      { id: 'signature-40-ml', volumeLabel: '4,0 ML', priceCents: 116000 },
      { id: 'signature-50-ml', volumeLabel: '5,0 ML', priceCents: 145000 },
    ]
  },
  {
    id: 'buttfiller-group',
    nameKey: 'zone_buttfiller',
    shortDescKey: 'zone_buttfiller_short',
    whyKey: 'zone_buttfiller_why',
    priceCents: 275000,
    variants: [
      { id: 'buttfiller-100ml', volumeLabel: '100 ML', priceCents: 275000 },
    ]
  },
  {
    id: 'fillers-oplossen-group',
    nameKey: 'zone_fillers_oplossen',
    shortDescKey: 'zone_fillers_oplossen_short',
    whyKey: 'zone_fillers_oplossen_why',
    priceCents: 8000,
  }
];
