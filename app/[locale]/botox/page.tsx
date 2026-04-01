'use client';

import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import ZoneSelector from '@/components/treatments/ZoneSelector';
import TreatmentCart from '@/components/treatments/TreatmentCart';
import DetailsForm, { type DetailsFormData } from '@/components/treatments/DetailsForm';
import { BOTOX_ZONES } from '@/lib/data/botox-zones';
import { EASE_PREMIUM } from '@/lib/motion';

export default function BotoxPage() {
  const t = useTranslations('botox_page');
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
      const selectedItems = BOTOX_ZONES.filter((z) => selectedZones.includes(z.id));

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'payment',
          treatmentType: 'botox',
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

  return (
    <>
      {/* Hero */}
      <section className="relative w-full pt-40 pb-section-y overflow-hidden bg-secondary">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/treatments/botox.jpg"
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
              className="font-sans font-light text-background-light/70 text-lg md:text-xl leading-relaxed max-w-2xl"
            >
              {t('hero_desc')}
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Zone Selector + Cart */}
      <section className="py-section-y bg-background-light overflow-hidden">
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

            <div className="space-y-6">
              <TreatmentCart
                zones={BOTOX_ZONES}
                selectedZones={selectedZones}
                onRemove={removeZone}
                namespace="botox_page"
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
                namespace="botox_page"
              />
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

      <section className="py-section-y bg-background-light overflow-hidden">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-primary font-semibold mb-4">
              {t('availability_label')}
            </p>
            <p className="font-sans font-light text-secondary/60 text-base leading-relaxed">
              {t('availability_desc')}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
