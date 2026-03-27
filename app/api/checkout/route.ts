import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getProduct, isValidProductId } from '@/lib/products';

const VALID_LOCALES = ['nl', 'en'] as const;
type Locale = (typeof VALID_LOCALES)[number];

function isValidLocale(value: string): value is Locale {
  return (VALID_LOCALES as readonly string[]).includes(value);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, locale } = body as { productId?: string; locale?: string };

    if (!productId || !locale) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!isValidProductId(productId)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    if (!isValidLocale(locale)) {
      return NextResponse.json({ error: 'Invalid locale' }, { status: 400 });
    }

    const product = getProduct(productId)!;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

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
