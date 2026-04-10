import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import BmiPageClient from './BmiPageClient';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = t('footer.link_bmi');
  const description = t('weightloss_page.meta_desc');

  return {
    title,
    description,
  };
}

export default function BmiPage() {
  return <BmiPageClient />;
}
