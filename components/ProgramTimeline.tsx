'use client';

import { motion, type Variants } from 'motion/react';
import { useTranslations } from 'next-intl';
import { ClipboardCheck, Stethoscope, Pill, HeartPulse, RefreshCw } from 'lucide-react';
import Container from './ui/Container';
import SectionHeader from './ui/SectionHeader';
import { EASE_PREMIUM } from '@/lib/motion';

const ICONS = [ClipboardCheck, Stethoscope, Pill, HeartPulse, RefreshCw];

export default function ProgramTimeline() {
  const t = useTranslations('program_timeline');

  const steps = ICONS.map((Icon, i) => ({
    num: `${i + 1}`,
    icon: Icon,
    title: t(`step${i + 1}_title`),
    desc: t(`step${i + 1}_desc`),
  }));

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
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
          title={<>{t('title')} {t('title_accent')}</>}
          subtitle={t('subtitle')}
        />

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Connecting line - horizontal (desktop) */}
          <div className="hidden md:block absolute top-[16px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-primary/20 z-0" aria-hidden="true" />
          {/* Connecting line - vertical (mobile) */}
          <div className="md:hidden absolute left-1/2 -translate-x-px top-0 bottom-0 w-[2px] border-l-2 border-dashed border-primary/20 z-0" aria-hidden="true" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10" role="list">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.num} variants={itemVariants} className="flex flex-col items-center text-center" role="listitem">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-gold-glow ring-4 ring-white mb-4 relative z-10">
                    <span className="font-sans text-white text-sm font-semibold">{step.num}</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-4">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-lg lg:text-xl text-secondary italic font-bold mb-2">{step.title}</h3>
                  <p className="font-sans font-light text-secondary/60 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
