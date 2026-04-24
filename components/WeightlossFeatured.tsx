'use client';

import { motion, type Variants } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Container from './ui/Container';
import Card from './ui/Card';
import { ArrowRight } from 'lucide-react';
import { EASE_PREMIUM } from '@/lib/motion';
import { Link } from '@/lib/navigation';

export default function WeightlossFeatured() {
  const t = useTranslations('weightloss_featured');

  const products = [
    { key: 'mounjaro', image: '/images/products/mounjaro-pen.webp', price: 'v.a. €425' },
    { key: 'ozempic', image: '/images/products/ozempic-pen.webp', price: 'v.a. €299' },
    { key: 'glp1', image: '/images/products/wegovy-pen.webp', price: 'v.a. €399' },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_PREMIUM } },
  };

  return (
    <section className="py-section-y bg-background-light overflow-hidden" aria-label={t('label')}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="text-center mb-12 md:mb-16"
        >
          {t('label')}
          <h2 className="font-display text-display-lg text-secondary mb-6">
            {t('title')} {t('title_accent')}
          </h2>
          <p className="font-sans font-light text-muted text-xl leading-relaxed max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {products.map((product) => (
            <motion.div key={product.key} variants={itemVariants}>
              <Card className="group">
                <div className="relative aspect-[4/3] bg-secondary/5 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={t(`${product.key}_title`)}
                    fill
                    className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl text-secondary italic font-bold mb-2 group-hover:text-primary transition-colors">
                    {t(`${product.key}_title`)}
                  </h3>
                  <p className="font-sans font-light text-muted text-sm leading-relaxed mb-4">
                    {t(`${product.key}_desc`)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-primary font-semibold text-lg">{product.price}<span className="text-xs text-secondary/40 font-light">/mnd</span></span>
                    <Link href="/weightloss" className="inline-flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.15em] text-primary font-bold hover:underline">
                      {t('cta')} <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
