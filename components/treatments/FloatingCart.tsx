'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { ShoppingBag, X, Trash2, ChevronRight } from 'lucide-react';
import type { Zone } from './ZoneSelector';

interface FloatingCartProps {
  zones: Zone[];
  selectedZones: string[];
  onRemove: (zoneId: string) => void;
  onProceed: () => void;
  namespace: string;
  proceedLabel?: string;
}

export default function FloatingCart({
  zones,
  selectedZones,
  onRemove,
  onProceed,
  namespace,
  proceedLabel,
}: FloatingCartProps) {
  const t = useTranslations(namespace);
  const [isOpen, setIsOpen] = useState(false);

  const selectedItems = zones.filter((z) => selectedZones.includes(z.id));
  const totalCents = selectedItems.reduce((sum, z) => sum + z.priceCents, 0);
  const count = selectedItems.length;

  if (count === 0) return null;

  return (
    <>
      {/* Floating badge button - fixed right side */}
      <motion.button
        type="button"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        onClick={() => setIsOpen(true)}
        className="fixed right-5 bottom-28 z-[100] flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-shadow duration-300 active:scale-95 cursor-pointer"
        aria-label={`${t('cart_title')} (${count})`}
        data-no-custom-cursor="true"
      >
        <ShoppingBag size={22} />
        <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-secondary text-white text-[11px] font-bold flex items-center justify-center shadow-md">
          {count}
        </span>
      </motion.button>

      {/* Slide-out panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[101] bg-secondary/40 backdrop-blur-sm"
              data-no-custom-cursor="true"
              style={{ cursor: 'auto' }}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-[102] w-full max-w-sm bg-white shadow-[−20px_0_60px_rgba(0,0,0,0.15)] flex flex-col"
              data-no-custom-cursor="true"
              style={{ cursor: 'auto' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-secondary/5">
                <div className="flex items-center gap-3">
                  <ShoppingBag size={18} className="text-primary" />
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary/60 font-semibold">
                    {t('cart_title')} ({count})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-full border border-secondary/10 flex items-center justify-center text-secondary/50 hover:text-secondary hover:border-secondary/20 transition-colors cursor-pointer"
                  aria-label="Sluiten"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
                <AnimatePresence mode="popLayout">
                  {selectedItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      className="flex items-center justify-between py-3 border-b border-secondary/[0.04] last:border-0"
                    >
                      <span className="font-sans text-sm text-secondary">{t(item.nameKey)}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-sans text-sm text-primary font-semibold">
                          €{(item.priceCents / 100).toFixed(0)}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemove(item.id)}
                          className="p-1.5 rounded-full text-secondary/20 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                          aria-label={`Verwijder ${t(item.nameKey)}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Footer with total + proceed */}
              <div className="px-6 py-5 border-t border-primary/10 bg-primary/[0.02] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm font-semibold text-secondary uppercase tracking-wider">
                    {t('cart_total')}
                  </span>
                  <span className="font-display text-2xl text-primary font-semibold">
                    €{(totalCents / 100).toFixed(0)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onProceed();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-pill font-sans uppercase font-bold px-8 py-4 text-[11px] tracking-[0.25em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97] cursor-pointer"
                >
                  {proceedLabel || t('proceed_to_details')}
                  <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
