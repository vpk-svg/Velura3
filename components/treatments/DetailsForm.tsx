'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const detailsSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  birthDate: z.string().min(1).refine(
    (v) => { const d = new Date(v); return !isNaN(d.getTime()) && d < new Date(); },
    { message: 'Invalid date of birth' }
  ),
  notes: z.string().optional(),
});

export type DetailsFormData = z.infer<typeof detailsSchema>;

interface DetailsFormProps {
  onSubmit: (data: DetailsFormData) => void;
  isLoading?: boolean;
  namespace: string;
}

export default function DetailsForm({ onSubmit, isLoading, namespace }: DetailsFormProps) {
  const t = useTranslations(namespace);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DetailsFormData>({
    mode: 'onBlur',
  });

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3.5 rounded-lg border-[1.5px] font-sans text-sm text-secondary outline-none transition-all duration-300 placeholder:text-secondary/20 ${
      hasError
        ? 'border-rose-dark/40 bg-rose-soft/30 focus:border-rose-dark/60'
        : 'border-secondary/[0.07] bg-surface-elevated focus:border-primary/30 shadow-input-rest focus:shadow-input-focus'
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-secondary/40 font-semibold mb-2">
        {t('form_title')}
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <input
            {...register('firstName', { required: true })}
            placeholder={t('form_first_name')}
            className={inputClass(!!errors.firstName)}
          />
        </div>
        <div>
          <input
            {...register('lastName', { required: true })}
            placeholder={t('form_last_name')}
            className={inputClass(!!errors.lastName)}
          />
        </div>
      </div>

      <input
        {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
        type="email"
        placeholder={t('form_email')}
        className={inputClass(!!errors.email)}
      />

      <input
        {...register('phone', { required: true, minLength: 6 })}
        type="tel"
        placeholder={t('form_phone')}
        className={inputClass(!!errors.phone)}
      />

      <input
        {...register('birthDate', { required: true })}
        type="date"
        placeholder={t('form_birth_date')}
        className={inputClass(!!errors.birthDate)}
      />

      <textarea
        {...register('notes')}
        placeholder={t('form_notes')}
        rows={3}
        className={`${inputClass(false)} resize-none`}
      />

      <button
        type="submit"
        disabled={!isValid || isLoading}
        className="w-full inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-10 py-4 text-[11px] tracking-[0.25em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.97]"
      >
        {isLoading ? t('form_submitting') : t('form_submit')}
      </button>
    </form>
  );
}
