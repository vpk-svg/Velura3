/**
 * Botox zone data with individualized pricing.
 */

export interface BotoxZone {
  id: string;
  nameKey: string;
  shortDescKey: string;
  whyKey: string;
  priceCents: number;
  svgPathId: string;
}

export const BOTOX_ZONES: BotoxZone[] = [
  { id: 'voorhoofd', nameKey: 'zone_voorhoofd', shortDescKey: 'zone_voorhoofd_short', whyKey: 'zone_voorhoofd_why', priceCents: 11000, svgPathId: 'forehead' },
  { id: 'frons', nameKey: 'zone_frons', shortDescKey: 'zone_frons_short', whyKey: 'zone_frons_why', priceCents: 10000, svgPathId: 'glabella' },
  { id: 'kraaienpootjes', nameKey: 'zone_kraaienpootjes', shortDescKey: 'zone_kraaienpootjes_short', whyKey: 'zone_kraaienpootjes_why', priceCents: 10000, svgPathId: 'crows-feet' },
  { id: 'wenkbrauwen', nameKey: 'zone_wenkbrauwen', shortDescKey: 'zone_wenkbrauwen_short', whyKey: 'zone_wenkbrauwen_why', priceCents: 8000, svgPathId: 'brow-lift' },
  { id: 'bunny-lines', nameKey: 'zone_bunny_lines', shortDescKey: 'zone_bunny_lines_short', whyKey: 'zone_bunny_lines_why', priceCents: 8000, svgPathId: 'bunny-lines' },
  { id: 'lip-flip', nameKey: 'zone_lip_flip', shortDescKey: 'zone_lip_flip_short', whyKey: 'zone_lip_flip_why', priceCents: 8000, svgPathId: 'lip-flip' },
  { id: 'gummy-smile', nameKey: 'zone_gummy_smile', shortDescKey: 'zone_gummy_smile_short', whyKey: 'zone_gummy_smile_why', priceCents: 8000, svgPathId: 'gummy-smile' },
  { id: 'masseter', nameKey: 'zone_masseter', shortDescKey: 'zone_masseter_short', whyKey: 'zone_masseter_why', priceCents: 28000, svgPathId: 'masseter' },
  { id: 'kin', nameKey: 'zone_kin', shortDescKey: 'zone_kin_short', whyKey: 'zone_kin_why', priceCents: 8000, svgPathId: 'chin' },
  { id: 'hyperhidrose', nameKey: 'zone_hyperhidrose', shortDescKey: 'zone_hyperhidrose_short', whyKey: 'zone_hyperhidrose_why', priceCents: 40000, svgPathId: 'hyperhidrosis' },
  { id: 'nefertiti', nameKey: 'zone_nefertiti', shortDescKey: 'zone_nefertiti_short', whyKey: 'zone_nefertiti_why', priceCents: 24000, svgPathId: 'nefertiti' },
];
