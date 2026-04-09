'use client';

import { useMemo, useState } from 'react';
import { Clock3, Users } from 'lucide-react';
import { generateSaturdaySlots, type BookingSlot, type Locale } from '@/lib/clinic-data';

interface BookingSlotSelectorProps {
  locale: Locale;
  treatmentName: string;
  onSlotSelect?: (slotId: string | null) => void;
}

export default function BookingSlotSelector({ locale, treatmentName, onSlotSelect }: BookingSlotSelectorProps) {
  const slots = useMemo(() => generateSaturdaySlots(), []);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  const selectedSlot = useMemo<BookingSlot | undefined>(
    () => slots.find((slot) => slot.id === selectedSlotId),
    [selectedSlotId, slots],
  );

  const title = locale === 'nl' ? 'Kies uw zaterdag-slot' : 'Choose your Saturday slot';
  const helper =
    locale === 'nl'
      ? 'Beschikbaar op zaterdag van 10:00 tot 18:00, elke 10 minuten. Maximaal 2 boekingen per tijdslot.'
      : 'Available on Saturdays from 10:00 to 18:00, every 10 minutes. Maximum 2 bookings per slot.';

  return (
    <div className="rounded-md border border-primary/15 bg-background-light p-6">
      <h4 className="font-display text-2xl italic text-secondary mb-2">{title}</h4>
      <p className="font-sans text-sm text-secondary/70 mb-5">{helper}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-64 overflow-y-auto pr-1">
        {slots.map((slot) => {
          const isSelected = slot.id === selectedSlotId;
          return (
            <button
              key={slot.id}
              type="button"
              onClick={() => {
                if (slot.isAvailable) {
                  setSelectedSlotId(slot.id);
                  onSlotSelect?.(slot.id);
                }
              }}
              disabled={!slot.isAvailable}
              className={`rounded-2xl border px-3 py-3 text-left transition-all duration-200 ${
                slot.isAvailable
                  ? isSelected
                    ? 'border-primary bg-primary text-white shadow-gold-glow'
                    : 'border-primary/20 bg-white hover:border-primary/50'
                  : 'border-secondary/10 bg-secondary/5 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="font-sans text-xs uppercase tracking-[0.15em] mb-1">{slot.time}</div>
              <div className="font-sans text-xs flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                {slot.remaining}/{slot.capacity}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-primary/10 bg-white p-4">
        {selectedSlot ? (
          <div className="space-y-2">
            <p className="font-sans text-sm text-secondary/80 flex items-center gap-2">
              <Clock3 className="w-4 h-4 text-primary" />
              {locale === 'nl'
                ? `Geselecteerd: ${selectedSlot.date} om ${selectedSlot.time}`
                : `Selected: ${selectedSlot.date} at ${selectedSlot.time}`}
            </p>
            <p className="font-sans text-sm text-secondary/70">
              {locale === 'nl'
                ? `Voorlopige reservering voor ${treatmentName}. Koppel dit later aan backend checkout.`
                : `Draft reservation for ${treatmentName}. Connect this to backend checkout later.`}
            </p>
          </div>
        ) : (
          <p className="font-sans text-sm text-secondary/70">
            {locale === 'nl' ? 'Selecteer eerst een tijdslot om verder te gaan.' : 'Select a time slot to continue.'}
          </p>
        )}
      </div>
    </div>
  );
}
