'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import CheckoutButton from './CheckoutButton';
import ConsultTrigger from '@/components/consult/ConsultTrigger';
import Container from './ui/Container';
import { ShieldCheck, AlertTriangle, Thermometer } from 'lucide-react';
import { EASE_PREMIUM } from '@/lib/motion';

export default function ProductShop() {
  const t = useTranslations('shop');
  const tMed = useTranslations('medicatie_page');
  const products = [
    {
      id: 'ozempic',
      category: 'GLP-1',
      name: t('ozempic_name'),
      activeIngredient: t('ozempic_type'),
      type: t('ozempic_type'),
      desc: t('ozempic_desc'),
      price: '€199',
      priceCents: 19900,
      badge: 'Rx',
      imgSrc: '/images/products/ozempic.webp',
      gradient: 'bg-[radial-gradient(circle_at_center,#3B2A23,#1e1b14)]',
      detailTitle: tMed('detail_ozempic_title'),
      detailFrequency: tMed('detail_ozempic_frequency'),
      detailHow: tMed('detail_ozempic_how'),
      detailSide: tMed('detail_ozempic_side'),
      detailStorage: tMed('detail_ozempic_storage'),
    },
    {
      id: 'mounjaro',
      category: 'GLP-1',
      name: t('mounjaro_name'),
      activeIngredient: t('mounjaro_type'),
      type: t('mounjaro_type'),
      desc: t('mounjaro_desc'),
      price: '€299',
      priceCents: 29900,
      badge: 'Rx',
      topBadge: t('mounjaro_badge'),
      imgSrc: '/images/products/mounjaro.webp',
      gradient: 'bg-[radial-gradient(circle_at_center,#3B2A23,#1e1b14)]',
      detailTitle: tMed('detail_mounjaro_title'),
      detailFrequency: tMed('detail_mounjaro_frequency'),
      detailHow: tMed('detail_mounjaro_how'),
      detailSide: tMed('detail_mounjaro_side'),
      detailStorage: tMed('detail_mounjaro_storage'),
    },
    {
      id: 'wegovy',
      category: 'GLP-1',
      name: t('wegovy_name'),
      activeIngredient: t('wegovy_type'),
      type: t('wegovy_type'),
      desc: t('wegovy_desc'),
      price: '€249',
      priceCents: 24900,
      badge: 'Rx',
      imgSrc: '/images/products/wegovy.webp',
      gradient: 'bg-[radial-gradient(circle_at_center,#3B2A23,#1e1b14)]',
      detailTitle: tMed('detail_wegovy_title'),
      detailFrequency: tMed('detail_wegovy_frequency'),
      detailHow: tMed('detail_wegovy_how'),
      detailSide: tMed('detail_wegovy_side'),
      detailStorage: tMed('detail_wegovy_storage'),
    },
    {
      id: 'saxenda',
      category: 'GLP-1',
      name: t('saxenda_name'),
      activeIngredient: t('saxenda_type'),
      type: t('saxenda_type'),
      desc: t('saxenda_desc'),
      price: '€179',
      priceCents: 17900,
      badge: 'Rx',
      imgSrc: '/images/products/saxenda.webp',
      gradient: 'bg-[radial-gradient(circle_at_center,#3B2A23,#1e1b14)]',
      detailTitle: tMed('detail_saxenda_title'),
      detailFrequency: tMed('detail_saxenda_frequency'),
      detailHow: tMed('detail_saxenda_how'),
      detailSide: tMed('detail_saxenda_side'),
      detailStorage: tMed('detail_saxenda_storage'),
    },
  ];

  return (
    <section id="shop" className="py-section-y bg-background-light" aria-labelledby="shop-title">
      <Container>
        {/* Product Grid */}
        <motion.div
          id="product-grid"
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
          role="list"
          aria-label={t('title')}
        >
          <AnimatePresence>
            {products.map((product, idx) => (
              <motion.article
                key={product.id}
                role="listitem"
                layout
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                whileHover={{
                  y: -10,
                  transition: { type: 'spring', stiffness: 400, damping: 25 },
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.08,
                  ease: EASE_PREMIUM,
                }}
                className="bg-white rounded-md overflow-hidden shadow-soft-sm hover:shadow-soft-lg border border-secondary/5 flex flex-col group relative"
                aria-label={`${product.name} — ${product.activeIngredient}`}
              >
                {/* Visual Area */}
                <div
                  className={`w-full aspect-[4/5] ${product.gradient} flex items-center justify-center p-10 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20" aria-hidden="true">
                    <div className="w-56 h-56 bg-white/10 backdrop-blur-3xl rounded-full blur-2xl" />
                    <div className="absolute top-0 right-0 w-28 h-28 bg-primary/20 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
                  </div>

                  <div className="absolute top-5 left-5 z-10 flex gap-2">
                    <abbr
                      title={t('rx_full')}
                      className="no-underline font-sans text-primary text-[10px] tracking-[0.2em] bg-secondary/80 backdrop-blur-md px-3.5 py-1.5 rounded-pill border border-primary/30 uppercase font-semibold"
                    >
                      {product.badge}
                    </abbr>
                  </div>
                  {product.topBadge && (
                    <span className="absolute top-5 right-5 z-10 font-sans text-white text-[10px] tracking-widest bg-primary px-3.5 py-1.5 rounded-pill shadow-gold-glow uppercase font-semibold">
                      {product.topBadge}
                    </span>
                  )}
                  <div className="relative w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-premium z-0">
                    <Image
                      src={product.imgSrc}
                      alt={`${product.name} (${product.activeIngredient}) — ${product.detailFrequency}`}
                      fill
                      loading="lazy"
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow bg-white">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck size={14} className="text-primary" aria-hidden="true" />
                    <span className="font-sans text-primary/80 text-[10px] tracking-widest uppercase font-semibold">
                      {product.type}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl text-secondary font-bold mb-3 italic group-hover:text-primary transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="font-sans font-light text-secondary/60 text-base leading-relaxed mb-8 flex-grow">
                    {product.desc}
                  </p>

                  {/* Medical Detail Card — separated benefits from risks */}
                  <div className="mb-7 rounded-2xl border border-primary/10 bg-secondary/[0.02] p-4 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-secondary/60 font-semibold">
                        {product.detailTitle}
                      </p>
                      <span className="rounded-pill bg-primary/10 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.18em] text-primary font-semibold">
                        {product.detailFrequency}
                      </span>
                    </div>

                    {/* How it works — benefit */}
                    <div className="flex gap-2.5 items-start">
                      <ShieldCheck size={14} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
                      <p className="font-sans text-xs leading-relaxed text-secondary/70">
                        <strong className="text-secondary">{tMed('detail_tab_how')}:</strong>{' '}
                        {product.detailHow}
                      </p>
                    </div>

                    {/* Divider between benefits and risks */}
                    <div className="h-px bg-secondary/5" role="separator" />

                    {/* Side effects — risk */}
                    <div className="flex gap-2.5 items-start">
                      <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" aria-hidden="true" />
                      <p className="font-sans text-xs leading-[1.7] text-secondary/65">
                        <strong className="text-secondary">{tMed('detail_tab_side')}:</strong>{' '}
                        {product.detailSide}
                      </p>
                    </div>

                    {/* Storage — neutral info */}
                    <div className="flex gap-2.5 items-start">
                      <Thermometer size={14} className="text-secondary/40 mt-0.5 shrink-0" aria-hidden="true" />
                      <p className="font-sans text-xs leading-relaxed text-secondary/55">
                        <strong className="text-secondary/70">{tMed('detail_tab_storage')}:</strong>{' '}
                        {product.detailStorage}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-end gap-2.5 mb-8">
                    <span className="font-display text-4xl text-secondary leading-none">{product.price}</span>
                    <span className="font-sans font-semibold text-[10px] text-secondary/40 uppercase tracking-[0.2em] mb-1">
                      {t('per_month')}
                    </span>
                  </div>

                  {/* CTA — route to consult, NOT direct checkout for Rx meds */}
                  <ConsultTrigger
                    from="medicatie"
                    className="w-full py-5 rounded-full font-sans text-[11px] tracking-[0.2em] uppercase transition-all duration-500 flex items-center justify-center overflow-hidden font-semibold bg-primary text-white shadow-xl hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 text-center"
                  >
                    {t('cta')}
                  </ConsultTrigger>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
