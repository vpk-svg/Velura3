'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Phone, Calendar } from 'lucide-react';
import Container from './ui/Container';
import ConsultTrigger from './consult/ConsultTrigger';
import { EASE_PREMIUM } from '@/lib/motion';
import { Link } from '@/lib/navigation';

export default function BottomCta() {
  const t = useTranslations('bottom_cta');

  return (
    <section className="py-section-y bg-background-light overflow-hidden" aria-label={t('label')}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE_PREMIUM }}
          className="text-center max-w-4xl mx-auto bg-surface rounded-3xl p-12 md:p-20 border border-primary/5 shadow-soft-xl"
        >
          <div className="flex flex-col items-center gap-4 mb-8">
            {t('label')}
            <div className="h-px w-12 bg-primary/30" />
          </div>

          <h2 className="font-display text-display-lg text-primary mb-8">
            {t('title')}
          </h2>

          <p className="font-sans font-light text-primary/60 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto tracking-wide">
            {t('desc')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/contact"
              className="btn-ghost inline-flex items-center justify-center gap-3 px-12 py-5"
            >
              <Phone size={14} strokeWidth={1.5} /> {t('cta_contact')}
            </Link>
            <ConsultTrigger className="btn-primary inline-flex items-center justify-center gap-3 px-12 py-5">
              <Calendar size={14} strokeWidth={1.5} /> {t('cta_consult')}
            </ConsultTrigger>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
