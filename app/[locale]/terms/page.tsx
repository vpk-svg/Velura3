import type { Metadata } from 'next';
import TermsPageClient from './TermsPageClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'nl'
      ? 'Algemene Voorwaarden | FAB Clinic'
      : 'Terms and Conditions | FAB Clinic';
  const description =
    locale === 'nl'
      ? 'Lees de algemene voorwaarden van FAB Clinic voor behandelingen, afspraken, privacy en aansprakelijkheid.'
      : 'Read FAB Clinic terms and conditions for treatments, appointments, privacy, and liability.';

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
      canonical: `/${locale}/terms`,
      languages: { nl: '/nl/terms', en: '/en/terms' },
    },
  };
}

export default function TermsPage() {
  return <TermsPageClient />;
}