import HeroSection from '@/components/HeroSection';
import FullWidthHeaderImage from '@/components/FullWidthHeaderImage';
import TrustPillars from '@/components/TrustPillars';
import MethodsTabs from '@/components/MethodsTabs';
import ProductShop from '@/components/ProductShop';
import PricingTimeline from '@/components/PricingTimeline';
import BmiCalculator from '@/components/BmiCalculator';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import BlogPreview from '@/components/BlogPreview';
import CtaBanner from '@/components/CtaBanner';
import NewsletterSection from '@/components/NewsletterSection';

import { ReactElement } from 'react';

export default function HomePage(): ReactElement {
  return (
    <>
      <HeroSection />
      <FullWidthHeaderImage />
      <TrustPillars />
      <MethodsTabs />
      <ProductShop />
      <PricingTimeline />
      <BmiCalculator />
      <HowItWorks />
      <Testimonials />
      <BlogPreview />
      <CtaBanner />
      <NewsletterSection />
    </>
  );
}
