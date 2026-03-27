import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import '../../src/index.css';
import Navbar from '@/components/Navbar';

import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
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

export const metadata: Metadata = {
  title: 'FAB CLINIC | Medische Esthetiek & Welzijn',
  description: 'Premium kliniek voor fillers, botox en lifestyle transformatie.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://fabclinic.be'),
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

  return (
    <html lang={resolvedParams.locale} className={`${cormorant.variable} ${jost.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col cursor-dot-active">
        <NextIntlClientProvider messages={messages} locale={resolvedParams.locale}>
          {/* Skip-to-main for keyboard a11y */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
