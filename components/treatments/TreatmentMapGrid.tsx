'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { X, ArrowRight, Plus, Check } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import { EASE_PREMIUM } from '@/lib/motion';
import type { Zone } from '@/components/treatments/ZoneSelector';

interface TreatmentZone extends Zone {
  descKey?: string;
}

function TreatmentCard({
  zone,
  t,
  onClick,
  isInCart,
}: {
  zone: TreatmentZone;
  t: ReturnType<typeof useTranslations>;
  onClick: () => void;
  isInCart: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="group w-full rounded-2xl border border-secondary/10 bg-white px-5 py-5 text-left shadow-soft-sm hover:border-primary/30 hover:shadow-soft-lg transition-all duration-300 cursor-pointer flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-xl italic leading-tight text-secondary group-hover:text-primary transition-colors duration-200">
          {t(zone.nameKey)}
        </h3>
        {isInCart ? (
          <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center">
            <Check size={12} strokeWidth={3} />
          </span>
        ) : (
          <ArrowRight size={16} className="shrink-0 mt-1 text-primary/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
        )}
      </div>
      <div className="mt-auto pt-2 border-t border-secondary/5 flex items-center justify-between">
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-secondary/40 font-semibold">
          {t('facemap_price_from')}
        </span>
        <span className="font-display text-lg text-primary font-semibold">
          €{(zone.priceCents / 100).toFixed(0)}
        </span>
      </div>
    </motion.button>
  );
}

function InfoModal({
  zone,
  t,
  onClose,
  onAddToCart,
  isInCart,
}: {
  zone: TreatmentZone;
  t: ReturnType<typeof useTranslations>;
  onClose: () => void;
  onAddToCart?: (zoneId: string) => void;
  isInCart?: boolean;
}) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleCloseModal = useCallback(() => {
    document.body.style.overflow = '';
    onClose();
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10002] flex items-center justify-center bg-secondary/60 px-4 py-8 backdrop-blur-sm"
      onClick={handleCloseModal}
      data-no-custom-cursor="true"
      style={{ cursor: 'auto' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.35, ease: EASE_PREMIUM }}
        className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-primary/20 bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleCloseModal}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-secondary/15 bg-secondary/5 text-secondary/60 hover:bg-secondary/10 hover:text-secondary transition-colors duration-200 cursor-pointer"
          aria-label="Sluiten"
        >
          <X size={18} />
        </button>

        <div className="inline-flex items-center gap-2 mb-5">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-primary font-semibold">
            {t('facemap_modal_label')}
          </span>
        </div>

        <h3 className="font-display text-3xl italic text-secondary mb-4">
          {t(zone.nameKey)}
        </h3>

        <div className="mb-6 h-px w-14 bg-primary/40" />

        {zone.descKey && (
          <p className="font-sans text-sm leading-relaxed text-secondary/70 mb-8">
            {t(zone.descKey)}
          </p>
        )}

        <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
          <div className="flex items-end gap-3">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-secondary/50 font-semibold">
              {t('facemap_price_from')}
            </span>
            <span className="font-display text-3xl font-bold text-primary">
              €{(zone.priceCents / 100).toFixed(0)}
            </span>
          </div>
          {onAddToCart && (
            <button
              type="button"
              onClick={() => {
                if (!isInCart) {
                  onAddToCart(zone.id);
                }
                handleCloseModal();
              }}
              disabled={isInCart}
              className={`flex items-center justify-center w-11 h-11 rounded-full border-2 transition-all duration-200 ${
                isInCart
                  ? 'border-green-500 bg-green-50 text-green-600'
                  : 'border-primary bg-white text-primary hover:bg-primary hover:text-white shadow-soft-sm hover:shadow-gold-glow active:scale-95'
              }`}
              aria-label={isInCart ? 'Toegevoegd' : 'Toevoegen'}
            >
              {isInCart ? <Check size={20} strokeWidth={2.5} /> : <Plus size={20} strokeWidth={2.5} />}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

interface TreatmentMapGridProps {
  zones: TreatmentZone[];
  namespace: string;
  label: string;
  title: React.ReactNode;
  subtitle?: string;
  onAddToCart?: (zoneId: string) => void;
  cartZoneIds?: string[];
  bgClass?: string;
}

export default function TreatmentMapGrid({
  zones,
  namespace,
  label,
  title,
  subtitle,
  onAddToCart,
  cartZoneIds = [],
  bgClass = 'bg-page-fillers',
}: TreatmentMapGridProps) {
  const t = useTranslations(namespace);
  const [activeZone, setActiveZone] = useState<TreatmentZone | null>(null);

  const handleZoneOpen = useCallback((zone: TreatmentZone) => setActiveZone(zone), []);
  const handleClose = useCallback(() => setActiveZone(null), []);

  return (
    <section
      className={`py-section-y ${bgClass} overflow-hidden`}
      data-no-custom-cursor="true"
      style={{ cursor: 'auto' }}
    >
      <Container>
        <SectionHeader label={label} title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {zones.map((zone, zi) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: zi * 0.06, ease: EASE_PREMIUM }}
            >
              <TreatmentCard
                zone={zone}
                t={t}
                onClick={() => handleZoneOpen(zone)}
                isInCart={cartZoneIds.includes(zone.id)}
              />
            </motion.div>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {activeZone && (
          <InfoModal
            zone={activeZone}
            t={t}
            onClose={handleClose}
            onAddToCart={onAddToCart}
            isInCart={cartZoneIds.includes(activeZone.id)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
