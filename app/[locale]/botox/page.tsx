import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import BotoxPageClient from './BotoxPageClient';
import { FAQ_ITEMS } from '@/lib/data/faq';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'botox_page' });

  const title = `${t('hero_title')} ${t('hero_title_accent')} | FAB Clinic`;
  const description = t('hero_desc');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: '/images/spares/cosmetic-botox-injection-female-forehead.jpg', width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/spares/cosmetic-botox-injection-female-forehead.jpg'],
    },
    alternates: {
      canonical: `/${locale}/botox`,
      languages: { nl: '/nl/botox', en: '/en/botox' },
    },
  };
}

export default async function BotoxPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'botox_page' });

  const botoxFaqs = FAQ_ITEMS.filter((f) => f.category === 'botox');

  const jsonLd = [
    {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: locale === 'nl' ? 'Botox Behandeling' : 'Botox Treatment',
    description:
      locale === 'nl'
        ? 'Subtiele ontspanning van rimpels door ervaren artsen. Microdoseringen voor een fris en ontspannen uiterlijk.'
        : 'Subtle wrinkle relaxation by experienced physicians. Micro-dosing for a fresh and relaxed appearance.',
    procedureType: 'https://schema.org/CosmeticProcedure',
    howPerformed: locale === 'nl' ? 'Injectie met ultrafijne naalden' : 'Injection with ultra-fine needles',
    preparation: locale === 'nl' ? 'Gratis consult voorafgaand' : 'Free prior consultation',
    followup: locale === 'nl' ? 'Gratis controle na 2 weken' : 'Free follow-up after 2 weeks',
    status: 'https://schema.org/ActiveActionStatus',
    provider: {
      '@type': 'MedicalBusiness',
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
      price: '90',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '90',
        priceCurrency: 'EUR',
        unitText: locale === 'nl' ? 'per zone' : 'per zone',
      },
    },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: botoxFaqs.map((faq) => ({
        '@type': 'Question',
        name: t.has(faq.questionKey) ? t(faq.questionKey) : '',
        acceptedAnswer: {
          '@type': 'Answer',
          text: t.has(faq.answerKey) ? t(faq.answerKey) : '',
        },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BotoxPageClient />
    </>
  );
}
