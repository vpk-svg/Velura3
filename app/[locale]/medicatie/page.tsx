import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import MedicatiePageClient from './MedicatiePageClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'medicatie_page' });

  const title = t('meta_title');
  const description = t('meta_desc');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: '/images/hero-atmos.webp', width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/hero-atmos.webp'],
    },
    alternates: {
      canonical: `/${locale}/medicatie`,
      languages: { nl: '/nl/medicatie', en: '/en/medicatie' },
    },
  };
}

export default function MedicatiePage() {
  return <MedicatiePageClient />;
}
