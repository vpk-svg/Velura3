'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { ShoppingBag, X, Trash2, ChevronRight } from 'lucide-react';
import { useCart, type CartItem } from '@/lib/cart-context';

/** Human-friendly labels per category */
const TYPE_LABELS: Record<string, Record<string, string>> = {
  nl: { botox: 'Botox', fillers: 'Fillers', shape: 'Body Contouring', medicatie: 'Medicatie' },
  en: { botox: 'Botox', fillers: 'Fillers', shape: 'Body Contouring', medicatie: 'Medication' },
};

function ItemName({ item }: { item: CartItem }) {
  /* Try to translate nameKey via the item's namespace. If that fails, show the id. */
  const t = useTranslations(item.namespace);
  try {
    return <>{t(item.nameKey)}</>;
  } catch {
    return <>{item.nameKey}</>;
  }
}

export default function GlobalFloatingCart() {
  const { items, removeItem, totalCents, count } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();

  if (count === 0) return null;

  /* Group items by type for display */
  const grouped = items.reduce<Record<string, CartItem[]>>((acc, item) => {
    (acc[item.type] ??= []).push(item);
    return acc;
  }, {});

  const labels = TYPE_LABELS[locale] ?? TYPE_LABELS.nl;

  return (
    <>
      {/* Floating badge button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed right-5 bottom-24 lg:bottom-8 z-[250] flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-shadow duration-300 active:scale-95 cursor-pointer"
            aria-label={`Winkelwagen (${count})`}
            data-no-custom-cursor="true"
          >
            <ShoppingBag size={22} />
            <motion.span
              key={count}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-secondary text-white text-[11px] font-bold flex items-center justify-center shadow-md"
            >
              {count}
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

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
              className="fixed inset-0 z-[251] bg-secondary/40 backdrop-blur-sm"
              data-no-custom-cursor="true"
              style={{ cursor: 'auto' }}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-[252] w-full max-w-sm bg-white shadow-2xl flex flex-col"
              data-no-custom-cursor="true"
              style={{ cursor: 'auto' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-secondary/5">
                <div className="flex items-center gap-3">
                  <ShoppingBag size={18} className="text-primary" />
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-secondary/60 font-semibold">
                    {locale === 'nl' ? 'Uw selectie' : 'Your selection'} ({count})
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

              {/* Items grouped by type */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
                {Object.entries(grouped).map(([type, typeItems]) => (
                  <div key={type}>
                    <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-primary font-bold mb-2">
                      {labels[type] ?? type}
                    </p>
                    <AnimatePresence mode="popLayout">
                      {typeItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20, height: 0 }}
                          className="flex items-center justify-between py-3 border-b border-secondary/[0.04] last:border-0"
                        >
                          <span className="font-sans text-sm text-secondary">
                            <ItemName item={item} />
                            {item.quantity > 1 && (
                              <span className="text-secondary/40 ml-1">×{item.quantity}</span>
                            )}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="font-sans text-sm text-primary font-semibold">
                              €{((item.priceCents * item.quantity) / 100).toFixed(0)}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="p-1.5 rounded-full text-secondary/20 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                              aria-label="Verwijder"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Footer with total + proceed */}
              <div className="px-6 py-5 border-t border-primary/10 bg-primary/[0.02] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm font-semibold text-secondary uppercase tracking-wider">
                    Totaal
                  </span>
                  <span className="font-display text-2xl text-primary font-semibold">
                    €{(totalCents / 100).toFixed(0)}
                  </span>
                </div>
                <a
                  href={`/${locale}/checkout`}
                  onClick={() => setIsOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-pill font-sans uppercase font-bold px-8 py-4 text-[11px] tracking-[0.25em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97] cursor-pointer"
                >
                  {locale === 'nl' ? 'Naar checkout' : 'Go to checkout'}
                  <ChevronRight size={14} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
