/**
 * Server-side Stripe client.
 * SECURITY: Never import from any 'use client' file.
 */
import 'server-only';
import Stripe from 'stripe';

function getStripeInstance(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      '[VELURA] Missing STRIPE_SECRET_KEY environment variable. ' +
      'Set it in .env.local before starting the server.'
    );
  }
  return new Stripe(secretKey, {
    apiVersion: '2024-06-20' as Stripe.LatestApiVersion,
    typescript: true,
  });
}

/** Lazily initialised Stripe instance — throws at call-time if key is missing. */
let _stripe: Stripe | null = null;
export function getStripe(): Stripe {
  if (!_stripe) _stripe = getStripeInstance();
  return _stripe;
}

/** @deprecated Use `getStripe()` for lazy init. Kept for backward compat during migration. */
export const stripe = (() => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    console.warn('[VELURA] STRIPE_SECRET_KEY missing — Stripe calls will fail at runtime.');
    return null as unknown as Stripe;
  }
  return new Stripe(key, {
    apiVersion: '2024-06-20' as Stripe.LatestApiVersion,
    typescript: true,
  });
})();
