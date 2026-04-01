'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import { SurveyTrigger } from '@/components/survey/SurveyFlow';
import { EASE_PREMIUM } from '@/lib/motion';
import type { SeoTreatment } from '@/lib/data/seo-treatments';

interface SeoTreatmentPageProps {
  treatment: SeoTreatment;
}

const CATEGORY_LINKS: Record<string, string> = {
  botox: '/botox',
  fillers: '/fillers',
  shape: '/shape',
  weightloss: '/weightloss',
};

export default function SeoTreatmentPage({ treatment }: SeoTreatmentPageProps) {
  const t = useTranslations('seo_treatments');

  return (
    <>
      {/* Hero */}
      <section className="relative w-full pt-40 pb-section-y overflow-hidden bg-secondary">
        <div className="absolute inset-0 z-0">
          <Image
            src={treatment.heroImage}
            alt=""
            fill
            className="object-cover opacity-15"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-secondary/80" />
        </div>
        <Container>
          <div className="relative z-10 max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_PREMIUM }}
              className="font-sans text-primary text-xs tracking-[0.3em] uppercase mb-6 block font-semibold"
            >
              {t('hero_label')}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05, ease: EASE_PREMIUM }}
              className="font-display text-display-xl text-background-light mb-8"
            >
              {t(treatment.titleKey)}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
              className="font-sans font-light text-background-light/70 text-lg md:text-xl leading-relaxed max-w-2xl mb-6"
            >
              {t(treatment.descKey)}
            </motion.p>
            {treatment.priceFrom && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12, ease: EASE_PREMIUM }}
                className="font-sans text-primary text-sm font-semibold mb-10"
              >
                {t('from')} {treatment.priceFrom}
              </motion.p>
            )}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE_PREMIUM }}
              className="flex flex-wrap gap-4"
            >
              <SurveyTrigger className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-12 py-5 text-xs tracking-[0.3em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]">
                {t('hero_cta')}
              </SurveyTrigger>
              <Link
                href={CATEGORY_LINKS[treatment.category] || '/'}
                className="inline-flex items-center gap-2 justify-center rounded-pill font-sans uppercase font-bold px-10 py-5 text-xs tracking-[0.3em] border-2 border-background-light/20 text-background-light hover:border-primary hover:text-primary transition-all duration-300"
              >
                {t('all_treatments')} <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-section-y bg-background-light overflow-hidden">
        <Container>
          <SectionHeader
            label={t('features_label')}
            title={<>{t('features_title')} <span className="italic font-light text-primary">{t('features_title_accent')}</span></>}
          />
          <div className="max-w-2xl mx-auto space-y-4">
            {treatment.features.map((fKey, i) => (
              <motion.div
                key={fKey}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, ease: EASE_PREMIUM }}
                className="flex items-start gap-4 bg-white rounded-lg p-5 border border-primary/5 shadow-soft-sm"
              >
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={13} strokeWidth={3} className="text-primary" />
                </span>
                <p className="font-sans font-light text-secondary/70 text-base leading-relaxed">
                  {t(fKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-section-y bg-secondary overflow-hidden">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_PREMIUM }}
              className="font-display text-display-lg text-background-light mb-6"
            >
              {t('cta_title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
              className="font-sans font-light text-background-light/70 text-lg md:text-xl leading-relaxed mb-10"
            >
              {t('cta_desc')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE_PREMIUM }}
            >
              <SurveyTrigger className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-12 py-5 text-xs tracking-[0.3em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]">
                {t('cta_button')}
              </SurveyTrigger>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
