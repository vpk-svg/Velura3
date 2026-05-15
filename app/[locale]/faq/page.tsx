import type { Metadata } from 'next';
import FaqPageClient from './FaqPageClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isNl = locale === 'nl';
  const title = isNl ? 'FAQ Fillers, Botox en Obesitas | FAB Clinic' : 'FAQ Fillers, Botox and Obesity Treatment | FAB Clinic';
  const description = isNl
    ? 'Lees 90 veelgestelde vragen over fillers, botox en obesitasbehandeling bij FAB Clinic.'
    : 'Browse 90 frequently asked questions about fillers, botox and obesity treatment at FAB Clinic.';

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
      canonical: `/${locale}/faq`,
      languages: { nl: '/nl/faq', en: '/en/faq' },
    },
  };
}

export default async function FaqPage({ params }: PageProps) {
  const { locale } = await params;

  return <FaqPageClient key={locale} />;
}
