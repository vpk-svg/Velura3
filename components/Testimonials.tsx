'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';

import { ReactElement } from 'react';

export default function Testimonials(): ReactElement {
  const t = useTranslations('testimonials');

  const testimonials = [
    { quote: t('t1_quote'), author: t('t1_author') },
    { quote: t('t2_quote'), author: t('t2_author') },
    { quote: t('t3_quote'), author: t('t3_author') },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <section className="py-32 bg-[linear-gradient(150deg,#0A2E2E,#0D4A47)] text-brand-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-gold italic font-light">
            {t('title')}
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-brand-ivory rounded-xl p-10 border-l-4 border-brand-gold shadow-2xl relative"
            >
              <div className="flex text-brand-gold mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="font-display text-2xl text-brand-teal-deep italic leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>
              <div className="mt-auto">
                <p className="font-sans font-medium text-brand-charcoal text-sm uppercase tracking-wider">
                  {testimonial.author.split('·')[0].trim()}
                </p>
                <p className="font-label text-brand-gold text-[10px] tracking-widest uppercase mt-1">
                  {testimonial.author.split('·')[1]?.trim()}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
