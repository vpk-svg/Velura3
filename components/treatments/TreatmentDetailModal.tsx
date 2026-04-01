'use client';

import { X, CalendarClock, Sparkles } from 'lucide-react';
import type { TreatmentItem, Locale } from '@/lib/clinic-data';
import BookingSlotSelector from '@/components/booking/BookingSlotSelector';

interface TreatmentDetailModalProps {
  locale: Locale;
  treatment: TreatmentItem | null;
  onClose: () => void;
}

const qualityTags: Record<Locale, string[]> = {
  nl: ['Precisie', 'Symmetrie', '14 dagen controle'],
  en: ['Precision', 'Symmetry', '14-day review'],
};

export default function TreatmentDetailModal({ locale, treatment, onClose }: TreatmentDetailModalProps) {
  if (!treatment) return null;

  const closeLabel = locale === 'nl' ? 'Sluiten' : 'Close';
  const ctaLabel = locale === 'nl' ? 'Plan uw consult' : 'Plan your consult';

  return (
    <div className="fixed inset-0 z-[120] bg-secondary/70 backdrop-blur-sm p-4 md:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto bg-background-light rounded-md shadow-soft-xl border border-primary/15 overflow-hidden">
        <div className="flex items-start justify-between p-6 border-b border-primary/10">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-primary mb-2">Treatment Detail</p>
            <h3 className="font-display text-3xl italic text-secondary">{treatment.name}</h3>
            <p className="font-sans text-secondary/70 mt-2">{treatment.description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full w-10 h-10 border border-primary/20 hover:border-primary transition-colors"
            aria-label={closeLabel}
          >
            <X className="w-5 h-5 text-secondary" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          <div className="flex flex-wrap gap-2">
            {qualityTags[locale].map((tag) => (
              <span key={tag} className="inline-flex items-center rounded-pill bg-primary/10 text-primary px-4 py-2 text-xs uppercase tracking-[0.15em] font-semibold">
                {tag}
              </span>
            ))}
            {treatment.tags.map((tag) => (
              <span key={`${treatment.id}-${tag.id}`} className="inline-flex items-center rounded-pill bg-secondary/10 text-secondary px-4 py-2 text-xs uppercase tracking-[0.15em] font-semibold">
                {tag.label}
              </span>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-md bg-white border border-primary/10 p-5">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-secondary/60 mb-2">{locale === 'nl' ? 'Prijsindicatie' : 'Price range'}</p>
              <p className="font-display text-2xl text-primary">{treatment.price}</p>
            </div>
            <div className="rounded-md bg-white border border-primary/10 p-5">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-secondary/60 mb-2">{locale === 'nl' ? 'Consulttype' : 'Consult type'}</p>
              <p className="font-sans text-secondary/80 flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" />Premium intake</p>
            </div>
            <div className="rounded-md bg-white border border-primary/10 p-5">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-secondary/60 mb-2">{locale === 'nl' ? 'Beschikbaarheid' : 'Availability'}</p>
              <p className="font-sans text-secondary/80 flex items-center gap-2"><CalendarClock className="w-4 h-4 text-primary" />{locale === 'nl' ? 'Alleen zaterdag' : 'Saturday only'}</p>
            </div>
          </div>

          <BookingSlotSelector locale={locale} treatmentName={treatment.name} />

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-8 py-4 text-xs tracking-[0.2em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300"
            >
              {ctaLabel}
            </a>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-8 py-4 text-xs tracking-[0.2em] border border-secondary/20 text-secondary hover:border-primary hover:text-primary transition-all duration-300"
            >
              {closeLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
