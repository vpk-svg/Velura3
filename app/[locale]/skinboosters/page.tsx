import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SkinboostersPageClient from './SkinboostersPageClient';

interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'skinboosters_page' });

    const title = t('meta_title');
    const description = t('meta_desc');

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [{ url: '/images/spares/high-angle-woman-getting-lip-fillers.jpg', width: 1200, height: 630, alt: title }],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/images/spares/high-angle-woman-getting-lip-fillers.jpg'],
        },
        alternates: {
            canonical: `/${locale}/skinboosters`,
            languages: { nl: '/nl/skinboosters', en: '/en/skinboosters' },
        },
    };
}

export default async function SkinboostersPage({ params }: PageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'skinboosters_page' });

    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'MedicalProcedure',
            name: locale === 'nl' ? 'Skinbooster behandeling' : 'Skinbooster Treatment',
            description:
                locale === 'nl'
                    ? 'Diepe hydratatie en huidverjonging met premium skinboosters door ervaren artsen.'
                    : 'Deep hydration and skin rejuvenation with premium skinboosters by experienced physicians.',
            procedureType: 'https://schema.org/CosmeticProcedure',
            howPerformed: locale === 'nl' ? 'Injectie met premium skinboosters' : 'Injection with premium skinboosters',
            preparation: locale === 'nl' ? 'Gratis consult voorafgaand' : 'Free prior consultation',
            followup: locale === 'nl' ? 'Controle' : 'Follow-up check',
            status: 'https://schema.org/ActiveActionStatus',
            provider: {
                '@type': 'MedicalBusiness',
                name: 'FAB Clinic',
                url: 'https://fabclinic.nl',
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Nieuwe Stationsstraat 20',
                    addressLocality: 'Ede',
                    addressCountry: 'NL',
                },
            },
            offers: {
                '@type': 'Offer',
                price: '125',
                priceCurrency: 'EUR',
            },
        }
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <SkinboostersPageClient />
        </>
    );
}
