'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Stethoscope, ShieldCheck, HeartPulse, Sparkles } from 'lucide-react';

export default function TrustPillars() {
  const t = useTranslations('trust');

  const pillars = [
    {
      icon: <Stethoscope className="w-10 h-10" />,
      title: t('doctors_title'),
      desc: t('doctors_desc'),
    },
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: t('delivery_title'),
      desc: t('delivery_desc'),
    },
    {
      icon: <HeartPulse className="w-10 h-10" />,
      title: t('clinical_title'),
      desc: t('clinical_desc'),
    },
    {
      icon: <Sparkles className="w-10 h-10" />,
      title: t('support_title'),
      desc: t('support_desc'),
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background-light border-y border-secondary/5">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col items-center text-center"
            >
              <div className="text-brand-gold-dark mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                {pillar.icon}
              </div>
              <h3 className="font-label text-secondary text-sm md:text-md tracking-[0.3em] uppercase mb-4 font-bold group-hover:text-brand-gold-dark transition-colors">
                {pillar.title}
              </h3>
              <p className="font-sans font-light text-secondary/60 text-md leading-relaxed max-w-xs transition-colors group-hover:text-secondary">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
