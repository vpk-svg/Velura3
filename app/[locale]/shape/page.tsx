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
      images: [{ url: '/images/spares/skincare-woman-beauty-butt-studio-with-wellness-underwear-fitness-cosmetics-liposuction-bum-cellulite-treatment-female-body-with-isolated-white-background-cosmetology.jpg', width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/spares/skincare-woman-beauty-butt-studio-with-wellness-underwear-fitness-cosmetics-liposuction-bum-cellulite-treatment-female-body-with-isolated-white-background-cosmetology.jpg'],
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