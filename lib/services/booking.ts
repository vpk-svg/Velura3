/**
 * Booking / agenda service abstraction.
 * Provider-agnostic - designed for Cal.com integration.
 */

export interface TimeSlot {
  date: string;       // ISO date string
  startTime: string;  // HH:mm
  endTime: string;    // HH:mm
  available: boolean;
}

export interface BookingRequest {
  treatmentType: 'botox' | 'fillers' | 'shape' | 'weightloss' | 'consult';
  name: string;
  email: string;
  phone: string;
  date: string;
  startTime: string;
  notes?: string;
}

export interface BookingConfirmation {
  id: string;
  status: 'confirmed' | 'pending';
  date: string;
  time: string;
}

/**
 * Fetch available time slots for a given treatment and date range.
 * Replace with Cal.com API call.
 */
export async function getAvailability(
  treatmentType: BookingRequest['treatmentType'],
  fromDate: string,
  toDate: string,
): Promise<TimeSlot[]> {
  // TODO: integrate with Cal.com or other booking provider
  console.log('[BOOKING] Fetching availability:', treatmentType, fromDate, toDate);
  return [];
}

/**
 * Create a new booking.
 */
export async function createBooking(
  request: BookingRequest,
): Promise<BookingConfirmation> {
  console.log('[BOOKING] New booking:', request.treatmentType, request.email);
  return {
    id: `booking_${Date.now()}`,
    status: 'pending',
    date: request.date,
    time: request.startTime,
  };
}
