/**
 * Authoritative product data for server-side validation.
 * Prices are in EUR cents.
 */
export const PRODUCTS = {
    'ozempic': {
        name: 'Ozempic',
        priceCents: 19900,
    },
    'mounjaro': {
        name: 'Mounjaro',
        priceCents: 29900,
    },
    'wegovy': {
        name: 'Wegovy',
        priceCents: 24900,
    },
    'saxenda': {
        name: 'Saxenda',
        priceCents: 17900,
    },
} as const;

export type ProductId = keyof typeof PRODUCTS;

export function getProduct(id: string) {
    return PRODUCTS[id as ProductId] || null;
}
