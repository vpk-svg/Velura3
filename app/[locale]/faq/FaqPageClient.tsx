'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, CircleHelp, MessageCircleMore } from 'lucide-react';
import { useLocale } from 'next-intl';
import Container from '@/components/ui/Container';
import { EASE_PREMIUM } from '@/lib/motion';
import { Link } from '@/lib/navigation';
import PageHero from '@/components/PageHero';
import {
  FAQ_CATEGORY_ORDER,
  getFaqCategoryLabels,
  getFaqEntries,
  type FaqCategory,
} from './faq-content';

export default function FaqPage() {
  const locale = useLocale();
  const isNl = locale === 'nl';
  const faqEntries = useMemo(() => getFaqEntries(locale), [locale]);
  const categoryLabels = useMemo(() => getFaqCategoryLabels(locale), [locale]);
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('fillers');
  const [openId, setOpenId] = useState<number | null>(1);

  const activeItems = useMemo(
    () => faqEntries.filter((item) => item.category === activeCategory),
    [activeCategory, faqEntries]
  );

  return (
    <>
      <PageHero
        align="center"
        overlayClassName="bg-gradient-to-br from-secondary via-secondary/95 to-secondary/80"
        label={isNl ? 'FAQ · FAB CLINIC' : 'FAQ · FAB CLINIC'}
        title={isNl ? 'Veelgestelde vragen' : 'Frequently asked questions'}
        description={
          isNl
            ? '90 uitgebreide antwoorden over fillers, botox en obesitasbehandeling, gebundeld in dezelfde rustige premium stijl als de rest van de site.'
            : '90 detailed answers about fillers, botox and obesity treatment, presented in the same premium design language as the rest of the site.'
        }
        contentWidthClassName="max-w-3xl"
        descriptionWidthClassName="max-w-2xl"
        meta={
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              isNl ? '90 vragen' : '90 questions',
              isNl ? '3 thema’s' : '3 topics',
              isNl ? 'Direct navigeerbaar' : 'Easy to browse',
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.2em] text-background-light/80"
              >
                {item}
              </span>
            ))}
          </div>
        }
      />

      <section className="py-section-y bg-page-faq overflow-hidden">
        <Container>
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 grid gap-4 md:grid-cols-3">
              {FAQ_CATEGORY_ORDER.map((category, index) => {
                const items = faqEntries.filter((item) => item.category === category);
                const isActive = category === activeCategory;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setActiveCategory(category);
                      setOpenId(items[0]?.id ?? null);
                    }}
                    className={`rounded-[2rem] border p-6 text-left transition-all duration-300 ${
                      isActive
                        ? 'border-primary/30 bg-white shadow-soft-xl'
                        : 'border-secondary/10 bg-white/70 hover:border-primary/20 hover:bg-white'
                    }`}
                  >
                    <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CircleHelp size={18} strokeWidth={1.75} />
                    </span>
                    <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-secondary/45">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h2 className="mt-3 font-display text-3xl text-secondary">
                      {categoryLabels[category]}
                    </h2>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-secondary/65">
                      {items.length} {isNl ? 'vragen in deze reeks' : 'questions in this chapter'}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.9fr)]">
              <div className="rounded-[2rem] border border-secondary/10 bg-white px-6 py-4 md:px-8 md:py-6">
                <div className="mb-6 flex items-end justify-between gap-4 border-b border-secondary/8 pb-5">
                  <div>
                    <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-primary">
                      {isNl ? 'Hoofdstuk' : 'Chapter'}
                    </p>
                    <h3 className="mt-2 font-display text-4xl text-secondary">
                      {categoryLabels[activeCategory]}
                    </h3>
                  </div>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-secondary/45">
                    {activeItems.length} {isNl ? 'items' : 'items'}
                  </p>
                </div>

                <div className="divide-y divide-secondary/[0.08]">
                  {activeItems.map((item) => {
                    const isOpen = openId === item.id;

                    return (
                      <article key={item.id} className="py-2">
                        <button
                          type="button"
                          onClick={() => setOpenId(isOpen ? null : item.id)}
                          className="flex w-full items-start justify-between gap-5 py-5 text-left"
                          aria-expanded={isOpen}
                        >
                          <div>
                            <p className="mb-2 font-sans text-[11px] uppercase tracking-[0.25em] text-primary/70">
                              {isNl ? 'Vraag' : 'Question'} {item.id}
                            </p>
                            <h4 className="font-sans text-base font-medium leading-relaxed text-secondary md:text-lg">
                              {item.question}
                            </h4>
                          </div>
                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                            className="mt-2 shrink-0 text-primary"
                          >
                            <ChevronDown size={20} strokeWidth={1.6} />
                          </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen ? (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: EASE_PREMIUM }}
                              className="overflow-hidden"
                            >
                              <p className="pb-5 pr-6 font-sans text-sm leading-7 text-secondary/72 md:text-[15px]">
                                {item.answer}
                              </p>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </article>
                    );
                  })}
                </div>
              </div>

              <aside className="space-y-5">
                <div className="rounded-[2rem] border border-primary/15 bg-secondary px-7 py-8 text-background-light">
                  <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-primary/80">
                    {isNl ? 'Snel overzicht' : 'Quick overview'}
                  </p>
                  <h3 className="mt-3 font-display text-3xl">
                    {isNl ? 'Eerst oriënteren, daarna verdiepen.' : 'Browse first, then dive deeper.'}
                  </h3>
                  <p className="mt-4 font-sans text-sm leading-7 text-background-light/72">
                    {isNl
                      ? 'Kies bovenaan een onderwerp en open daarna de relevante vraag. Zo blijft een grote FAQ toch rustig en leesbaar.'
                      : 'Pick a topic first, then open the relevant question. This keeps a large FAQ calm and easy to scan.'}
                  </p>
                </div>

                <div className="rounded-[2rem] border border-secondary/10 bg-white px-7 py-8">
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MessageCircleMore size={18} strokeWidth={1.75} />
                  </span>
                  <h3 className="font-display text-3xl text-secondary">
                    {isNl ? 'Nog een vraag?' : 'Still have a question?'}
                  </h3>
                  <p className="mt-4 font-sans text-sm leading-7 text-secondary/68">
                    {isNl
                      ? 'Neem contact op voor persoonlijk advies over fillers, botox of een traject voor medisch gewichtsverlies.'
                      : 'Contact the clinic for personal advice about fillers, botox or a medical weight loss programme.'}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-6 inline-flex items-center justify-center rounded-pill bg-primary px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-white shadow-gold-glow transition-all duration-300 hover:shadow-soft-xl active:scale-[0.98]"
                  >
                    {isNl ? 'Neem contact op' : 'Contact us'}
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-section-y bg-secondary overflow-hidden">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_PREMIUM }}
              className="font-sans text-primary text-xs tracking-[0.3em] uppercase mb-6 block font-semibold"
            >
              {isNl ? 'PERSOONLIJK ADVIES' : 'PERSONAL ADVICE'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.05, ease: EASE_PREMIUM }}
              className="font-display text-display-lg text-background-light mb-6"
            >
              {isNl ? 'Vraag niet gevonden?' : 'Couldn’t find your answer?'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
              className="font-sans font-light text-background-light/70 text-lg md:text-xl leading-relaxed mb-10"
            >
              {isNl
                ? 'Onze specialisten helpen u graag verder met behandeladvies, nazorgvragen of het kiezen van het juiste traject.'
                : 'Our specialists can help with treatment advice, aftercare questions, or choosing the right programme.'}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE_PREMIUM }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-12 py-5 text-xs tracking-[0.3em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]"
              >
                {isNl ? 'Neem Contact Op' : 'Contact Us'}
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
