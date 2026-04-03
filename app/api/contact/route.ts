import { NextResponse } from 'next/server';
import { intakeSchema } from '@/lib/schemas/contact';
import { sendEmail } from '@/lib/services/email';
import { saveLead } from '@/lib/services/crm';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    /* ── Honeypot check ──────────────────────────── */
    if (body.website) {
      // Bot filled the hidden field — silently accept to avoid signalling detection
      return NextResponse.json({ success: true });
    }

    /* ── Server-side validation ──────────────────── */
    const result = intakeSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json({ success: false, errors }, { status: 422 });
    }

    const { treatment, name, email, dob, phone, description } = result.data;

    /* ── Persist lead to CRM ─────────────────────── */
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    await saveLead({
      firstName,
      lastName,
      email,
      phone,
      source: 'contact',
      metadata: { treatment, dob, description: description || '' },
    });

    /* ── Send notification email to clinic ────────── */
    const clinicEmail = process.env.CLINIC_EMAIL || 'shots@fabclinic.eu';
    await sendEmail({
      to: clinicEmail,
      subject: `Nieuwe intake: ${name} — ${treatment}`,
      replyTo: email,
      html: `
        <h2>Nieuwe intake aanvraag</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;">
          <tr><td style="padding:6px 12px;font-weight:bold;">Behandeling</td><td style="padding:6px 12px;">${escapeHtml(treatment)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Naam</td><td style="padding:6px 12px;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">E-mail</td><td style="padding:6px 12px;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Geboortedatum</td><td style="padding:6px 12px;">${escapeHtml(dob)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Telefoon</td><td style="padding:6px 12px;">${escapeHtml(phone)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Omschrijving</td><td style="padding:6px 12px;">${escapeHtml(description || '—')}</td></tr>
        </table>
      `,
    });

    /* ── Send confirmation email to user ─────────── */
    await sendEmail({
      to: email,
      subject: 'Uw intake is ontvangen — FAB Clinic',
      html: `
        <div style="font-family:sans-serif;max-width:480px;">
          <h2 style="color:#3B2A23;">Bedankt, ${escapeHtml(firstName)}!</h2>
          <p>Wij hebben uw intake voor <strong>${escapeHtml(treatment)}</strong> in goede orde ontvangen.</p>
          <p>Ons team neemt binnen <strong>24 uur</strong> contact met u op om een afspraak in te plannen.</p>
          <hr style="border:none;border-top:1px solid #e5e5e5;margin:24px 0;" />
          <p style="font-size:12px;color:#888;">FAB Clinic — Nieuwe Stationsstraat 20, 6711 AG Ede</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[CONTACT API] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}

/** Prevent XSS in email HTML */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
