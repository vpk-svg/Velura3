'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';

export default function MethodsTabs() {
  const t = useTranslations('methods');
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: t('tab1') },
    { id: 2, label: t('tab2') },
    { id: 3, label: t('tab3') },
    { id: 4, label: t('tab4') },
    { id: 5, label: t('tab5') },
  ];

  type ContentType = {
    title: string;
    text: string;
    bullets: string[];
    cta?: string;
  };

  const content: Record<number, ContentType> = {
    1: {
      title: t('content1_title'),
      text: t('content1_text'),
      bullets: [t('content1_b1'), t('content1_b2'), t('content1_b3'), t('content1_b4')],
      cta: t('content1_cta'),
    },
    2: {
      title: "Clinical Skin Science",
      text: "Premium rejuvenation treatments using medical-grade technologies and exclusive protocols.",
      bullets: ["Radiofrequency", "Microneedling", "Laser Resurfacing", "Peels"],
    },
    3: {
      title: "Advanced Contouring",
      text: "Non-surgical body transformation focusing on volume restoration and definition.",
      bullets: ["Liquid BBL", "HIFU Body", "Cryolipolysis", "Skin Tightening"],
    },
    4: {
      title: "Nutritional Therapy",
      text: "Internal wellness protocols to support external aesthetic results and longevity.",
      bullets: ["Metabolic Screen", "IV Drips", "Personalized diets", "Health coaching"],
    },
    5: {
      title: "Longevity Protocols",
      text: "The science of aging well. Comprehensive strategies to maintain health and vitality.",
      bullets: ["Bio-Analysis", "Hormone support", "Sleep optimization", "Vitality check"],
    },
  };

  return (
    <section id="methods" className="py-32 bg-background-light text-secondary overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-24 md:mb-32">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-label text-primary text-xs tracking-[0.5em] uppercase mb-8 block font-bold"
          >
            {t('label')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-6xl md:text-8xl lg:text-[10rem] text-secondary mb-12 tracking-tighter"
          >
            {t('title')} <span className="italic font-light text-primary">{t('subtitle')}</span>
          </motion.h2>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-6 mb-24" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-10 py-5 rounded-full font-label text-xs md:text-sm tracking-[0.25em] transition-all duration-700 uppercase font-bold focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${activeTab === tab.id
                ? 'bg-secondary text-white shadow-2xl shadow-secondary/40'
                : 'bg-white border border-secondary/5 text-secondary hover:border-primary hover:text-primary'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -40 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-secondary/5 rounded-[60px] p-12 md:p-24 shadow-2xl shadow-primary/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

              <h3 className="font-display text-5xl md:text-8xl text-secondary mb-12 italic leading-tight">
                {content[activeTab as keyof typeof content].title}
              </h3>
              <p className="font-sans font-light text-xl md:text-3xl leading-relaxed text-secondary/70 mb-16 max-w-4xl italic">
                "{content[activeTab as keyof typeof content].text}"
              </p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
                {content[activeTab].bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start group/bullet">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-6 mt-1.5 font-bold transition-all group-hover/bullet:bg-primary group-hover/bullet:text-white shrink-0" aria-hidden="true">✓</span>
                    <span className="font-sans font-light text-lg md:text-2xl text-secondary/80 group-hover/bullet:text-secondary transition-colors">{bullet}</span>
                  </li>
                ))}
              </ul>

              {content[activeTab].cta && (
                <div className="mt-12 pt-12 border-t border-secondary/5">
                  <a
                    href="#shop"
                    className="inline-flex font-label text-primary hover:text-secondary tracking-[0.4em] text-xs md:text-sm uppercase font-bold group/link"
                  >
                    {content[activeTab].cta} <span className="ml-6 transition-transform duration-500 group-hover/link:translate-x-4">→</span>
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
