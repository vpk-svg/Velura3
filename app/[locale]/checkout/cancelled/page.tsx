import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/navigation';
import { XCircle } from 'lucide-react';

export default async function CancelledPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const resolvedParams = await params;
    const locale = resolvedParams.locale;
    const t = await getTranslations({ locale, namespace: 'checkout' });

    return (
        <div className="min-h-screen pt-32 pb-24 bg-brand-ivory flex flex-col items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="flex justify-center mb-8">
                    <XCircle size={80} className="text-brand-charcoal/20" strokeWidth={1} />
                </div>

                <h1 className="font-display text-4xl md:text-5xl text-brand-teal-deep mb-4 font-light italic">
                    {t('cancelled_title')}
                </h1>

                <p className="font-sans font-light text-brand-charcoal/70 text-lg mb-10">
                    {t('cancelled_sub')}
                </p>

                <Link
                    href="/#shop"
                    className="inline-block px-10 py-4 border border-brand-teal-deep text-brand-teal-deep rounded-full font-label text-sm tracking-widest uppercase hover:bg-brand-teal-deep/10 transition-colors"
                >
                    {t('cancelled_cta')}
                </Link>
            </div>
        </div>
    );
}
