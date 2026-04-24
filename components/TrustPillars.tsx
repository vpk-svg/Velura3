'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Stethoscope, ShieldCheck, HeartPulse, Sparkles } from 'lucide-react';
import Container from './ui/Container';
import { EASE_PREMIUM } from '@/lib/motion';

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
    <section className="py-section-y bg-background-light border-y border-primary/5" aria-labelledby="trust-heading">
      <Container>
        <h2 id="trust-heading" className="sr-only">{t('sr_heading')}</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 list-none p-0 m-0" role="list">
          {pillars.map((pillar, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: EASE_PREMIUM }}
              className="group flex flex-col items-center text-center"
            >
              <div className="text-primary mb-6 transition-transform duration-300 ease-premium group-hover:scale-110 group-hover:rotate-6" aria-hidden="true">
                {pillar.icon}
              </div>
              <h3 className="font-sans text-primary text-sm tracking-[0.25em] uppercase mb-3 font-light group-hover:text-primary transition-colors duration-300">
                {pillar.title}
              </h3>
              <p className="font-sans font-light text-primary/70 text-base leading-relaxed max-w-xs transition-colors duration-300 group-hover:text-primary">
                {pillar.desc}
              </p>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
