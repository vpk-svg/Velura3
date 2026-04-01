/**
 * SEO treatment data for dynamic landing pages.
 * Each treatment maps to a slug used in the URL.
 */

export interface SeoTreatment {
  slug: string;
  category: 'botox' | 'fillers' | 'shape' | 'weightloss';
  titleKey: string;
  descKey: string;
  heroImage: string;
  priceFrom?: string;
  features: string[]; // translation keys
}

export const SEO_TREATMENTS: SeoTreatment[] = [
  // Botox
  { slug: 'voorhoofd-botox', category: 'botox', titleKey: 'voorhoofd_title', descKey: 'voorhoofd_desc', heroImage: '/images/treatments/botox.jpg', priceFrom: '€90', features: ['voorhoofd_f1', 'voorhoofd_f2', 'voorhoofd_f3'] },
  { slug: 'frons-botox', category: 'botox', titleKey: 'frons_title', descKey: 'frons_desc', heroImage: '/images/treatments/botox.jpg', priceFrom: '€90', features: ['frons_f1', 'frons_f2', 'frons_f3'] },
  { slug: 'kraaienpootjes-botox', category: 'botox', titleKey: 'kraaienpootjes_title', descKey: 'kraaienpootjes_desc', heroImage: '/images/treatments/botox.jpg', priceFrom: '€90', features: ['kraaienpootjes_f1', 'kraaienpootjes_f2', 'kraaienpootjes_f3'] },
  { slug: 'masseter-botox', category: 'botox', titleKey: 'masseter_title', descKey: 'masseter_desc', heroImage: '/images/treatments/botox.jpg', priceFrom: '€90', features: ['masseter_f1', 'masseter_f2', 'masseter_f3'] },
  { slug: 'hyperhidrose-behandeling', category: 'botox', titleKey: 'hyperhidrose_title', descKey: 'hyperhidrose_desc', heroImage: '/images/treatments/botox.jpg', priceFrom: '€90', features: ['hyperhidrose_f1', 'hyperhidrose_f2', 'hyperhidrose_f3'] },
  // Fillers
  { slug: 'lip-fillers', category: 'fillers', titleKey: 'lippen_title', descKey: 'lippen_desc', heroImage: '/images/treatments/fillers.jpg', priceFrom: '€350', features: ['lippen_f1', 'lippen_f2', 'lippen_f3'] },
  { slug: 'kaaklijn-fillers', category: 'fillers', titleKey: 'kaaklijn_title', descKey: 'kaaklijn_desc', heroImage: '/images/treatments/fillers.jpg', priceFrom: '€450', features: ['kaaklijn_f1', 'kaaklijn_f2', 'kaaklijn_f3'] },
  { slug: 'wangen-fillers', category: 'fillers', titleKey: 'wangen_title', descKey: 'wangen_desc', heroImage: '/images/treatments/fillers.jpg', priceFrom: '€450', features: ['wangen_f1', 'wangen_f2', 'wangen_f3'] },
  { slug: 'tranengroeven-fillers', category: 'fillers', titleKey: 'tranen_title', descKey: 'tranen_desc', heroImage: '/images/treatments/fillers.jpg', priceFrom: '€400', features: ['tranen_f1', 'tranen_f2', 'tranen_f3'] },
  { slug: 'neus-fillers', category: 'fillers', titleKey: 'neus_title', descKey: 'neus_desc', heroImage: '/images/treatments/fillers.jpg', priceFrom: '€350', features: ['neus_f1', 'neus_f2', 'neus_f3'] },
  // Shape
  { slug: 'bbl-brazilian-butt-lift', category: 'shape', titleKey: 'bbl_title', descKey: 'bbl_desc', heroImage: '/images/treatments/shape.jpg', priceFrom: '€2.200', features: ['bbl_f1', 'bbl_f2', 'bbl_f3'] },
  { slug: 'ooglidcorrectie', category: 'shape', titleKey: 'eyelid_title', descKey: 'eyelid_desc', heroImage: '/images/treatments/shape.jpg', priceFrom: '€1.200', features: ['eyelid_f1', 'eyelid_f2', 'eyelid_f3'] },
  { slug: 'onderkin-behandeling', category: 'shape', titleKey: 'chin_title', descKey: 'chin_desc', heroImage: '/images/treatments/shape.jpg', priceFrom: '€800', features: ['chin_f1', 'chin_f2', 'chin_f3'] },
  // Weightloss
  { slug: 'ozempic-afvallen', category: 'weightloss', titleKey: 'ozempic_title', descKey: 'ozempic_desc', heroImage: '/images/treatments/weightloss.jpg', priceFrom: '€199/mnd', features: ['ozempic_f1', 'ozempic_f2', 'ozempic_f3'] },
  { slug: 'mounjaro-afvallen', category: 'weightloss', titleKey: 'mounjaro_title', descKey: 'mounjaro_desc', heroImage: '/images/treatments/weightloss.jpg', priceFrom: '€299/mnd', features: ['mounjaro_f1', 'mounjaro_f2', 'mounjaro_f3'] },
  { slug: 'wegovy-afvallen', category: 'weightloss', titleKey: 'wegovy_title', descKey: 'wegovy_desc', heroImage: '/images/treatments/weightloss.jpg', priceFrom: '€249/mnd', features: ['wegovy_f1', 'wegovy_f2', 'wegovy_f3'] },
  { slug: 'saxenda-afvallen', category: 'weightloss', titleKey: 'saxenda_title', descKey: 'saxenda_desc', heroImage: '/images/treatments/weightloss.jpg', priceFrom: '€179/mnd', features: ['saxenda_f1', 'saxenda_f2', 'saxenda_f3'] },
  { slug: 'glp1-medicatie', category: 'weightloss', titleKey: 'glp1_title', descKey: 'glp1_desc', heroImage: '/images/treatments/weightloss.jpg', features: ['glp1_f1', 'glp1_f2', 'glp1_f3'] },
  { slug: 'medisch-afvallen', category: 'weightloss', titleKey: 'medical_title', descKey: 'medical_desc', heroImage: '/images/treatments/weightloss.jpg', features: ['medical_f1', 'medical_f2', 'medical_f3'] },
];

export function getSeoTreatment(slug: string) {
  return SEO_TREATMENTS.find((t) => t.slug === slug) ?? null;
}
