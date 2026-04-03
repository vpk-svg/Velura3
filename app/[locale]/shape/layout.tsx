import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://fabclinic.be';

export const metadata: Metadata = {
  title: 'BBL Bilfillers & Body Contouring | FAB CLINIC',
  description:
    'Veilige BBL bilfillers en body contouring door BIG-geregistreerde specialisten. Geen operatie, geen hersteltijd. Bekijk prijzen en plan een gratis consult.',
  alternates: {
    canonical: '/nl/shape',
    languages: { nl: '/nl/shape', en: '/en/shape' },
  },
  openGraph: {
    title: 'BBL Bilfillers & Body Contouring | FAB CLINIC',
    description:
      'Veilige BBL bilfillers en body contouring door BIG-geregistreerde specialisten. Geen operatie, geen hersteltijd.',
    url: `${BASE_URL}/nl/shape`,
    type: 'website',
    images: [{ url: `${BASE_URL}/images/bbl-example.png`, width: 1200, height: 630, alt: 'BBL Body Contouring bij FAB CLINIC' }],
  },
};

export default function ShapeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalProcedure',
            name: 'BBL Bilfillers (Brazilian Butt Lift)',
            procedureType: 'http://schema.org/CosmeticProcedure',
            description:
              'Niet-chirurgische bilvergroting met hyaluronzuur fillers voor natuurlijke contouren zonder operatie.',
            howPerformed: 'Hyaluronzuur fillers worden geïnjecteerd onder lokale verdoving.',
            preparation: 'Gratis consultatie met BIG-geregistreerde arts, BMI-controle, gezondheidsscreening.',
            followup: 'Controle na 2 weken, massage-instructies voor 2 weken, vermijd extreme hitte voor 1 week.',
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
                name: 'BBL Standaard',
                price: '2200',
                priceCurrency: 'EUR',
              },
              {
                '@type': 'Offer',
                name: 'BBL Premium (360°)',
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
