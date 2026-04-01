import { notFound } from 'next/navigation';
import { SEO_TREATMENTS, getSeoTreatment } from '@/lib/data/seo-treatments';
import SeoTreatmentPage from '@/components/SeoTreatmentPage';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export function generateStaticParams() {
  return SEO_TREATMENTS.map((t) => ({ slug: t.slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const treatment = getSeoTreatment(slug);

  if (!treatment) {
    notFound();
  }

  return <SeoTreatmentPage treatment={treatment} />;
}
