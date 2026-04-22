'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, type Variants } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import {
  Shield, Stethoscope, Timer, Heart, CheckCircle2,
  Sparkles, CalendarDays, Clock, ChevronDown, ArrowRight,
  ShieldCheck, Activity, UserCheck, BadgeCheck,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import ConsultTrigger from '@/components/consult/ConsultTrigger';
import BmiCalculator from '@/components/BmiCalculator';
import { SHAPE_TREATMENTS, SHAPE_VARIANTS_FLAT } from '@/lib/data/shape-treatments';
import { FAQ_ITEMS, type FaqItem } from '@/lib/data/faq';
import { EASE_PREMIUM } from '@/lib/motion';
import TreatmentMapGrid from '@/components/treatments/TreatmentMapGrid';
import BookingSlotSelector from '@/components/booking/BookingSlotSelector';
import DetailsForm, { type DetailsFormData } from '@/components/treatments/DetailsForm';
import { useCart } from '@/lib/cart-context';

/* ── Lucide icon map (replaces Material Symbols dependency) ── */
const BENEFIT_ICONS: Record<string, React.ReactNode> = {
  no_downtime: <Timer size={22} />,
  less_pain: <Heart size={22} />,
  safe: <ShieldCheck size={22} />,
  minimal: <Sparkles size={22} />,
  duration: <CalendarDays size={22} />,
  time: <Clock size={22} />,
};

const BENEFITS = [
  'no_downtime', 'less_pain', 'safe', 'minimal', 'duration', 'time',
] as const;

const AFTERCARE_STEPS = ['1', '2', '3', '4'] as const;

const METHOD_STEPS = [
  { key: 'step1', offset: '', num: '01', image: '/images/BBL/BBL consult.jpg' },
  { key: 'step2', offset: 'md:mt-12', num: '02', image: '/images/BBL/BBL anesthesia.jpg' },
  { key: 'step3', offset: 'md:mt-24', num: '03', image: '/images/BBL/BBL drawing.webp' },
] as const;

const RECOVERY_MILESTONES = ['day1', 'week1', 'week2', 'month1', 'month3'] as const;

const CANDIDATE_CHECKS = ['bmi', 'age', 'health', 'expectations', 'nonsmoker'] as const;

export default function ShapePage() {
  const t = useTranslations('shape_page');
  const locale = useLocale() as 'nl' | 'en';
  const cart = useCart();
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const [step, setStep] = useState<'select' | 'date' | 'details' | 'done'>('select');
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const shapeFaqs: FaqItem[] = FAQ_ITEMS.filter((item) => item.category === 'shape');

  /* Sync local selections to global cart */
  useEffect(() => {
    const currentIds = cart.getItemsByType('shape').map((i) => i.id);
    for (const variantId of selectedVariants) {
      if (!currentIds.includes(variantId)) {
        const variant = SHAPE_VARIANTS_FLAT.find((v) => v.id === variantId);
        if (variant) cart.addItem({ id: variant.id, type: 'shape', nameKey: variant.nameKey, namespace: 'shape_page', priceCents: variant.priceCents });
      }
    }
    for (const id of currentIds) {
      if (!selectedVariants.includes(id)) cart.removeItem(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariants]);

  const addToCart = useCallback((variantId: string) => {
    setSelectedVariants((prev) => {
      if (prev.includes(variantId)) return prev;
      return [...prev, variantId];
    });
  }, []);

  const removeFromCart = useCallback((variantId: string) => {
    setSelectedVariants((prev) => prev.filter((v) => v !== variantId));
  }, []);

  const handleDetailsSubmit = useCallback(async (data: DetailsFormData) => {
    setIsLoading(true);
    try {
      const selectedItems = SHAPE_VARIANTS_FLAT.filter((v) => selectedVariants.includes(v.id));
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'payment',
          treatmentType: 'shape',
          zones: selectedItems.map((v) => ({ id: v.id, name: t(v.nameKey), priceCents: v.priceCents })),
          customerDetails: data,
          selectedSlotId,
          locale,
        }),
      });
      const result = await response.json();
      if (result.url) {
        window.location.href = result.url;
      } else {
        setStep('done');
      }
    } catch {
      setStep('done');
    } finally {
      setIsLoading(false);
    }
  }, [selectedVariants, t, locale, selectedSlotId]);

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
      {/* ═══════════════════════════════════════════════════════
          HERO - Full-viewport immersive hero with trust badges
          ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/placeholders/1-800x600.png"
            alt=""
            fill
            priority
            quality={85}
            className="object-cover opacity-30 mix-blend-overlay"
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
              className="flex flex-wrap gap-4 mb-12"
            >
              <ConsultTrigger
                from="bbl"
                className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-12 py-5 text-xs tracking-[0.3em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]"
              >
                {t('hero_cta')}
              </ConsultTrigger>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-10 py-5 text-xs tracking-[0.3em] border-2 border-background-light/20 text-background-light hover:border-primary hover:text-primary transition-all duration-300"
              >
                {t('hero_cta_pricing')}
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: EASE_PREMIUM }}
              className="font-sans text-sm text-background-light/50 tracking-wide mb-4"
            >
              {t('hero_price_anchor')}
            </motion.p>

            <motion.a
              href="#safety"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.22, ease: EASE_PREMIUM }}
              className="inline-flex items-center gap-2 font-sans text-xs text-primary/80 hover:text-primary transition-colors underline underline-offset-4"
            >
              {t('hero_compare')}
            </motion.a>

            <div className="mt-8" />

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE_PREMIUM }}
              className="flex flex-wrap gap-6"
            >
              {[
                { icon: <BadgeCheck size={16} />, key: 'trust_big' },
                { icon: <Shield size={16} />, key: 'trust_safe' },
                { icon: <Stethoscope size={16} />, key: 'trust_specialist' },
              ].map((badge) => (
                <div key={badge.key} className="flex items-center gap-2 text-background-light/60">
                  <span className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                    {badge.icon}
                  </span>
                  <span className="font-sans text-xs tracking-wide">{t(badge.key)}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SAFETY COMPARISON - Surgical BBL vs. Filler BBL
          ═══════════════════════════════════════════════════════ */}
      <section id="safety" className="py-section-y bg-page-shape overflow-hidden">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_PREMIUM }}
            className="bg-secondary p-8 md:p-16 lg:p-20 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/placeholders/3-800x600.png"
                alt="BBL Safety Background"
                fill
                quality={85}
                className="object-cover opacity-20 mix-blend-overlay grayscale"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/40 to-transparent" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="font-display text-display-lg text-background-light italic mb-8">
                  {t('safety_title')}
                </h2>
                <p className="text-lg text-background-light/70 font-light mb-8 leading-relaxed">
                  {t('safety_desc')}
                </p>
                <div className="flex items-center gap-4 text-primary mb-8">
                  <ShieldCheck size={32} aria-hidden="true" />
                  <span className="font-sans uppercase tracking-widest text-sm font-semibold">
                    {t('safety_badge')}
                  </span>
                </div>
                <ConsultTrigger
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-pill text-sm font-semibold tracking-wide hover:bg-primary/90 transition-colors"
                >
                  {t('safety_cta')} <ArrowRight size={16} />
                </ConsultTrigger>
              </div>

              <div className="md:w-1/2 grid grid-cols-1 gap-6">
                <div className="bg-background-light/5 p-8 rounded-2xl backdrop-blur-sm">
                  <h3 className="font-display text-2xl text-background-light mb-2">
                    {t('safety_surgical_title')}
                  </h3>
                  <p className="text-[#C4785A]/90 text-sm font-sans uppercase mb-4 font-semibold tracking-wider">
                    {t('safety_surgical_risk')}
                  </p>
                  <p className="text-background-light/60 text-sm">{t('safety_surgical_desc')}</p>
                </div>
                <div className="bg-primary p-8 rounded-2xl">
                  <h3 className="font-display text-2xl text-white mb-2">{t('safety_fab_title')}</h3>
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

      {/* ═══════════════════════════════════════════════════════
          TREATMENT PRICING (Moved after hero)
          ═══════════════════════════════════════════════════════ */}
      {SHAPE_TREATMENTS.map((treatment, index) => (
        <section
          key={treatment.id}
          id={index === 0 ? 'pricing' : undefined}
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

      {/* ═══════════════════════════════════════════════════════
          INTERACTIVE TREATMENT SELECTOR - Click card + popup + add to cart
          ═══════════════════════════════════════════════════════ */}
      <TreatmentMapGrid
        zones={SHAPE_VARIANTS_FLAT}
        namespace="shape_page"
        label={t('section_label')}
        title={<>{locale === 'nl' ? 'Kies uw ' : 'Choose your '}<span className="italic font-light text-primary">{locale === 'nl' ? 'behandeling' : 'treatment'}</span></>}
        subtitle={locale === 'nl' ? 'Klik op een behandeling voor meer informatie en voeg deze toe aan uw selectie.' : 'Click a treatment for more information and add it to your selection.'}
        onAddToCart={addToCart}
        cartZoneIds={selectedVariants}
        bgClass="bg-page-shape"
      />

      {/* Date Selection */}
      {step === 'date' && (
        <section className="py-section-y bg-page-shape overflow-hidden" id="date-select">
          <Container>
            <div className="max-w-xl mx-auto">
              <SectionHeader
                label={locale === 'nl' ? 'Datum kiezen' : 'Choose date'}
                title={<>{locale === 'nl' ? 'Kies uw ' : 'Choose your '}<span className="italic font-light text-primary">{locale === 'nl' ? 'zaterdag' : 'Saturday'}</span></>}
              />
              <div className="glass rounded-2xl border border-primary/10 p-8 md:p-10 shadow-soft-lg">
                <BookingSlotSelector
                  locale={locale}
                  treatmentName={selectedVariants.map((id) => {
                    const v = SHAPE_VARIANTS_FLAT.find((sv) => sv.id === id);
                    return v ? t(v.nameKey) : id;
                  }).join(', ')}
                  onSlotSelect={setSelectedSlotId}
                />
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  disabled={!selectedSlotId}
                  onClick={() => setStep('details')}
                  className="mt-6 w-full inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-8 py-4 text-[11px] tracking-[0.25em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none"
                >
                  {locale === 'nl' ? 'Ga verder' : 'Continue'}
                </motion.button>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Details Form */}
      {step === 'details' && (
        <section className="py-section-y bg-page-shape overflow-hidden">
          <Container>
            <div className="max-w-xl mx-auto">
              <SectionHeader
                label={t('details_label')}
                title={<>{t('details_title')} <span className="italic font-light text-primary">{t('details_title_accent')}</span></>}
              />
              <div className="glass rounded-2xl border border-primary/10 p-8 md:p-10 shadow-soft-lg">
                <DetailsForm
                  onSubmit={handleDetailsSubmit}
                  isLoading={isLoading}
                  namespace="shape_page"
                />
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Confirmation */}
      {step === 'done' && (
        <section className="py-section-y bg-mint overflow-hidden">
          <Container>
            <div className="text-center max-w-xl mx-auto">
              <h2 className="font-display text-display-md text-secondary mb-4">{t('done_title')}</h2>
              <p className="font-sans text-secondary/60 leading-relaxed">{t('done_desc')}</p>
            </div>
          </Container>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          INTRODUCTION - What is a BBL / Buttock Filler?
          ═══════════════════════════════════════════════════════ */}
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
                src="/images/placeholders/2-800x600.png"
                alt={t('intro_img_alt')}
                width={600}
                height={500}
                loading="lazy"
                quality={85}
                className="relative z-10 rounded-xl shadow-soft-lg transition-all duration-700"
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

      {/* ═══════════════════════════════════════════════════════
          CREDENTIALS - Surgical Safety & BIG Registration
          ═══════════════════════════════════════════════════════ */}
      <section className="py-section-y bg-surface overflow-hidden">
        <Container>
          <SectionHeader
            label={t('credentials_label')}
            title={t('credentials_title')}
            subtitle={t('credentials_desc')}
          />
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {[
              { icon: <BadgeCheck size={24} />, key: 'cred_big' },
              { icon: <ShieldCheck size={24} />, key: 'cred_facility' },
              { icon: <Activity size={24} />, key: 'cred_protocol' },
              { icon: <UserCheck size={24} />, key: 'cred_screening' },
            ].map((cred) => (
              <motion.div
                key={cred.key}
                variants={itemVariants}
                className="text-center flex flex-col items-center gap-4"
              >
                <div className="w-14 h-14 bg-primary/10 flex items-center justify-center rounded-full text-primary">
                  {cred.icon}
                </div>
                <h3 className="font-display text-lg text-secondary">{t(`${cred.key}_title`)}</h3>
                <p className="text-secondary/60 font-light text-sm leading-relaxed">{t(`${cred.key}_desc`)}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════
          THE METHOD - 3 Staggered Cards with step numbers
          ═══════════════════════════════════════════════════════ */}
      <section className="py-section-y bg-page-shape overflow-hidden">
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
                className={`group min-h-[440px] md:min-h-[500px] relative overflow-hidden rounded-2xl ${step.offset}`}
              >
                <Image
                  src={step.image}
                  alt={t(`method_${step.key}_title`)}
                  fill
                  loading="lazy"
                  quality={85}
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/30 to-transparent opacity-70" />

                {/* Large step number watermark */}
                <span className="absolute top-6 right-8 font-display text-8xl text-background-light/[0.08] pointer-events-none select-none" aria-hidden="true">
                  {step.num}
                </span>

                <div className="absolute bottom-8 left-8 right-8 text-background-light">
                  <span className="font-sans text-primary text-[10px] tracking-[0.3em] uppercase mb-2 block font-semibold">
                    {t('method_step_label', { num: step.num })}
                  </span>
                  <h3 className="font-display text-3xl mb-2">{t(`method_${step.key}_title`)}</h3>
                  <p className="text-sm text-background-light/80 leading-relaxed">{t(`method_${step.key}_desc`)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BENEFITS GRID - With SectionHeader + Lucide icons
          ═══════════════════════════════════════════════════════ */}
      <section className="py-section-y bg-surface overflow-hidden">
        <Container>
          <SectionHeader
            label={t('benefits_label')}
            title={t('benefits_title')}
            subtitle={t('benefits_subtitle')}
          />
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {BENEFITS.map((key) => (
              <motion.div key={key} variants={itemVariants} className="flex flex-col items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full text-primary">
                  {BENEFIT_ICONS[key]}
                </div>
                <h3 className="font-display text-xl text-secondary">{t(`benefit_${key}`)}</h3>
                <p className="text-secondary/60 font-light">{t(`benefit_${key}_desc`)}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════
          RECOVERY TIMELINE - Visual day-by-day breakdown
          ═══════════════════════════════════════════════════════ */}
      <section className="py-section-y bg-page-shape overflow-hidden">
        <Container>
          <SectionHeader
            label={t('recovery_label')}
            title={t('recovery_title')}
            subtitle={t('recovery_subtitle')}
          />
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="relative"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              {/* Vertical timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-primary/20" aria-hidden="true" />

              {RECOVERY_MILESTONES.map((milestone) => (
                <motion.div
                  key={milestone}
                  variants={itemVariants}
                  className="relative pl-16 pb-10 last:pb-0"
                >
                  <div className="absolute left-3.5 top-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center" aria-hidden="true">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  </div>

                  <div className="bg-surface-elevated p-6 rounded-xl shadow-soft-sm">
                    <span className="font-sans text-primary text-[10px] tracking-[0.2em] uppercase font-semibold block mb-1">
                      {t(`recovery_${milestone}_period`)}
                    </span>
                    <h3 className="font-display text-xl text-secondary mb-2">{t(`recovery_${milestone}_title`)}</h3>
                    <p className="text-secondary/60 font-light text-sm leading-relaxed">{t(`recovery_${milestone}_desc`)}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════
          AFTERCARE - Tips + image + quote (now visible on mobile)
          ═══════════════════════════════════════════════════════ */}
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
                src="/images/BBL/bbl result.png"
                alt={t('aftercare_img_alt')}
                width={600}
                height={500}
                loading="lazy"
                quality={85}
                className="rounded-xl shadow-soft-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Quote - absolute on md+, block on mobile */}
              <div className="mt-6 md:mt-0 md:absolute md:-bottom-10 md:-right-10 bg-primary p-8 md:p-10 rounded-xl">
                <p className="text-white font-display text-2xl italic">{t('aftercare_quote')}</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FAQ - Shape-specific questions (SEO rich snippets)
          ═══════════════════════════════════════════════════════ */}
      <section className="py-section-y bg-page-shape overflow-hidden">
        <Container>
          <SectionHeader
            label={t('faq_label')}
            title={t('faq_title')}
            subtitle={t('faq_subtitle')}
          />
          <div className="max-w-3xl mx-auto space-y-3">
            {shapeFaqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div key={faq.id} className="bg-surface-elevated rounded-xl overflow-hidden shadow-soft-sm">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset focus-visible:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg text-secondary pr-4">
                      {t.has(faq.questionKey) ? t(faq.questionKey) : faq.questionKey}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`text-primary shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6">
                      <p className="text-secondary/70 font-light leading-relaxed">
                        {t.has(faq.answerKey) ? t(faq.answerKey) : faq.answerKey}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-center mt-8 text-secondary/60 text-sm">
            {t('faq_contact')}{' '}
            <a href={`/${locale}/contact`} className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
              {t('faq_contact_link')}
            </a>
          </p>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FINAL CTA - Full-width immersive call-to-action
          ═══════════════════════════════════════════════════════ */}
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
                  href={`/${locale}/faq`}
                  className="w-full md:w-auto inline-flex items-center gap-2 justify-center rounded-pill font-sans uppercase font-bold px-12 py-5 text-xs tracking-[0.3em] border border-background-light/20 text-background-light hover:bg-background-light/10 transition-all duration-300"
                >
                  {t('cta_button_secondary')} <ArrowRight size={14} />
                </a>
              </div>
              <p className="mt-8 text-background-light/50 text-sm font-light">
                {t('cta_trust')}
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Removed per-page FloatingCart - using global GlobalFloatingCart in layout */}
    </>
  );
}
