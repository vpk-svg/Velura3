/**
 * Email service abstraction.
 * Uses Resend (already in dependencies) but wraps it for testability.
 */

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Send a transactional email.
 * In production, connects to Resend. Falls back to console log in dev.
 */
export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean }> {
  if (!process.env.RESEND_API_KEY) {
    console.log('[EMAIL] (dev) Would send to:', payload.to, '—', payload.subject);
    return { success: true };
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'FAB Clinic <noreply@fabclinic.be>',
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      replyTo: payload.replyTo,
    });
    return { success: true };
  } catch (error) {
    console.error('[EMAIL] Send failed:', error);
    return { success: false };
  }
}
