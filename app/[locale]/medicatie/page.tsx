'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Brain, Clock, Activity, ShieldCheck, ChevronDown } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import CheckoutButton from '@/components/CheckoutButton';
import { SurveyTrigger } from '@/components/survey/SurveyFlow';
import { Star } from 'lucide-react';
import { EASE_PREMIUM } from '@/lib/motion';
import { ArrowRight } from 'lucide-react';

export default function MedicatiePage() {
  const tNav = useTranslations('nav');
  const t = useTranslations('medicatie_page');
  const ts = useTranslations('shop');

  const howItems = [
    { title: t('how_item1_title'), desc: t('how_item1_desc'), icon: <Brain className="w-6 h-6" strokeWidth={1.5} /> },
    { title: t('how_item2_title'), desc: t('how_item2_desc'), icon: <Clock className="w-6 h-6" strokeWidth={1.5} /> },
    { title: t('how_item3_title'), desc: t('how_item3_desc'), icon: <Activity className="w-6 h-6" strokeWidth={1.5} /> },
  ];

  const safetyItems = [
    t('safety_item1'),
    t('safety_item2'),
    t('safety_item3'),
    t('safety_item4'),
  ];

  const products = [
    {
      id: 'ozempic',
      name: ts('ozempic_name'),
      type: ts('ozempic_type'),
      desc: ts('ozempic_desc'),
      price: '€199',
      rating: 4.9,
      reviews: '2.847',
      badge: 'Rx',
      imgSrc: '/images/products/ozempic.webp',
      gradient: 'bg-[radial-gradient(circle_at_center,#3B2A23,#1e1b14)]',
      frequency: t('detail_ozempic_frequency'),
      detailHow: t('detail_ozempic_how'),
      detailSide: t('detail_ozempic_side'),
      detailStorage: t('detail_ozempic_storage'),
    },
    {
      id: 'mounjaro',
      name: ts('mounjaro_name'),
      type: ts('mounjaro_type'),
      desc: ts('mounjaro_desc'),
      price: '€299',
      rating: 4.8,
      reviews: '1.203',
      badge: 'Rx',
      topBadge: ts('mounjaro_badge'),
      imgSrc: '/images/products/mounjaro.webp',
      gradient: 'bg-[radial-gradient(circle_at_center,#3B2A23,#1e1b14)]',
      frequency: t('detail_mounjaro_frequency'),
      detailHow: t('detail_mounjaro_how'),
      detailSide: t('detail_mounjaro_side'),
      detailStorage: t('detail_mounjaro_storage'),
    },
    {
      id: 'wegovy',
      name: ts('wegovy_name'),
      type: ts('wegovy_type'),
      desc: ts('wegovy_desc'),
      price: '€249',
      rating: 4.8,
      reviews: '1.892',
      badge: 'Rx',
      imgSrc: '/images/products/wegovy.webp',
      gradient: 'bg-[radial-gradient(circle_at_center,#3B2A23,#1e1b14)]',
      frequency: t('detail_wegovy_frequency'),
      detailHow: t('detail_wegovy_how'),
      detailSide: t('detail_wegovy_side'),
      detailStorage: t('detail_wegovy_storage'),
    },
    {
      id: 'saxenda',
      name: ts('saxenda_name'),
      type: ts('saxenda_type'),
      desc: ts('saxenda_desc'),
      price: '€179',
      rating: 4.7,
      reviews: '3.411',
      badge: 'Rx',
      imgSrc: '/images/products/saxenda.webp',
      gradient: 'bg-[radial-gradient(circle_at_center,#3B2A23,#1e1b14)]',
      frequency: t('detail_saxenda_frequency'),
      detailHow: t('detail_saxenda_how'),
      detailSide: t('detail_saxenda_side'),
      detailStorage: t('detail_saxenda_storage'),
    },
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
      {/* Redirect Banner */}
      <div className="fixed top-[80px] left-0 right-0 z-base bg-primary/95 backdrop-blur-sm text-white py-3 text-center">
        <Container>
          <a href="/weightloss" className="inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-widest hover:underline">
            {tNav('redirect_weightloss')} <ArrowRight size={16} />
          </a>
        </Container>
      </div>

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
              <a href="#medications" className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-12 py-5 text-xs tracking-[0.3em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]">
                {t('hero_cta')}
              </a>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* How GLP-1 Works */}
      <section className="py-section-y bg-background-light overflow-hidden">
        <Container>
          <SectionHeader
            label={t('how_label')}
            title={<>{t('how_title')} <span className="italic font-light text-primary">{t('how_title_accent')}</span></>}
            subtitle={t('how_desc')}
          />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {howItems.map((item, idx) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="bg-white rounded-md p-8 md:p-10 shadow-soft-sm hover:shadow-soft-lg border border-primary/5 hover:border-primary/15 transition-all duration-300 group"
              >
                <div className="w-14 h-14 mb-6 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-display text-xl text-secondary mb-3 italic font-bold group-hover:text-primary transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="font-sans font-light text-secondary/70 text-base leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Product Grid + Detail Accordions */}
      <section id="medications" className="py-section-y bg-white overflow-hidden">
        <Container>
          <SectionHeader
            label={t('compare_label')}
            title={<>{t('compare_title')} <span className="italic font-light text-primary">{t('compare_title_accent')}</span></>}
            subtitle={t('compare_desc')}
          />

          <div className="space-y-16">
            {products.map((product, idx) => (
              <MedicationCard key={product.id} product={product} idx={idx} t={t} ts={ts} />
            ))}
          </div>
        </Container>
      </section>

      {/* Safety */}
      <section className="py-section-y bg-background-light overflow-hidden">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
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
            <figure className="flex-1 relative w-full h-[400px] md:h-[500px] rounded-md overflow-hidden shadow-soft-lg bg-secondary/5">
              <Image
                src="/images/treatments/fillers.jpg"
                alt="Medical consultation"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </figure>
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
              <SurveyTrigger className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-12 py-5 text-xs tracking-[0.3em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]">
                {t('cta_button')}
              </SurveyTrigger>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}

/* ─── Medication Card with Accordion ─── */
interface MedicationProduct {
  id: string;
  name: string;
  type: string;
  desc: string;
  price: string;
  rating: number;
  reviews: string;
  badge: string;
  topBadge?: string;
  imgSrc: string;
  gradient: string;
  frequency: string;
  detailHow: string;
  detailSide: string;
  detailStorage: string;
}

function MedicationCard({
  product,
  idx,
  t,
  ts,
}: {
  product: MedicationProduct;
  idx: number;
  t: ReturnType<typeof useTranslations>;
  ts: ReturnType<typeof useTranslations>;
}) {
  const [openTab, setOpenTab] = useState<string | null>(null);

  const tabs = [
    { key: 'how', label: t('detail_tab_how'), content: product.detailHow },
    { key: 'side', label: t('detail_tab_side'), content: product.detailSide },
    { key: 'storage', label: t('detail_tab_storage'), content: product.detailStorage },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: idx * 0.08, ease: EASE_PREMIUM }}
      className="bg-background-light rounded-md shadow-soft-sm hover:shadow-soft-lg border border-primary/5 overflow-hidden transition-shadow duration-300"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Product Image */}
        <div className={`${product.gradient} w-full lg:w-80 aspect-square lg:aspect-auto flex items-center justify-center p-10 relative overflow-hidden shrink-0`}>
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20">
            <div className="w-56 h-56 bg-white/10 backdrop-blur-3xl rounded-full blur-2xl" />
          </div>
          {product.topBadge && (
            <span className="absolute top-5 right-5 z-10 font-sans text-white text-[10px] tracking-widest bg-primary px-3.5 py-1.5 rounded-pill shadow-gold-glow uppercase font-semibold">
              {product.topBadge}
            </span>
          )}
          <div className="absolute top-5 left-5 z-10">
            <span className="font-sans text-primary text-[10px] tracking-[0.2em] bg-secondary/80 backdrop-blur-md px-3.5 py-1.5 rounded-pill border border-primary/30 uppercase font-semibold">
              {product.badge}
            </span>
          </div>
          <div className="relative w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-0">
            <Image
              src={product.imgSrc}
              alt={product.name}
              fill
              loading="lazy"
              className="object-contain p-4"
              sizes="(max-width: 1024px) 100vw, 320px"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 md:p-10 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-sans text-primary/80 text-[10px] tracking-widest uppercase font-semibold">
              {product.type}
            </span>
            <span className="font-sans text-secondary/40 text-[10px] tracking-widest uppercase">
              {product.frequency}
            </span>
          </div>

          <h3 className="font-display text-3xl md:text-4xl text-secondary mb-4 italic font-bold">
            {product.name}
          </h3>

          <p className="font-sans font-light text-secondary/70 text-base md:text-lg leading-relaxed mb-6">
            {product.desc}
          </p>

          <div className="flex items-center mb-6">
            <div className="flex text-primary mr-2.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              ))}
            </div>
            <span className="font-sans font-semibold text-xs text-secondary/40 tracking-wider">
              {product.rating} ({product.reviews} {ts('reviews')})
            </span>
          </div>

          <div className="flex items-end gap-4 mb-8">
            <span className="font-display text-4xl text-secondary leading-none">{product.price}</span>
            <span className="font-sans font-semibold text-[10px] text-secondary/40 uppercase tracking-[0.2em] mb-1">{ts('per_month')}</span>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <CheckoutButton productId={product.id} label={ts('cta')} variant="primary" />
          </div>

          {/* Accordion Tabs */}
          <div className="border-t border-secondary/5 pt-6 space-y-0">
            {tabs.map((tab) => (
              <div key={tab.key} className="border-b border-secondary/5 last:border-b-0">
                <button
                  onClick={() => setOpenTab(openTab === tab.key ? null : tab.key)}
                  className="w-full flex items-center justify-between py-4 text-left group"
                >
                  <span className="font-sans text-sm font-semibold text-secondary/80 uppercase tracking-widest group-hover:text-primary transition-colors duration-200">
                    {tab.label}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-secondary/40 transition-transform duration-300 ${openTab === tab.key ? 'rotate-180 text-primary' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {openTab === tab.key && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans font-light text-secondary/70 text-base leading-relaxed pb-5">
                        {tab.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
