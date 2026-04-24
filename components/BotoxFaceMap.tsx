'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { X, ArrowRight, Plus, Check } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import { EASE_PREMIUM } from '@/lib/motion';

interface FaceMapZone {
  id: string;
  nameKey: string;
  descKey: string;
  extraKey: string;
  priceKey: string;
  group: string;
  icon: string;
}

const GROUPS = [
  { key: 'boven', labelNl: 'Boven gezicht', labelEn: 'Upper face' },
  { key: 'midden', labelNl: 'Midden gezicht', labelEn: 'Mid face' },
  { key: 'onder', labelNl: 'Onder gezicht', labelEn: 'Lower face' },
  { key: 'hals', labelNl: 'Hals & lichaam', labelEn: 'Neck & body' },
];

const FACE_MAP_ZONES: FaceMapZone[] = [
  { id: 'voorhoofd', nameKey: 'facemap_voorhoofd', descKey: 'facemap_voorhoofd_desc', extraKey: 'facemap_voorhoofd_extra', priceKey: 'facemap_voorhoofd_price', group: 'boven', icon: '〰' },
  { id: 'frons', nameKey: 'facemap_frons', descKey: 'facemap_frons_desc', extraKey: 'facemap_frons_extra', priceKey: 'facemap_frons_price', group: 'boven', icon: '눈' },
  { id: 'wenkbrauwen', nameKey: 'facemap_wenkbrauwen', descKey: 'facemap_wenkbrauwen_desc', extraKey: 'facemap_wenkbrauwen_extra', priceKey: 'facemap_wenkbrauwen_price', group: 'boven', icon: '⌒' },
  { id: 'kraaienpootjes', nameKey: 'facemap_kraaienpootjes', descKey: 'facemap_kraaienpootjes_desc', extraKey: 'facemap_kraaienpootjes_extra', priceKey: 'facemap_kraaienpootjes_price', group: 'midden', icon: '☀' },
  { id: 'bunny-lines', nameKey: 'facemap_bunny_lines', descKey: 'facemap_bunny_lines_desc', extraKey: 'facemap_bunny_lines_extra', priceKey: 'facemap_bunny_lines_price', group: 'midden', icon: '≋' },
  { id: 'gummy-smile', nameKey: 'facemap_gummy_smile', descKey: 'facemap_gummy_smile_desc', extraKey: 'facemap_gummy_smile_extra', priceKey: 'facemap_gummy_smile_price', group: 'midden', icon: '◡' },
  { id: 'lip-flip', nameKey: 'facemap_lip_flip', descKey: 'facemap_lip_flip_desc', extraKey: 'facemap_lip_flip_extra', priceKey: 'facemap_lip_flip_price', group: 'midden', icon: '◞' },
  { id: 'masseter', nameKey: 'facemap_masseter', descKey: 'facemap_masseter_desc', extraKey: 'facemap_masseter_extra', priceKey: 'facemap_masseter_price', group: 'onder', icon: '▽' },
  { id: 'kin', nameKey: 'facemap_kin', descKey: 'facemap_kin_desc', extraKey: 'facemap_kin_extra', priceKey: 'facemap_kin_price', group: 'onder', icon: '◡' },
  { id: 'hals', nameKey: 'facemap_hals', descKey: 'facemap_hals_desc', extraKey: 'facemap_hals_extra', priceKey: 'facemap_hals_price', group: 'hals', icon: '⌇' },
  { id: 'nefertiti', nameKey: 'facemap_nefertiti', descKey: 'facemap_nefertiti_desc', extraKey: 'facemap_nefertiti_extra', priceKey: 'facemap_nefertiti_price', group: 'hals', icon: '✦' },
  { id: 'hyperhidrose', nameKey: 'facemap_hyperhidrose', descKey: 'facemap_hyperhidrose_desc', extraKey: 'facemap_hyperhidrose_extra', priceKey: 'facemap_hyperhidrose_price', group: 'hals', icon: '◈' },
];

function TreatmentCard({
  zone,
  t,
  onClick,
}: {
  zone: FaceMapZone;
  t: ReturnType<typeof useTranslations>;
  onClick: () => void;
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
        <ArrowRight size={16} className="shrink-0 mt-1 text-primary/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
      </div>
      <p className="font-sans text-xs leading-relaxed text-secondary/60 line-clamp-2">
        {t(zone.extraKey)}
      </p>
      <div className="mt-auto pt-2 border-t border-secondary/5 flex items-center justify-between">
        {t('facemap_price_from')}
        {t(zone.priceKey)}
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
  zone: FaceMapZone;
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

  /* Restore body overflow immediately on close instead of waiting for unmount */
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
          aria-label={t('facemap_close_label')}
        >
          <X size={18} />
        </button>

        <div className="inline-flex items-center gap-2 mb-5">
          <span className="h-2 w-2 rounded-full bg-primary" />
          {t('facemap_modal_label')}
        </div>

        <h3 className="font-display text-3xl italic text-secondary mb-4">
          {t(zone.nameKey)}
        </h3>

        <div className="mb-6 h-px w-14 bg-primary/40" />

        <p className="font-sans text-sm leading-relaxed text-secondary/70 mb-4">
          {t(zone.descKey)}
        </p>
        <p className="font-sans text-sm leading-relaxed text-secondary/60 mb-8 italic">
          {t(zone.extraKey)}
        </p>

        <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
          <div className="flex items-end gap-3">
            {t('facemap_price_from')}
            {t(zone.priceKey)}
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
              className={`flex items-center justify-center w-11 h-11 rounded-full border-2 transition-all duration-200 ${isInCart
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-primary bg-white text-primary hover:bg-primary hover:text-white shadow-soft-sm hover:shadow-gold-glow active:scale-95'
                }`}
              aria-label={isInCart ? 'Toegevoegd' : 'Toevoegen aan winkelwagen'}
            >
              {isInCart ? <Check size={20} strokeWidth={2.5} /> : <Plus size={20} strokeWidth={2.5} />}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

interface BotoxFaceMapProps {
  activeExternalZoneId?: string | null;
  onAddToCart?: (zoneId: string) => void;
  cartZoneIds?: string[];
}

export default function BotoxFaceMap({ activeExternalZoneId, onAddToCart, cartZoneIds = [] }: BotoxFaceMapProps = {}) {
  const t = useTranslations('botox_page');
  const [activeZone, setActiveZone] = useState<FaceMapZone | null>(null);

  useEffect(() => {
    if (!activeExternalZoneId) return;
    const nextZone = FACE_MAP_ZONES.find((zone) => zone.id === activeExternalZoneId) ?? null;
    setActiveZone(nextZone);
  }, [activeExternalZoneId]);

  const handleZoneOpen = useCallback((zone: FaceMapZone) => setActiveZone(zone), []);
  const handleClose = useCallback(() => setActiveZone(null), []);

  return (
    <section
      className="py-section-y bg-page-botox overflow-hidden"
      aria-label={t('facemap_label')}
      data-no-custom-cursor="true"
      style={{ cursor: 'auto' }}
    >
      <Container>
        <SectionHeader
          label={t('facemap_label')}
          title={<>{t('facemap_title')} {t('facemap_title_accent')}</>}
          subtitle={t('facemap_subtitle')}
        />

        <div className="space-y-12">
          {GROUPS.map((group, gi) => {
            const zones = FACE_MAP_ZONES.filter((z) => z.group === group.key);
            return (
              <motion.div
                key={group.key}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: gi * 0.08, ease: EASE_PREMIUM }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-primary font-semibold">
                    {group.labelNl}
                  </span>
                  <div className="flex-1 h-px bg-primary/15" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {zones.map((zone, zi) => (
                    <motion.div
                      key={zone.id}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.4, delay: zi * 0.06, ease: EASE_PREMIUM }}
                    >
                      <TreatmentCard zone={zone} t={t} onClick={() => handleZoneOpen(zone)} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>

      <AnimatePresence>
        {activeZone && <InfoModal zone={activeZone} t={t} onClose={handleClose} onAddToCart={onAddToCart} isInCart={cartZoneIds.includes(activeZone.id)} />}
      </AnimatePresence>
    </section>
  );
}
