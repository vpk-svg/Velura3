'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock3, Calendar, CheckCircle2 } from 'lucide-react';
import { generateAvailableDays, type AvailableDay, type BookingSlot, type Locale } from '@/lib/clinic-data';

interface BookingSlotSelectorProps {
  locale: Locale;
  treatmentName: string;
  onSlotSelect?: (slot: BookingSlot | null) => void;
}

const NL_FULL_MONTHS = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

export default function BookingSlotSelector({ locale, treatmentName, onSlotSelect }: BookingSlotSelectorProps) {
  const isNl = locale === 'nl';

  // All available days (8 weeks of fri+sat from 30 May 2026)
  const allDays = useMemo(() => generateAvailableDays(8), []);

  // Calendar state: which "page" of weeks to show (0 = first 2 weeks, etc.)
  const [weekOffset, setWeekOffset] = useState(0);

  // Which day is selected
  const [selectedDayIso, setSelectedDayIso] = useState<string | null>(null);

  // Which slot is selected
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  // Group days into pairs [Fri|Sat, Fri|Sat] per calendar row
  // First "pair" is just [Sat 30 May], then pairs of [Fri, Sat]
  // We show WEEKS_PER_PAGE weeks at a time
  const WEEKS_PER_PAGE = 4;

  // Build week pages — each page shows at most WEEKS_PER_PAGE pairs
  const weekPages = useMemo(() => {
    const pages: AvailableDay[][] = [];
    let chunk: AvailableDay[] = [];
    let weekCount = 0;
    let prevDayOfWeek: number | null = null;

    for (const day of allDays) {
      // Detect new "week" when dayOfWeek wraps (saturday follows friday, or standalone sat)
      const startsNewWeek = prevDayOfWeek === null || (prevDayOfWeek === 6 && day.dayOfWeek === 5) || (prevDayOfWeek === null && day.dayOfWeek === 6);
      if (startsNewWeek && weekCount > 0 && weekCount % WEEKS_PER_PAGE === 0 && chunk.length > 0) {
        pages.push(chunk);
        chunk = [];
      }
      if (startsNewWeek) weekCount++;
      chunk.push(day);
      prevDayOfWeek = day.dayOfWeek;
    }
    if (chunk.length > 0) pages.push(chunk);
    return pages;
  }, [allDays]);

  const currentPageDays = weekPages[weekOffset] ?? [];
  const selectedDay = allDays.find(d => d.dateIso === selectedDayIso) ?? null;
  const selectedSlot = selectedDay?.slots.find(s => s.id === selectedSlotId) ?? null;

  const handleDaySelect = (day: AvailableDay) => {
    setSelectedDayIso(day.dateIso);
    setSelectedSlotId(null);
    onSlotSelect?.(null);
  };

  const handleSlotSelect = (slot: BookingSlot) => {
    if (!slot.isAvailable) return;
    setSelectedSlotId(slot.id);
    onSlotSelect?.(slot);
  };

  // Format a nice full date label
  const formatFullDate = (day: AvailableDay) => {
    const d = new Date(day.dateIso + 'T00:00:00');
    const dayNum = d.getDate();
    const month = NL_FULL_MONTHS[d.getMonth()];
    const dayLabel = isNl ? day.dayName : day.dayNameEn;
    return `${dayLabel} ${dayNum} ${month}`;
  };

  return (
    <div className="space-y-6">
      {/* ── STEP 1: Day picker ─────────────────────────────── */}
      <div className="rounded-xl border border-primary/15 bg-background-light overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-primary/10 bg-white">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-sans font-semibold text-secondary text-sm tracking-wide">
              {isNl ? 'Kies een datum' : 'Choose a date'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setWeekOffset(o => Math.max(0, o - 1))}
              disabled={weekOffset === 0}
              className="w-7 h-7 flex items-center justify-center rounded-full border border-primary/20 hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-primary" />
            </button>
            <span className="text-[10px] font-sans tracking-widest text-secondary/50 uppercase px-1">
              {weekOffset + 1}/{weekPages.length}
            </span>
            <button
              type="button"
              onClick={() => setWeekOffset(o => Math.min(weekPages.length - 1, o + 1))}
              disabled={weekOffset >= weekPages.length - 1}
              className="w-7 h-7 flex items-center justify-center rounded-full border border-primary/20 hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-primary" />
            </button>
          </div>
        </div>

        {/* Day tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4">
          {currentPageDays.map(day => {
            const isSelected = day.dateIso === selectedDayIso;
            const d = new Date(day.dateIso + 'T00:00:00');
            const availableSlots = day.slots.filter(s => s.isAvailable).length;

            return (
              <button
                key={day.dateIso}
                type="button"
                onClick={() => handleDaySelect(day)}
                className={`group flex flex-col items-center justify-center py-4 px-2 rounded-xl border transition-all duration-200 ${isSelected
                    ? 'border-primary bg-primary text-white shadow-warm-glow'
                    : 'border-primary/15 bg-white hover:border-primary/40 hover:shadow-soft-sm'
                  }`}
              >
                {/* Day name badge */}
                <span className={`text-[9px] uppercase tracking-[0.25em] font-semibold mb-1 ${isSelected ? 'text-white/70' : 'text-primary'}`}>
                  {isNl ? day.dayName : day.dayNameEn}
                </span>
                {/* Day number */}
                <span className={`font-display text-2xl italic leading-none mb-1 ${isSelected ? 'text-white' : 'text-secondary'}`}>
                  {d.getDate()}
                </span>
                {/* Month */}
                <span className={`text-[10px] uppercase tracking-wider ${isSelected ? 'text-white/70' : 'text-secondary/50'}`}>
                  {NL_FULL_MONTHS[d.getMonth()].slice(0, 3)}
                </span>
                {/* Slots available */}
                <span className={`mt-2 text-[9px] tracking-wide ${isSelected ? 'text-white/60' : 'text-primary/60'}`}>
                  {availableSlots} {isNl ? 'plekken' : 'spots'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── STEP 2: Time slot picker ───────────────────────── */}
      {selectedDay && (
        <div className="rounded-xl border border-primary/15 bg-background-light overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-2 px-5 py-4 border-b border-primary/10 bg-white">
            <Clock3 className="w-4 h-4 text-primary" />
            <div>
              <span className="font-sans font-semibold text-secondary text-sm tracking-wide block">
                {isNl ? 'Kies een tijdslot' : 'Choose a time slot'}
              </span>
              <span className="font-sans text-[11px] text-secondary/50">
                {formatFullDate(selectedDay)} &nbsp;·&nbsp;
                {selectedDay.dayOfWeek === 5
                  ? (isNl ? '14:00 – 19:00' : '2:00 – 7:00 PM')
                  : (isNl ? '10:00 – 18:00' : '10:00 AM – 6:00 PM')
                }
              </span>
            </div>
          </div>

          <div className="p-4 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {selectedDay.slots.map(slot => {
              const isSelected = slot.id === selectedSlotId;
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => handleSlotSelect(slot)}
                  disabled={!slot.isAvailable}
                  className={`rounded-lg border px-2 py-2.5 text-center transition-all duration-200 ${!slot.isAvailable
                      ? 'border-secondary/10 bg-secondary/5 opacity-40 cursor-not-allowed'
                      : isSelected
                        ? 'border-primary bg-primary text-white shadow-warm-glow'
                        : 'border-primary/15 bg-white hover:border-primary/50 hover:shadow-soft-sm'
                    }`}
                >
                  <div className={`font-sans text-xs font-semibold tracking-wide ${isSelected ? 'text-white' : 'text-secondary'}`}>
                    {slot.time}
                  </div>
                  <div className={`font-sans text-[9px] mt-0.5 ${isSelected ? 'text-white/60' : slot.isAvailable ? 'text-primary/50' : 'text-secondary/30'}`}>
                    {slot.remaining}/{slot.capacity}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── STEP 3: Confirmation summary ──────────────────── */}
      {selectedSlot && selectedDay && (
        <div className="rounded-xl border border-primary/20 bg-white p-5 flex items-start gap-4">
          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="font-sans font-semibold text-secondary text-sm mb-1">
              {isNl ? 'Tijdslot geselecteerd' : 'Time slot selected'}
            </p>
            <p className="font-sans text-sm text-secondary/70">
              {formatFullDate(selectedDay)} {isNl ? 'om' : 'at'} <strong>{selectedSlot.time}</strong>
              {' '}·{' '}{treatmentName}
            </p>
            <p className="font-sans text-[11px] text-primary/70 mt-1">
              {isNl
                ? `Nog ${selectedSlot.remaining} van de ${selectedSlot.capacity} plekken beschikbaar`
                : `${selectedSlot.remaining} of ${selectedSlot.capacity} spots remaining`}
            </p>
          </div>
        </div>
      )}

      {/* Placeholder prompt */}
      {!selectedDayIso && (
        <p className="font-sans text-sm text-secondary/50 text-center py-2">
          {isNl ? '↑ Selecteer een datum om tijdsloten te zien' : '↑ Select a date above to see available times'}
        </p>
      )}
    </div>
  );
}
