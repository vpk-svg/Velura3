'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import type { TreatmentItem, Locale } from '@/lib/clinic-data';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import TreatmentDetailModal from '@/components/treatments/TreatmentDetailModal';
import { EASE_PREMIUM } from '@/lib/motion';

interface TreatmentCatalogProps {
  locale: Locale;
  treatments: TreatmentItem[];
  label: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
}

export default function TreatmentCatalog({
  locale,
  treatments,
  label,
  title,
  subtitle,
  ctaLabel,
}: TreatmentCatalogProps) {
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentItem | null>(null);

  return (
    <section className="py-section-y bg-background-light overflow-hidden">
      <Container>
        <SectionHeader label={label} title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {treatments.map((treatment, idx) => (
            <motion.article
              key={treatment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.03, ease: EASE_PREMIUM }}
              className="rounded-md bg-white border border-primary/10 hover:border-primary/20 p-6 shadow-soft-sm hover:shadow-soft-lg transition-all duration-300"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {treatment.tags.map((tag) => (
                  <span key={`${treatment.id}-${tag.id}`} className="text-[10px] uppercase tracking-[0.15em] font-semibold bg-secondary/10 text-secondary px-3 py-1.5 rounded-pill">
                    {tag.label}
                  </span>
                ))}
              </div>

              <h3 className="font-display text-2xl text-secondary italic mb-2">{treatment.name}</h3>
              <p className="font-sans text-secondary/70 text-sm leading-relaxed mb-4">{treatment.description}</p>

              <div className="flex items-center justify-between gap-4">
                <p className="font-display text-2xl text-primary">{treatment.price}</p>
                <button
                  type="button"
                  onClick={() => setSelectedTreatment(treatment)}
                  className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-5 py-3 text-[10px] tracking-[0.2em] bg-secondary text-white hover:bg-primary transition-all duration-300"
                >
                  {ctaLabel ?? (locale === 'nl' ? 'Bekijk details' : 'View details')}
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>

      <TreatmentDetailModal locale={locale} treatment={selectedTreatment} onClose={() => setSelectedTreatment(null)} />
    </section>
  );
}
