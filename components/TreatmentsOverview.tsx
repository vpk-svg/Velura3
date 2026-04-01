'use client';

import { motion, type Variants } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Syringe, Sparkles, Dumbbell, TrendingDown, ArrowRight } from 'lucide-react';
import Container from './ui/Container';
import SectionHeader from './ui/SectionHeader';
import { EASE_PREMIUM } from '@/lib/motion';

const ICONS = [Syringe, Sparkles, Dumbbell, TrendingDown];

export default function TreatmentsOverview() {
  const t = useTranslations('treatments_overview');

  const treatments = [
    { key: 'botox', href: '/botox', icon: ICONS[0] },
    { key: 'fillers', href: '/fillers', icon: ICONS[1] },
    { key: 'shape', href: '/shape', icon: ICONS[2] },
    { key: 'weightloss', href: '/weightloss', icon: ICONS[3] },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_PREMIUM } },
  };

  return (
    <section className="py-section-y bg-white overflow-hidden" aria-label={t('label')}>
      <Container>
        <SectionHeader
          label={t('label')}
          title={<>{t('title')} <span className="italic font-light text-primary">{t('title_accent')}</span></>}
          subtitle={t('subtitle')}
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {treatments.map((item) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.key}
                href={item.href}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                className="bg-background-light rounded-md p-8 shadow-soft-sm hover:shadow-soft-lg border border-primary/5 hover:border-primary/15 transition-all duration-300 group flex flex-col"
              >
                <div className="w-14 h-14 mb-6 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl text-secondary mb-3 italic font-bold group-hover:text-primary transition-colors duration-200">
                  {t(`${item.key}_title`)}
                </h3>
                <p className="font-sans font-light text-secondary/70 text-sm leading-relaxed flex-grow mb-4">
                  {t(`${item.key}_desc`)}
                </p>
                <span className="inline-flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.15em] text-primary font-bold">
                  {t('view_cta')} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
