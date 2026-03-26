'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { FileSearch, ClipboardCheck, Package } from 'lucide-react';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section className="py-20 md:py-32 bg-background-light overflow-hidden" aria-labelledby="how-it-works-title">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20 md:mb-32">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-label text-primary text-xs tracking-[0.4em] uppercase mb-6 block font-bold"
          >
            {t('label')}
          </motion.span>
          <h2 id="how-it-works-title" className="font-display text-5xl md:text-8xl text-secondary tracking-tight mb-8">
            {t('title')} <span className="italic font-light text-primary">{t('subtitle')}</span>
          </h2>
          <p className="font-sans text-secondary/70 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
            {t('desc')}
          </p>
        </div>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[16px] left-[16.666%] right-[16.666%] h-[2px] border-t-2 border-dashed border-primary/20 z-0" aria-hidden="true" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 relative z-10">
            {steps.map((step, index) => (
              <motion.div key={index} variants={itemVariants} className="flex flex-col relative group">

                {/* Step Badge */}
                <div className="mx-auto flex justify-center mb-10 relative z-20">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-xl ring-8 ring-background-light">
                    <span className="font-label text-white text-sm font-bold">
                      {step.num}
                    </span>
                  </div>
                  <span className="absolute -top-8 font-label text-primary text-[10px] tracking-widest uppercase font-bold">
                    {t('step_prefix')} {step.num}
                  </span>
                </div>

                {/* Card */}
                <div className="bg-white rounded-[48px] shadow-sm hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-3 border border-primary/5 hover:border-primary/20 flex-grow flex flex-col overflow-hidden">

                  {/* Icon Container */}
                  <div className="relative w-full aspect-video bg-secondary/5 flex items-center justify-center overflow-hidden border-b border-primary/5">
                    <div className="w-24 h-24 rounded-3xl bg-white border border-primary/10 shadow-sm flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-700 text-primary">
                      {step.icon}
                    </div>
                  </div>

                  {/* Text Container */}
                  <div className="p-10 flex flex-col flex-grow text-center">
                    <h3 className="font-display text-3xl text-secondary mb-4 italic">
                      {step.title}
                    </h3>
                    <p className="font-sans font-light text-secondary/70 text-lg leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
