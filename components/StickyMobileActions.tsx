'use client';

import { useTranslations } from 'next-intl';
import { Phone, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from '@/lib/navigation';

export default function StickyMobileActions() {
  const t = useTranslations('sticky_mobile');
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-floating lg:hidden bg-white/95 backdrop-blur-md border-t border-secondary/[0.06] shadow-soft-lg safe-area-pb"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <Link
          href="/contact"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-pill bg-primary text-white font-sans text-[11px] uppercase tracking-[0.15em] font-bold py-3.5 shadow-gold-glow transition-all active:scale-[0.97]"
        >
          <Phone size={14} />
          {t('consult')}
        </Link>
        <a
          href="https://wa.me/31600000000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-pill bg-[#25D366] text-white font-sans text-[11px] uppercase tracking-[0.15em] font-bold py-3.5 shadow-soft-md transition-all active:scale-[0.97]"
        >
          <MessageCircle size={14} fill="currentColor" />
          WhatsApp
        </a>
      </div>
    </motion.div>
  );
}
