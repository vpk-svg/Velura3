/**
 * SECURITY: Server-side only. Never import from any 'use client' file.
 * These are Stripe TEST keys — safe for development, never for production.
 */
import 'server-only';
import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error(
    '[VELURA] Missing STRIPE_SECRET_KEY environment variable. ' +
    'Please add it to your .env.local file. ' +
    'You can find your test key at https://dashboard.stripe.com/test/apikeys'
  );
}

export const stripe = new Stripe(secretKey, {
  apiVersion: '2026-02-25.clover' as any,
  typescript: true,
});
