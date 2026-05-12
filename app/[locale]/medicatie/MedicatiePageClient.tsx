'use client';

import { motion, type Variants } from 'motion/react';
import { useTranslations } from 'next-intl';
import {
  ShieldCheck,
  ArrowRight,
  UtensilsCrossed,
  Timer,
  Activity,
  Pill,
  Truck,
  Stethoscope,
  Phone,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import ProductShop from '@/components/ProductShop';
import PharmacyDisclaimer from '@/components/PharmacyDisclaimer';
import ConsultTrigger from '@/components/consult/ConsultTrigger';
import { EASE_PREMIUM } from '@/lib/motion';
import PageHero from '@/components/PageHero';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_PREMIUM } },
};

const HOW_ICONS = [UtensilsCrossed, Timer, Activity] as const;

const SAFETY_ICONS = [Pill, Truck, Stethoscope, Phone] as const;

export default function MedicatiePage() {
  const t = useTranslations('medicatie_page');
  const tWeight = useTranslations('weightloss_page');

  const howItems = [
    { icon: HOW_ICONS[0], title: t('how_item1_title'), desc: t('how_item1_desc') },
    { icon: HOW_ICONS[1], title: t('how_item2_title'), desc: t('how_item2_desc') },
    { icon: HOW_ICONS[2], title: t('how_item3_title'), desc: t('how_item3_desc') },
  ];

  const safetyItems = [
    { icon: SAFETY_ICONS[0], text: t('safety_item1') },
    { icon: SAFETY_ICONS[1], text: t('safety_item2') },
    { icon: SAFETY_ICONS[2], text: t('safety_item3') },
    { icon: SAFETY_ICONS[3], text: t('safety_item4') },
  ];

  return (
    <main className="min-h-screen">
      {/* ═══════════════════════════════════════════════
          HERO - Medication-specific, dark clinical hero
          ═══════════════════════════════════════════════ */}
      <PageHero
        titleId="med-hero-title"
        align="center"
        backgroundImageSrc="/images/spares/f41827a0-e243-47b5-8a11-3e354b930092.jpg"
        backgroundImageClassName="object-cover opacity-20"
        overlayClassName="bg-gradient-to-b from-secondary via-secondary/95 to-secondary/80"
        label={<><ShieldCheck size={14} aria-hidden="true" />{t('hero_label')}</>}
        title={<>{t('hero_title')} {t('hero_title_accent')}</>}
        description={t('hero_desc')}
        actions={
          <a
            href="#shop"
            className="inline-flex items-center justify-center gap-2 rounded-pill font-sans uppercase font-bold px-10 py-4 text-[11px] tracking-[0.25em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]"
          >
            {t('hero_cta')} <ArrowRight size={14} aria-hidden="true" />
          </a>
        }
        meta={
          <>
            <div className="w-20 h-px bg-primary/50 mx-auto mb-8" />
            <div
              className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-pill px-8 py-4 text-white"
              role="status"
            >
              <Pill size={16} className="text-primary" aria-hidden="true" />
              {t('rx_notice')}
            </div>
          </>
        }
      />

      {/* ═══════════════════════════════════════════════
          HOW GLP-1 WORKS - 3 mechanism cards
          ═══════════════════════════════════════════════ */}
      <section
        aria-labelledby="how-glp1-title"
        className="py-section-y bg-background-light border-b border-secondary/5"
      >
        <Container>
          <SectionHeader
            label={t('how_label')}
            title={
              <>
                {t('how_title')}{' '}
                {t('how_title_accent')}
              </>
            }
            subtitle={t('how_desc')}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >
            {howItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group relative bg-white rounded-xl p-8 lg:p-10 border border-secondary/5 shadow-soft-sm hover:shadow-soft-md transition-shadow duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mb-6 group-hover:bg-primary/12 transition-colors duration-300">
                    <Icon size={24} className="text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-sans text-secondary text-lg font-semibold mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="font-sans font-light text-secondary/60 text-base leading-relaxed">
                    {item.desc}
                  </p>
                  {/* Subtle top accent line */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════
          PRODUCT COMPARISON - Section header + ProductShop
          ═══════════════════════════════════════════════ */}
      <div className="bg-page-medicatie">
        <section aria-labelledby="compare-title" className="pt-section-y">
          <Container>
            <SectionHeader
              label={t('compare_label')}
              title={
                <>
                  {t('compare_title')}{' '}
                  {t('compare_title_accent')}
                </>
              }
              subtitle={t('compare_desc')}
            />

            <div className="mt-16 md:mt-24">
              <SectionHeader
                label={tWeight('products_label')}
                title={
                  <>
                    {tWeight('products_title')}{' '}

                    {tWeight('products_title_accent')}

                  </>
                }
                subtitle={tWeight('products_subtitle')}
              />
            </div>
          </Container>
        </section>

        <ProductShop />
      </div>

      {/* ═══════════════════════════════════════════════
          SAFETY GUARANTEES - 4 items in a clinical grid
          ═══════════════════════════════════════════════ */}
      <section
        aria-labelledby="safety-title"
        className="py-section-y bg-secondary-deep text-background-light"
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_PREMIUM }}
            className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
          >
            <span className="font-sans text-primary text-xs tracking-[0.2em] uppercase block font-light mb-4">
              {t('safety_label')}
            </span>
            <h2 id="safety-title" className="font-display text-display-lg text-background-light mb-6 leading-[1.1]">
              {t('safety_title')}{' '}
              {t('safety_title_accent')}
            </h2>
            <p className="font-sans font-light text-background-light/60 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              {t('safety_desc')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {safetyItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-xl p-8"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-primary" aria-hidden="true" />
                  </div>
                  <p className="font-sans text-sm text-background-light/80 leading-relaxed font-medium">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════
          PHARMACY DISCLAIMER (existing component)
          ═══════════════════════════════════════════════ */}
      <PharmacyDisclaimer />

      {/* ═══════════════════════════════════════════════
          BOTTOM CTA - Route to screening, not checkout
          ═══════════════════════════════════════════════ */}
      <section
        aria-labelledby="med-cta-title"
        className="py-section-y bg-background-light border-t border-secondary/5"
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_PREMIUM }}
            className="max-w-2xl mx-auto text-center"
          >
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
              id="med-cta-title"
              className="font-display text-display-lg text-secondary mb-6"
            >
              {t('cta_title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
              className="font-sans font-light text-secondary/70 text-lg md:text-xl leading-relaxed mb-10"
            >
              {t('cta_desc')}
            </motion.p>
            <ConsultTrigger
              from="medicatie"
              className="inline-flex items-center justify-center gap-2.5 rounded-pill font-sans uppercase font-bold px-12 py-5 text-[11px] tracking-[0.25em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.97]"
            >
              {t('cta_button')} <ArrowRight size={14} aria-hidden="true" />
            </ConsultTrigger>
            <p className="mt-4 font-sans text-sm text-secondary/40">{t('cta_social_proof')}</p>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
