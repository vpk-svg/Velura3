import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import FillersPageClient from './FillersPageClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'fillers_page' });

  const title = t('meta_title');
  const description = t('meta_desc');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: '/images/treatments/fillers.jpg', width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/treatments/fillers.jpg'],
    },
    alternates: {
      canonical: `/${locale}/fillers`,
      languages: { nl: '/nl/fillers', en: '/en/fillers' },
    },
  };
}

export default function FillersPage() {
  return <FillersPageClient />;
}