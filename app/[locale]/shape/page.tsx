import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ShapePageClient from './ShapePageClient';
import { FAQ_ITEMS } from '@/lib/data/faq';

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

export default async function ShapePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'shape_page' });

  const shapeFaqs = FAQ_ITEMS.filter((f) => f.category === 'shape');

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      name: locale === 'nl' ? 'Non-Chirurgische BBL' : 'Non-Surgical BBL',
      description:
        locale === 'nl'
          ? 'Lichaamscontouring zonder operatie met premium fillers. Veilig alternatief voor chirurgische BBL door ervaren artsen.'
          : 'Body contouring without surgery using premium fillers. Safe alternative to surgical BBL by experienced physicians.',
      procedureType: 'https://schema.org/CosmeticProcedure',
      howPerformed: locale === 'nl' ? 'Injectie met premium lichaamsfillers' : 'Injection with premium body fillers',
      preparation: locale === 'nl' ? 'Gratis consult en BMI-check' : 'Free consultation and BMI check',
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
        price: '3500',
        priceCurrency: 'EUR',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: shapeFaqs.map((faq) => ({
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
      <ShapePageClient />
    </>
  );
}