import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import WeightlossPageClient from './WeightlossPageClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'weightloss_page' });

  const title = t('meta_title');
  const description = t('meta_desc');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: '/images/treatments/weightloss.jpg', width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/treatments/weightloss.jpg'],
    },
    alternates: {
      canonical: `/${locale}/weightloss`,
      languages: { nl: '/nl/weightloss', en: '/en/weightloss' },
    },
  };
}

export default function WeightlossPage() {
  return <WeightlossPageClient />;
}