'use client';

import { motion, type Variants } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Star, Heart } from 'lucide-react';
import Container from './ui/Container';
import SectionHeader from './ui/SectionHeader';
import { EASE_PREMIUM } from '@/lib/motion';

export default function Testimonials() {
  const t = useTranslations('testimonials');

  const testimonials = [
    { quote: t('t1_quote'), author: t('t1_author') },
    { quote: t('t2_quote'), author: t('t2_author') },
    { quote: t('t3_quote'), author: t('t3_author') },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_PREMIUM } },
  };

  return (
    <section className="py-section-y bg-secondary text-background-light overflow-hidden" aria-label="Client testimonials">
      <Container>
        <SectionHeader
          light
          label={t('label')}
          title={<>{t('title')} <span className="italic font-light text-primary">{t('subtitle')}</span></>}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.blockquote
              key={index}
              variants={itemVariants}
              className="bg-white rounded-card p-10 shadow-soft-md relative group hover:-translate-y-3 transition-transform duration-300 ease-premium flex flex-col"
            >
              <div className="flex text-primary mb-8" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="font-display text-2xl md:text-3xl text-secondary italic leading-snug mb-10">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="mt-auto border-t border-secondary/5 pt-8">
                <cite className="not-italic">
                  <span className="block font-label text-secondary text-sm uppercase tracking-[0.2em] font-bold">
                    {testimonial.author.split('·')[0].trim()}
                  </span>
                  <span className="block font-label text-primary text-[10px] tracking-[0.3em] uppercase mt-1.5 font-bold">
                    {testimonial.author.split('·')[1]?.trim() || "Verified Patient"}
                  </span>
                </cite>
              </footer>
              <div className="absolute top-8 right-8 text-primary opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500" aria-hidden="true">
                <Heart size={64} fill="currentColor" />
              </div>
            </motion.blockquote>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
