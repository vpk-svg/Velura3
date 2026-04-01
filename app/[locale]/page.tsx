import FullWidthHeaderImage from '@/components/FullWidthHeaderImage';
import WeightlossFeatured from '@/components/WeightlossFeatured';
import BmiCalculator from '@/components/BmiCalculator';
import TreatmentsOverview from '@/components/TreatmentsOverview';
import WhyFabClinic from '@/components/WhyFabClinic';
import Testimonials from '@/components/Testimonials';
import TeamPreview from '@/components/TeamPreview';
import FaqPreview from '@/components/FaqPreview';
import BottomCta from '@/components/BottomCta';
import Container from '@/components/ui/Container';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <FullWidthHeaderImage />

      {/* 2. Weightloss Featured Products */}
      <WeightlossFeatured />

      {/* 3. BMI Calculator Standalone */}
      <section className="py-section-y bg-white overflow-hidden">
        <Container>
          <div className="max-w-xl mx-auto">
            <BmiCalculator />
          </div>
        </Container>
      </section>

      {/* 4. Treatments Overview (Botox, Fillers, Shape, Weightloss) */}
      <TreatmentsOverview />

      {/* 5. Why FAB Clinic */}
      <WhyFabClinic />

      {/* 6. Testimonials */}
      <Testimonials />

      {/* 7. Team Preview */}
      <TeamPreview />

      {/* 8. FAQ Preview */}
      <FaqPreview />

      {/* 9. Bottom CTA */}
      <BottomCta />
    </>
  );
}
