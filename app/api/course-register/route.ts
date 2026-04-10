import { NextResponse } from 'next/server';
import { saveLead } from '@/lib/services/crm';

/* ── Simple in-memory rate limiter (per IP, 5 requests / 60 s) ─── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

/* ── Validation helpers ── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s\-().]{7,20}$/;
const BIG_RE = /^[0-9]{11}$/; // Dutch BIG numbers are 11 digits

interface RegistrationBody {
  name?: string;
  email?: string;
  phone?: string;
  big?: string;
  education?: string;
  dateId?: string;
  locale?: string;
  honeypot?: string;          // spam trap - must be empty
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
    }

    const body = (await req.json()) as RegistrationBody;

    // Honeypot check - bots fill hidden fields
    if (body.honeypot) {
      // Silently accept to not tip off bots
      return NextResponse.json({ ok: true });
    }

    // Field validation
    const errors: Record<string, string> = {};
    if (!body.name || body.name.trim().length < 2) errors.name = 'err_name';
    if (!body.email || !EMAIL_RE.test(body.email)) errors.email = 'err_email';
    if (!body.phone || !PHONE_RE.test(body.phone)) errors.phone = 'err_phone';
    if (!body.big || !BIG_RE.test(body.big.replace(/\s/g, ''))) errors.big = 'err_big';
    if (!body.education || body.education.trim().length < 2) errors.education = 'err_education';
    if (!body.dateId) errors.dateId = 'err_date';

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // ── CRM integration + log ──
    const nameParts = body.name!.trim().split(/\s+/);
    await saveLead({
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(' ') || '-',
      email: body.email!.trim(),
      phone: body.phone!.trim(),
      source: 'course',
      metadata: {
        big: body.big!.replace(/\s/g, ''),
        education: body.education!.trim(),
        dateId: body.dateId!,
        locale: body.locale || 'nl',
      },
    });

    console.log('[course-register]', {
      name: body.name,
      email: body.email,
      phone: body.phone,
      big: body.big?.replace(/\s/g, ''),
      education: body.education,
      dateId: body.dateId,
      locale: body.locale,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'err_server' }, { status: 500 });
  }
}
