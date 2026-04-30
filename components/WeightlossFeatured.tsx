'use client';

import { motion, type Variants } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Container from './ui/Container';
import Card from './ui/Card';
import { ArrowRight } from 'lucide-react';
import { EASE_PREMIUM } from '@/lib/motion';
import { Link } from '@/lib/navigation';
import ProductShop from './ProductShop';

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

        <ProductShop />
      </Container>
    </section>
  );
}
