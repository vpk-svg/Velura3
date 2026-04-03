import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CursusPageClient from './CursusPageClient';
import { getCourseDates, type Locale } from '@/lib/clinic-data';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cursus' });

  const title = t('meta_title');
  const description = t('meta_desc');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: '/images/treatments/fillers-hero.jpg', width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/treatments/fillers-hero.jpg'],
    },
    alternates: {
      canonical: `/${locale}/cursus`,
      languages: { nl: '/nl/cursus', en: '/en/cursus' },
    },
  };
}

export default async function CursusPage({ params }: PageProps) {
  const { locale } = await params;
  const dates = getCourseDates(locale as Locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: locale === 'nl' ? 'Cursus Injectables voor Artsen' : 'Injectables Course for Doctors',
    description:
      locale === 'nl'
        ? 'Hands-on injectables cursus voor BIG-geregistreerde artsen. Anatomie, veiligheidszones, complicatiemanagement en premium injectietechniek in kleine groepen.'
        : 'Hands-on injectables course for licensed doctors. Anatomy, safety zones, complication management and premium injection technique in small groups.',
    provider: {
      '@type': 'Organization',
      name: 'FAB Clinic',
      url: 'https://fabclinic.nl',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Nieuwe Stationsstraat 20',
        addressLocality: 'Ede',
        addressCountry: 'NL',
      },
    },
    offers: {
      '@type': 'Offer',
      price: '2500',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `https://fabclinic.nl/${locale}/cursus#aanmelden`,
    },
    coursePrerequisites:
      locale === 'nl'
        ? 'BIG-registratie als arts'
        : 'Medical license registration (BIG)',
    educationalLevel: 'Professional',
    inLanguage: locale === 'nl' ? 'nl-NL' : 'en',
    hasCourseInstance: dates.map((d) => ({
      '@type': 'CourseInstance',
      name: d.title,
      courseMode: 'Onsite',
      location: {
        '@type': 'Place',
        name: 'FAB Clinic',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Nieuwe Stationsstraat 20',
          addressLocality: 'Ede',
          addressCountry: 'NL',
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CursusPageClient />
    </>
  );
}
