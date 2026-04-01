import type { CourseDate, Locale } from '@/lib/clinic-data';

interface CourseDateCardProps {
  locale: Locale;
  item: CourseDate;
}

const statusMap: Record<Locale, Record<CourseDate['status'], string>> = {
  nl: {
    open: 'Beschikbaar',
    limited: 'Beperkt',
    almost_full: 'Bijna vol',
  },
  en: {
    open: 'Available',
    limited: 'Limited',
    almost_full: 'Almost full',
  },
};

export default function CourseDateCard({ locale, item }: CourseDateCardProps) {
  return (
    <article className="rounded-md border border-primary/15 bg-white p-6">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h3 className="font-display text-2xl italic text-secondary">{item.title}</h3>
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-pill">
          {statusMap[locale][item.status]}
        </span>
      </div>
      <p className="font-sans text-sm text-secondary/70 mb-4">{item.dateLabel}</p>

      <div className="h-2 w-full rounded-full bg-secondary/10 overflow-hidden">
        <div className="h-full bg-primary" style={{ width: `${item.percentFilled}%` }} />
      </div>
      <p className="font-sans text-xs text-secondary/60 mt-2 uppercase tracking-[0.15em]">{item.percentFilled}%</p>
    </article>
  );
}
