import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/navigation';
import { Check, Mail, Phone, Calendar } from 'lucide-react';

interface CheckoutSession {
  status: string;
  customer_email: string;
  amount_total: number;
  currency: string;
  product_name?: string;
}

async function getSession(sessionId: string): Promise<CheckoutSession | null> {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${appUrl}/api/checkout/verify?session_id=${encodeURIComponent(sessionId)}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function SuccessPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ session_id?: string }>;
}) {
    const resolvedParams = await params;
    const locale = resolvedParams.locale;
    const resolvedSearchParams = await searchParams;
    const sessionId = resolvedSearchParams.session_id;

    const t = await getTranslations({ locale, namespace: 'checkout' });
    const session = sessionId ? await getSession(sessionId) : null;

    const formattedAmount = session
        ? new Intl.NumberFormat(locale, { style: 'currency', currency: session.currency || 'EUR' }).format(session.amount_total / 100)
        : '';

    return (
        <div className="min-h-screen pt-32 pb-24 bg-background-light flex flex-col items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* Checkmark */}
                <div className="flex justify-center mb-8">
                    <div className="relative w-24 h-24">
                        <div className="absolute inset-0 rounded-full border-4 border-primary opacity-20" />
                        <div className="absolute inset-0 flex items-center justify-center text-primary">
                            <Check size={48} strokeWidth={3} />
                        </div>
                    </div>
                </div>

                <h1 className="font-display text-display-md text-secondary mb-4 font-light italic">
                    {t('success_title')}
                </h1>

                {session && (
                    <div className="mb-6 p-6 bg-white rounded-md border border-primary/10 shadow-soft-sm">
                        <p className="font-sans font-light text-secondary/60 mb-2">{session.customer_email}</p>
                        <p className="font-display text-2xl text-primary font-semibold">{formattedAmount}</p>
                    </div>
                )}

                <p className="font-sans font-light text-secondary/70 text-lg mb-8">
                    {t('success_sub')}
                </p>

                {/* What happens next timeline */}
                <div className="mb-10 text-left space-y-0">
                    {[
                        { icon: Mail, text: locale === 'nl' ? 'Bevestigingsmail wordt verzonden' : 'Confirmation email is being sent' },
                        { icon: Phone, text: locale === 'nl' ? 'Onze arts neemt contact met u op' : 'Our doctor will contact you' },
                        { icon: Calendar, text: locale === 'nl' ? 'Uw behandeling wordt ingepland' : 'Your treatment will be scheduled' },
                    ].map((step, i) => (
                        <div key={i} className="flex items-start gap-4 py-3">
                            <div className="flex flex-col items-center">
                                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <step.icon size={16} className="text-primary" />
                                </div>
                                {i < 2 && <div className="w-px h-6 bg-primary/15 mt-1" />}
                            </div>
                            <div className="pt-2">
                                <p className="font-sans text-sm text-secondary">{step.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <Link
                    href="/"
                    className="inline-block px-10 py-4 bg-primary text-white rounded-pill font-sans text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors shadow-gold-glow focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                    {t('success_cta')}
                </Link>
            </div>
        </div>
    );
}
