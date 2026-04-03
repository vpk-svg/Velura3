import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'nl'
      ? 'Privacybeleid | FAB Clinic'
      : 'Privacy Policy | FAB Clinic';
  const description =
    locale === 'nl'
      ? 'Lees ons privacybeleid voor de verwerking van persoonsgegevens bij FAB Clinic.'
      : 'Read our privacy policy for the processing of personal data at FAB Clinic.';

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
      canonical: `/${locale}/privacy`,
    },
  };
}

export default function PrivacyPage() {
  return (
    <section className="min-h-screen bg-background-light pt-36 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-display text-secondary mb-8">
          Privacybeleid
        </h1>
        <div className="prose prose-lg max-w-none text-secondary/80">
          <p>
            Bij FAB Clinic nemen we de bescherming van uw persoonsgegevens zeer serieus.
            Dit privacybeleid legt uit hoe wij uw gegevens verzamelen, gebruiken en beschermen.
          </p>

          <h2>Verwerking van persoonsgegevens</h2>
          <p>
            Wij verwerken persoonsgegevens uitsluitend voor de volgende doeleinden:
          </p>
          <ul>
            <li>Het uitvoeren van behandelingen en afspraken</li>
            <li>Communicatie over uw behandeling</li>
            <li>Facturering en administratie</li>
            <li>Naleving van wettelijke verplichtingen</li>
          </ul>

          <h2>Rechtsgrondslag</h2>
          <p>
            De verwerking van uw persoonsgegevens vindt plaats op basis van:
          </p>
          <ul>
            <li>Uw toestemming</li>
            <li>Uitvoering van een overeenkomst</li>
            <li>Wettelijke verplichting</li>
            <li>Gerechtvaardigd belang</li>
          </ul>

          <h2>Uw rechten</h2>
          <p>
            U heeft de volgende rechten met betrekking tot uw persoonsgegevens:
          </p>
          <ul>
            <li>Recht op inzage</li>
            <li>Recht op rectificatie</li>
            <li>Recht op verwijdering</li>
            <li>Recht op beperking van verwerking</li>
            <li>Recht op overdraagbaarheid</li>
            <li>Recht van bezwaar</li>
          </ul>

          <h2>Contact</h2>
          <p>
            Voor vragen over dit privacybeleid kunt u contact met ons opnemen via
            de contactgegevens op onze website.
          </p>
        </div>
      </div>
    </section>
  );
}