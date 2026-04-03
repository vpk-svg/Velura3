import { z } from 'zod';

/** Shared Zod schema for intake form – used client-side (RHF) AND server-side (API route). */
export const intakeSchema = z.object({
  treatment: z.enum(['fillers', 'botox', 'bbl', 'anders'], {
    message: 'intake.errors.treatment',
  }),
  name: z
    .string()
    .min(2, 'intake.errors.name_min')
    .max(100, 'intake.errors.name_max'),
  email: z
    .string()
    .email('intake.errors.email'),
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'intake.errors.dob_format')
    .refine((v) => {
      const d = new Date(v);
      const now = new Date();
      const age = now.getFullYear() - d.getFullYear();
      return d <= now && age >= 18;
    }, 'intake.errors.dob_age'),
  phone: z
    .string()
    .min(7, 'intake.errors.phone_min')
    .max(20, 'intake.errors.phone_max')
    .regex(/^[\d\s+\-().]+$/, 'intake.errors.phone_format'),
  description: z
    .string()
    .max(2000, 'intake.errors.description_max'),
  consent: z.literal(true, 'intake.errors.consent'),
  /** Honeypot – must stay empty. Not validated via Zod on client. */
  website: z.string().max(0).optional(),
});

export type IntakeFormData = z.infer<typeof intakeSchema>;
