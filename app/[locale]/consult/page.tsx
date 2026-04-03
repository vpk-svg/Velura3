import type { Metadata } from 'next';
import ConsultPageClient from './ConsultPageClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'nl'
      ? 'Gratis Consult Kiezen | FAB Clinic'
      : 'Choose Your Free Consultation | FAB Clinic';
  const description =
    locale === 'nl'
      ? 'Kies tussen behandeling, medicatie of intake en plan direct uw consult bij FAB Clinic.'
      : 'Choose treatment, medication or intake and book your consultation at FAB Clinic.';

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
      canonical: `/${locale}/consult`,
      languages: { nl: '/nl/consult', en: '/en/consult' },
    },
  };
}

export default function ConsultPage() {
  return <ConsultPageClient />;
}