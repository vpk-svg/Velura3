import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === 'nl'
      ? 'Cookiebeleid | FAB Clinic'
      : 'Cookie Policy | FAB Clinic';
  const description =
    locale === 'nl'
      ? 'Lees ons cookiebeleid voor informatie over het gebruik van cookies op onze website.'
      : 'Read our cookie policy for information about the use of cookies on our website.';

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
      canonical: `/${locale}/cookies`,
    },
  };
}

export default function CookiesPage() {
  return (
    <section className="min-h-screen bg-background-light pt-36 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-display text-secondary mb-8">
          Cookiebeleid
        </h1>
        <div className="prose prose-lg max-w-none text-secondary/80">
          <p>
            Deze website gebruikt cookies om uw ervaring te verbeteren en om
            onze diensten te kunnen aanbieden.
          </p>

          <h2>Wat zijn cookies?</h2>
          <p>
            Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen
            wanneer u onze website bezoekt.
          </p>

          <h2>Welke cookies gebruiken wij?</h2>
          <h3>Noodzakelijke cookies</h3>
          <p>
            Deze cookies zijn essentieel voor het functioneren van onze website
            en kunnen niet worden uitgeschakeld.
          </p>

          <h3>Analytische cookies</h3>
          <p>
            Deze cookies helpen ons te begrijpen hoe bezoekers onze website gebruiken,
            zodat we de ervaring kunnen verbeteren.
          </p>

          <h3>Functionele cookies</h3>
          <p>
            Deze cookies onthouden uw voorkeuren en instellingen.
          </p>

          <h2>Cookies beheren</h2>
          <p>
            U kunt cookies beheren via de instellingen van uw browser.
            Houd er rekening mee dat het uitschakelen van cookies de functionaliteit
            van onze website kan beïnvloeden.
          </p>
        </div>
      </div>
    </section>
  );
}