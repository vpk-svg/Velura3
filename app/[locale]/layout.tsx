import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Cormorant_Garamond, Jost, Cinzel } from 'next/font/google';
import '../../src/index.css'; // Assuming we keep index.css for global styles
import Navbar from '@/components/Navbar';
import FloatingButtons from '@/components/FloatingButtons';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import { routing } from '@/lib/i18n';
import { ReactElement } from 'react';

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

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-cinzel',
});

export const metadata = {
  title: 'FAB CLINIC | Medische Esthetiek & Welzijn',
  description: 'Premium kliniek voor fillers, botox en lifestyle transformatie.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps): Promise<ReactElement> {
  const resolvedParams = await params;
  const messages = await getMessages({ locale: resolvedParams.locale });

  return (
    <html lang={resolvedParams.locale} className={`${cormorant.variable} ${jost.variable} ${cinzel.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-secondary bg-background-light min-h-screen flex flex-col cursor-none">
        <NextIntlClientProvider messages={messages} locale={resolvedParams.locale}>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <FloatingButtons />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
