'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Container from './ui/Container';
import SectionHeader from './ui/SectionHeader';
import { EASE_PREMIUM } from '@/lib/motion';

interface BeforeAfterItem {
  id: string;
  labelNl: string;
  labelEn: string;
  beforeImage?: string;
  afterImage?: string;
  beforeObjectPosition?: string;
  afterObjectPosition?: string;
}

/* Before/after pairs – combined side-by-side images: left = before, right = after */
const BA_ITEMS = [
  {
    id: 'botox-forehead',
    labelNl: 'Botox Voorhoofd',
    labelEn: 'Botox Forehead',
    beforeImage: '/images/beforeafterloveable/vrouw-voorhoofdslijnen-.jpg',
    afterImage: '/images/beforeafterloveable/vrouw-zonder-voorhoofdslijnen.jpg',
    beforeObjectPosition: 'center',
    afterObjectPosition: 'center',
  },
  {
    id: 'lip-fillers',
    labelNl: 'Lipfillers',
    labelEn: 'Lip Fillers',
    beforeImage: '/images/beforeafterloveable/jonge-vrouw-lipfiller before.jpg',
    afterImage: '/images/beforeafterloveable/jonge-vrouw-lipfiller.jpg',
    beforeObjectPosition: 'center',
    afterObjectPosition: 'center',
  },
  {
    id: 'jawline-fillers',
    labelNl: 'Kaaklijn Fillers',
    labelEn: 'Jawline Fillers',
    beforeImage: '/images/beforeafterloveable/andere-vrouw-30-kaaklijn-before.jpg',
    afterImage: '/images/beforeafterloveable/andere-vrouw-30-kaaklijn-filler.jpg',
    beforeObjectPosition: 'center',
    afterObjectPosition: 'center',
  },
  {
    id: 'cheek-fillers',
    labelNl: 'Wangen Fillers',
    labelEn: 'Cheek Fillers',
    beforeImage: '/images/beforeafterloveable/nieuwe-vrouw-wangfiller-after.jpg',
    afterImage: '/images/beforeafterloveable/nieuwe-vrouw-wangfiller-before.jpg',
    beforeObjectPosition: 'center',
    afterObjectPosition: 'center',
  },
] as const satisfies readonly BeforeAfterItem[];

function SliderCard({ item, locale }: { item: BeforeAfterItem; locale: string }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  }, [handleMove]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  }, [handleMove]);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const label = locale === 'nl' ? item.labelNl : item.labelEn;
  const hasRealImages = Boolean(item.beforeImage && item.afterImage);

  return (
    <div className="snap-start shrink-0 w-[300px] md:w-[360px]">
      <div
        ref={containerRef}
        className="relative aspect-[4/5] rounded-xl overflow-hidden cursor-col-resize select-none border border-primary/10"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        role="slider"
        aria-label={`Before/After ${label}`}
        aria-valuenow={Math.round(sliderPos)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* "After" side (full background) */}
        <div className="absolute inset-0">
          {hasRealImages ? (
            <Image
              src={item.afterImage!}
              alt={`${label} after resultaat`}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 300px, 360px"
              className="object-cover"
              style={{ objectPosition: item.afterObjectPosition ?? 'center' }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-secondary/30 flex items-center justify-center">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-primary/60 font-bold">After</span>
            </div>
          )}

          {hasRealImages && (
            <div className="absolute bottom-4 right-4 px-4 py-1.5 rounded-pill bg-primary/90 text-white font-sans text-xs uppercase tracking-[0.16em] font-bold shadow-soft-md">
              After
            </div>
          )}
        </div>

        {/* "Before" side (clipped) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          {hasRealImages ? (
            <Image
              src={item.beforeImage!}
              alt={`${label} before resultaat`}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 300px, 360px"
              className="object-cover"
              style={{ objectPosition: item.beforeObjectPosition ?? 'center' }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 via-secondary/20 to-secondary/60 flex items-center justify-center">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-white/60 font-bold">Before</span>
            </div>
          )}

          {hasRealImages && (
            <div className="absolute bottom-4 left-4 px-4 py-1.5 rounded-pill bg-secondary/80 text-white font-sans text-xs uppercase tracking-[0.16em] font-bold shadow-soft-md">
              Before
            </div>
          )}
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-primary shadow-gold-glow pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary border-2 border-white shadow-lg flex items-center justify-center">
            <ChevronLeft size={10} className="text-white -mr-0.5" />
            <ChevronRight size={10} className="text-white -ml-0.5" />
          </div>
        </div>
      </div>
      <p className="mt-3 font-sans text-sm text-center text-primary/70 font-light">{label}</p>
    </div>
  );
}

export default function BeforeAfterGallery() {
  const locale = useLocale();
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
    <section className="py-section-y bg-background-light overflow-hidden" aria-label="Before &amp; After">
      <Container>
        <SectionHeader
          label={locale === 'nl' ? 'RESULTATEN' : 'RESULTS'}
          title={
            <>
              Before &amp;{' '}
              After
            </>
          }
        />

        {/* Nav arrows */}
        <div className="flex items-center justify-end gap-3 mb-8">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary disabled:opacity-20 hover:border-primary hover:text-primary transition-all duration-200"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary disabled:opacity-20 hover:border-primary hover:text-primary transition-all duration-200"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Slider gallery */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {BA_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: EASE_PREMIUM }}
            >
              <SliderCard item={item} locale={locale} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
