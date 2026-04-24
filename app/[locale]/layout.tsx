import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Cormorant_Garamond, Jost, Pinyon_Script } from 'next/font/google';
import '../../src/index.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import AiChatbot from '@/components/AiChatbot';
import SocialProofPopup from '@/components/SocialProofPopup';
import StickyMobileActions from '@/components/StickyMobileActions';
import CookieBanner from '@/components/CookieBanner';
import Analytics from '@/components/Analytics';
import { SurveyProvider } from '@/components/survey/SurveyFlow';
import { CartProvider } from '@/lib/cart-context';
import GlobalFloatingCart from '@/components/GlobalFloatingCart';
import { routing } from '@/lib/i18n';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
});

const pinyon = Pinyon_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pinyon',
});

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://fabclinic.be';

export const metadata: Metadata = {
  title: 'FAB CLINIC | Medische Esthetiek & Welzijn',
  description: 'Premium kliniek voor fillers, botox, GLP-1 afslanktrajecten en lifestyle transformatie. Medisch verantwoord, resultaatgericht.',
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: '/',
    languages: {
      'nl': '/nl',
      'en': '/en',
    },
  },
  openGraph: {
    title: 'FAB CLINIC | Medische Esthetiek & Welzijn',
    description: 'Premium kliniek voor fillers, botox, GLP-1 afslanktrajecten en lifestyle transformatie.',
    url: BASE_URL,
    siteName: 'FAB CLINIC',
    locale: 'nl_NL',
    alternateLocale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'FAB CLINIC - Medische Esthetiek & Welzijn',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAB CLINIC | Medische Esthetiek & Welzijn',
    description: 'Premium kliniek voor fillers, botox, GLP-1 afslanktrajecten en lifestyle transformatie.',
    images: ['/images/og-cover.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const resolvedParams = await params;
  const messages = await getMessages({ locale: resolvedParams.locale });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'FAB CLINIC',
    description: 'Premium kliniek voor fillers, botox, GLP-1 afslanktrajecten en lifestyle transformatie.',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    image: `${BASE_URL}/images/og-cover.jpg`,
    telephone: '+31600000000',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BE',
    },
    medicalSpecialty: 'PlasticSurgery',
    priceRange: '€€€',
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '09:00', closes: '17:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '17:00' },
    ],
  };

  return (
    <html lang={resolvedParams.locale} className={`${cormorant.variable} ${jost.variable} ${pinyon.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col cursor-dot-active bg-background-light text-secondary">
        <NextIntlClientProvider messages={messages} locale={resolvedParams.locale}>
          <CartProvider>
            <SurveyProvider>
              <CustomCursor />
              <ScrollProgress />
              <Navbar />
              <main id="main-content" className="flex-grow">
                {children}
              </main>
              <Footer />
              <AiChatbot />
              <SocialProofPopup />
              <StickyMobileActions />
              <GlobalFloatingCart />
              <CookieBanner />
              <Analytics />
            </SurveyProvider>
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
