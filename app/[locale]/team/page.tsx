import type { Metadata } from 'next';
import TeamSection from '@/components/TeamSection';
import TeamTrustPillars from '@/components/TeamTrustPillars';
import TeamBottomCta from '@/components/TeamBottomCta';

export const metadata: Metadata = {
  title: 'Ons Team — BIG-Geregistreerde Cosmetische Artsen | FAB Clinic',
  description:
    'Maak kennis met ons team van BIG-geregistreerde cosmetische artsen en specialisten. Persoonlijke begeleiding bij afvallen, botox & fillers.',
};

export default function TeamPage() {
  return (
    <main className="pt-32">
      <TeamSection />
      <TeamTrustPillars />
      <TeamBottomCta />
    </main>
  );
}
