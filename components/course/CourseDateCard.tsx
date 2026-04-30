'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { CalendarDays } from 'lucide-react';
import type { CourseDate, Locale } from '@/lib/clinic-data';
import { EASE_PREMIUM } from '@/lib/motion';

interface CourseDateCardProps {
  locale: Locale;
  item: CourseDate;
  selected?: boolean;
  onSelect?: (id: string) => void;
  index?: number;
  t: (key: string) => string;
}

const statusColorMap: Record<CourseDate['status'], string> = {
  open: 'text-emerald-700 bg-emerald-50',
  limited: 'text-amber-700 bg-amber-50',
  almost_full: 'text-rose-700 bg-rose-50',
};

export default function CourseDateCard({ locale, item, selected, onSelect, index = 0, t }: CourseDateCardProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const statusKey = `status_${item.status}` as const;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: EASE_PREMIUM }}
      role="option"
      aria-selected={selected}
      tabIndex={0}
      onClick={() => onSelect?.(item.id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect?.(item.id); } }}
      className={`rounded-2xl border-2 bg-white flex flex-col items-center justify-center text-center p-6 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-lg focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none ${selected ? 'border-primary shadow-gold-glow' : 'border-primary/10 shadow-soft-sm'
        }`}
    >
      <div className="flex flex-col items-center gap-3 mb-3">
        <span
          className={`text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1.5 rounded-pill whitespace-nowrap ${statusColorMap[item.status]}`}
          aria-label={t(statusKey)}
        >
          {t(statusKey)}
        </span>
      </div>

      <div className="flex items-center justify-center gap-2 mb-4">
        <CalendarDays size={18} className="text-secondary/60" />
        <p className="font-sans text-base font-medium text-secondary">{item.dateLabel}</p>
      </div>

      <div
        className="h-2 w-full max-w-[200px] mx-auto rounded-full bg-secondary/10 overflow-hidden"
        role="progressbar"
        aria-valuenow={item.percentFilled}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${item.percentFilled}% ${t('filled_label')}`}
      >
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${item.percentFilled}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: EASE_PREMIUM }}
        />
      </div>
      <p className="font-sans text-xs text-secondary/60 mt-2 tracking-wide font-medium">
        {item.percentFilled}% {t('filled_label')}
      </p>
    </motion.article>
  );
}
