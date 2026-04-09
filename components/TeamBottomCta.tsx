'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import Container from './ui/Container';
import ConsultTrigger from './consult/ConsultTrigger';
import { EASE_PREMIUM } from '@/lib/motion';

export default function TeamBottomCta() {
  const t = useTranslations('team');

  return (
    <section className="py-section-y bg-secondary overflow-hidden" aria-labelledby="team-cta-title">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            className="font-sans text-primary text-xs tracking-[0.3em] uppercase mb-6 block font-semibold"
          >
            {t('bottom_cta_label')}
          </motion.span>
          <motion.h2
            id="team-cta-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05, ease: EASE_PREMIUM }}
            className="font-display text-display-lg text-background-light mb-6"
          >
            {t('bottom_cta_title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
            className="font-sans font-light text-background-light/70 text-lg md:text-xl leading-relaxed mb-10"
          >
            {t('bottom_cta_desc')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE_PREMIUM }}
          >
            <ConsultTrigger className="inline-flex items-center justify-center gap-2.5 rounded-pill font-sans uppercase font-bold px-12 py-5 text-[11px] tracking-[0.25em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.97]">
              {t('bottom_cta_button')} <ArrowRight size={14} aria-hidden="true" />
            </ConsultTrigger>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
