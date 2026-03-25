import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { productId, priceEur, productName, locale } = body;

        if (!productId || !priceEur || !productName || !locale) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: productName,
                        },
                        unit_amount: priceEur,
                        recurring: {
                            interval: 'month',
                        },
                    },
                    quantity: 1,
                },
            ],
            success_url: `${appUrl}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${appUrl}/${locale}/checkout/cancelled`,
            locale: locale === 'nl' ? 'nl' : 'en',
            metadata: {
                productId,
                productName,
                veluraSource: 'webshop',
            },
        });

        if (!session.url) {
            return NextResponse.json(
                { error: 'Failed to create stripe session url' },
                { status: 500 }
            );
        }

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
        console.error('[STRIPE_CHECKOUT_ERROR]', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
