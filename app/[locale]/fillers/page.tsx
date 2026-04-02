'use client';

import { useState, useCallback } from 'react';
import { motion, type Variants } from 'motion/react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ShieldCheck, Sparkles, SmilePlus, CircleDot, Diamond, Eye, Gem, FileSearch, ClipboardCheck, Package } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import ZoneSelector from '@/components/treatments/ZoneSelector';
import TreatmentCart from '@/components/treatments/TreatmentCart';
import DetailsForm, { type DetailsFormData } from '@/components/treatments/DetailsForm';
import ConsultTrigger from '@/components/consult/ConsultTrigger';
import { FILLERS_ZONES } from '@/lib/data/fillers-zones';
import { EASE_PREMIUM } from '@/lib/motion';
import TreatmentCatalog from '@/components/treatments/TreatmentCatalog';
import { getFillerTreatments, type Locale } from '@/lib/clinic-data';

export default function FillersPage() {
  const t = useTranslations('fillers_page');
  const locale = useLocale() as Locale;
  const fillerTreatments = getFillerTreatments(locale);
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [step, setStep] = useState<'select' | 'details' | 'done'>('select');
  const [isLoading, setIsLoading] = useState(false);

  const toggleZone = useCallback((zoneId: string) => {
    setSelectedZones((prev) =>
      prev.includes(zoneId) ? prev.filter((z) => z !== zoneId) : [...prev, zoneId]
    );
  }, []);

  const removeZone = useCallback((zoneId: string) => {
    setSelectedZones((prev) => prev.filter((z) => z !== zoneId));
  }, []);

  const handleDetailsSubmit = useCallback(async (data: DetailsFormData) => {
    setIsLoading(true);
    try {
      const selectedItems = FILLERS_ZONES.filter((z) => selectedZones.includes(z.id));

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'payment',
          treatmentType: 'fillers',
          zones: selectedItems.map((z) => ({ id: z.id, name: t(z.nameKey), priceCents: z.priceCents })),
          customerDetails: data,
          locale: 'nl',
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
  }, [selectedZones, t]);

  const infoZones = [
    { title: t('zone1_title'), desc: t('zone1_desc'), icon: <SmilePlus className="w-6 h-6" strokeWidth={1.5} /> },
    { title: t('zone2_title'), desc: t('zone2_desc'), icon: <Diamond className="w-6 h-6" strokeWidth={1.5} /> },
    { title: t('zone3_title'), desc: t('zone3_desc'), icon: <CircleDot className="w-6 h-6" strokeWidth={1.5} /> },
    { title: t('zone4_title'), desc: t('zone4_desc'), icon: <Gem className="w-6 h-6" strokeWidth={1.5} /> },
    { title: t('zone5_title'), desc: t('zone5_desc'), icon: <Eye className="w-6 h-6" strokeWidth={1.5} /> },
    { title: t('zone6_title'), desc: t('zone6_desc'), icon: <Sparkles className="w-6 h-6" strokeWidth={1.5} /> },
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
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

      {/* What Are Fillers */}
      <section className="py-section-y bg-background-light overflow-hidden">
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
                  src="/images/treatments/fillers.jpg"
                  alt="Dermal filler treatment"
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
                label={t('what_label')}
                title={<>{t('what_title')} <span className="italic font-light text-primary">{t('what_title_accent')}</span></>}
                align="left"
              />
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
                className="font-sans font-light text-secondary/70 text-lg md:text-xl leading-relaxed"
              >
                {t('what_desc')}
              </motion.p>
            </div>
          </div>
        </Container>
      </section>

      {/* Treatment Zones */}
      <section className="py-section-y bg-white overflow-hidden">
        <Container>
          <SectionHeader
            label={t('zones_label')}
            title={<>{t('zones_title')} <span className="italic font-light text-primary">{t('zones_title_accent')}</span></>}
          />
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {infoZones.map((zone) => (
              <motion.div
                key={zone.title}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                className="bg-background-light rounded-md p-8 shadow-soft-sm hover:shadow-soft-lg border border-primary/5 hover:border-primary/15 transition-all duration-300 group"
              >
                <div className="w-14 h-14 mb-6 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {zone.icon}
                </div>
                <h3 className="font-display text-xl text-secondary mb-3 italic font-bold group-hover:text-primary transition-colors duration-200">
                  {zone.title}
                </h3>
                <p className="font-sans font-light text-secondary/70 text-base leading-relaxed">
                  {zone.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ── Interactive Zone Selector + Cart ── */}
      <section id="book" className="py-section-y bg-background-light overflow-hidden">
        <Container>
          <SectionHeader
            label={t('selector_label')}
            title={<>{t('selector_title')} <span className="italic font-light text-primary">{t('selector_title_accent')}</span></>}
            subtitle={t('selector_subtitle')}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <ZoneSelector
                zones={FILLERS_ZONES}
                selectedZones={selectedZones}
                onToggle={toggleZone}
                namespace="fillers_page"
              />
            </div>

            <div className="space-y-6">
              <TreatmentCart
                zones={FILLERS_ZONES}
                selectedZones={selectedZones}
                onRemove={removeZone}
                onRestore={toggleZone}
                namespace="fillers_page"
              />

              {selectedZones.length > 0 && step === 'select' && (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setStep('details')}
                  className="w-full inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-8 py-4 text-[11px] tracking-[0.25em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]"
                >
                  {t('proceed_to_details')}
                </motion.button>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Details Form */}
      {step === 'details' && (
        <section className="py-section-y bg-white overflow-hidden">
          <Container>
            <div className="max-w-xl mx-auto">
              <SectionHeader
                label={t('details_label')}
                title={<>{t('details_title')} <span className="italic font-light text-primary">{t('details_title_accent')}</span></>}
              />
              <DetailsForm
                onSubmit={handleDetailsSubmit}
                isLoading={isLoading}
                namespace="fillers_page"
              />
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

      {/* Safety & Quality */}
      <section className="py-section-y bg-background-light overflow-hidden">
        <Container>
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-20">
            <figure className="flex-1 relative w-full h-[400px] md:h-[500px] rounded-md overflow-hidden shadow-soft-lg bg-secondary/5">
              <Image
                src="/images/treatments/botox.jpg"
                alt="Clinical treatment environment"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </figure>

            <div className="flex-1 w-full">
              <SectionHeader
                label={t('safety_label')}
                title={<>{t('safety_title')} <span className="italic font-light text-primary">{t('safety_title_accent')}</span></>}
                subtitle={t('safety_desc')}
                align="left"
              />
              <ul className="space-y-5">
                {safetyItems.map((item, idx) => (
                  <motion.li
                    key={idx}
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

      {/* Process Steps */}
      <section className="py-section-y bg-white overflow-hidden">
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
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="hidden md:block absolute top-[16px] left-[16.666%] right-[16.666%] h-[2px] border-t-2 border-dashed border-primary/20 z-0" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 relative z-10">
              {processSteps.map((step) => (
                <motion.div key={step.num} variants={itemVariants} className="flex flex-col relative group">
                  <div className="mx-auto flex justify-center mb-8 relative z-20">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-gold-glow ring-8 ring-white">
                      <span className="font-sans text-white text-sm font-semibold">{step.num}</span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ y: -8, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                    className="bg-background-light rounded-md shadow-soft-sm hover:shadow-soft-lg transition-shadow duration-300 border border-primary/5 hover:border-primary/15 flex-grow flex flex-col overflow-hidden group/card"
                  >
                    <div className="relative w-full aspect-video bg-secondary/5 flex items-center justify-center overflow-hidden border-b border-primary/5">
                      <div className="absolute inset-0 bg-primary opacity-0 group-hover/card:opacity-5 transition-opacity duration-500" aria-hidden="true" />
                      <div className="text-primary transition-all duration-500 group-hover/card:scale-110" aria-hidden="true">
                        {step.icon}
                      </div>
                    </div>
                    <div className="p-8 md:p-10 flex flex-col flex-grow items-center text-center">
                      <h3 className="font-display text-xl md:text-2xl text-secondary mb-4 italic font-bold group-hover/card:text-primary transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="font-sans font-light text-secondary/70 text-base leading-relaxed flex-grow">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Aftercare */}
      <section className="py-section-y bg-background-light overflow-hidden">
        <Container>
          <SectionHeader
            label={t('aftercare_label')}
            title={<>{t('aftercare_title')} <span className="italic font-light text-primary">{t('aftercare_title_accent')}</span></>}
            subtitle={t('aftercare_desc')}
          />
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {aftercareItems.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex items-start gap-4 bg-white rounded-md p-6 shadow-soft-sm border border-primary/5"
              >
                <ShieldCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" strokeWidth={1.5} />
                <span className="font-sans font-light text-secondary/70 text-base leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <TreatmentCatalog
        locale={locale}
        treatments={fillerTreatments}
        label={locale === 'nl' ? 'FILLERS CATALOGUS' : 'FILLERS CATALOG'}
        title={locale === 'nl' ? 'Volledige filler behandelkaart' : 'Complete filler treatment catalog'}
        subtitle={
          locale === 'nl'
            ? 'Inclusief bilfiller-item, klik voor behandelinfo en directe zaterdag-boeking.'
            : 'Includes butt filler item, click for treatment details and direct Saturday booking.'
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
