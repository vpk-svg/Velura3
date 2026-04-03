import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import TrajectenPageClient from './TrajectenPageClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'trajecten_page' });

  const title = t('meta_title');
  const description = t('meta_desc');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: '/images/hero-atmos.png', width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/hero-atmos.png'],
    },
    alternates: {
      canonical: `/${locale}/trajecten`,
      languages: { nl: '/nl/trajecten', en: '/en/trajecten' },
    },
  };
}

export default function TrajectenPage() {
  return <TrajectenPageClient />;
}
