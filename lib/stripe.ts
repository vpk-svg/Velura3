/**
 * SECURITY: Server-side only. Never import from any 'use client' file.
 * These are Stripe TEST keys — safe for development, never for production.
 */
import 'server-only';
import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  console.warn(
    '[VELURA_WARNING] Missing STRIPE_SECRET_KEY environment variable. ' +
    'The Stripe integration will NOT function until this is set in the environment.'
  );
}

// Initialize with either the key or a dummy string to prevent the build from crashing
export const stripe = new Stripe(secretKey || 'sk_test_mock_for_build', {
  apiVersion: '2026-02-25.clover' as any,
  typescript: true,
});
