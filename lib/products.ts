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

/** Type guard to validate a product ID string. */
export function isValidProductId(id: string): id is ProductId {
  return id in PRODUCTS;
}

/** Retrieve a product by ID, or null if not found. */
export function getProduct(id: string) {
  return isValidProductId(id) ? PRODUCTS[id] : null;
}
