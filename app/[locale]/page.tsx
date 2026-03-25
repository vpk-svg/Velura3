import HeroSection from '@/components/HeroSection';
import FullWidthHeaderImage from '@/components/FullWidthHeaderImage';
import TreatmentGrid from '@/components/TreatmentGrid';
import HowItWorks from '@/components/HowItWorks';
import ContactSection from '@/components/ContactSection';
import TrustPillars from '@/components/TrustPillars';
import Testimonials from '@/components/Testimonials';
import NewsletterSection from '@/components/NewsletterSection';

// Legacy Weight Loss Sections
import MethodsTabs from '@/components/MethodsTabs';
import ProductShop from '@/components/ProductShop';
import PricingTimeline from '@/components/PricingTimeline';
import BmiCalculator from '@/components/BmiCalculator';
import BlogPreview from '@/components/BlogPreview';
import CtaBanner from '@/components/CtaBanner';

import { ReactElement } from 'react';

export default function HomePage(): ReactElement {
  return (
    <>
      <HeroSection />
      <FullWidthHeaderImage />
      <TreatmentGrid />
      <HowItWorks />
      <TrustPillars />
      <div id="team" /> {/* Placeholder for Team section anchor */}
      <Testimonials />
      <ContactSection />

      {/* Our Other Services / Weight Loss Division */}
      <div className="py-24 bg-background-dark text-background-light text-center">
        <h2 className="font-display text-4xl md:text-6xl mb-12">Specifieke <span className="text-primary italic">Wellumo Programma's</span></h2>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 gap-20">
          <div id="methods" className="bg-background-light p-8 rounded-3xl text-secondary overflow-hidden shadow-2xl">
            <MethodsTabs />
          </div>
          <div id="shop" className="bg-background-light p-8 rounded-3xl text-secondary overflow-hidden shadow-2xl">
            <ProductShop />
          </div>
          <div id="bmi" className="bg-background-light p-8 rounded-3xl text-secondary overflow-hidden shadow-2xl">
            <BmiCalculator />
          </div>
        </div>
      </div>

      <BlogPreview />
      <NewsletterSection />
    </>
  );
}
