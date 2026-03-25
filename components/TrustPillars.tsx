'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Stethoscope, Package, FlaskConical, Infinity as InfinityIcon } from 'lucide-react';

export default function TrustPillars() {
  const t = useTranslations('trust');

  const pillars = [
    {
      icon: <Stethoscope className="w-8 h-8 text-brand-gold mb-4" />,
      title: t('doctors_title'),
      desc: t('doctors_desc'),
    },
    {
      icon: <Package className="w-8 h-8 text-brand-gold mb-4" />,
      title: t('delivery_title'),
      desc: t('delivery_desc'),
    },
    {
      icon: <FlaskConical className="w-8 h-8 text-brand-gold mb-4" />,
      title: t('clinical_title'),
      desc: t('clinical_desc'),
    },
    {
      icon: <InfinityIcon className="w-8 h-8 text-brand-gold mb-4" />,
      title: t('support_title'),
      desc: t('support_desc'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section className="py-24 bg-brand-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {pillars.map((pillar, index) => (
            <motion.div key={index} variants={itemVariants} className="flex flex-col items-center text-center">
              {pillar.icon}
              <h3 className="font-label text-brand-teal-deep text-sm tracking-widest uppercase mb-3">
                {pillar.title}
              </h3>
              <p className="font-sans font-light text-brand-charcoal/70 text-sm leading-relaxed max-w-xs">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
