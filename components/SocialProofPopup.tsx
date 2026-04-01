'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, CalendarCheck, ShoppingBag } from 'lucide-react';
import { SOCIAL_PROOF_DATA, type SocialProofItem } from '@/lib/data/social-proof';
import { EASE_PREMIUM } from '@/lib/motion';

const ICON_MAP = {
  booking: CalendarCheck,
  review: Star,
  purchase: ShoppingBag,
} as const;

export default function SocialProofPopup() {
  const [current, setCurrent] = useState<SocialProofItem | null>(null);
  const [dismissed, setDismissed] = useState(false);

  const showNext = useCallback(() => {
    if (dismissed) return;
    const item = SOCIAL_PROOF_DATA[Math.floor(Math.random() * SOCIAL_PROOF_DATA.length)];
    setCurrent(item);

    // Auto-hide after 6 seconds
    const hideTimer = setTimeout(() => setCurrent(null), 6000);
    return () => clearTimeout(hideTimer);
  }, [dismissed]);

  useEffect(() => {
    // First popup after 3 minutes
    const initialTimer = setTimeout(showNext, 3 * 60 * 1000);
    return () => clearTimeout(initialTimer);
  }, [showNext]);

  useEffect(() => {
    if (!current && !dismissed) {
      // Show next popup 3 minutes after previous one hides
      const nextTimer = setTimeout(showNext, 3 * 60 * 1000);
      return () => clearTimeout(nextTimer);
    }
  }, [current, dismissed, showNext]);

  const handleDismiss = () => {
    setCurrent(null);
    setDismissed(true);
  };

  const Icon = current ? ICON_MAP[current.type] : Star;

  return (
    <AnimatePresence>
      {current && !dismissed && (
        <motion.div
          initial={{ opacity: 0, x: -20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -20, y: 20 }}
          transition={{ duration: 0.4, ease: EASE_PREMIUM }}
          className="fixed bottom-24 left-6 z-floating max-w-xs bg-white rounded-xl shadow-panel ring-1 ring-secondary/[0.06] p-4 pr-10"
        >
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1 rounded-full text-secondary/30 hover:text-secondary/60 hover:bg-secondary/[0.04] transition-colors"
            aria-label="Verberg melding"
          >
            <X size={14} />
          </button>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Icon size={18} className="text-primary" />
            </div>
            <div>
              <p className="font-sans text-sm text-secondary font-medium leading-snug">
                {current.name} <span className="text-secondary/40">uit {current.city}</span>
              </p>
              <p className="font-sans text-xs text-secondary/50 mt-0.5">{current.treatment}</p>
              {current.rating && (
                <div className="flex gap-0.5 mt-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={10} className="text-primary fill-primary" />
                  ))}
                </div>
              )}
              <p className="font-sans text-[10px] text-secondary/30 mt-1 uppercase tracking-wider">{current.timeAgo}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
