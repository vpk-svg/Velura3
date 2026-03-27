'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Container from './ui/Container';
import Button from './ui/Button';
import { EASE_PREMIUM } from '@/lib/motion';

export default function WeightlossHeader() {
  const t = useTranslations('weightloss_header');

  return (
    <section className="relative w-full py-section-y overflow-hidden bg-secondary" aria-labelledby="weightloss-heading">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-atmos.png"
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/70" />
      </div>

      <Container>
        <div className="relative z-10 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            className="font-sans text-primary text-xs tracking-[0.3em] uppercase mb-6 block font-semibold"
          >
            {t('label')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05, ease: EASE_PREMIUM }}
            className="font-display text-display-xl text-background-light mb-8"
          >
            {t('title')} <span className="italic font-light text-primary">{t('title_accent')}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
            className="font-sans font-light text-background-light/70 text-lg md:text-xl leading-relaxed max-w-2xl mb-10"
          >
            {t('desc')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE_PREMIUM }}
          >
            <Button href="/medicatie" variant="primary" size="lg">
              {t('cta')}
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
