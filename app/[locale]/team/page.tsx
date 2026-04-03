import type { Metadata } from 'next';
import TeamSection from '@/components/TeamSection';
import HowItWorks from '@/components/HowItWorks';
import TrustPillars from '@/components/TrustPillars';

export const metadata: Metadata = {
  title: 'Ons Team | Fab Clinic',
  description:
    'Maak kennis met de BIG-geregistreerde artsen en specialisten van Fab Clinic.',
};

export default function TeamPage() {
  return (
    <main className="pt-32">
      <TeamSection />
      <HowItWorks />
      <TrustPillars />
    </main>
  );
}
