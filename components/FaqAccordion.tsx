'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS, FAQ_CATEGORIES, type FaqCategory, type FaqItem } from '@/lib/data/faq';

interface FaqAccordionProps {
  namespace?: string;
}

export default function FaqAccordion({ namespace = 'faq_page' }: FaqAccordionProps) {
  const t = useTranslations(namespace);
  const [activeCategory, setActiveCategory] = useState<FaqCategory | 'all'>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const filteredItems: FaqItem[] =
    activeCategory === 'all' ? FAQ_ITEMS : FAQ_ITEMS.filter((item) => item.category === activeCategory);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="space-y-10">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-5 py-2.5 rounded-pill font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 ${
            activeCategory === 'all'
              ? 'bg-primary text-white shadow-gold-glow'
              : 'bg-secondary/5 text-secondary/50 hover:bg-secondary/10'
          }`}
        >
          {t('filter_all')}
        </button>
        {FAQ_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-pill font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-primary text-white shadow-gold-glow'
                : 'bg-secondary/5 text-secondary/50 hover:bg-secondary/10'
            }`}
          >
            {t(`filter_${cat}`)}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className="max-w-3xl mx-auto divide-y divide-secondary/[0.06]">
        {filteredItems.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id}>
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between py-6 text-left group"
                aria-expanded={isOpen}
              >
                <span className="font-display text-lg md:text-xl text-secondary italic font-bold group-hover:text-primary transition-colors pr-4">
                  {t(item.questionKey)}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 text-primary"
                >
                  <ChevronDown size={20} strokeWidth={1.5} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="font-sans font-light text-secondary/70 text-base leading-relaxed pb-6">
                      {t(item.answerKey)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
