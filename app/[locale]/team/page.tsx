import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import TeamSection from '@/components/TeamSection';
import TeamTrustPillars from '@/components/TeamTrustPillars';
import TeamBottomCta from '@/components/TeamBottomCta';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'team_page' });

  return {
    title: t('meta_title'),
    description: t('meta_desc'),
  };
}

export default function TeamPage() {
  return (
    <main className="pt-32">
      <TeamSection />
      <TeamTrustPillars />
      <TeamBottomCta />
    </main>
  );
}
