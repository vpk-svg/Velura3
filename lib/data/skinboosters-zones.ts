/**
 * Skinboosters zone data with pricing.
 * Each item represents a specific skinbooster treatment.
 */

export interface SkinboostersZone {
    id: string;
    nameKey: string;
    shortDescKey: string;
    whyKey: string;
    priceCents: number;
}

export const SKINBOOSTERS_ZONES: SkinboostersZone[] = [
    { id: 'profhilo-gezicht', nameKey: 'zone_profhilo_gezicht', shortDescKey: 'zone_profhilo_gezicht_short', whyKey: 'zone_profhilo_gezicht_why', priceCents: 0 },
    { id: 'profhilo-hals', nameKey: 'zone_profhilo_hals', shortDescKey: 'zone_profhilo_hals_short', whyKey: 'zone_profhilo_hals_why', priceCents: 0 },
    { id: 'profhilo-decollete', nameKey: 'zone_profhilo_decollete', shortDescKey: 'zone_profhilo_decollete_short', whyKey: 'zone_profhilo_decollete_why', priceCents: 0 },
    { id: 'profhilo-gezicht-hals', nameKey: 'zone_profhilo_gezicht_hals', shortDescKey: 'zone_profhilo_gezicht_hals_short', whyKey: 'zone_profhilo_gezicht_hals_why', priceCents: 0 },
    { id: 'profhilo-structura', nameKey: 'zone_profhilo_structura', shortDescKey: 'zone_profhilo_structura_short', whyKey: 'zone_profhilo_structura_why', priceCents: 0 },
    { id: 'restylane', nameKey: 'zone_restylane', shortDescKey: 'zone_restylane_short', whyKey: 'zone_restylane_why', priceCents: 0 },
    { id: 'juvederm-volite', nameKey: 'zone_juvederm_volite', shortDescKey: 'zone_juvederm_volite_short', whyKey: 'zone_juvederm_volite_why', priceCents: 0 },
    { id: 'aquashine-ptx', nameKey: 'zone_aquashine_ptx', shortDescKey: 'zone_aquashine_ptx_short', whyKey: 'zone_aquashine_ptx_why', priceCents: 0 },
    { id: 'nctf-135-ha', nameKey: 'zone_nctf', shortDescKey: 'zone_nctf_short', whyKey: 'zone_nctf_why', priceCents: 0 },
];
