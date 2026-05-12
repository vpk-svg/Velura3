'use client';

import { motion, type Variants, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ShieldCheck, ArrowRight, Star, Stethoscope, RefreshCw, HeartPulse, Truck, ChevronDown } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import ProgramTimeline from '@/components/ProgramTimeline';
import ConsultTrigger from '@/components/consult/ConsultTrigger';
import SurveyAutoOpen from '@/components/SurveyAutoOpen';
import { PRODUCTS as PRODUCT_DATA } from '@/lib/products';
import { EASE_PREMIUM } from '@/lib/motion';
import ProductShop from '@/components/ProductShop';
import PageHero from '@/components/PageHero';

export default function WeightlossPage() {
  const t = useTranslations('weightloss_page');
  const tMed = useTranslations('medicatie_page');
  const tShop = useTranslations('shop');
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const uspIcons = [Stethoscope, RefreshCw, HeartPulse, Truck];

  const usps = [
    t('usp1'),
    t('usp2'),
    t('usp3'),
    t('usp4'),
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
      <SurveyAutoOpen />

      <PageHero
        align="center"
        titleId="weightloss-hero-title"
        backgroundImageSrc="/images/spares/female-fitness-model-holding-tape-measurer-around-her-waist-weightloss-concept.jpg"
        backgroundImageClassName="object-cover opacity-20"
        overlayClassName="bg-gradient-to-r from-secondary via-secondary/95 to-secondary/80"
        label={t('hero_label')}
        title={<>{t('hero_title')} {t('hero_title_accent')}</>}
        description={t('hero_desc')}
        actions={
          <>
            <ConsultTrigger className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-12 py-5 text-sm tracking-[0.3em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]">
              {t('hero_cta_survey')}
            </ConsultTrigger>
            <Link
              href="#producten"
              className="inline-flex items-center justify-center gap-2 font-sans uppercase font-semibold text-xs tracking-[0.2em] text-background-light/70 hover:text-primary transition-colors duration-300"
            >
              {t('hero_cta_products')} <ArrowRight size={14} />
            </Link>
          </>
        }
        meta={
          <div className="inline-flex items-center gap-3 bg-white/10 rounded-pill px-6 py-2.5 text-white">
            <div className="flex text-primary" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            {t('hero_social_proof')}
          </div>
        }
      />

      {/* Products */}
      <section id="producten" className="pt-section-y bg-page-weight overflow-hidden">
        <Container>
          <SectionHeader
            label={t('products_label')}
            title={<>{t('products_title')} {t('products_title_accent')}</>}
            subtitle={t('products_subtitle')}
          />
        </Container>
      </section>
      <div className="-mt-12 bg-page-weight">
        <ProductShop />
      </div>

      {/* How It Works - Timeline */}
      <ProgramTimeline />

      {/* Why FAB */}
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
                  src="/images/spares/female-fitness-model-holding-tape-measurer-around-her-waist-weightloss-concept.jpg"
                  alt={t('why_image_alt')}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </figure>

            <div className="flex-1 w-full">
              <SectionHeader
                label={t('why_label')}
                title={<>{t('why_title')} {t('why_title_accent')}</>}
                align="left"
              />
              <ul className="space-y-5">
                {usps.map((item, idx) => {
                  const UspIcon = uspIcons[idx];
                  return (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + idx * 0.12, ease: EASE_PREMIUM }}
                      className="flex items-start gap-4"
                    >
                      <UspIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" strokeWidth={1.5} />
                      <span className="font-sans font-light text-secondary/70 text-base md:text-lg leading-relaxed">{item}</span>
                    </motion.li>
                  );
                })}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, ease: EASE_PREMIUM }}
                className="mt-8"
              >
                <ConsultTrigger className="inline-flex items-center justify-center gap-2 rounded-pill font-sans uppercase font-bold px-10 py-4 text-xs tracking-[0.25em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]">
                  {t('why_cta')} <ArrowRight size={14} />
                </ConsultTrigger>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-section-y bg-background-light border-t border-secondary/5 overflow-hidden">
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
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE_PREMIUM }}
              className="flex flex-col items-center gap-4"
            >
              <ConsultTrigger className="inline-flex items-center justify-center gap-2.5 rounded-pill font-sans uppercase font-bold px-12 py-5 text-xs tracking-[0.3em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]">
                {t('cta_button')} <ArrowRight size={14} />
              </ConsultTrigger>
              <div className="flex items-center gap-2">
                <div className="flex text-primary" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                {t('cta_social_proof')}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
