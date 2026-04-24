'use client';

import { motion, type Variants } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Syringe, Sparkles, Dumbbell, TrendingDown, ArrowRight } from 'lucide-react';
import Container from './ui/Container';
import SectionHeader from './ui/SectionHeader';
import { EASE_PREMIUM } from '@/lib/motion';
import { Link } from '@/lib/navigation';

const MotionLink = motion.create(Link);

const ICONS = [Syringe, Sparkles, Dumbbell, TrendingDown];

export default function TreatmentsOverview() {
  const t = useTranslations('treatments_overview');

  const treatments = [
    { key: 'botox', href: '/botox', icon: ICONS[0] },
    { key: 'fillers', href: '/fillers', icon: ICONS[1] },
    { key: 'bbl', href: '/shape', icon: ICONS[2] },
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
    <section className="py-section-y bg-background-light overflow-hidden" aria-label={t('label')}>
      <Container>
        <SectionHeader
          label={t('label')}
          title={<>{t('title')} {t('title_accent')}</>}
          subtitle={t('subtitle')}
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {treatments.map((item) => {
            const Icon = item.icon;
            return (
              <MotionLink
                key={item.key}
                href={item.href}
                variants={itemVariants}
                className="bg-surface rounded-xl p-10 shadow-soft-sm hover:shadow-soft-xl border border-primary/5 hover:border-primary/20 transition-all duration-700 group flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 mb-8 flex items-center justify-center text-primary/50 group-hover:text-primary transition-all duration-700">
                  <Icon className="w-8 h-8" strokeWidth={1} />
                </div>

                <h3 className="font-display text-2xl text-primary mb-4 italic group-hover:text-primary transition-colors duration-500">
                  {t(`${item.key}_title`)}
                </h3>

                <div className="w-12 h-px bg-primary/10 mb-6 group-hover:w-20 group-hover:bg-primary/30 transition-all duration-700" />

                <p className="font-sans font-light text-primary/60 text-sm leading-relaxed flex-grow mb-8 px-2">
                  {t(`${item.key}_desc`)}
                </p>

                <span className="inline-flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.2em] text-primary font-light">
                  {t('view_cta')} <div className="w-6 h-px bg-primary/40 group-hover:w-10 transition-all duration-700" />
                </span>
              </MotionLink>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
