'use client';

import { motion, type Variants } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import ConsultTrigger from '@/components/consult/ConsultTrigger';
import { SHAPE_TREATMENTS } from '@/lib/data/shape-treatments';
import { EASE_PREMIUM } from '@/lib/motion';

const BENEFITS = [
  { key: 'no_downtime', icon: 'timer' },
  { key: 'less_pain', icon: 'favorite' },
  { key: 'safe', icon: 'verified' },
  { key: 'minimal', icon: 'shutter_speed' },
  { key: 'duration', icon: 'calendar_today' },
  { key: 'time', icon: 'schedule' },
] as const;

const AFTERCARE_STEPS = ['1', '2', '3', '4'] as const;

const METHOD_STEPS = [
  { key: 'step1', offset: '' },
  { key: 'step2', offset: 'md:mt-12' },
  { key: 'step3', offset: 'md:mt-24' },
] as const;

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
      {/* ── Hero ── */}
      <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bbl-example.png"
            alt=""
            fill
            priority
            className="object-cover opacity-20 mix-blend-overlay"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-transparent" />
        </div>
        <Container className="relative z-10 py-40">
          <div className="max-w-3xl">
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
              {t('hero_title')}{' '}
              <span className="italic font-light text-primary">{t('hero_title_accent')}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
              className="font-sans font-light text-background-light/80 text-lg md:text-xl leading-relaxed max-w-2xl mb-10"
            >
              {t('hero_desc')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE_PREMIUM }}
            >
              <ConsultTrigger
                from="bbl"
                className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-12 py-5 text-xs tracking-[0.3em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]"
              >
                {t('hero_cta')}
              </ConsultTrigger>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Introduction ── */}
      <section className="py-section-y bg-surface overflow-hidden">
        <Container>
          <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE_PREMIUM }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <Image
                src="/images/bbl-example.png"
                alt="Hyaluronzuur filler gel"
                width={600}
                height={500}
                className="relative z-10 rounded-xl shadow-soft-lg grayscale hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.15, ease: EASE_PREMIUM }}
            >
              <span className="font-sans text-primary text-xs tracking-[0.2em] uppercase mb-6 block font-semibold">
                {t('intro_label')}
              </span>
              <h2 className="font-display text-display-lg text-secondary mb-8">{t('intro_title')}</h2>
              <div className="space-y-6 text-secondary/70 text-lg leading-relaxed font-light">
                <p>{t('intro_p1')}</p>
                <p>{t('intro_p2')}</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Safety Comparison ── */}
      <section className="py-section-y bg-page-shape overflow-hidden">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_PREMIUM }}
            className="bg-secondary p-10 md:p-16 lg:p-20 rounded-3xl relative overflow-hidden"
          >
            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="font-display text-display-lg text-background-light italic mb-8">
                  {t('safety_title')}
                </h2>
                <p className="text-lg text-background-light/70 font-light mb-8 leading-relaxed">
                  {t('safety_desc')}
                </p>
                <div className="flex items-center gap-4 text-primary">
                  <span className="material-symbols-outlined text-4xl" aria-hidden="true">verified_user</span>
                  <span className="font-sans uppercase tracking-widest text-sm font-semibold">
                    {t('safety_badge')}
                  </span>
                </div>
              </div>
              <div className="md:w-1/2 grid grid-cols-1 gap-6">
                <div className="bg-background-light/5 p-8 rounded-2xl backdrop-blur-sm">
                  <h4 className="font-display text-2xl text-background-light mb-2">
                    {t('safety_surgical_title')}
                  </h4>
                  <p className="text-red-400/80 text-sm font-sans uppercase mb-4 font-semibold tracking-wider">
                    {t('safety_surgical_risk')}
                  </p>
                  <p className="text-background-light/60 text-sm">{t('safety_surgical_desc')}</p>
                </div>
                <div className="bg-primary p-8 rounded-2xl">
                  <h4 className="font-display text-2xl text-white mb-2">{t('safety_fab_title')}</h4>
                  <p className="text-white/70 text-sm font-sans uppercase mb-4 font-semibold tracking-wider">
                    {t('safety_fab_risk')}
                  </p>
                  <p className="text-white/80 text-sm">{t('safety_fab_desc')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── The Method (3 Staggered Cards) ── */}
      <section className="py-section-y bg-surface overflow-hidden">
        <Container>
          <SectionHeader
            label={t('method_label')}
            title={t('method_title')}
            subtitle={t('method_desc')}
          />
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {METHOD_STEPS.map((step) => (
              <motion.div
                key={step.key}
                variants={itemVariants}
                className={`group h-[440px] md:h-[500px] relative overflow-hidden rounded-2xl ${step.offset}`}
              >
                <Image
                  src="/images/bbl-example.png"
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8 text-background-light">
                  <h3 className="font-display text-2xl mb-2">{t(`method_${step.key}_title`)}</h3>
                  <p className="text-sm text-background-light/80">{t(`method_${step.key}_desc`)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ── Benefits Grid ── */}
      <section className="py-section-y bg-page-shape overflow-hidden">
        <Container>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {BENEFITS.map((b) => (
              <motion.div key={b.key} variants={itemVariants} className="flex flex-col items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full">
                  <span className="material-symbols-outlined text-primary" aria-hidden="true">
                    {b.icon}
                  </span>
                </div>
                <h4 className="font-display text-xl text-secondary">{t(`benefit_${b.key}`)}</h4>
                <p className="text-secondary/60 font-light">{t(`benefit_${b.key}_desc`)}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ── Treatment Pricing ── */}
      {SHAPE_TREATMENTS.map((treatment, index) => (
        <section
          key={treatment.id}
          className={`py-section-y overflow-hidden ${index % 2 === 0 ? 'bg-surface' : 'bg-page-shape'}`}
        >
          <Container>
            <SectionHeader
              label={t('section_label')}
              title={t(`${treatment.nameKey}_name`)}
              subtitle={t(`${treatment.nameKey}_desc`)}
            />
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
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
                  <ConsultTrigger
                    from="bbl"
                    className="font-sans text-[10px] uppercase tracking-[0.15em] text-primary font-bold hover:underline"
                  >
                    {t('variant_book')}
                  </ConsultTrigger>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      ))}

      {/* ── Post-Treatment / Aftercare ── */}
      <section className="py-section-y bg-surface overflow-hidden">
        <Container>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_PREMIUM }}
            >
              <h2 className="font-display text-display-lg text-secondary mb-8">{t('aftercare_title')}</h2>
              <p className="text-secondary/70 text-lg mb-10 font-light">{t('aftercare_desc')}</p>
              <div className="space-y-4">
                {AFTERCARE_STEPS.map((step, i) => (
                  <div
                    key={step}
                    className="flex items-center gap-6 p-6 rounded-xl bg-page-shape"
                  >
                    <span className="text-2xl font-display text-primary italic">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-secondary">{t(`aftercare_${step}`)}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE_PREMIUM }}
              className="relative"
            >
              <Image
                src="/images/bbl-example.png"
                alt="Nazorg illustratie"
                width={600}
                height={500}
                className="rounded-xl shadow-soft-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute -bottom-8 -right-4 md:-bottom-10 md:-right-10 bg-primary p-8 md:p-10 rounded-xl hidden md:block">
                <p className="text-white font-display text-2xl italic">{t('aftercare_quote')}</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-section-y overflow-hidden">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_PREMIUM }}
            className="bg-secondary text-background-light py-20 md:py-24 rounded-[3rem] px-8 overflow-hidden relative text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="font-display text-display-lg text-background-light italic mb-8">
                {t('cta_title')}
              </h2>
              <p className="font-sans font-light text-background-light/70 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
                {t('cta_desc')}
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <ConsultTrigger
                  from="bbl"
                  className="w-full md:w-auto inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-12 py-5 text-xs tracking-[0.3em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]"
                >
                  {t('cta_button')}
                </ConsultTrigger>
                <a
                  href="tel:+31850000000"
                  className="w-full md:w-auto inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-12 py-5 text-xs tracking-[0.3em] border border-background-light/20 text-background-light hover:bg-background-light/10 transition-all duration-300"
                >
                  {t('cta_button_secondary')}
                </a>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
