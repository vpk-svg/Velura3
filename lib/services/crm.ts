/**
 * CRM service abstraction.
 * Provider-agnostic - swap implementation when connecting to actual CRM.
 */

export interface Lead {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  source: 'survey' | 'botox' | 'fillers' | 'shape' | 'contact' | 'newsletter';
  metadata?: Record<string, string | number | boolean>;
}

/**
 * Save a new lead. Currently logs to console - replace with CRM API call.
 */
export async function saveLead(lead: Lead): Promise<{ success: boolean }> {
  // TODO: integrate with actual CRM (e.g. HubSpot, Pipedrive)
  console.log('[CRM] New lead:', lead.email, lead.source);
  return { success: true };
}

/**
 * Sync lead data to CRM after purchase/booking.
 */
export async function syncLeadEvent(
  email: string,
  event: 'purchase' | 'booking' | 'survey_complete',
  data?: Record<string, unknown>,
): Promise<void> {
  console.log('[CRM] Event:', event, email, data);
}
