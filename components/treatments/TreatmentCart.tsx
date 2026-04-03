'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Trash2, Undo2 } from 'lucide-react';
import type { Zone } from './ZoneSelector';

interface TreatmentCartProps {
  zones: Zone[];
  selectedZones: string[];
  onRemove: (zoneId: string) => void;
  onRestore?: (zoneId: string) => void;
  namespace: string;
}

export default function TreatmentCart({ zones, selectedZones, onRemove, onRestore, namespace }: TreatmentCartProps) {
  const t = useTranslations(namespace);
  const [undoItem, setUndoItem] = useState<{ id: string; name: string } | null>(null);

  const selectedItems = zones.filter((z) => selectedZones.includes(z.id));
  const totalCents = selectedItems.reduce((sum, z) => sum + z.priceCents, 0);

  // Auto-dismiss undo toast after 4s
  useEffect(() => {
    if (!undoItem) return;
    const timer = setTimeout(() => setUndoItem(null), 4000);
    return () => clearTimeout(timer);
  }, [undoItem]);

  const handleRemove = useCallback((zone: Zone) => {
    onRemove(zone.id);
    setUndoItem({ id: zone.id, name: t(zone.nameKey) });
  }, [onRemove, t]);

  const handleUndo = useCallback(() => {
    if (undoItem && onRestore) {
      onRestore(undoItem.id);
    }
    setUndoItem(null);
  }, [undoItem, onRestore]);

  if (selectedItems.length === 0) {
    return (
      <div className="glass rounded-xl border border-primary/10 p-6 text-center shadow-soft-sm">
        <p className="font-sans text-sm text-secondary/40">{t('cart_empty')}</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl border border-primary/10 overflow-hidden shadow-soft-md">
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
                  onClick={() => handleRemove(item)}
                  className="p-1 rounded-full text-secondary/20 hover:text-rose-dark hover:bg-rose-soft transition-colors"
                  aria-label={t('cart_remove_label', { zone: t(item.nameKey) })}
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

      {/* Undo Toast */}
      <AnimatePresence>
        {undoItem && onRestore && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="px-5 py-3 bg-secondary text-background-light flex items-center justify-between text-sm"
          >
            <span className="font-sans text-xs">{undoItem.name} {t('cart_removed')}</span>
            <button
              onClick={handleUndo}
              className="flex items-center gap-1.5 font-sans text-xs font-semibold text-primary hover:text-primary-light transition-colors"
            >
              <Undo2 size={12} /> {t('cart_undo')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
