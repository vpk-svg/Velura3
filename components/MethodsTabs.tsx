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
      title: t('content2_title'),
      text: t('content2_text'),
      bullets: [t('content2_b1'), t('content2_b2'), t('content2_b3'), t('content2_b4')],
    },
    3: {
      title: t('content3_title'),
      text: t('content3_text'),
      bullets: [t('content3_b1'), t('content3_b2'), t('content3_b3'), t('content3_b4')],
    },
    4: {
      title: t('content4_title'),
      text: t('content4_text'),
      bullets: [t('content4_b1'), t('content4_b2'), t('content4_b3'), t('content4_b4')],
    },
    5: {
      title: t('content5_title'),
      text: t('content5_text'),
      bullets: [t('content5_b1'), t('content5_b2'), t('content5_b3'), t('content5_b4')],
    },
  };

  return (
    <section id="methods" className="py-24 bg-brand-teal-deep text-brand-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-gold italic font-light">
            {t('title')}
          </h2>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-16" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-label text-xs tracking-widest transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:outline-none ${activeTab === tab.id
                ? 'bg-brand-gold text-brand-teal-deep'
                : 'bg-transparent border border-brand-gold/30 text-brand-gold hover:bg-brand-gold/10'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-brand-teal-mid/50 border border-brand-gold/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm"
            >
              <h3 className="font-display text-3xl md:text-4xl text-brand-gold mb-6 font-light">
                {content[activeTab as keyof typeof content].title}
              </h3>
              <p className="font-sans font-light text-lg leading-relaxed text-brand-ivory/90 mb-8">
                {content[activeTab as keyof typeof content].text}
              </p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {content[activeTab].bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-brand-gold mr-3 mt-1" aria-hidden="true">•</span>
                    <span className="font-sans font-light text-brand-ivory/80">{bullet}</span>
                  </li>
                ))}
              </ul>

              {content[activeTab].cta && (
                <a
                  href="#shop"
                  className="inline-block font-label text-brand-gold hover:text-brand-gold-light tracking-widest text-sm border-b border-brand-gold/30 hover:border-brand-gold pb-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:outline-none rounded-sm"
                >
                  {content[activeTab].cta}
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
