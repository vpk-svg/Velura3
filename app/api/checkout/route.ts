import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getProduct, isValidProductId } from '@/lib/products';

const VALID_LOCALES = ['nl', 'en'] as const;
type Locale = (typeof VALID_LOCALES)[number];

function isValidLocale(value: string): value is Locale {
  return (VALID_LOCALES as readonly string[]).includes(value);
}

/* ── Simple in-memory rate limiter (per IP, 10 requests / 60s) ─── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

interface ZoneLineItem {
  id: string;
  name: string;
  priceCents: number;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await req.json();
    const { mode, locale } = body as { mode?: string; locale?: string };

    if (!locale || !isValidLocale(locale)) {
      return NextResponse.json({ error: 'Invalid or missing locale' }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // ── Payment mode: one-time treatment booking (Botox / Fillers) ──
    if (mode === 'payment') {
      const { treatmentType, zones, customerDetails } = body as {
        treatmentType?: string;
        zones?: ZoneLineItem[];
        customerDetails?: Record<string, string>;
      };

      if (!treatmentType || !zones || zones.length === 0) {
        return NextResponse.json({ error: 'Missing treatment data' }, { status: 400 });
      }

      // Validate zone prices are positive integers
      for (const zone of zones) {
        if (!Number.isInteger(zone.priceCents) || zone.priceCents <= 0) {
          return NextResponse.json({ error: 'Invalid zone price' }, { status: 400 });
        }
      }

      const lineItems = zones.map((zone) => ({
        price_data: {
          currency: 'eur' as const,
          product_data: { name: `${treatmentType} - ${zone.name}` },
          unit_amount: zone.priceCents,
        },
        quantity: 1,
      }));

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: lineItems,
        success_url: `${appUrl}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/${locale}/checkout/cancelled`,
        locale,
        metadata: {
          treatmentType,
          zoneIds: zones.map((z) => z.id).join(','),
          customerEmail: customerDetails?.email || '',
          customerName: `${customerDetails?.firstName || ''} ${customerDetails?.lastName || ''}`.trim(),
          bookingSlot: body.bookingSlot || '',
          veluraSource: 'treatment-booking',
        },
      });

      if (!session.url) {
        return NextResponse.json({ error: 'Failed to create Stripe session URL' }, { status: 500 });
      }

      return NextResponse.json({ sessionId: session.id, url: session.url });
    }

    // ── Subscription mode: monthly medication (default) ──
    const { productId } = body as { productId?: string };

    if (!productId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!isValidProductId(productId)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    const product = getProduct(productId)!;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: { name: product.name },
            unit_amount: product.priceCents,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/${locale}/checkout/cancelled`,
      locale,
      metadata: {
        productId,
        productName: product.name,
        veluraSource: 'webshop',
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Failed to create Stripe session URL' }, { status: 500 });
    }

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('[STRIPE_CHECKOUT_ERROR]', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
