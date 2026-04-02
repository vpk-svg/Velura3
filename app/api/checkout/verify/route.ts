import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json({ error: 'Missing session_id query parameter' }, { status: 400 });
    }

    // Basic format validation - Stripe session IDs start with 'cs_'
    if (!sessionId.startsWith('cs_')) {
      return NextResponse.json({ error: 'Invalid session_id format' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      status: session.status,
      customer_email: session.customer_details?.email,
      amount_total: session.amount_total,
      currency: session.currency,
      product_name: session.metadata?.productName,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('[STRIPE_VERIFY_ERROR]', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
