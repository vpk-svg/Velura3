import { NextResponse } from 'next/server';
import { teamContactSchema } from '@/lib/schemas/team-contact';
import { sendEmail } from '@/lib/services/email';
import { saveLead } from '@/lib/services/crm';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const result = teamContactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 422 },
      );
    }

    const { doctorName, name, email, phone } = result.data;
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    await saveLead({
      firstName,
      lastName,
      email,
      phone,
      source: 'contact',
      metadata: {
        type: 'team-contact',
        doctorName,
      },
    });

    await sendEmail({
      to: process.env.TEAM_CONTACT_EMAIL || 'fabclinic.eu@gmail.com',
      subject: `Team contact aanvraag: ${doctorName}`,
      replyTo: email,
      html: `
        <h2>Nieuwe team contact aanvraag</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;">
          <tr><td style="padding:6px 12px;font-weight:bold;">Arts / teamlid</td><td style="padding:6px 12px;">${escapeHtml(doctorName)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Naam</td><td style="padding:6px 12px;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">E-mail</td><td style="padding:6px 12px;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Telefoon</td><td style="padding:6px 12px;">${escapeHtml(phone)}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[TEAM CONTACT API] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
