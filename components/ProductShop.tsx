'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import CheckoutButton from './CheckoutButton';
import { Star } from 'lucide-react';

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
      gradient: 'bg-[radial-gradient(circle_at_center,rgb(var(--brand-primary-light)),rgb(var(--brand-primary)))] relative overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_right,rgba(var(--brand-accent),0.3),transparent_50%)]',
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
      gradient: 'bg-[radial-gradient(circle_at_center,rgb(var(--brand-primary-light)),rgb(var(--brand-primary)))] relative overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_right,rgba(var(--brand-accent),0.3),transparent_50%)]',
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
      gradient: 'bg-[radial-gradient(circle_at_center,rgb(var(--brand-primary-light)),rgb(var(--brand-primary)))] relative overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_right,rgba(var(--brand-accent),0.3),transparent_50%)]',
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
      gradient: 'bg-[radial-gradient(circle_at_center,rgb(var(--brand-primary-light)),rgb(var(--brand-primary)))] relative overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_right,rgba(var(--brand-accent),0.3),transparent_50%)]',
    },
  ];

  const filteredProducts = filter === 'ALL' ? products : products.filter(p => p.category === filter);

  return (
    <section id="shop" className="py-24 bg-brand-ivory transition-colors duration-500" role="region" aria-label={t('title')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-teal-deep italic font-light mb-4">
            {t('title')}
          </h2>
          <p className="font-label text-brand-gold tracking-widest text-xs uppercase">
            {t('subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16" role="tablist">
          {filters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`px-6 py-2 rounded-full font-label text-[10px] tracking-widest transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:outline-none ${filter === f.id
                ? 'bg-brand-teal-deep text-white'
                : 'bg-transparent text-brand-charcoal/60 hover:text-brand-teal-deep border border-brand-charcoal/20'
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div layout ref={scrollRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px -15px rgba(201,168,76,0.3)' }}
                className={`bg-white rounded-xl overflow-hidden shadow-sm border border-brand-charcoal/5 flex flex-col group ${idx % 2 !== 0 ? 'md:mt-12' : ''}`}
              >
                {/* Visual Area */}
                <div className={`w-full aspect-square ${product.gradient} flex items-center justify-center p-6 relative`}>
                  <div className="absolute top-4 left-4 z-10">
                    <span className="font-label text-brand-gold text-xs tracking-widest bg-brand-teal-deep/80 backdrop-blur-sm px-3 py-1 rounded-full border border-brand-gold/30">
                      {product.badge}
                    </span>
                  </div>
                  {product.topBadge && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="font-label text-brand-teal-deep text-[9px] tracking-widest bg-brand-gold px-2 py-1 rounded-sm shadow-md">
                        {product.topBadge}
                      </span>
                    </div>
                  )}
                  {/* Fixed Stretched Images Using object-contain and animating background */}
                  <motion.div style={{ y: parallaxY }} className="relative w-full h-full drop-shadow-2xl opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out z-0 [animation:pulse_8s_cubic-bezier(0.4,0,0.6,1)_infinite]">
                    <Image
                      src={product.imgSrc}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </motion.div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-grow">
                  <span className="font-label text-brand-teal-light text-[10px] tracking-widest uppercase mb-2 block">
                    {product.type}
                  </span>
                  <h3 className="font-display text-2xl text-brand-teal-deep font-semibold mb-3">
                    {product.name}
                  </h3>
                  <p className="font-sans font-light text-brand-charcoal/60 text-sm leading-relaxed mb-6 flex-grow">
                    {product.desc}
                  </p>

                  <div className="flex items-center mb-6">
                    <div className="flex text-brand-gold mr-2" aria-label={`${product.rating} stars`}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="font-sans font-light text-xs text-brand-charcoal/50">
                      {product.rating} ({product.reviews} {t('reviews')})
                    </span>
                  </div>

                  <div className="flex items-baseline mb-6">
                    <span className="font-display text-3xl text-brand-gold mr-2">{product.price}</span>
                    <span className="font-sans font-light text-xs text-brand-charcoal/50">{t('per_month')}</span>
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
