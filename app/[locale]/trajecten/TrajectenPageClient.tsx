'use client';

import { motion, type Variants } from 'motion/react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ClipboardCheck, Stethoscope, Pill, HeartPulse, Apple, Dumbbell, Brain, ShieldCheck, UserCheck, MessageCircle, BadgeCheck } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import ConsultTrigger from '@/components/consult/ConsultTrigger';
import { EASE_PREMIUM } from '@/lib/motion';
import { ArrowRight } from 'lucide-react';
import TreatmentCatalog from '@/components/treatments/TreatmentCatalog';
import { getBotoxTreatments, type Locale } from '@/lib/clinic-data';

export default function TrajectenPage() {
  const t = useTranslations('trajecten_page');
  const tNav = useTranslations('nav');
  const locale = useLocale() as Locale;
  const botoxTreatments = getBotoxTreatments(locale);

  const phases = [
    { num: '1', title: t('phase1_title'), desc: t('phase1_desc'), icon: <ClipboardCheck className="w-8 h-8" strokeWidth={1.5} /> },
    { num: '2', title: t('phase2_title'), desc: t('phase2_desc'), icon: <Stethoscope className="w-8 h-8" strokeWidth={1.5} /> },
    { num: '3', title: t('phase3_title'), desc: t('phase3_desc'), icon: <Pill className="w-8 h-8" strokeWidth={1.5} /> },
    { num: '4', title: t('phase4_title'), desc: t('phase4_desc'), icon: <HeartPulse className="w-8 h-8" strokeWidth={1.5} /> },
  ];

  const lifestyleItems = [
    { title: t('lifestyle_item1_title'), desc: t('lifestyle_item1_desc'), icon: <Brain className="w-6 h-6" strokeWidth={1.5} /> },
    { title: t('lifestyle_item2_title'), desc: t('lifestyle_item2_desc'), icon: <Apple className="w-6 h-6" strokeWidth={1.5} /> },
    { title: t('lifestyle_item3_title'), desc: t('lifestyle_item3_desc'), icon: <Dumbbell className="w-6 h-6" strokeWidth={1.5} /> },
  ];

  const trustItems = [
    { title: t('trust_item1_title'), desc: t('trust_item1_desc'), icon: <BadgeCheck className="w-6 h-6" strokeWidth={1.5} /> },
    { title: t('trust_item2_title'), desc: t('trust_item2_desc'), icon: <UserCheck className="w-6 h-6" strokeWidth={1.5} /> },
    { title: t('trust_item3_title'), desc: t('trust_item3_desc'), icon: <MessageCircle className="w-6 h-6" strokeWidth={1.5} /> },
    { title: t('trust_item4_title'), desc: t('trust_item4_desc'), icon: <ShieldCheck className="w-6 h-6" strokeWidth={1.5} /> },
  ];

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
            src="/images/hero-atmos.png"
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/70" />
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

      {/* Four Phases */}
      <section className="py-section-y bg-page-trajecten overflow-hidden">
        <Container>
          <SectionHeader
            label={t('phase_label')}
            title={<>{t('phase_title')} <span className="italic font-light text-primary">{t('phase_title_accent')}</span></>}
            subtitle={t('phase_desc')}
          />

          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-[16px] left-[12.5%] right-[12.5%] h-[2px] border-t-2 border-dashed border-primary/20 z-0" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 relative z-10">
              {phases.map((phase) => (
                <motion.div key={phase.num} variants={itemVariants} className="flex flex-col relative group">
                  {/* Phase badge */}
                  <div className="mx-auto flex justify-center mb-8 relative z-20">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-gold-glow ring-8 ring-background-light">
                      <span className="font-sans text-white text-sm font-semibold">{phase.num}</span>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ y: -8, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                    className="bg-white rounded-md shadow-soft-sm hover:shadow-soft-lg transition-shadow duration-300 border border-primary/5 hover:border-primary/15 flex-grow flex flex-col overflow-hidden group/card"
                  >
                    <div className="relative w-full aspect-[3/2] bg-secondary/5 flex items-center justify-center overflow-hidden border-b border-primary/5">
                      <div className="absolute inset-0 bg-primary opacity-0 group-hover/card:opacity-5 transition-opacity duration-500" aria-hidden="true" />
                      <div className="text-primary transition-all duration-500 group-hover/card:scale-110" aria-hidden="true">
                        {phase.icon}
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="font-display text-xl md:text-2xl text-secondary mb-4 italic font-bold group-hover/card:text-primary transition-colors duration-300">
                        {phase.title}
                      </h3>
                      <p className="font-sans font-light text-secondary/70 text-base leading-relaxed flex-grow">
                        {phase.desc}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Lifestyle Coaching */}
      <section className="py-section-y bg-white overflow-hidden">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            <figure className="flex-1 relative w-full h-[500px] md:h-[600px] rounded-md overflow-hidden group shadow-soft-lg bg-secondary/5">
              <motion.div
                initial={{ x: -60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE_PREMIUM }}
                className="w-full h-full relative"
              >
                <Image
                  src="/images/lifestyle-coaching.png"
                  alt="Lifestyle coaching session"
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-secondary/5 group-hover:opacity-0 transition-opacity duration-500" />
              </motion.div>
            </figure>

            <div className="flex-1 w-full">
              <SectionHeader
                label={t('lifestyle_label')}
                title={<>{t('lifestyle_title')} <br /><span className="italic font-light text-primary">{t('lifestyle_title_accent')}</span></>}
                subtitle={t('lifestyle_desc')}
                align="left"
              />
              <dl className="space-y-10">
                {lifestyleItems.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + idx * 0.1, ease: EASE_PREMIUM }}
                    className="flex gap-5 group"
                  >
                    <div className="p-3.5 bg-primary/5 rounded-2xl text-primary transition-all duration-300 ease-premium group-hover:bg-primary group-hover:text-white group-hover:scale-105 h-min shrink-0" aria-hidden="true">
                      {item.icon}
                    </div>
                    <div>
                      <dt className="font-display text-display-sm text-secondary mb-1.5 group-hover:text-primary transition-colors duration-200 italic">{item.title}</dt>
                      <dd className="font-sans font-light text-secondary/70 text-base md:text-lg leading-relaxed">{item.desc}</dd>
                    </div>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust Pillars */}
      <section className="py-section-y bg-background-light overflow-hidden">
        <Container>
          <SectionHeader
            label={t('trust_label')}
            title={<>{t('trust_title')} <span className="italic font-light text-primary">{t('trust_title_accent')}</span></>}
          />
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {trustItems.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="bg-white rounded-md p-8 shadow-soft-sm hover:shadow-soft-lg border border-primary/5 hover:border-primary/15 transition-all duration-300 text-center group"
              >
                <div className="w-14 h-14 mx-auto mb-6 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-display text-lg text-secondary mb-2 italic font-bold">{item.title}</h3>
                <p className="font-sans font-light text-secondary/70 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <TreatmentCatalog
        locale={locale}
        treatments={botoxTreatments}
        label={locale === 'nl' ? 'BOTOX CATALOGUS' : 'BOTOX CATALOG'}
        title={locale === 'nl' ? 'Complete Botox behandelkaart' : 'Complete Botox treatment catalog'}
        subtitle={
          locale === 'nl'
            ? '18 behandelingen met premium intake, klik voor detail en directe zaterdag-slot selectie.'
            : '18 treatments with premium intake, click for details and instant Saturday slot selection.'
        }
      />

      {/* CTA */}
      <section className="py-section-y bg-secondary overflow-hidden">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_PREMIUM }}
              className="font-sans text-primary text-xs tracking-[0.3em] uppercase mb-6 block font-semibold"
            >
              {t('cta_label')}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.05, ease: EASE_PREMIUM }}
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
              <ConsultTrigger className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-12 py-5 text-xs tracking-[0.3em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]">
                {t('cta_button')}
              </ConsultTrigger>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
