import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import FillersPageClient from './FillersPageClient';
import { FAQ_ITEMS } from '@/lib/data/faq';

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
      images: [{ url: '/images/spares/high-angle-woman-getting-lip-fillers.jpg', width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/spares/high-angle-woman-getting-lip-fillers.jpg'],
    },
    alternates: {
      canonical: `/${locale}/fillers`,
      languages: { nl: '/nl/fillers', en: '/en/fillers' },
    },
  };
}

export default async function FillersPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'fillers_page' });

  const fillersFaqs = FAQ_ITEMS.filter((f) => f.category === 'fillers');

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      name: locale === 'nl' ? 'Fillerbehandeling' : 'Filler Treatment',
      description:
        locale === 'nl'
          ? 'Natuurlijke volumeherstel en contouring met premium hyaluronzuurfillers door ervaren BIG-geregistreerde artsen.'
          : 'Natural volume restoration and contouring with premium hyaluronic acid fillers by experienced licensed physicians.',
      procedureType: 'https://schema.org/CosmeticProcedure',
      howPerformed: locale === 'nl' ? 'Injectie met premium hyaluronzuurfillers' : 'Injection with premium hyaluronic acid fillers',
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
        price: '250',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '250',
          priceCurrency: 'EUR',
          unitText: locale === 'nl' ? 'per ml' : 'per ml',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: fillersFaqs.map((faq) => ({
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
      <FillersPageClient />
    </>
  );
}