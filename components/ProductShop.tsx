'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import CheckoutButton from './CheckoutButton';
import Container from './ui/Container';
import SectionHeader from './ui/SectionHeader';
import { Star, ShieldCheck } from 'lucide-react';
import { EASE_PREMIUM } from '@/lib/motion';

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
    <section id="shop" className="py-section-y bg-background-light" aria-labelledby="shop-title">
      <Container>
        <SectionHeader
          label={t('title')}
          title={<>Apotheek <br /><span className="italic font-light text-primary">FAB Clinic</span></>}
          subtitle={t('subtitle')}
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 md:mb-20" role="tablist" aria-label="Product filters">
          {filters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              aria-controls="product-grid"
              onClick={() => setFilter(f.id)}
              className={`px-8 py-3.5 rounded-pill font-label text-xs tracking-widest transition-all duration-300 ease-premium uppercase font-bold focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${filter === f.id
                ? 'bg-secondary text-white shadow-soft-lg'
                : 'bg-white border border-secondary/10 text-secondary hover:text-primary hover:border-primary'
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div
          id="product-grid"
          role="tabpanel"
          layout
          ref={scrollRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
        >
          <AnimatePresence>
            {filteredProducts.map((product, idx) => (
              <motion.article
                key={product.id}
                layout
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{
                  y: -10,
                  transition: { type: 'spring', stiffness: 400, damping: 25 }
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.08,
                  ease: EASE_PREMIUM,
                }}
                className={`bg-white rounded-card overflow-hidden shadow-soft-sm hover:shadow-soft-lg border border-secondary/5 flex flex-col group relative ${idx % 2 !== 0 ? 'lg:mt-12' : ''}`}
              >
                {/* Visual Area */}
                <div className={`w-full aspect-[4/5] ${product.gradient} flex items-center justify-center p-10 relative overflow-hidden`}>
                  <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20">
                    <div className="w-56 h-56 bg-white/10 backdrop-blur-3xl rounded-full blur-2xl" />
                    <div className="absolute top-0 right-0 w-28 h-28 bg-primary/20 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
                  </div>

                  <div className="absolute top-5 left-5 z-10 flex gap-2">
                    <span className="font-label text-primary text-[10px] tracking-[0.2em] bg-secondary/80 backdrop-blur-md px-3.5 py-1.5 rounded-pill border border-primary/30 uppercase font-bold">
                      {product.badge}
                    </span>
                  </div>
                  {product.topBadge && (
                    <span className="absolute top-5 right-5 z-10 font-label text-white text-[10px] tracking-widest bg-primary px-3.5 py-1.5 rounded-pill shadow-gold-glow uppercase font-bold">
                      {product.topBadge}
                    </span>
                  )}
                  <motion.div style={{ y: parallaxY }} className="relative w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-premium z-0">
                    <Image
                      src={product.imgSrc}
                      alt={product.name}
                      fill
                      loading="lazy"
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow bg-white">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck size={14} className="text-primary" aria-hidden="true" />
                    <span className="font-label text-primary/80 text-[10px] tracking-widest uppercase font-bold">
                      {product.type}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl text-secondary font-bold mb-3 italic group-hover:text-primary transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="font-sans font-light text-secondary/60 text-base leading-relaxed mb-8 flex-grow">
                    {product.desc}
                  </p>

                  <div className="flex items-center mb-8 pb-5 border-b border-secondary/5">
                    <div className="flex text-primary mr-2.5" aria-label={`Rating: ${product.rating} out of 5`}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                      ))}
                    </div>
                    <span className="font-sans font-bold text-xs text-secondary/40 tracking-wider">
                      {product.rating} ({product.reviews} {t('reviews')})
                    </span>
                  </div>

                  <div className="flex items-end gap-2.5 mb-8">
                    <span className="font-display text-4xl text-secondary leading-none">{product.price}</span>
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
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
