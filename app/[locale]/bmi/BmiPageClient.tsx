'use client';

import { useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import BmiCalculator from '@/components/BmiCalculator';

export default function BmiPageClient() {
  const t = useTranslations('footer');

  return (
    <main className="py-section-y bg-page-shape min-h-screen">
      <Container>
        <div className="max-w-xl mx-auto py-20">
          <SectionHeader
            label="Calculations"
            title={t('link_bmi')}
          />
          <div className="bg-surface-elevated rounded-2xl border border-secondary/5 p-6 md:p-8 shadow-soft-lg">
            <BmiCalculator isEmbed />
          </div>
        </div>
      </Container>
    </main>
  );
}
