'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Container from './ui/Container';
import SectionHeader from './ui/SectionHeader';
import { EASE_PREMIUM } from '@/lib/motion';
import { Link } from '@/lib/navigation';

export default function FaqPreview() {
  const t = useTranslations('faq_preview');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
    { q: t('q5'), a: t('a5') },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <section className="py-section-y bg-background-light overflow-hidden" aria-label={t('label')}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Container>
        <SectionHeader
          label={t('label')}
          title={<>{t('title')} {t('title_accent')}</>}
        />

        <div className="max-w-3xl mx-auto space-y-3 mb-10">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: EASE_PREMIUM }}
              className="bg-surface rounded-lg border border-primary/5 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                aria-expanded={openIndex === i}
                aria-controls={`faq-panel-${i}`}
              >
                <span className="font-sans text-primary text-sm font-light pr-4">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-primary shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                    className="overflow-hidden"
                    id={`faq-panel-${i}`}
                    role="region"
                  >
                    <p className="px-6 pb-5 font-sans font-light text-primary/60 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/faq" className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-primary font-light hover:underline">
            {t('cta')} <ArrowRight size={14} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
