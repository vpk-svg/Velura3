'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Cookie, X } from 'lucide-react';
import { EASE_PREMIUM } from '@/lib/motion';

const COOKIE_CONSENT_KEY = 'fab_cookie_consent';

export default function CookieBanner() {
  const t = useTranslations('cookie_banner');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: EASE_PREMIUM }}
          className="fixed bottom-20 lg:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-overlay bg-surface rounded-xl shadow-soft-lg ring-1 ring-primary/[0.08] p-6"
        >
          <button
            onClick={decline}
            className="absolute top-3 right-3 p-1 rounded-full text-primary/30 hover:text-primary/60 transition-colors"
            aria-label={t('decline')}
          >
            <X size={16} />
          </button>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Cookie size={18} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-sans text-sm font-light text-primary mb-1">
                {t('title')}
              </h3>
              <p className="font-sans text-xs text-primary/60 leading-relaxed mb-4">
                {t('description')}
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={accept}
                  className="px-5 py-2 rounded-pill bg-primary text-ivory font-sans text-[10px] uppercase tracking-[0.15em] font-light shadow-warm-glow transition-all hover:shadow-soft-xl active:scale-[0.97]"
                >
                  {t('accept')}
                </button>
                <button
                  onClick={decline}
                  className="px-5 py-2 rounded-pill border border-primary/20 text-primary/60 font-sans text-[10px] uppercase tracking-[0.15em] font-light transition-all hover:border-primary/30 active:scale-[0.97]"
                >
                  {t('decline')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
