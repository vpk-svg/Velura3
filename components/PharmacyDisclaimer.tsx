'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Container from './ui/Container';
import { Building2 } from 'lucide-react';
import { EASE_PREMIUM } from '@/lib/motion';

export default function PharmacyDisclaimer() {
  const t = useTranslations('pharmacy');

  return (
    <section className="py-section-y bg-secondary-deep text-background-light" aria-label={t('label')}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="font-sans text-primary text-xs tracking-[0.3em] uppercase mb-6 block font-semibold">
            {t('label')}
          </span>
          <h2 className="font-display text-display-md text-background-light mb-6">
            {t('title')}
          </h2>
          <p className="font-sans font-light text-background-light/60 text-base md:text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            {t('desc')}
          </p>

          <div className="inline-flex flex-col sm:flex-row gap-8 items-center justify-center bg-white/5 border border-white/10 rounded-md px-10 py-8">
            <div className="flex items-center gap-4">
              <Building2 size={20} className="text-primary shrink-0" />
              <div className="text-left">
                <p className="font-sans font-semibold text-background-light text-sm">{t('pharmacy_name')}</p>
                <p className="font-sans font-light text-background-light/60 text-sm">{t('pharmacy_address')}</p>
                <p className="font-sans font-light text-background-light/60 text-sm">{t('pharmacy_city')}</p>
              </div>
            </div>
          </div>

          <p className="font-sans text-[10px] italic text-background-light/30 mt-8 uppercase tracking-[0.2em] font-semibold">
            {t('disclaimer')}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
