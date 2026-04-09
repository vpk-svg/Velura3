import type { Metadata } from 'next';
import BehandelingenPageClient from './BehandelingenPageClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'nl'
      ? 'Behandelingen Overzicht | FAB Clinic'
      : 'Treatment Overview | FAB Clinic';
  const description =
    locale === 'nl'
      ? 'Ontdek Botox, Fillers, Shape en medisch gewichtsverlies bij FAB Clinic in Ede.'
      : 'Discover Botox, Fillers, Shape and medical weight loss at FAB Clinic in Ede.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: '/images/spares/beautiful-young-woman-getting-botox-cosmetic-injection-her-face.jpg', width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/spares/beautiful-young-woman-getting-botox-cosmetic-injection-her-face.jpg'],
    },
    alternates: {
      canonical: `/${locale}/behandelingen`,
      languages: { nl: '/nl/behandelingen', en: '/en/behandelingen' },
    },
  };
}

export default function BehandelingenPage() {
  return <BehandelingenPageClient />;
}