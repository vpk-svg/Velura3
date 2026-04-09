'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { X } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import { EASE_PREMIUM } from '@/lib/motion';

interface FaceMapZone {
  id: string;
  nameKey: string;
  descKey: string;
  extraKey: string;
  priceKey: string;
  x: number;
  y: number;
  side: 'left' | 'right';
}

const FACE_MAP_ZONES: FaceMapZone[] = [
  { id: 'wenkbrauwen', nameKey: 'facemap_wenkbrauwen', descKey: 'facemap_wenkbrauwen_desc', extraKey: 'facemap_wenkbrauwen_extra', priceKey: 'facemap_wenkbrauwen_price', x: 32, y: 31, side: 'left' },
  { id: 'voorhoofd', nameKey: 'facemap_voorhoofd', descKey: 'facemap_voorhoofd_desc', extraKey: 'facemap_voorhoofd_extra', priceKey: 'facemap_voorhoofd_price', x: 50, y: 24, side: 'left' },
  { id: 'frons', nameKey: 'facemap_frons', descKey: 'facemap_frons_desc', extraKey: 'facemap_frons_extra', priceKey: 'facemap_frons_price', x: 50, y: 34, side: 'left' },
  { id: 'gummy-smile', nameKey: 'facemap_gummy_smile', descKey: 'facemap_gummy_smile_desc', extraKey: 'facemap_gummy_smile_extra', priceKey: 'facemap_gummy_smile_price', x: 40, y: 52, side: 'left' },
  { id: 'hyperhidrose', nameKey: 'facemap_hyperhidrose', descKey: 'facemap_hyperhidrose_desc', extraKey: 'facemap_hyperhidrose_extra', priceKey: 'facemap_hyperhidrose_price', x: 25, y: 60, side: 'left' },
  { id: 'hals', nameKey: 'facemap_hals', descKey: 'facemap_hals_desc', extraKey: 'facemap_hals_extra', priceKey: 'facemap_hals_price', x: 48, y: 80, side: 'left' },
  { id: 'kraaienpootjes', nameKey: 'facemap_kraaienpootjes', descKey: 'facemap_kraaienpootjes_desc', extraKey: 'facemap_kraaienpootjes_extra', priceKey: 'facemap_kraaienpootjes_price', x: 73, y: 38, side: 'right' },
  { id: 'bunny-lines', nameKey: 'facemap_bunny_lines', descKey: 'facemap_bunny_lines_desc', extraKey: 'facemap_bunny_lines_extra', priceKey: 'facemap_bunny_lines_price', x: 56, y: 44, side: 'right' },
  { id: 'lip-flip', nameKey: 'facemap_lip_flip', descKey: 'facemap_lip_flip_desc', extraKey: 'facemap_lip_flip_extra', priceKey: 'facemap_lip_flip_price', x: 50, y: 57, side: 'right' },
  { id: 'masseter', nameKey: 'facemap_masseter', descKey: 'facemap_masseter_desc', extraKey: 'facemap_masseter_extra', priceKey: 'facemap_masseter_price', x: 73, y: 61, side: 'right' },
  { id: 'kin', nameKey: 'facemap_kin', descKey: 'facemap_kin_desc', extraKey: 'facemap_kin_extra', priceKey: 'facemap_kin_price', x: 51, y: 68, side: 'right' },
  { id: 'nefertiti', nameKey: 'facemap_nefertiti', descKey: 'facemap_nefertiti_desc', extraKey: 'facemap_nefertiti_extra', priceKey: 'facemap_nefertiti_price', x: 69, y: 74, side: 'right' },
];

function FaceNode({
  zone,
  isActive,
  onClick,
}: {
  zone: FaceMapZone;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
      aria-label={zone.id}
    >
      <span className={`absolute inset-0 rounded-full bg-primary/25 blur-md transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`} />
      <motion.span
        animate={{ scale: isActive ? [1, 1.14, 1] : [1, 1.05, 1] }}
        transition={{ duration: isActive ? 1 : 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className={`relative flex h-5 w-5 items-center justify-center rounded-full border shadow-[0_0_0_6px_rgba(198,166,93,0.14)] transition-colors duration-300 ${
          isActive ? 'border-primary bg-primary' : 'border-white/80 bg-secondary'
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
      </motion.span>
    </button>
  );
}

function ZoneCard({
  zone,
  isActive,
  t,
  onClick,
}: {
  zone: FaceMapZone;
  isActive: boolean;
  t: ReturnType<typeof useTranslations>;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      className={`group relative w-full rounded-[1.6rem] border bg-white px-5 py-5 text-left shadow-soft-sm transition-all duration-300 cursor-pointer ${
        isActive ? 'border-primary shadow-soft-lg ring-1 ring-primary/30' : 'border-secondary/10 hover:border-primary/25 hover:shadow-soft-md'
      }`}
    >
      <span className={`absolute top-1/2 h-px w-6 -translate-y-1/2 bg-primary/30 hidden lg:block ${zone.side === 'left' ? 'right-[-1.5rem]' : 'left-[-1.5rem]'}`} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-primary font-semibold mb-2">
            {t('facemap_card_label')}
          </p>
          <h3 className="font-display text-2xl italic leading-tight text-secondary">
            {t(zone.nameKey)}
          </h3>
        </div>
        <span className={`mt-1 h-3 w-3 shrink-0 rounded-full transition-colors duration-300 ${isActive ? 'bg-primary' : 'bg-primary/35 group-hover:bg-primary/65'}`} />
      </div>
      <p className="mt-3 font-sans text-sm leading-relaxed text-secondary/70">
        {t(zone.extraKey)}
      </p>
      <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.16em] text-secondary/45">
        {t('facemap_more_info')}
      </p>
    </motion.button>
  );
}

function InfoModal({
  zone,
  t,
  onClose,
}: {
  zone: FaceMapZone;
  t: ReturnType<typeof useTranslations>;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10002] flex items-center justify-center bg-secondary/72 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
      data-no-custom-cursor="true"
      style={{ cursor: 'auto' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.35, ease: EASE_PREMIUM }}
        className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-primary/15 bg-[#11110f] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-primary transition-colors duration-200 hover:bg-white/10 cursor-pointer"
          aria-label={t('facemap_close_label')}
        >
          <X size={18} />
        </button>

        <div className="inline-flex items-center gap-2 mb-5">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-primary/80 font-semibold">
            {t('facemap_modal_label')}
          </span>
        </div>

        <h3 className="font-display text-3xl italic text-background-light mb-4">
          {t(zone.nameKey)}
        </h3>

        <div className="mb-6 h-px w-14 bg-primary/35" />

        <p className="font-sans text-sm leading-relaxed text-background-light/72 mb-5">
          {t(zone.descKey)}
        </p>
        <p className="font-sans text-sm leading-relaxed text-primary/85 mb-8">
          {t(zone.extraKey)}
        </p>

        <div className="flex items-end gap-3 mb-8">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-background-light/45 font-semibold">
            {t('facemap_price_from')}
          </span>
          <span className="font-display text-3xl font-bold text-primary">
            {t(zone.priceKey)}
          </span>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-primary/30 via-primary/10 to-transparent" />
      </motion.div>
    </motion.div>
  );
}

interface BotoxFaceMapProps {
  activeExternalZoneId?: string | null;
}

export default function BotoxFaceMap({ activeExternalZoneId }: BotoxFaceMapProps = {}) {
  const t = useTranslations('botox_page');
  const [activeZone, setActiveZone] = useState<FaceMapZone | null>(null);
  const zonesBySide = useMemo(
    () => ({
      left: FACE_MAP_ZONES.filter((zone) => zone.side === 'left'),
      right: FACE_MAP_ZONES.filter((zone) => zone.side === 'right'),
    }),
    [],
  );

  useEffect(() => {
    if (!activeExternalZoneId) {
      return;
    }

    const nextZone = FACE_MAP_ZONES.find((zone) => zone.id === activeExternalZoneId) ?? null;
    setActiveZone(nextZone);
  }, [activeExternalZoneId]);

  const handleZoneOpen = useCallback((zone: FaceMapZone) => {
    setActiveZone(zone);
  }, []);

  const handleClose = useCallback(() => {
    setActiveZone(null);
  }, []);

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
          title={<>{t('facemap_title')} <span className="italic font-light text-primary">{t('facemap_title_accent')}</span></>}
          subtitle={t('facemap_subtitle')}
        />

        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[minmax(0,1fr)_24rem_minmax(0,1fr)] lg:items-center lg:gap-8 xl:grid-cols-[minmax(0,1fr)_28rem_minmax(0,1fr)]">
          <div className="space-y-4 lg:pr-2">
            {zonesBySide.left.map((zone, index) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: EASE_PREMIUM }}
              >
                <ZoneCard zone={zone} isActive={activeZone?.id === zone.id} t={t} onClick={() => handleZoneOpen(zone)} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            className="relative my-10 lg:my-0"
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[28rem] overflow-hidden rounded-[2.4rem] border border-primary/15 bg-[#d7d2c8] shadow-soft-lg">
              <Image
                src="/images/Newteam/Ava.jpg"
                alt={t('facemap_image_alt')}
                fill
                sizes="(max-width: 1024px) 80vw, 28rem"
                className="object-cover"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-white/10" />
              <div className="absolute left-5 top-5 rounded-full bg-white/88 px-3 py-1.5 shadow-soft-sm">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-secondary/70 font-semibold">
                  {t('facemap_tap_hint')}
                </p>
              </div>

              {FACE_MAP_ZONES.map((zone) => (
                <FaceNode
                  key={zone.id}
                  zone={zone}
                  isActive={activeZone?.id === zone.id}
                  onClick={() => handleZoneOpen(zone)}
                />
              ))}
            </div>
          </motion.div>

          <div className="space-y-4 lg:pl-2">
            {zonesBySide.right.map((zone, index) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: EASE_PREMIUM }}
              >
                <ZoneCard zone={zone} isActive={activeZone?.id === zone.id} t={t} onClick={() => handleZoneOpen(zone)} />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {activeZone && <InfoModal zone={activeZone} t={t} onClose={handleClose} />}
      </AnimatePresence>
    </section>
  );
}
