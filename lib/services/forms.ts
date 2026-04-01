/**
 * Generic form submission handler.
 * Centralises validation + CRM integration for all site forms.
 */

import { saveLead, type Lead } from '@/lib/services/crm';

export interface FormSubmission {
  formId: string;
  data: Record<string, string>;
  source: Lead['source'];
}

export interface FormResult {
  success: boolean;
  message?: string;
}

/**
 * Process a form submission: validate, save lead, return result.
 */
export async function submitForm(submission: FormSubmission): Promise<FormResult> {
  const { data, source } = submission;

  // Basic required field check
  if (!data.email || !data.firstName) {
    return { success: false, message: 'Missing required fields' };
  }

  try {
    await saveLead({
      firstName: data.firstName,
      lastName: data.lastName || '',
      email: data.email,
      phone: data.phone || '',
      source,
      metadata: { formId: submission.formId },
    });

    return { success: true };
  } catch (error) {
    console.error('[FORMS] Submission error:', error);
    return { success: false, message: 'Submission failed' };
  }
}
