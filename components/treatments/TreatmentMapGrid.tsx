'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { X, ArrowRight, Plus, Check, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import { EASE_PREMIUM } from '@/lib/motion';
import type { Zone } from '@/components/treatments/ZoneSelector';

interface TreatmentZone extends Zone {
  shortDescKey: string;
  whyKey: string;
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
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group w-full rounded-2xl border border-secondary/10 bg-white p-6 text-left shadow-soft-sm hover:border-primary/40 hover:shadow-soft-lg transition-all duration-300 cursor-pointer flex flex-col gap-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="font-display text-xl italic leading-tight text-secondary group-hover:text-primary transition-colors duration-200 mb-2">
            {t(zone.nameKey)}
          </h3>
          <p className="font-sans text-xs text-secondary/60 line-clamp-2 leading-relaxed">
            {t(zone.shortDescKey)}
          </p>
        </div>
        <div className="shrink-0 pt-1">
          {isInCart ? (
            <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center shadow-soft-sm">
              <Check size={14} strokeWidth={3} />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-primary/40 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
              <Plus size={16} strokeWidth={2.5} />
            </div>
          )}
        </div>
      </div>
      <div className="mt-auto pt-4 border-t border-secondary/5 flex items-center justify-between">
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-secondary/40 font-semibold">
          {t('facemap_price_from')}
        </span>
        <div className="flex items-baseline gap-1">
          <span className="font-sans text-xs text-primary font-medium">€</span>
          <span className="font-display text-2xl text-primary font-semibold">
            {(zone.priceCents / 100).toFixed(0)}
          </span>
        </div>
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
      className="fixed inset-0 z-[10002] flex items-center justify-center bg-secondary/80 px-4 py-8 backdrop-blur-md"
      onClick={handleCloseModal}
      data-no-custom-cursor="true"
      style={{ cursor: 'auto' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.4, ease: EASE_PREMIUM }}
        className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-primary/20 bg-white p-10 shadow-[0_32px_100px_rgba(0,0,0,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleCloseModal}
          className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-secondary/10 bg-secondary/[0.03] text-secondary/40 hover:bg-secondary/10 hover:text-secondary hover:rotate-90 transition-all duration-300 cursor-pointer"
          aria-label="Sluiten"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col h-full">
          <div className="inline-flex items-center gap-2.5 mb-6">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-primary font-bold">
              {t('facemap_modal_label')}
            </span>
          </div>

          <h3 className="font-display text-4xl italic text-secondary mb-6 leading-tight">
            {t(zone.nameKey)}
          </h3>

          <div className="space-y-8 mb-10">
            {/* Short Description */}
            <div>
              <p className="font-sans text-lg text-secondary/80 leading-relaxed italic border-l-2 border-primary/30 pl-5">
                {t(zone.shortDescKey)}
              </p>
            </div>

            {/* Why This Treatment */}
            <div className="bg-secondary/[0.02] rounded-3xl p-6 border border-secondary/5">
              <h4 className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary/40 font-bold mb-3 flex items-center gap-2">
                <Sparkles size={12} className="text-primary" />
                {t('facemap_why_label')}
              </h4>
              <p className="font-sans text-[15px] leading-relaxed text-secondary/70">
                {t(zone.whyKey)}
              </p>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between gap-6 p-2">
            <div className="flex flex-col gap-1">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-secondary/40 font-bold">
                {t('facemap_price_from')}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-sans text-lg text-primary font-medium">€</span>
                <span className="font-display text-4xl font-bold text-primary">
                  {(zone.priceCents / 100).toFixed(0)}
                </span>
              </div>
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
                className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-full font-sans uppercase font-bold text-[11px] tracking-[0.25em] transition-all duration-300 ${isInCart
                  ? 'bg-green-500 text-white shadow-soft-lg cursor-default'
                  : 'bg-primary text-white shadow-gold-glow hover:shadow-soft-xl hover:-translate-y-0.5 active:translate-y-0'
                  }`}
                aria-label={isInCart ? 'Toegevoegd' : 'Toevoegen aan selectie'}
              >
                {isInCart ? (
                  <>
                    <Check size={18} strokeWidth={3} />
                    <span>Toegevoegd</span>
                  </>
                ) : (
                  <>
                    <Plus size={18} strokeWidth={3} />
                    <span>Toevoegen</span>
                  </>
                )}
              </button>
            )}
          </div>
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
