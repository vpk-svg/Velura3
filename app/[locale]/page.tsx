import HeroSection from '@/components/HeroSection';
import SplitTreatments from '@/components/SplitTreatments';
import BmiCalculator from '@/components/BmiCalculator';
import LifestyleSection from '@/components/LifestyleSection';
import ContactSection from '@/components/ContactSection';
import HowItWorks from '@/components/HowItWorks';
import TrustPillars from '@/components/TrustPillars';
import Testimonials from '@/components/Testimonials';
import NewsletterSection from '@/components/NewsletterSection';

import { ReactElement } from 'react';

export default function HomePage(): ReactElement {
  return (
    <>
      <HeroSection />
      <SplitTreatments />
      <BmiCalculator />
      <LifestyleSection />
      <HowItWorks />
      <TrustPillars />
      <div id="team" />
      <Testimonials />
      <ContactSection />
      <NewsletterSection />
    </>
  );
}
