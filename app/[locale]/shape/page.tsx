'use client';

import { motion, type Variants } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import ConsultTrigger from '@/components/consult/ConsultTrigger';
import { SHAPE_TREATMENTS } from '@/lib/data/shape-treatments';
import { EASE_PREMIUM } from '@/lib/motion';

export default function ShapePage() {
  const t = useTranslations('shape_page');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_PREMIUM } },
  };

  return (
    <>
      {/* Hero */}
      <section className="relative w-full pt-40 pb-section-y overflow-hidden bg-secondary">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/treatments/fillers.jpg"
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
              {t('hero_title')} <span className="italic font-light text-primary">{t('hero_title_accent')}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
              className="font-sans font-light text-background-light/70 text-lg md:text-xl leading-relaxed max-w-2xl mb-10"
            >
              {t('hero_desc')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE_PREMIUM }}
            >
              <ConsultTrigger className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-12 py-5 text-xs tracking-[0.3em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]">
                {t('hero_cta')}
              </ConsultTrigger>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Treatments */}
      {SHAPE_TREATMENTS.map((treatment, index) => (
        <section
          key={treatment.id}
          className={`py-section-y overflow-hidden ${index % 2 === 0 ? 'bg-background-light' : 'bg-white'}`}
        >
          <Container>
            <SectionHeader
              label={t(`${treatment.nameKey}_label`)}
              title={<>{t(`${treatment.nameKey}_title`)} <span className="italic font-light text-primary">{t(`${treatment.nameKey}_accent`)}</span></>}
              subtitle={t(`${treatment.nameKey}_desc`)}
            />

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {treatment.variants.map((variant) => (
                <motion.div
                  key={variant.id}
                  variants={itemVariants}
                  className="bg-surface-elevated rounded-lg border border-secondary/5 p-6 shadow-soft-sm hover:shadow-soft-lg transition-all duration-300 group"
                >
                  <h3 className="font-display text-xl text-secondary italic font-bold mb-2 group-hover:text-primary transition-colors">
                    {t(variant.nameKey)}
                  </h3>
                  <p className="font-sans text-2xl text-primary font-semibold mb-3">
                    €{(variant.priceCents / 100).toLocaleString()}
                  </p>
                  <a
                    href="/contact"
                    className="font-sans text-[10px] uppercase tracking-[0.15em] text-primary font-bold hover:underline"
                  >
                    {t('book_consult')}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      ))}

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
              className="font-sans font-light text-background-light/70 text-lg leading-relaxed mb-10"
            >
              {t('cta_desc')}
            </motion.p>
            <ConsultTrigger className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-12 py-5 text-xs tracking-[0.3em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]">
              {t('cta_button')}
            </ConsultTrigger>
          </div>
        </Container>
      </section>
    </>
  );
}
