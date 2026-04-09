'use client';

import { motion, type Variants } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, Star } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import ProgramTimeline from '@/components/ProgramTimeline';
import ConsultTrigger from '@/components/consult/ConsultTrigger';
import SurveyAutoOpen from '@/components/SurveyAutoOpen';
import { PRODUCTS as PRODUCT_DATA } from '@/lib/products';
import { EASE_PREMIUM } from '@/lib/motion';

const PRODUCT_KEYS = ['mounjaro', 'ozempic', 'wegovy', 'saxenda'] as const;

const PRODUCTS = PRODUCT_KEYS.map((key) => ({
  key,
  image: `/images/products/${key}.webp`,
  price: `€${Math.round(PRODUCT_DATA[key].priceCents / 100)}`,
  productId: key,
}));

export default function WeightlossPage() {
  const t = useTranslations('weightloss_page');
  const tMed = useTranslations('medicatie_page');

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

      {/* Hero */}
      <section className="relative w-full pt-40 pb-section-y overflow-hidden bg-secondary" aria-labelledby="weightloss-hero-title">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/spares/female-fitness-model-holding-tape-measurer-around-her-waist-weightloss-concept.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-20"
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
              id="weightloss-hero-title"
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
              className="flex flex-wrap gap-4 sm:gap-5"
            >
              <ConsultTrigger className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-12 py-5 text-sm tracking-[0.3em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]">
                {t('hero_cta_survey')}
              </ConsultTrigger>
              <Link
                href="#producten"
                className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-12 py-5 text-sm tracking-[0.3em] border-2 border-background-light/30 text-background-light hover:border-primary hover:text-primary transition-all duration-300"
              >
                {t('hero_cta_products')}
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE_PREMIUM }}
              className="mt-8 flex items-center gap-3 text-background-light/50"
            >
              <div className="flex text-primary" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-sans text-xs tracking-wide">{t('hero_social_proof')}</span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Products */}
      <section id="producten" className="py-section-y bg-page-weight overflow-hidden">
        <Container>
          <SectionHeader
            label={t('products_label')}
            title={<>{t('products_title')} <span className="italic font-light text-primary">{t('products_title_accent')}</span></>}
            subtitle={t('products_subtitle')}
          />

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {PRODUCTS.map((product) => (
              <motion.div
                key={product.key}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                className="bg-white rounded-md p-6 shadow-soft-sm hover:shadow-soft-lg border border-primary/5 hover:border-primary/25 transition-all duration-300 group flex flex-col"
              >
                <div className="relative w-full aspect-square mb-6 bg-secondary/[0.04] rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={t(`product_${product.key}_name`)}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  />
                </div>
                <h3 className="font-display text-xl text-secondary italic font-bold mb-1 group-hover:text-primary transition-colors">
                  {t(`product_${product.key}_name`)}
                </h3>
                <p className="font-sans text-sm text-secondary/60 leading-relaxed mb-4 flex-grow">
                  {t(`product_${product.key}_desc`)}
                </p>
                <div className="mb-4 rounded-2xl border border-primary/10 bg-secondary/[0.02] p-4">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-secondary/60 font-semibold">
                      {tMed(`detail_${product.key}_title`)}
                    </p>
                    <span className="rounded-pill bg-primary/10 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.18em] text-primary font-semibold">
                      {tMed(`detail_${product.key}_frequency`)}
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    <p className="font-sans text-xs leading-relaxed text-secondary/70"><span className="font-semibold text-secondary">{tMed('detail_tab_how')}:</span> {tMed(`detail_${product.key}_how`)}</p>
                    <p className="font-sans text-xs leading-relaxed text-secondary/70"><span className="font-semibold text-secondary">{tMed('detail_tab_side')}:</span> {tMed(`detail_${product.key}_side`)}</p>
                    <p className="font-sans text-xs leading-relaxed text-secondary/70"><span className="font-semibold text-secondary">{tMed('detail_tab_storage')}:</span> {tMed(`detail_${product.key}_storage`)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-secondary/5">
                  <span className="font-display text-2xl text-primary font-semibold">{product.price}<span className="text-sm font-sans font-light text-secondary/50">/mnd</span></span>
                  <ConsultTrigger className="inline-flex items-center gap-2 font-sans text-xs text-primary font-semibold uppercase tracking-wider hover:gap-3 transition-all">
                    {t('product_cta')} <ArrowRight size={14} />
                  </ConsultTrigger>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

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
                title={<>{t('why_title')} <span className="italic font-light text-primary">{t('why_title_accent')}</span></>}
                align="left"
              />
              <ul className="space-y-5">
                {usps.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + idx * 0.12, ease: EASE_PREMIUM }}
                    className="flex items-start gap-4"
                  >
                    <ShieldCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" strokeWidth={1.5} />
                    <span className="font-sans font-light text-secondary/70 text-base md:text-lg leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, ease: EASE_PREMIUM }}
                className="mt-8"
              >
                <ConsultTrigger className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-10 py-4 text-xs tracking-[0.25em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]">
                  {t('why_cta')}
                </ConsultTrigger>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

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
