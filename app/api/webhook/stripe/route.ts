import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { Resend } from 'resend';
import * as React from 'react';
import OrderConfirmationEmail from '@/components/emails/OrderConfirmation';
import type Stripe from 'stripe';

export const dynamic = 'force-dynamic';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get('Stripe-Signature') as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret || webhookSecret === 'whsec_test_placeholder') {
        console.error('[WEBHOOK_ERROR] Missing or invalid STRIPE_WEBHOOK_SECRET. You must replace "whsec_test_placeholder" in .env.local with your real Stripe Webhook Secret (run "stripe listen --forward-to localhost:3000/api/webhook/stripe" in terminal).');
        return NextResponse.json({ error: 'Webhook secret missing or invalid' }, { status: 500 });
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error(`[WEBHOOK_ERROR] Stripe signature verification failed:`, message);
        return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
    }

    console.log(`[WEBHOOK_EVENT] Received event: ${event.type}`);

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerEmail = session.customer_details?.email ?? 'Klant';
        const amountTotal = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: session.currency || 'EUR' }).format((session.amount_total || 0) / 100);
        const productName = session.metadata?.productName || 'Velura Behandeling';
        const orderNumber = session.id.slice(-8).toUpperCase();

        console.log(`[WEBHOOK_STRIPE] Checkout Session valid for: ${customerEmail}`);

        if (resend) {
            try {
                console.log(`[WEBHOOK_ACTION] Attempting to dispatch Resend email to ${customerEmail}...`);

                // We use onboarding@resend.dev as the sender identity, which is strictly required by Resend before you verify a custom DNS domain!
                const { data, error } = await resend.emails.send({
                    from: 'Velura <onboarding@resend.dev>',
                    to: customerEmail === 'Klant' ? 'onbekend@example.com' : customerEmail,
                    subject: `Bevestiging van uw aanvraag - Order #${orderNumber}`,
                    react: OrderConfirmationEmail({
                        customerEmail,
                        orderNumber,
                        totalAmount: amountTotal,
                        productName,
                    }) as React.ReactElement,
                });

                if (error) {
                    console.error('[WEBHOOK_ERROR] Resend API rejected the email request:', error);
                    // NOTE: If you are using a free Resend tier and no verified domain, you can ONLY send emails to the exact email address you registered your Resend account with. Sending to random test addresses will fail here.
                } else {
                    console.log(`[WEBHOOK_SUCCESS] 📨 Email dispatched successfully via Resend. ID:`, data?.id);
                }
            } catch (err) {
                console.error('[WEBHOOK_FATAL] Email failed to construct or connect via Resend SDK:', err);
            }
        } else {
            console.warn('[WEBHOOK_STRIPE] Resend API Key is missing from .env.local. Email skipping.');
        }
    }

    return NextResponse.json({ received: true });
}
