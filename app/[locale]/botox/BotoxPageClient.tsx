'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Stethoscope, ShieldCheck, Sparkles, HeartPulse, Clock, ChevronDown, FileSearch, ClipboardCheck, CalendarClock } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import ZoneSelector from '@/components/treatments/ZoneSelector';
import TreatmentCart from '@/components/treatments/TreatmentCart';
import DetailsForm, { type DetailsFormData } from '@/components/treatments/DetailsForm';
import BookingSlotSelector from '@/components/booking/BookingSlotSelector';
import ConsultTrigger from '@/components/consult/ConsultTrigger';
import Testimonials from '@/components/Testimonials';
import BottomCta from '@/components/BottomCta';
import BotoxFaceMap from '@/components/BotoxFaceMap';
import { BOTOX_ZONES } from '@/lib/data/botox-zones';
import { EASE_PREMIUM } from '@/lib/motion';

export default function BotoxPageClient() {
  const t = useTranslations('botox_page');
  const locale = useLocale();
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [step, setStep] = useState<'select' | 'date' | 'details' | 'done'>('select');
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleZone = useCallback((zoneId: string) => {
    setSelectedZones((prev) => {
      const isAdding = !prev.includes(zoneId);
      return isAdding ? [...prev, zoneId] : prev.filter((z) => z !== zoneId);
    });
  }, []);

  const removeZone = useCallback((zoneId: string) => {
    setSelectedZones((prev) => prev.filter((z) => z !== zoneId));
  }, []);

  const addToCartAndScroll = useCallback((zoneId: string) => {
    setSelectedZones((prev) => {
      if (prev.includes(zoneId)) return prev;
      return [...prev, zoneId];
    });
    // Scroll to cart section after a brief delay for state to update
    setTimeout(() => {
      document.getElementById('zones')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }, []);

  const handleDetailsSubmit = useCallback(async (data: DetailsFormData) => {
    setIsLoading(true);
    try {
      const selectedItems = BOTOX_ZONES.filter((z) => selectedZones.includes(z.id));

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'payment',
          treatmentType: 'botox',
          zones: selectedItems.map((z) => ({ id: z.id, name: t(z.nameKey), priceCents: z.priceCents })),
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
  }, [selectedZones, t, locale]);

  /* ── Data arrays ──────────────────────────────────── */
  const trustPillars = [
    { icon: <Stethoscope className="w-7 h-7" />, title: t('trust_certified'), desc: t('trust_certified_desc') },
    { icon: <Sparkles className="w-7 h-7" />, title: t('trust_natural'), desc: t('trust_natural_desc') },
    { icon: <HeartPulse className="w-7 h-7" />, title: t('trust_followup'), desc: t('trust_followup_desc') },
    { icon: <ShieldCheck className="w-7 h-7" />, title: t('trust_safe'), desc: t('trust_safe_desc') },
  ];

  const quickInfo = [
    { value: t('info_duration'), label: t('info_duration_label'), filled: false },
    { value: t('info_effect'), label: t('info_effect_label'), filled: true },
    { value: t('info_recovery'), label: t('info_recovery_label'), filled: false },
    { value: t('info_checkup'), label: t('info_checkup_label'), filled: false },
  ];

  const processSteps = [
    { num: '1', title: t('process_step1_title'), desc: t('process_step1_desc'), icon: <FileSearch className="w-10 h-10" strokeWidth={1.5} /> },
    { num: '2', title: t('process_step2_title'), desc: t('process_step2_desc'), icon: <ClipboardCheck className="w-10 h-10" strokeWidth={1.5} /> },
    { num: '3', title: t('process_step3_title'), desc: t('process_step3_desc'), icon: <CalendarClock className="w-10 h-10" strokeWidth={1.5} /> },
  ];

  const faqs = [
    { q: t('faq_q1'), a: t('faq_a1') },
    { q: t('faq_q2'), a: t('faq_a2') },
    { q: t('faq_q3'), a: t('faq_a3') },
    { q: t('faq_q4'), a: t('faq_a4') },
  ];

  return (
    <>
      {/* ═══ 1. HERO ═══════════════════════════════════ */}
      <section className="relative w-full pt-40 pb-section-y overflow-hidden bg-secondary" aria-label="Botox hero">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/spares/cosmetic-botox-injection-female-forehead.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(198,166,93,0.08)_0%,transparent_70%)]" />
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
              {t('hero_title')}{' '}
              <span className="italic font-light text-primary">{t('hero_title_accent')}</span>
            </motion.h1>

            {/* Gold accent divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.08, ease: EASE_PREMIUM }}
              className="w-20 h-px bg-primary/50 mb-8 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
              className="font-sans font-light text-background-light/70 text-lg md:text-xl leading-relaxed max-w-2xl"
            >
              {t('hero_desc')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE_PREMIUM }}
              className="mt-10"
            >
              <ConsultTrigger
                from="botox"
                className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-10 py-4 text-xs tracking-[0.22em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]"
              >
                {t('hero_cta')}
              </ConsultTrigger>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ═══ 1b. TREATMENT MAP ════════════════════════ */}
      <BotoxFaceMap onAddToCart={addToCartAndScroll} cartZoneIds={selectedZones} />

      {/* ═══ 2. TRUST INDICATORS + QUICK INFO ══════════ */}
      <section className="py-section-y bg-background-light overflow-hidden" aria-label={t('trust_label')}>
        <Container>
          <SectionHeader
            label={t('trust_label')}
            title={<>{t('trust_title')} <span className="italic font-light text-primary">{t('trust_title_accent')}</span></>}
          />

          {/* Quick Info Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
            {quickInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_PREMIUM }}
                className={`rounded-xl px-5 py-4 flex items-center gap-3 ${
                  info.filled
                    ? 'bg-secondary text-white'
                    : 'bg-white text-secondary border border-secondary/5 shadow-soft-sm'
                }`}
              >
                <Clock size={14} className="text-primary shrink-0" />
                <div>
                  <span className="font-sans text-sm font-bold block">{info.value}</span>
                  <span className={`font-sans text-[10px] uppercase tracking-wider ${info.filled ? 'text-white/60' : 'text-secondary/50'}`}>
                    {info.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {trustPillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_PREMIUM }}
                className="group flex flex-col items-center text-center"
              >
                <div className="text-primary mb-5 transition-transform duration-300 ease-premium group-hover:scale-110" aria-hidden="true">
                  {pillar.icon}
                </div>
                <h3 className="font-sans text-secondary text-sm tracking-[0.2em] uppercase mb-2 font-semibold group-hover:text-primary transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="font-sans font-light text-secondary/60 text-sm leading-relaxed max-w-xs">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ 3. HOW IT WORKS ═══════════════════════════ */}
      <section className="py-section-y bg-page-botox overflow-hidden" aria-label={t('process_label')}>
        <Container>
          <SectionHeader
            label={t('process_label')}
            title={<>{t('process_title')} <span className="italic font-light text-primary">{t('process_title_accent')}</span></>}
          />

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-[16px] left-[16.666%] right-[16.666%] h-[2px] border-t-2 border-dashed border-primary/20 z-0" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 relative z-10">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: EASE_PREMIUM }}
                  className="flex flex-col relative group"
                >
                  {/* Step Badge */}
                  <div className="mx-auto flex justify-center mb-8 relative z-20">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-gold-glow ring-8 ring-page-botox">
                      <span className="font-sans text-white text-sm font-semibold">{step.num}</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-md shadow-soft-sm hover:shadow-soft-lg transition-shadow duration-300 ease-premium border border-primary/5 hover:border-primary/15 flex-grow flex flex-col overflow-hidden group/card">
                    <div className="relative w-full aspect-video bg-secondary/5 flex items-center justify-center overflow-hidden border-b border-primary/5">
                      <div className="absolute inset-0 bg-primary opacity-0 group-hover/card:opacity-5 transition-opacity duration-500" aria-hidden="true" />
                      <div className="text-primary transform transition-all duration-500 group-hover/card:scale-110 group-hover/card:rotate-3" aria-hidden="true">
                        {step.icon}
                      </div>
                    </div>
                    <div className="p-8 md:p-10 flex flex-col flex-grow items-center text-center">
                      <h3 className="font-display text-2xl md:text-3xl text-secondary mb-4 leading-tight group-hover/card:text-primary transition-colors duration-300 italic font-bold">
                        {step.title}
                      </h3>
                      <p className="font-sans font-light text-secondary/70 text-base leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ 4. ZONE SELECTOR + CART ═══════════════════ */}
      <section className="py-section-y bg-white overflow-hidden" id="zones">
        <Container>
          <SectionHeader
            label={t('zones_label')}
            title={<>{t('zones_title')} <span className="italic font-light text-primary">{t('zones_title_accent')}</span></>}
            subtitle={t('zones_subtitle')}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <ZoneSelector
                zones={BOTOX_ZONES}
                selectedZones={selectedZones}
                onToggle={toggleZone}
                namespace="botox_page"
              />
            </div>

            <div className="lg:sticky lg:top-28 space-y-6 self-start">
              <TreatmentCart
                zones={BOTOX_ZONES}
                selectedZones={selectedZones}
                onRemove={removeZone}
                onRestore={toggleZone}
                namespace="botox_page"
              />

              {selectedZones.length > 0 && step === 'select' && (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setStep('date')}
                  className="w-full inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-8 py-4 text-[11px] tracking-[0.25em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]"
                >
                  {t('proceed_to_details')}
                </motion.button>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ 4b. DATE SELECTION ═════════════════════ */}
      {step === 'date' && (
        <section className="py-section-y bg-page-botox overflow-hidden" id="date-select">
          <Container>
            <div className="max-w-xl mx-auto">
              <SectionHeader
                label={locale === 'nl' ? 'Datum kiezen' : 'Choose date'}
                title={<>{locale === 'nl' ? 'Kies uw ' : 'Choose your '}<span className="italic font-light text-primary">{locale === 'nl' ? 'zaterdag' : 'Saturday'}</span></>}
              />
              <div className="glass rounded-2xl border border-primary/10 p-8 md:p-10 shadow-soft-lg">
                <BookingSlotSelector
                  locale={locale as 'nl' | 'en'}
                  treatmentName={selectedZones.map((id) => {
                    const z = BOTOX_ZONES.find((bz) => bz.id === id);
                    return z ? t(z.nameKey) : id;
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

      {/* ═══ 5. DETAILS FORM ═══════════════════════════ */}
      {step === 'details' && (
        <section className="py-section-y bg-page-botox overflow-hidden">
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
                  namespace="botox_page"
                />
              </div>
            </div>
          </Container>
        </section>
      )}

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

      {/* ═══ 6. TESTIMONIALS ═══════════════════════════ */}
      <Testimonials />

      {/* ═══ 7. BOTOX FAQ ══════════════════════════════ */}
      <section className="py-section-y bg-background-light overflow-hidden" aria-label={t('faq_label')}>
        <Container>
          <SectionHeader
            label={t('faq_label')}
            title={<>{t('faq_title')} <span className="italic font-light text-primary">{t('faq_title_accent')}</span></>}
          />

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: EASE_PREMIUM }}
                className="bg-white rounded-lg border border-secondary/5 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  aria-expanded={openFaq === i}
                  aria-controls={`botox-faq-${i}`}
                >
                  <span className="font-sans text-secondary text-sm font-medium pr-4">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-primary shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                      className="overflow-hidden"
                      id={`botox-faq-${i}`}
                      role="region"
                    >
                      <p className="px-6 pb-5 font-sans font-light text-secondary/60 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ 8. AVAILABILITY ═══════════════════════════ */}
      <section className="py-section-y bg-page-botox overflow-hidden">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="glass rounded-2xl border border-primary/10 p-8 md:p-10 shadow-soft-lg text-center">
              <CalendarClock className="w-8 h-8 text-primary mx-auto mb-4" />
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-primary font-semibold mb-4">
                {t('availability_label')}
              </p>
              <p className="font-sans font-light text-secondary/60 text-base leading-relaxed">
                {t('availability_desc')}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ 9. BOTTOM CTA ═════════════════════════════ */}
      <BottomCta />
    </>
  );
}
