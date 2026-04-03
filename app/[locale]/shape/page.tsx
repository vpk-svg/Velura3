import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ShapePageClient from './ShapePageClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'shape_page' });

  const title = t('meta_title');
  const description = t('meta_desc');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: '/images/bbl-example.png', width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/bbl-example.png'],
    },
    alternates: {
      canonical: `/${locale}/shape`,
      languages: { nl: '/nl/shape', en: '/en/shape' },
    },
  };
}

export default function ShapePage() {
  return <ShapePageClient />;
}