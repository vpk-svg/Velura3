'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Trash2 } from 'lucide-react';
import type { Zone } from './ZoneSelector';

interface TreatmentCartProps {
  zones: Zone[];
  selectedZones: string[];
  onRemove: (zoneId: string) => void;
  namespace: string;
}

export default function TreatmentCart({ zones, selectedZones, onRemove, namespace }: TreatmentCartProps) {
  const t = useTranslations(namespace);

  const selectedItems = zones.filter((z) => selectedZones.includes(z.id));
  const totalCents = selectedItems.reduce((sum, z) => sum + z.priceCents, 0);

  if (selectedItems.length === 0) {
    return (
      <div className="bg-surface-elevated rounded-lg border border-secondary/5 p-6 text-center">
        <p className="font-sans text-sm text-secondary/40">{t('cart_empty')}</p>
      </div>
    );
  }

  return (
    <div className="bg-surface-elevated rounded-lg border border-secondary/5 overflow-hidden">
      <div className="px-5 py-3 border-b border-secondary/5">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-secondary/40 font-semibold">
          {t('cart_title')} ({selectedItems.length})
        </p>
      </div>

      <div className="divide-y divide-secondary/[0.04]">
        <AnimatePresence mode="popLayout">
          {selectedItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-between px-5 py-3"
            >
              <span className="font-sans text-sm text-secondary">{t(item.nameKey)}</span>
              <div className="flex items-center gap-3">
                <span className="font-sans text-sm text-primary font-semibold">
                  €{(item.priceCents / 100).toFixed(0)}
                </span>
                <button
                  onClick={() => onRemove(item.id)}
                  className="p-1 rounded-full text-secondary/20 hover:text-rose-dark hover:bg-rose-soft transition-colors"
                  aria-label={`Verwijder ${t(item.nameKey)}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="px-5 py-4 border-t border-primary/10 bg-primary/[0.02]">
        <div className="flex items-center justify-between">
          <span className="font-sans text-sm font-semibold text-secondary uppercase tracking-wider">{t('cart_total')}</span>
          <span className="font-display text-2xl text-primary font-semibold">
            €{(totalCents / 100).toFixed(0)}
          </span>
        </div>
      </div>
    </div>
  );
}
