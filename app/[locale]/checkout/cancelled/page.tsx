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
        <div className="min-h-screen pt-32 pb-24 bg-background-light flex flex-col items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="flex justify-center mb-8">
                    <XCircle size={80} className="text-secondary/20" strokeWidth={1} />
                </div>

                <h1 className="font-display text-display-md text-secondary mb-4 font-light italic">
                    {t('cancelled_title')}
                </h1>

                <p className="font-sans font-light text-secondary/70 text-lg mb-10">
                    {t('cancelled_sub')}
                </p>

                <Link
                    href="/#shop"
                    className="inline-block px-10 py-4 border border-secondary text-secondary rounded-pill font-label text-sm tracking-widest uppercase hover:bg-secondary/5 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                    {t('cancelled_cta')}
                </Link>
            </div>
        </div>
    );
}
