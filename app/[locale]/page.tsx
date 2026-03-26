import FullWidthHeaderImage from '@/components/FullWidthHeaderImage';
import TreatmentsDualRow from '@/components/TreatmentsDualRow';
import BblBmiDualRow from '@/components/BblBmiDualRow';
import ProductShop from '@/components/ProductShop';
import LifestyleSection from '@/components/LifestyleSection';
import PricingTimeline from '@/components/PricingTimeline';
import MethodsTabs from '@/components/MethodsTabs';
import TeamSection from '@/components/TeamSection';
import HowItWorks from '@/components/HowItWorks';
import TrustPillars from '@/components/TrustPillars';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';
import NewsletterSection from '@/components/NewsletterSection';

import { ReactElement } from 'react';

export default function HomePage(): ReactElement {
  return (
    <>
      {/* 1. Full-width Header */}
      <FullWidthHeaderImage />

      {/* 2. Botox + Fillers (50/50 Desktop) */}
      <TreatmentsDualRow />

      {/* 3. BBL + BMI Calculator (50/50 Desktop) */}
      <BblBmiDualRow />

      {/* 4. Ozempic & Similar Medications */}
      <ProductShop />

      {/* 5. Lifestyle Coaching */}
      <LifestyleSection />

      {/* Rest of the page components */}
      <PricingTimeline />
      <MethodsTabs />
      <TeamSection />
      <HowItWorks />
      <TrustPillars />
      <Testimonials />
      <ContactSection />
      <NewsletterSection />
    </>
  );
}
