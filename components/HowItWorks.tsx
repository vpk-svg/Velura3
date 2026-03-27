'use client';

import { motion, type Variants } from 'motion/react';
import { useTranslations } from 'next-intl';
import { FileSearch, ClipboardCheck, Package } from 'lucide-react';
import Container from './ui/Container';
import SectionHeader from './ui/SectionHeader';
import { EASE_PREMIUM } from '@/lib/motion';

export default function HowItWorks() {
  const t = useTranslations('how');

  const steps = [
    {
      num: '1',
      title: t('step1_title'),
      desc: t('step1_desc'),
      icon: <FileSearch className="w-10 h-10" strokeWidth={1.5} />,
    },
    {
      num: '2',
      title: t('step2_title'),
      desc: t('step2_desc'),
      icon: <ClipboardCheck className="w-10 h-10" strokeWidth={1.5} />,
    },
    {
      num: '3',
      title: t('step3_title'),
      desc: t('step3_desc'),
      icon: <Package className="w-10 h-10" strokeWidth={1.5} />,
    },
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
    <section className="py-section-y bg-background-light overflow-hidden" aria-labelledby="how-it-works-title">
      <Container>
        <SectionHeader
          label={t('label')}
          title={<>{t('title')} <span className="italic font-light text-primary">{t('subtitle')}</span></>}
          subtitle={t('desc')}
        />

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[16px] left-[16.666%] right-[16.666%] h-[2px] border-t-2 border-dashed border-primary/20 z-0" aria-hidden="true" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 relative z-10">
            {steps.map((step, index) => (
              <motion.div key={index} variants={itemVariants} className="flex flex-col relative group">

                {/* Step Badge */}
                <div className="mx-auto flex justify-center mb-8 relative z-20">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-gold-glow ring-8 ring-background-light">
                    <span className="font-label text-white text-sm font-bold">
                      {step.num}
                    </span>
                  </div>
                  <span className="absolute -top-7 font-label text-primary text-[10px] tracking-widest uppercase font-bold" aria-hidden="true">
                    {t('step_prefix')} {step.num}
                  </span>
                </div>

                <motion.div
                  whileHover={{
                    y: -8,
                    transition: { type: 'spring', stiffness: 400, damping: 25 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-card shadow-soft-sm hover:shadow-soft-lg transition-shadow duration-300 ease-premium border border-primary/5 hover:border-primary/15 flex-grow flex flex-col overflow-hidden group/card"
                >
                  {/* Icon Container */}
                  <div className="relative w-full aspect-video bg-secondary/5 flex items-center justify-center overflow-hidden border-b border-primary/5">
                    <div className="absolute inset-0 bg-primary opacity-0 group-hover/card:opacity-5 transition-opacity duration-500" aria-hidden="true" />
                    <div className="text-primary transform transition-all duration-500 group-hover/card:scale-110 group-hover/card:rotate-3" aria-hidden="true">
                      {step.icon}
                    </div>
                  </div>

                  {/* Text Container */}
                  <div className="p-8 md:p-10 flex flex-col flex-grow items-center text-center">
                    <h3 className="font-display text-2xl md:text-3xl text-secondary mb-4 leading-tight group-hover/card:text-primary transition-colors duration-300 italic font-bold">
                      {step.title}
                    </h3>
                    <p className="font-sans font-light text-secondary/70 text-base leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
