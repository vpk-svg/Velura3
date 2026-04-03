import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'nl'
      ? 'WKKGZ | FAB Clinic'
      : 'WKKGZ | FAB Clinic';
  const description =
    locale === 'nl'
      ? 'Informatie over de Wet kwaliteit, klachten en geschillen zorg (WKKGZ) bij FAB Clinic.'
      : 'Information about the Dutch Healthcare Quality, Complaints and Disputes Act (WKKGZ) at FAB Clinic.';

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
      canonical: `/${locale}/wkkgz`,
    },
  };
}

export default function WKKGZPage() {
  return (
    <section className="min-h-screen bg-background-light pt-36 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-display text-secondary mb-8">
          Wet Kwaliteit, Klachten en Geschillen Zorg (WKKGZ)
        </h1>
        <div className="prose prose-lg max-w-none text-secondary/80">
          <p>
            FAB Clinic is aangesloten bij de Wet kwaliteit, klachten en geschillen zorg (WKKGZ).
            Deze wet regelt de kwaliteit van zorg, het indienen van klachten en het oplossen van geschillen.
          </p>

          <h2>Kwaliteit van zorg</h2>
          <p>
            Wij streven naar de hoogste kwaliteit van zorg. Al onze behandelingen worden
            uitgevoerd door BIG-geregistreerde artsen en voldoen aan de geldende kwaliteitseisen.
          </p>

          <h2>Klachtenprocedure</h2>
          <p>
            Mocht u niet tevreden zijn over onze zorg, dan kunt u een klacht indienen.
            Wij nemen klachten serieus en streven naar een adequate oplossing.
          </p>

          <h3>Hoe kunt u een klacht indienen?</h3>
          <ul>
            <li>Neem contact met ons op via telefoon of e-mail</li>
            <li>Beschrijf duidelijk wat er is voorgevallen</li>
            <li>Wij reageren binnen 5 werkdagen</li>
          </ul>

          <h2>Geschillencommissie</h2>
          <p>
            Als een klacht niet naar tevredenheid wordt opgelost, kunt u zich wenden
            tot de geschillencommissie. FAB Clinic is aangesloten bij de geschillencommissie
            voor de gezondheidszorg.
          </p>

          <h2>Contact</h2>
          <p>
            Voor vragen over de WKKGZ of het indienen van een klacht kunt u contact
            met ons opnemen via de contactgegevens op onze website.
          </p>
        </div>
      </div>
    </section>
  );
}