/**
 * Treatment-specific availability configuration.
 * Defines which days each treatment type is available.
 */

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface TreatmentAvailability {
  treatmentType: string;
  availableDays: DayOfWeek[];
  timeSlots: { start: string; end: string }[];
  notes?: string;
}

export const TREATMENT_AVAILABILITY: TreatmentAvailability[] = [
  {
    treatmentType: 'botox',
    availableDays: ['friday', 'saturday'],
    timeSlots: [
      { start: '09:00', end: '12:00' },
      { start: '13:00', end: '17:00' },
    ],
    notes: 'Behandelingen door arts, alleen op afspraak',
  },
  {
    treatmentType: 'fillers',
    availableDays: ['friday', 'saturday'],
    timeSlots: [
      { start: '09:00', end: '12:00' },
      { start: '13:00', end: '17:00' },
    ],
    notes: 'Behandelingen door arts, alleen op afspraak',
  },
  {
    treatmentType: 'shape',
    availableDays: ['saturday'],
    timeSlots: [
      { start: '09:00', end: '16:00' },
    ],
    notes: 'Butt Contour en ooglidcorrectie, alleen op zaterdag',
  },
  {
    treatmentType: 'consult',
    availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    timeSlots: [
      { start: '09:00', end: '17:00' },
    ],
  },
];

/**
 * Get availability config for a specific treatment type.
 */
export function getAvailabilityFor(treatmentType: string): TreatmentAvailability | undefined {
  return TREATMENT_AVAILABILITY.find((t) => t.treatmentType === treatmentType);
}
