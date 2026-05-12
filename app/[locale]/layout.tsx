import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Cormorant_Garamond, Jost, Pinyon_Script } from 'next/font/google';
import '../../src/index.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isNl = locale === 'nl';

  return {
    title: isNl ? 'FAB CLINIC | Medische Esthetiek & Welzijn' : 'FAB CLINIC | Medical Aesthetics & Wellness',
    description: isNl
      ? 'Premium kliniek voor fillers, botox, GLP-1 afslanktrajecten en lifestyle transformatie. Medisch verantwoord, resultaatgericht.'
      : 'Premium clinic for fillers, botox, GLP-1 weight loss programmes and lifestyle transformation. Medically responsible, results-driven.',
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'nl': '/nl',
        'en': '/en',
      },
    },
    openGraph: {
      title: isNl ? 'FAB CLINIC | Medische Esthetiek & Welzijn' : 'FAB CLINIC | Medical Aesthetics & Wellness',
      description: isNl
        ? 'Premium kliniek voor fillers, botox, GLP-1 afslanktrajecten en lifestyle transformatie.'
        : 'Premium clinic for fillers, botox, GLP-1 weight loss programmes and lifestyle transformation.',
      url: `${BASE_URL}/${locale}`,
      siteName: 'FAB CLINIC',
      locale: isNl ? 'nl_NL' : 'en_US',
      alternateLocale: isNl ? 'en_US' : 'nl_NL',
      type: 'website',
      images: [
        {
          url: '/images/og-cover.jpg',
          width: 1200,
          height: 630,
          alt: isNl ? 'FAB CLINIC - Medische Esthetiek & Welzijn' : 'FAB CLINIC - Medical Aesthetics & Wellness',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isNl ? 'FAB CLINIC | Medische Esthetiek & Welzijn' : 'FAB CLINIC | Medical Aesthetics & Wellness',
      description: isNl
        ? 'Premium kliniek voor fillers, botox, GLP-1 afslanktrajecten en lifestyle transformatie.'
        : 'Premium clinic for fillers, botox, GLP-1 weight loss programmes and lifestyle transformation.',
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
}

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
      <body className="font-sans antialiased min-h-screen flex flex-col bg-background-light text-secondary">
        <NextIntlClientProvider messages={messages} locale={resolvedParams.locale}>
          <CartProvider>
            <SurveyProvider>

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
