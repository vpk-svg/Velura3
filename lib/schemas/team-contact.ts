import { z } from 'zod';

export const teamContactSchema = z.object({
  doctorName: z.string().min(2).max(100),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z
    .string()
    .min(7)
    .max(20)
    .regex(/^[\d\s+\-().]+$/),
  website: z.string().max(0).optional(),
});

export type TeamContactFormData = z.infer<typeof teamContactSchema>;
