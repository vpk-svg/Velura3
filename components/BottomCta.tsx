'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Phone, Calendar } from 'lucide-react';
import Container from './ui/Container';
import { SurveyTrigger } from './survey/SurveyFlow';
import { EASE_PREMIUM } from '@/lib/motion';

export default function BottomCta() {
  const t = useTranslations('bottom_cta');

  return (
    <section className="py-section-y bg-secondary overflow-hidden" aria-label={t('label')}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="font-sans text-primary text-xs tracking-[0.3em] uppercase mb-6 block font-semibold">
            {t('label')}
          </span>
          <h2 className="font-display text-display-lg text-background-light mb-6">
            {t('title')}
          </h2>
          <p className="font-sans font-light text-background-light/70 text-lg md:text-xl leading-relaxed mb-10">
            {t('desc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-pill font-sans uppercase font-bold px-10 py-4 text-[11px] tracking-[0.25em] bg-white text-secondary shadow-soft-md hover:shadow-soft-lg transition-all duration-300 active:scale-[0.97]"
            >
              <Phone size={14} /> {t('cta_contact')}
            </a>
            <SurveyTrigger className="inline-flex items-center justify-center gap-2 rounded-pill font-sans uppercase font-bold px-10 py-4 text-[11px] tracking-[0.25em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]">
              <Calendar size={14} /> {t('cta_consult')}
            </SurveyTrigger>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
