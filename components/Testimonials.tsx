'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import Container from './ui/Container';
import SectionHeader from './ui/SectionHeader';
import { EASE_PREMIUM } from '@/lib/motion';

export default function Testimonials() {
  const t = useTranslations('testimonials');

  const testimonials = Array.from({ length: 12 }, (_, i) => ({
    quote: t(`t${i + 1}_quote`),
    author: t(`t${i + 1}_author`),
  }));

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scroll = useCallback((dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>(':scope > *')?.offsetWidth ?? 360;
    el.scrollBy({ left: dir === 'left' ? -cardWidth - 24 : cardWidth + 24, behavior: 'smooth' });
  }, []);

  return (
    <section className="py-section-y bg-background-light overflow-hidden" aria-label={t('label')}>
      <Container>
        <SectionHeader
          label={t('label')}
          title={<>{t('title')} {t('subtitle')}</>}
        />

        {/* Navigation arrows - Refined */}
        <div className="flex items-center justify-end gap-4 mb-10">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="w-12 h-12 rounded-full border border-primary/15 flex items-center justify-center text-primary disabled:opacity-20 hover:border-primary/40 hover:text-primary transition-all duration-500 ease-premium"
            aria-label="Previous"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="w-12 h-12 rounded-full border border-primary/15 flex items-center justify-center text-primary disabled:opacity-20 hover:border-primary/40 hover:text-primary transition-all duration-500 ease-premium"
            aria-label="Next"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Scrollable carousel */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-8 -mx-4 px-4 hide-scrollbar"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.blockquote
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: EASE_PREMIUM }}
              className="snap-start shrink-0 w-[300px] md:w-[400px] bg-surface rounded-2xl p-10 shadow-soft-md border border-primary/5 relative group hover:border-primary/20 transition-all duration-700 flex flex-col"
            >
              <div className="flex gap-1 text-primary/40 mb-10" role="img" aria-label={`${t('rating')}: 5/5`}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>

              <p className="font-display text-2xl md:text-3xl text-primary leading-snug mb-12 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <footer className="mt-auto pt-8 border-t border-primary/5">
                <cite className="not-italic flex flex-col gap-2">
                  <span className="block font-sans text-primary text-[10px] uppercase tracking-[0.2em] font-light">
                    {testimonial.author.split('·')[0].trim()}
                  </span>
                  <span className="block font-sans text-primary text-[10px] tracking-[0.15em] uppercase font-light opacity-50">
                    {testimonial.author.split('·')[1]?.trim() || 'Verified Patient'}
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
