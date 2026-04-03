'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight, Clock, Shield, Stethoscope, ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import ConsultTrigger from '@/components/consult/ConsultTrigger';
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
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  const tabs = [
    { id: 'tab-treatment', label: locale === 'nl' ? 'De behandeling' : 'The treatment' },
    { id: 'tab-aftercare', label: locale === 'nl' ? 'Nazorg' : 'Aftercare' },
    { id: 'tab-why', label: locale === 'nl' ? 'Waarom FabClinic' : 'Why FabClinic' },
  ];

  const trustIndicators = [
    { icon: <Check size={18} strokeWidth={3} />, label: locale === 'nl' ? 'Natuurlijk resultaat' : 'Natural results' },
    { icon: <Stethoscope size={18} />, label: locale === 'nl' ? 'Ervaren specialisten' : 'Experienced specialists' },
    { icon: <Shield size={18} />, label: locale === 'nl' ? 'Veilig en BIG gecertificeerd' : 'Safe and BIG certified' },
  ];

  const quickInfo = [
    { label: treatment.priceFrom || '€90', sub: locale === 'nl' ? 'Vanaf' : 'From', filled: true },
    { label: locale === 'nl' ? '3-6 mnd' : '3-6 mo', sub: locale === 'nl' ? 'Duur effect' : 'Duration', filled: false },
    { label: locale === 'nl' ? '2 wkn' : '2 wks', sub: locale === 'nl' ? 'Controle' : 'Check-up', filled: false },
    { label: locale === 'nl' ? '15-30 min' : '15-30 min', sub: locale === 'nl' ? 'Behandeltijd' : 'Treatment time', filled: false },
  ];

  const beforeAfterSlides = [
    { before: treatment.heroImage, after: treatment.heroImage },
    { before: treatment.heroImage, after: treatment.heroImage },
    { before: treatment.heroImage, after: treatment.heroImage },
  ];

  return (
    <>
      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="relative w-full pt-40 pb-20 overflow-hidden bg-background-light">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_PREMIUM }}
              className="font-display text-display-xl text-secondary mb-6"
            >
              {t(treatment.titleKey)}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
              className="font-sans font-light text-secondary/70 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              {t(treatment.descKey)}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE_PREMIUM }}
              className="flex flex-wrap justify-center gap-4 mb-10"
            >
              <ConsultTrigger className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-10 py-4 text-xs tracking-[0.2em] bg-secondary text-white shadow-soft-lg hover:bg-secondary/90 transition-all duration-300 active:scale-[0.97]">
                {locale === 'nl' ? 'Maak afspraak' : 'Book appointment'}
              </ConsultTrigger>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-10 py-4 text-xs tracking-[0.2em] border-2 border-secondary/20 text-secondary hover:border-primary hover:text-primary transition-all duration-300"
              >
                {locale === 'nl' ? 'Bekijk prijzen' : 'View prices'}
              </a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE_PREMIUM }}
              className="flex flex-wrap justify-center gap-8"
            >
              {trustIndicators.map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-secondary/60">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {item.icon}
                  </span>
                  <span className="font-sans text-xs tracking-wide">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════ PRICING & QUICK INFO CARD ═══════════════════ */}
      <section id="pricing" className="py-section-y bg-white overflow-hidden">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_PREMIUM }}
            className="max-w-2xl mx-auto"
          >
            <div className="rounded-2xl border border-primary/10 bg-surface-elevated p-8 md:p-10 shadow-soft-lg">
              <h2 className="font-display text-3xl md:text-4xl text-secondary italic mb-3">
                {locale === 'nl' ? 'Prijzen' : 'Prices'}
              </h2>
              <p className="font-sans font-light text-secondary/60 text-sm mb-8">
                {locale === 'nl'
                  ? 'Transparante tarieven, geen verborgen kosten. Inclusief controle na 2 weken.'
                  : 'Transparent pricing, no hidden costs. Includes 2-week follow-up.'}
              </p>

              {/* Quick Info Badges */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {quickInfo.map((info) => (
                  <div
                    key={info.sub}
                    className={`rounded-pill px-5 py-3 flex items-center gap-3 ${
                      info.filled
                        ? 'bg-secondary text-white'
                        : 'bg-champagne/50 text-secondary border border-secondary/5'
                    }`}
                  >
                    <Clock size={14} className="text-primary" />
                    <div>
                      <span className="font-sans text-sm font-bold block">{info.label}</span>
                      <span className={`font-sans text-[10px] uppercase tracking-wider ${info.filled ? 'text-white/60' : 'text-secondary/50'}`}>
                        {info.sub}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Treatment Image */}
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
                <Image
                  src={treatment.heroImage}
                  alt={t(treatment.titleKey)}
                  fill
                  loading="lazy"
                  quality={85}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 640px"
                />
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ═══════════════════ TABBED DETAILS SECTION ═══════════════════ */}
      <section className="py-section-y bg-background-light overflow-hidden">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-12" role="tablist" aria-label={locale === 'nl' ? 'Behandelinformatie' : 'Treatment information'}>
              {tabs.map((tab, i) => (
                <button
                  key={tab.id}
                  id={tab.id}
                  role="tab"
                  aria-selected={activeTab === i}
                  aria-controls={`${tab.id}-panel`}
                  onClick={() => setActiveTab(i)}
                  className={`rounded-pill px-6 py-3 font-sans text-xs uppercase tracking-[0.15em] font-bold transition-all duration-300 ${
                    activeTab === i
                      ? 'bg-primary text-white shadow-gold-glow'
                      : 'bg-white text-secondary/60 border border-secondary/10 hover:border-primary/30 hover:text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                id={`${tabs[activeTab].id}-panel`}
                role="tabpanel"
                aria-labelledby={tabs[activeTab].id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <h3 className="font-display text-3xl md:text-4xl text-secondary italic mb-6">
                    {activeTab === 0 && (locale === 'nl'
                      ? `Wat zijn ${t(treatment.titleKey).toLowerCase()}?`
                      : `What are ${t(treatment.titleKey).toLowerCase()}?`)}
                    {activeTab === 1 && (locale === 'nl' ? 'Nazorg & herstel' : 'Aftercare & recovery')}
                    {activeTab === 2 && (locale === 'nl' ? 'Waarom FabClinic?' : 'Why FabClinic?')}
                  </h3>
                  <div className="space-y-4">
                    {treatment.features.map((fKey) => (
                      <div key={fKey} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={12} strokeWidth={3} className="text-primary" />
                        </span>
                        <p className="font-sans font-light text-secondary/70 text-base leading-relaxed">
                          {t(fKey)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <ConsultTrigger className="inline-flex items-center gap-2 justify-center rounded-pill font-sans uppercase font-bold px-8 py-4 text-xs tracking-[0.2em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]">
                      {t('hero_cta')} <ArrowRight size={14} />
                    </ConsultTrigger>
                  </div>
                </div>

                {/* Image with modern cutout shape */}
                <div className="relative">
                  <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-soft-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}>
                    <Image
                      src={treatment.heroImage}
                      alt={t(treatment.titleKey)}
                      fill
                      loading="lazy"
                      quality={85}
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </section>

      {/* ═══════════════════ BEFORE & AFTER GALLERY ═══════════════════ */}
      <section className="py-section-y bg-white overflow-hidden">
        <Container>
          <div className="text-center mb-12">
            <span className="font-sans text-primary text-xs tracking-[0.3em] uppercase mb-4 block font-semibold">
              {locale === 'nl' ? 'RESULTATEN' : 'RESULTS'}
            </span>
            <h2 className="font-display text-display-lg text-secondary">
              {locale === 'nl' ? 'Voor & ' : 'Before & '}
              <span className="italic font-light text-primary">{locale === 'nl' ? 'Na' : 'After'}</span>
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="grid grid-cols-2 gap-4 rounded-2xl overflow-hidden">
              <div className="relative aspect-[3/4]">
                <Image
                  src={beforeAfterSlides[slideIndex].before}
                  alt={locale === 'nl' ? `${t(treatment.titleKey)} — voor behandeling` : `${t(treatment.titleKey)} — before treatment`}
                  fill
                  loading="lazy"
                  quality={85}
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 380px"
                />
                <span className="absolute bottom-4 left-4 bg-secondary/80 text-white font-sans text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-pill">
                  {locale === 'nl' ? 'Voor' : 'Before'}
                </span>
              </div>
              <div className="relative aspect-[3/4]">
                <Image
                  src={beforeAfterSlides[slideIndex].after}
                  alt={locale === 'nl' ? `${t(treatment.titleKey)} — na behandeling` : `${t(treatment.titleKey)} — after treatment`}
                  fill
                  loading="lazy"
                  quality={85}
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 380px"
                />
                <span className="absolute bottom-4 left-4 bg-primary/80 text-white font-sans text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-pill">
                  {locale === 'nl' ? 'Na' : 'After'}
                </span>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setSlideIndex((prev) => (prev - 1 + beforeAfterSlides.length) % beforeAfterSlides.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white shadow-soft-md flex items-center justify-center text-secondary hover:text-primary transition-colors"
              aria-label={locale === 'nl' ? 'Vorige foto' : 'Previous photo'}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setSlideIndex((prev) => (prev + 1) % beforeAfterSlides.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white shadow-soft-md flex items-center justify-center text-secondary hover:text-primary transition-colors"
              aria-label={locale === 'nl' ? 'Volgende foto' : 'Next photo'}
            >
              <ChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {beforeAfterSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlideIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === slideIndex ? 'bg-primary w-6' : 'bg-secondary/20'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════ BOTTOM CTA ═══════════════════ */}
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
              className="flex flex-wrap justify-center gap-4"
            >
              <ConsultTrigger className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-12 py-5 text-xs tracking-[0.3em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]">
                {t('cta_button')}
              </ConsultTrigger>
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
    </>
  );
}
