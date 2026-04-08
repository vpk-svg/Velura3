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
    <section className="py-section-y bg-secondary text-background-light overflow-hidden" aria-label={t('label')}>
      <Container>
        <SectionHeader
          light
          label={t('label')}
          title={<>{t('title')} <span className="italic font-light text-primary">{t('subtitle')}</span></>}
        />

        {/* Navigation arrows */}
        <div className="flex items-center justify-end gap-3 mb-8">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary disabled:opacity-20 hover:bg-primary/10 transition-all duration-200"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary disabled:opacity-20 hover:bg-primary/10 transition-all duration-200"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Scrollable carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          <style>{`[data-testimonial-scroll]::-webkit-scrollbar { display: none; }`}</style>
          {testimonials.map((testimonial, idx) => (
            <motion.blockquote
              key={testimonial.author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: EASE_PREMIUM }}
              className="snap-start shrink-0 w-[320px] md:w-[360px] bg-white rounded-md p-8 shadow-soft-md relative group hover:-translate-y-3 transition-transform duration-300 ease-premium flex flex-col"
            >
              <div className="flex text-primary mb-8" role="img" aria-label={`${t('rating')}: 5/5`}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="font-display text-xl md:text-2xl text-secondary italic leading-snug mb-10">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="mt-auto border-t border-secondary/5 pt-8">
                <cite className="not-italic">
                  <span className="block font-sans text-secondary text-sm uppercase tracking-[0.2em] font-semibold">
                    {testimonial.author.split('·')[0].trim()}
                  </span>
                  <span className="block font-sans text-primary text-[10px] tracking-[0.3em] uppercase mt-1.5 font-semibold">
                    {testimonial.author.split('·')[1]?.trim() || 'Verified Patient'}
                  </span>
                </cite>
              </footer>
              <div className="absolute top-8 right-8 text-primary opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500" aria-hidden="true">
                <Heart size={64} fill="currentColor" />
              </div>
            </motion.blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
