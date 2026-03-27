'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import Container from './ui/Container';
import SectionHeader from './ui/SectionHeader';
import { EASE_PREMIUM } from '@/lib/motion';

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
    <section id="methods" className="py-section-y bg-background-light text-secondary overflow-hidden">
      <Container>
        <SectionHeader
          label={t('label')}
          title={<>{t('title')} <span className="italic font-light text-primary">{t('subtitle')}</span></>}
        />

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 md:mb-20" role="tablist" aria-label="Treatment methods">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`methods-panel-${tab.id}`}
              id={`methods-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 rounded-pill font-sans text-xs tracking-[0.25em] transition-all duration-300 ease-premium uppercase font-semibold focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${activeTab === tab.id
                ? 'bg-secondary text-white shadow-soft-lg'
                : 'bg-white border border-secondary/5 text-secondary hover:border-primary hover:text-primary'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              id={`methods-panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`methods-tab-${activeTab}`}
              initial={{ opacity: 0, scale: 0.98, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -30 }}
              transition={{ duration: 0.5, ease: EASE_PREMIUM }}
              className="bg-white border border-secondary/5 rounded-md p-8 md:p-10 shadow-soft-lg relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true" />

              <h3 className="font-display text-display-lg text-secondary mb-8 italic leading-tight">
                {content[activeTab].title}
              </h3>
              <p className="font-sans font-light text-xl md:text-2xl leading-relaxed text-secondary/70 mb-12 max-w-4xl italic">
                &ldquo;{content[activeTab].text}&rdquo;
              </p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {content[activeTab].bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start group/bullet">
                    <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-5 mt-1 font-semibold transition-all duration-300 group-hover/bullet:bg-primary group-hover/bullet:text-white shrink-0 text-sm" aria-hidden="true">✓</span>
                    <span className="font-sans font-light text-lg md:text-xl text-secondary/80 group-hover/bullet:text-secondary transition-colors">{bullet}</span>
                  </li>
                ))}
              </ul>

              {content[activeTab].cta && (
                <div className="mt-10 pt-10 border-t border-secondary/5">
                  <a
                    href="#shop"
                    className="inline-flex font-sans text-primary hover:text-secondary tracking-[0.3em] text-xs uppercase font-semibold group/link transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-sm"
                  >
                    {content[activeTab].cta} <span className="ml-4 transition-transform duration-300 group-hover/link:translate-x-3" aria-hidden="true">→</span>
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
