/**
 * Botox zone data.
 * Each zone has a price of €90.
 */

export interface BotoxZone {
  id: string;
  nameKey: string;
  priceCents: number;
  svgPathId: string;
}

export const BOTOX_PRICE_PER_ZONE = 9000; // €90 in cents

export const BOTOX_ZONES: BotoxZone[] = [
  { id: 'voorhoofd', nameKey: 'zone_voorhoofd', priceCents: BOTOX_PRICE_PER_ZONE, svgPathId: 'forehead' },
  { id: 'frons', nameKey: 'zone_frons', priceCents: BOTOX_PRICE_PER_ZONE, svgPathId: 'glabella' },
  { id: 'kraaienpootjes', nameKey: 'zone_kraaienpootjes', priceCents: BOTOX_PRICE_PER_ZONE, svgPathId: 'crows-feet' },
  { id: 'wenkbrauwen', nameKey: 'zone_wenkbrauwen', priceCents: BOTOX_PRICE_PER_ZONE, svgPathId: 'brow-lift' },
  { id: 'bunny-lines', nameKey: 'zone_bunny_lines', priceCents: BOTOX_PRICE_PER_ZONE, svgPathId: 'bunny-lines' },
  { id: 'lip-flip', nameKey: 'zone_lip_flip', priceCents: BOTOX_PRICE_PER_ZONE, svgPathId: 'lip-flip' },
  { id: 'gummy-smile', nameKey: 'zone_gummy_smile', priceCents: BOTOX_PRICE_PER_ZONE, svgPathId: 'gummy-smile' },
  { id: 'masseter', nameKey: 'zone_masseter', priceCents: BOTOX_PRICE_PER_ZONE, svgPathId: 'masseter' },
  { id: 'kin', nameKey: 'zone_kin', priceCents: BOTOX_PRICE_PER_ZONE, svgPathId: 'chin' },
  { id: 'hals', nameKey: 'zone_hals', priceCents: BOTOX_PRICE_PER_ZONE, svgPathId: 'neck' },
  { id: 'hyperhidrose', nameKey: 'zone_hyperhidrose', priceCents: BOTOX_PRICE_PER_ZONE, svgPathId: 'hyperhidrosis' },
  { id: 'nefertiti', nameKey: 'zone_nefertiti', priceCents: BOTOX_PRICE_PER_ZONE, svgPathId: 'nefertiti' },
];
