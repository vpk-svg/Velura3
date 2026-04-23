'use client';

import { useLocale } from 'next-intl';
import FullWidthHeaderImage from '@/components/FullWidthHeaderImage';
import WeightlossFeatured from '@/components/WeightlossFeatured';
import TreatmentsOverview from '@/components/TreatmentsOverview';
import WhyFabClinic from '@/components/WhyFabClinic';
import Testimonials from '@/components/Testimonials';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';
import PharmacyDisclaimer from '@/components/PharmacyDisclaimer';
import type { Locale } from '@/lib/clinic-data';
import FaqPreview from '@/components/FaqPreview';
import BottomCta from '@/components/BottomCta';

export default function HomePage() {
  const locale = useLocale() as Locale;

  return (
    <>
      {/* 1. Hero */}
      <FullWidthHeaderImage />

      {/* 2. Weightloss Featured Products */}
      <WeightlossFeatured />

      {/* 3. Treatments Overview (Botox, Fillers, Shape, Weightloss) */}
      <TreatmentsOverview />

      {/* 5. Why FAB Clinic */}
      <WhyFabClinic />

      {/* 6. Testimonials */}
      <Testimonials />

      {/* 6b. Before & After Gallery */}
      <BeforeAfterGallery />


      {/* 8. FAQ Preview */}
      <FaqPreview />

      {/* 9. Partner Pharmacy Disclaimer */}
      <PharmacyDisclaimer />

      {/* 10. Bottom CTA */}
      <BottomCta />
    </>
  );
}
