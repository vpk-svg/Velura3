import HeroSection from '@/components/HeroSection';
import SplitTreatments from '@/components/SplitTreatments';
import BBLSection from '@/components/BBLSection';
import FullWidthHeaderImage from '@/components/FullWidthHeaderImage';
import BmiCalculator from '@/components/BmiCalculator';
import PricingTimeline from '@/components/PricingTimeline';
import MethodsTabs from '@/components/MethodsTabs';
import ProductShop from '@/components/ProductShop';
import LifestyleSection from '@/components/LifestyleSection';
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
      <HeroSection />
      <SplitTreatments />
      <BBLSection />
      <FullWidthHeaderImage />
      <BmiCalculator />
      <PricingTimeline />
      <MethodsTabs />
      <ProductShop />
      <LifestyleSection />
      <TeamSection />
      <HowItWorks />
      <TrustPillars />
      <Testimonials />
      <ContactSection />
      <NewsletterSection />
    </>
  );
}
