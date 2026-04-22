'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, type Variants } from 'motion/react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  ShieldCheck,
  Sparkles,
  SmilePlus,
  CircleDot,
  Diamond,
  Eye,
  Gem,
  FileSearch,
  ClipboardCheck,
  Package,
  Droplets,
  Heart,
  Feather,
  ArrowDown,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import ConsultTrigger from '@/components/consult/ConsultTrigger';
import { BOTOX_ZONES } from '@/lib/data/botox-zones';
import { EASE_PREMIUM } from '@/lib/motion';
import TreatmentMapGrid from '@/components/treatments/TreatmentMapGrid';
import { type Locale } from '@/lib/clinic-data';
import { useCart } from '@/lib/cart-context';

export default function BotoxPage() {
  const t = useTranslations('botox_page');
  const locale = useLocale() as Locale;
  const cart = useCart();
  const [selectedZones, setSelectedZones] = useState<string[]>([]);

  /* Sync local selections to global cart */
  useEffect(() => {
    const currentIds = cart.getItemsByType('botox').map((i) => i.id);
    for (const zoneId of selectedZones) {
      if (!currentIds.includes(zoneId)) {
        const zone = BOTOX_ZONES.find((z) => z.id === zoneId);
        if (zone) cart.addItem({ id: zone.id, type: 'botox', nameKey: zone.nameKey, namespace: 'botox_page', priceCents: zone.priceCents });
      }
    }
    for (const id of currentIds) {
      if (!selectedZones.includes(id)) cart.removeItem(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedZones]);

  const addToCartFromPopup = useCallback((zoneId: string) => {
    setSelectedZones((prev) => {
      if (prev.includes(zoneId)) return prev;
      return [...prev, zoneId];
    });
  }, []);

  /* -- Zone info cards (face only) -- */
  const faceZones = [
    { title: t('zone1_title'), desc: t('zone1_desc'), icon: <SmilePlus className="w-6 h-6" strokeWidth={1.5} /> },
    { title: t('zone2_title'), desc: t('zone2_desc'), icon: <Diamond className="w-6 h-6" strokeWidth={1.5} /> },
    { title: t('zone3_title'), desc: t('zone3_desc'), icon: <CircleDot className="w-6 h-6" strokeWidth={1.5} /> },
    { title: t('zone4_title'), desc: t('zone4_desc'), icon: <Gem className="w-6 h-6" strokeWidth={1.5} /> },
    { title: t('zone5_title'), desc: t('zone5_desc'), icon: <Eye className="w-6 h-6" strokeWidth={1.5} /> },
  ];

  const safetyItems = [
    t('safety_item1'),
    t('safety_item2'),
    t('safety_item3'),
    t('safety_item4'),
  ];

  const processSteps = [
    { num: '1', title: t('process_step1_title'), desc: t('process_step1_desc'), icon: <FileSearch className="w-8 h-8" strokeWidth={1.5} /> },
    { num: '2', title: t('process_step2_title'), desc: t('process_step2_desc'), icon: <ClipboardCheck className="w-8 h-8" strokeWidth={1.5} /> },
    { num: '3', title: t('process_step3_title'), desc: t('process_step3_desc'), icon: <Package className="w-8 h-8" strokeWidth={1.5} /> },
  ];

  const aftercareItems = [
    t('aftercare_item1'),
    t('aftercare_item2'),
    t('aftercare_item3'),
    t('aftercare_item4'),
  ];

  const philosophyItems = [
    { icon: <Droplets className="w-5 h-5" strokeWidth={1.5} />, text: t('philosophy_item1') },
    { icon: <Heart className="w-5 h-5" strokeWidth={1.5} />, text: t('philosophy_item2') },
    { icon: <Feather className="w-5 h-5" strokeWidth={1.5} />, text: t('philosophy_item3') },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_PREMIUM } },
  };

  return (
    <main>
      {/* =============================================
          HERO - Refined with layered depth & scroll hint
          ============================================= */}
      <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/spares/spare 2/Women reviewing notes in consultation.png"
            alt=""
            fill
            priority
            className="object-cover opacity-12"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/75" />
          {/* Subtle warm-shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.03] to-transparent" aria-hidden="true" />
        </div>
        <Container>
          <div className="relative z-10 max-w-3xl py-40">
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
              className="font-display text-display-xl text-background-light mb-6"
            >
              {t('hero_title')} <span className="italic font-light text-primary">{t('hero_title_accent')}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
              className="font-sans font-light text-background-light/70 text-lg md:text-xl leading-relaxed max-w-2xl mb-12"
            >
              {t('hero_desc')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE_PREMIUM }}
              className="flex flex-wrap items-center gap-4"
            >
              <ConsultTrigger className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-12 py-5 text-xs tracking-[0.3em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]">
                {t('hero_cta')}
              </ConsultTrigger>
              <a
                href="#zones"
                className="inline-flex items-center gap-2 rounded-pill font-sans uppercase font-bold px-8 py-5 text-xs tracking-[0.25em] border border-background-light/20 text-background-light/80 hover:border-primary hover:text-primary transition-all duration-300"
              >
                {t('hero_cta_secondary')}
                <ArrowDown className="w-3.5 h-3.5" strokeWidth={2} />
              </a>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE_PREMIUM }}
              className="mt-6 font-sans text-sm text-background-light/50 tracking-wide"
            >
              {t('hero_price_anchor')}
            </motion.p>
          </div>
        </Container>
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-10 bg-gradient-to-b from-primary/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* =============================================
          TREATMENT MAP - Clickable cards with popup + add to cart
          ============================================= */}
      <section id="zones">
        <TreatmentMapGrid
          zones={BOTOX_ZONES}
          namespace="botox_page"
          label={t('zones_label')}
          title={<>{t('zones_title')} <span className="italic font-light text-primary">{t('zones_title_accent')}</span></>}
          onAddToCart={addToCartFromPopup}
          cartZoneIds={selectedZones}
        />
      </section>

      {/* =============================================
          TREATMENT ZONES - Face zones grid
          ============================================= */}
      <section className="py-section-y bg-page-fillers overflow-hidden">
        <Container>
          <SectionHeader
            label={t('zones_label')}
            title={<>{t('zones_title')} <span className="italic font-light text-primary">{t('zones_title_accent')}</span></>}
          />

          {/* Facial Zones - 5 cards in a refined grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {faceZones.map((zone, idx) => (
              <motion.article
                key={`face-zone-${idx}`}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                className="bg-white rounded-md p-8 shadow-soft-sm hover:shadow-soft-lg border border-primary/5 hover:border-primary/15 transition-all duration-300 group"
              >
                <div className="w-12 h-12 mb-6 bg-primary/[0.06] rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {zone.icon}
                </div>
                <h3 className="font-display text-xl text-secondary mb-3 italic font-bold group-hover:text-primary transition-colors duration-200">
                  {zone.title}
                </h3>
                <p className="font-sans font-light text-secondary/70 text-[15px] leading-relaxed">
                  {zone.desc}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* =============================================
          WHAT IS BOTOX - Editorial split layout
          ============================================= */}
      <section className="py-section-y bg-page-fillers overflow-hidden">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_PREMIUM }}
              className="flex-1 relative w-full aspect-[3/4] max-h-[600px] rounded-md overflow-hidden group shadow-soft-lg bg-secondary/5"
            >
              <Image
                src="/images/spares/botox-treatment-fab.png"
                alt={t('what_img_alt')}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/10 to-transparent group-hover:opacity-0 transition-opacity duration-500" />
            </motion.div>

            <div className="flex-1 w-full">
              <SectionHeader
                label={t('what_label')}
                title={<>{t('what_title')} <span className="italic font-light text-primary">{t('what_title_accent')}</span></>}
                align="left"
              />
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
                className="font-sans font-light text-secondary/70 text-lg leading-relaxed"
              >
                {t('what_desc')}
              </motion.p>
            </div>
          </div>
        </Container>
      </section>

      {/* =============================================
          NATURAL RESULTS PHILOSOPHY
          ============================================= */}
      <section className="py-section-y bg-white overflow-hidden">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader
              label={t('philosophy_label')}
              title={<>{t('philosophy_title')} <span className="italic font-light text-primary">{t('philosophy_title_accent')}</span></>}
              subtitle={t('philosophy_desc')}
            />
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {philosophyItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex flex-col items-center text-center gap-4 px-6"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/[0.06] flex items-center justify-center text-primary">
                    {item.icon}
                  </div>
                  <p className="font-sans text-secondary/70 text-base leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Philosophy CTA */}
      <section className="py-8 bg-white overflow-hidden">
        <Container>
          <div className="text-center">
            <p className="font-sans text-secondary/60 text-base mb-3">{t('philosophy_cta')}</p>
            <ConsultTrigger className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-10 py-4 text-[11px] tracking-[0.25em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]">
              {t('philosophy_cta_link')}
            </ConsultTrigger>
          </div>
        </Container>
      </section>

      {/* =============================================
          SAFETY & QUALITY
          ============================================= */}
      <section className="py-section-y bg-white overflow-hidden">
        <Container>
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_PREMIUM }}
              className="flex-1 relative w-full aspect-[4/5] max-h-[520px] rounded-md overflow-hidden shadow-soft-lg bg-secondary/5"
            >
              <Image
                src="/images/spares/botox-safety-fab.png"
                alt={t('safety_img_alt')}
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <div className="flex-1 w-full">
              <SectionHeader
                label={t('safety_label')}
                title={<>{t('safety_title')} <span className="italic font-light text-primary">{t('safety_title_accent')}</span></>}
                subtitle={t('safety_desc')}
                align="left"
              />
              <ul className="space-y-5" role="list">
                {safetyItems.map((item, idx) => (
                  <motion.li
                    key={`safety-${idx}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + idx * 0.08, ease: EASE_PREMIUM }}
                    className="flex items-start gap-4"
                  >
                    <ShieldCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" strokeWidth={1.5} />
                    <span className="font-sans font-light text-secondary/70 text-base md:text-lg leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* =============================================
          PROCESS STEPS - Three-stage timeline
          ============================================= */}
      <section className="py-section-y bg-page-fillers overflow-hidden">
        <Container>
          <SectionHeader
            label={t('process_label')}
            title={<>{t('process_title')} <span className="italic font-light text-primary">{t('process_title_accent')}</span></>}
          />

          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Dashed connector line (desktop) */}
            <div className="hidden md:block absolute top-[16px] left-[16.666%] right-[16.666%] h-[2px] border-t-2 border-dashed border-primary/15 z-0" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-14 relative z-10">
              {processSteps.map((s) => (
                <motion.div key={s.num} variants={itemVariants} className="flex flex-col relative group">
                  <div className="mx-auto flex justify-center mb-8 relative z-20">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-gold-glow ring-8 ring-page-fillers">
                      <span className="font-sans text-white text-sm font-semibold">{s.num}</span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                    className="bg-white rounded-md shadow-soft-sm hover:shadow-soft-lg transition-shadow duration-300 border border-primary/5 hover:border-primary/15 flex-grow flex flex-col overflow-hidden group/card"
                  >
                    <div className="relative w-full aspect-video bg-secondary/[0.03] flex items-center justify-center overflow-hidden border-b border-primary/5">
                      <div className="absolute inset-0 bg-primary opacity-0 group-hover/card:opacity-[0.04] transition-opacity duration-500" aria-hidden="true" />
                      <div className="text-primary transition-transform duration-500 group-hover/card:scale-110" aria-hidden="true">
                        {s.icon}
                      </div>
                    </div>
                    <div className="p-8 md:p-10 flex flex-col flex-grow items-center text-center">
                      <h3 className="font-display text-xl md:text-2xl text-secondary mb-4 italic font-bold group-hover/card:text-primary transition-colors duration-300">
                        {s.title}
                      </h3>
                      <p className="font-sans font-light text-secondary/70 text-[15px] leading-relaxed flex-grow">
                        {s.desc}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* =============================================
          AFTERCARE
          ============================================= */}
      <section className="py-section-y bg-white overflow-hidden">
        <Container>
          <SectionHeader
            label={t('aftercare_label')}
            title={<>{t('aftercare_title')} <span className="italic font-light text-primary">{t('aftercare_title_accent')}</span></>}
            subtitle={t('aftercare_desc')}
          />
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {aftercareItems.map((item, idx) => (
              <motion.div
                key={`aftercare-${idx}`}
                variants={itemVariants}
                className="flex items-start gap-4 bg-page-fillers rounded-md p-6 shadow-soft-sm border border-primary/5"
              >
                <ShieldCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" strokeWidth={1.5} />
                <span className="font-sans font-light text-secondary/70 text-[15px] leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* =============================================
          BOTTOM CTA
          ============================================= */}
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
              {locale === 'nl' ? 'KLAAR VOOR EEN FRISSE BLIK?' : 'READY FOR A REFRESHED LOOK?'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.05, ease: EASE_PREMIUM }}
              className="font-display text-display-lg text-background-light mb-6"
            >
              {locale === 'nl' ? 'Zet de eerste stap naar een ' : 'Take the first step towards a '}<span className="italic font-light text-primary">{locale === 'nl' ? 'natuurlijk resultaat' : 'natural result'}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
              className="font-sans font-light text-background-light/70 text-lg md:text-xl leading-relaxed mb-10"
            >
              {locale === 'nl' ? 'Plan vandaag nog uw gratis consult in en ontdek wat Botox voor u kan betekenen.' : 'Book your free consultation today and discover what Botox can do for you.'}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE_PREMIUM }}
            >
              <ConsultTrigger className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-12 py-5 text-xs tracking-[0.3em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]">
                {t('hero_cta')}
              </ConsultTrigger>
            </motion.div>
          </div>
        </Container>
      </section>
    </main>
  );
}
