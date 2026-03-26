'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Star, Heart } from 'lucide-react';

import { ReactElement } from 'react';

export default function Testimonials(): ReactElement {
  const t = useTranslations('testimonials');

  const testimonials = [
    { quote: t('t1_quote'), author: t('t1_author') },
    { quote: t('t2_quote'), author: t('t2_author') },
    { quote: t('t3_quote'), author: t('t3_author') },
  ];

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="py-20 md:py-32 bg-secondary text-background-light overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-24 md:mb-40">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-label text-primary text-xs tracking-[0.4em] uppercase mb-6 block font-bold"
          >
            {t('label')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-6xl md:text-8xl lg:text-[10rem] text-background-light tracking-tighter mb-8"
          >
            {t('title')} <span className="italic font-light text-primary">{t('subtitle')}</span>
          </motion.h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-[48px] p-12 shadow-2xl relative group hover:-translate-y-4 transition-transform duration-700 ease-out"
            >
              <div className="flex text-primary mb-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-current" />
                ))}
              </div>
              <p className="font-display text-3xl md:text-4xl text-secondary italic leading-[1.1] mb-12">
                "{testimonial.quote}"
              </p>
              <div className="mt-auto border-t border-secondary/5 pt-10">
                <p className="font-label text-secondary text-[14px] uppercase tracking-[0.2em] font-bold">
                  {testimonial.author.split('·')[0].trim()}
                </p>
                <p className="font-label text-primary text-[10px] tracking-[0.3em] uppercase mt-2 font-bold">
                  {testimonial.author.split('·')[1]?.trim() || "Verified Patient"}
                </p>
              </div>
              <div className="absolute top-10 right-10 text-primary opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
                <Heart size={80} fill="currentColor" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
