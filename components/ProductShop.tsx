'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import CheckoutButton from './CheckoutButton';
import { Star, ShieldCheck } from 'lucide-react';

export default function ProductShop() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const t = useTranslations('shop');
  const [filter, setFilter] = useState('ALL');

  const filters = [
    { id: 'ALL', label: t('filter_all') },
    { id: 'GLP-1', label: t('filter_glp1') },
    { id: 'SUPPLEMENTS', label: t('filter_supplements') },
    { id: 'PROGRAMS', label: t('filter_programs') },
  ];

  const products = [
    {
      id: 'ozempic',
      category: 'GLP-1',
      name: t('ozempic_name'),
      type: t('ozempic_type'),
      desc: t('ozempic_desc'),
      price: '€199',
      priceCents: 19900,
      rating: 4.9,
      reviews: '2.847',
      badge: 'Rx',
      imgSrc: '/images/products/ozempic.webp',
      gradient: 'bg-[radial-gradient(circle_at_center,#3B2A23,#1e1b14)]',
    },
    {
      id: 'mounjaro',
      category: 'GLP-1',
      name: t('mounjaro_name'),
      type: t('mounjaro_type'),
      desc: t('mounjaro_desc'),
      price: '€299',
      priceCents: 29900,
      rating: 4.8,
      reviews: '1.203',
      badge: 'Rx',
      topBadge: t('mounjaro_badge'),
      imgSrc: '/images/products/mounjaro.webp',
      gradient: 'bg-[radial-gradient(circle_at_center,#3B2A23,#1e1b14)]',
    },
    {
      id: 'wegovy',
      category: 'GLP-1',
      name: t('wegovy_name'),
      type: t('wegovy_type'),
      desc: t('wegovy_desc'),
      price: '€249',
      priceCents: 24900,
      rating: 4.8,
      reviews: '1.892',
      badge: 'Rx',
      imgSrc: '/images/products/wegovy.webp',
      gradient: 'bg-[radial-gradient(circle_at_center,#3B2A23,#1e1b14)]',
    },
    {
      id: 'saxenda',
      category: 'GLP-1',
      name: t('saxenda_name'),
      type: t('saxenda_type'),
      desc: t('saxenda_desc'),
      price: '€179',
      priceCents: 17900,
      rating: 4.7,
      reviews: '3.411',
      badge: 'Rx',
      imgSrc: '/images/products/saxenda.webp',
      gradient: 'bg-[radial-gradient(circle_at_center,#3B2A23,#1e1b14)]',
    },
  ];

  const filteredProducts = filter === 'ALL' ? products : products.filter(p => p.category === filter);

  return (
    <section id="shop" className="py-20 md:py-32 bg-background-light" role="region" aria-label={t('title')}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-label text-primary text-xs tracking-[0.4em] uppercase mb-6 block font-bold"
          >
            Medical Aesthetics & Longevity
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl text-secondary mb-8 tracking-tighter"
          >
            Apotheek <br />
            <span className="italic font-light text-primary">FAB Clinic</span>
          </motion.h2>
          <p className="font-sans font-light text-secondary/70 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-6 mb-24" role="tablist">
          {filters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`px-10 py-4 rounded-full font-label text-xs tracking-widest transition-all duration-500 uppercase font-bold focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${filter === f.id
                ? 'bg-secondary text-white shadow-2xl'
                : 'bg-white border border-secondary/10 text-secondary hover:text-primary hover:border-primary'
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div layout ref={scrollRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <AnimatePresence>
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`bg-white rounded-[48px] overflow-hidden shadow-sm border border-secondary/5 flex flex-col group relative ${idx % 2 !== 0 ? 'lg:mt-16' : ''}`}
              >
                {/* Visual Area */}
                <div className={`w-full aspect-[4/5] ${product.gradient} flex items-center justify-center p-12 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity bg-[url('/images/noise.png')] pointer-events-none" />

                  <div className="absolute top-6 left-6 z-10 flex gap-2">
                    <span className="font-label text-primary text-[10px] tracking-[0.2em] bg-secondary/80 backdrop-blur-md px-4 py-2 rounded-full border border-primary/30 uppercase font-bold">
                      {product.badge}
                    </span>
                  </div>
                  {product.topBadge && (
                    <div className="absolute top-6 right-6 z-10">
                      <span className="font-label text-white text-[10px] tracking-widest bg-primary px-4 py-2 rounded-full shadow-lg uppercase font-bold">
                        {product.topBadge}
                      </span>
                    </div>
                  )}
                  {/* Fixed Stretched Images Using object-contain and animating background */}
                  <motion.div style={{ y: parallaxY }} className="relative w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] opacity-95 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out z-0">
                    <Image
                      src={product.imgSrc}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </motion.div>
                </div>

                {/* Content Area */}
                <div className="p-10 flex flex-col flex-grow relative bg-white">
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck size={14} className="text-primary" />
                    <span className="font-label text-primary/80 text-[10px] tracking-widest uppercase font-bold">
                      {product.type}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl text-secondary font-bold mb-4 italic group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-sans font-light text-secondary/60 text-lg leading-relaxed mb-10 flex-grow">
                    {product.desc}
                  </p>

                  <div className="flex items-center mb-10 pb-6 border-b border-secondary/5">
                    <div className="flex text-primary mr-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="font-sans font-bold text-xs text-secondary/40 tracking-wider">
                      {product.rating} ({product.reviews} {t('reviews')})
                    </span>
                  </div>

                  <div className="flex items-end gap-3 mb-10">
                    <span className="font-display text-5xl text-secondary leading-none">{product.price}</span>
                    <span className="font-sans font-bold text-[10px] text-secondary/40 uppercase tracking-[0.2em] mb-1">{t('per_month')}</span>
                  </div>

                  <CheckoutButton
                    productId={product.id}
                    priceEur={product.priceCents}
                    productName={product.name}
                    label={t('cta')}
                    variant="primary"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
