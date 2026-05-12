import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://fabclinic.be';

interface LayoutProps {
  params: Promise<{ locale: string }>;
  children: ReactNode;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'shape_page' });

  const title = t('meta_title');
  const description = t('meta_desc');

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/shape`,
      languages: { nl: '/nl/shape', en: '/en/shape' },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/shape`,
      type: 'website',
      images: [{ url: `${BASE_URL}/images/spares/skincare-woman-beauty-butt-studio-with-wellness-underwear-fitness-cosmetics-liposuction-bum-cellulite-treatment-female-body-with-isolated-white-background-cosmetology.jpg`, width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function ShapeLayout({ params, children }: LayoutProps) {
  const { locale } = await params;
  const isNl = locale === 'nl';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalProcedure',
            name: isNl ? 'BBL Bilfillers (Brazilian Butt Lift)' : 'BBL Butt Fillers (Brazilian Butt Lift)',
            procedureType: 'http://schema.org/CosmeticProcedure',
            description: isNl
              ? 'Niet-chirurgische bilvergroting met hyaluronzuur fillers voor natuurlijke contouren zonder operatie.'
              : 'Non-surgical buttock augmentation with hyaluronic acid fillers for natural contours without surgery.',
            howPerformed: isNl ? 'Hyaluronzuur fillers worden geïnjecteerd onder lokale verdoving.' : 'Hyaluronic acid fillers are injected under local anaesthesia.',
            preparation: isNl ? 'Gratis consultatie met BIG-geregistreerde arts, BMI-controle, gezondheidsscreening.' : 'Free consultation with licensed physician, BMI check, health screening.',
            followup: isNl ? 'Controle na 2 weken, massage-instructies voor 2 weken, vermijd extreme hitte voor 1 week.' : 'Follow-up after 2 weeks, massage instructions for 2 weeks, avoid extreme heat for 1 week.',
            status: 'http://schema.org/ActiveActionStatus',
            provider: {
              '@type': 'MedicalClinic',
              name: 'FAB CLINIC',
              url: BASE_URL,
              medicalSpecialty: 'http://schema.org/PlasticSurgery',
            },
            offers: [
              {
                '@type': 'Offer',
                name: isNl ? 'BBL Standaard' : 'BBL Standard',
                price: '2200',
                priceCurrency: 'EUR',
              },
              {
                '@type': 'Offer',
                name: isNl ? 'BBL Premium (360°)' : 'BBL Premium (360°)',
                price: '4200',
                priceCurrency: 'EUR',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
