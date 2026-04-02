'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { EASE_PREMIUM } from '@/lib/motion';

export interface Zone {
  id: string;
  nameKey: string;
  priceCents: number;
}

interface ZoneSelectorProps {
  zones: Zone[];
  selectedZones: string[];
  onToggle: (zoneId: string) => void;
  namespace: string;
}

/**
 * SVG face map for desktop + grid selector for all screens.
 * Reusable for both Botox and Fillers.
 */
export default function ZoneSelector({ zones, selectedZones, onToggle, namespace }: ZoneSelectorProps) {
  const t = useTranslations(namespace);

  return (
    <div className="space-y-6">
      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-secondary/40 font-semibold">
        {t('select_zones')}
      </p>

      {/* Grid Selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {zones.map((zone) => {
          const isSelected = selectedZones.includes(zone.id);
          return (
            <motion.button
              key={zone.id}
              type="button"
              onClick={() => onToggle(zone.id)}
              whileTap={{ scale: 0.97 }}
              animate={isSelected ? { scale: [1, 1.03, 1] } : {}}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`relative text-left px-4 py-4 rounded-lg border-[1.5px] transition-all duration-300 ease-premium group ${
                isSelected
                  ? 'border-primary/60 bg-gradient-to-br from-primary/[0.06] to-primary/[0.02] shadow-option-selected'
                  : 'border-secondary/[0.07] bg-white hover:border-secondary/15 shadow-input-rest'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`font-sans text-sm font-medium ${isSelected ? 'text-secondary' : 'text-secondary/70'}`}>
                  {t(zone.nameKey)}
                </span>
                <span className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isSelected
                    ? 'border-primary bg-primary'
                    : 'border-secondary/15 group-hover:border-secondary/25'
                }`}>
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 600, damping: 20 }}
                    >
                      <Check size={11} strokeWidth={3} className="text-white" />
                    </motion.span>
                  )}
                </span>
              </div>
              <p className="font-sans text-xs text-primary font-semibold">
                €{(zone.priceCents / 100).toFixed(0)}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
