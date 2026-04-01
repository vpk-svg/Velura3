'use client';

import { useLocale } from 'next-intl';
import FullWidthHeaderImage from '@/components/FullWidthHeaderImage';
import WeightlossHeader from '@/components/WeightlossHeader';
import TreatmentsDualRow from '@/components/TreatmentsDualRow';
import LifestyleSection from '@/components/LifestyleSection';
import Testimonials from '@/components/Testimonials';
import HowItWorks from '@/components/HowItWorks';
import PharmacyDisclaimer from '@/components/PharmacyDisclaimer';
import FaqHub from '@/components/faq/FaqHub';
import type { Locale } from '@/lib/clinic-data';

export default function HomePage() {
  const locale = useLocale() as Locale;

  return (
    <>
      {/* 1. Hero Header + BMI Calculator */}
      <FullWidthHeaderImage />

      {/* 2. Full-width Weightloss Section */}
      <WeightlossHeader />

      {/* 3. Botox + Fillers (50/50 Desktop) */}
      <TreatmentsDualRow />

      {/* 4. Full-width Lifestyle Coaching */}
      <LifestyleSection />

      {/* 5. How It Works */}
      <HowItWorks />

      {/* 6. Google Reviews / Testimonials */}
      <Testimonials />

      {/* 7. FAQ near footer */}
      <FaqHub locale={locale} />

      {/* 8. Partner Pharmacy Disclaimer */}
      <PharmacyDisclaimer />
    </>
  );
}
