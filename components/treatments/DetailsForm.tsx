'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
    resolver: zodResolver(detailsSchema),
    mode: 'onChange',
  });

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3.5 rounded-lg border-[1.5px] font-sans text-sm text-secondary outline-none transition-all duration-300 placeholder:text-secondary/30 ${
      hasError
        ? 'border-rose-dark/40 bg-rose-soft/30 focus:border-rose-dark/60'
        : 'border-secondary/[0.07] bg-surface-elevated focus:border-primary/30 shadow-input-rest focus:shadow-input-focus'
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-secondary/40 font-semibold mb-2">
        {t('form_title')}
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="firstName" className="block font-sans text-[10px] uppercase tracking-[0.15em] text-secondary/50 font-semibold mb-1.5">
            {t('form_first_name')}
          </label>
          <input
            id="firstName"
            {...register('firstName')}
            placeholder={t('form_first_name')}
            autoComplete="given-name"
            className={inputClass(!!errors.firstName)}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block font-sans text-[10px] uppercase tracking-[0.15em] text-secondary/50 font-semibold mb-1.5">
            {t('form_last_name')}
          </label>
          <input
            id="lastName"
            {...register('lastName')}
            placeholder={t('form_last_name')}
            autoComplete="family-name"
            className={inputClass(!!errors.lastName)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block font-sans text-[10px] uppercase tracking-[0.15em] text-secondary/50 font-semibold mb-1.5">
          {t('form_email')}
        </label>
        <input
          id="email"
          {...register('email')}
          type="email"
          placeholder={t('form_email')}
          autoComplete="email"
          className={inputClass(!!errors.email)}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block font-sans text-[10px] uppercase tracking-[0.15em] text-secondary/50 font-semibold mb-1.5">
          {t('form_phone')}
        </label>
        <input
          id="phone"
          {...register('phone')}
          type="tel"
          placeholder={t('form_phone')}
          autoComplete="tel"
          className={inputClass(!!errors.phone)}
        />
      </div>

      <div>
        <label htmlFor="birthDate" className="block font-sans text-[10px] uppercase tracking-[0.15em] text-secondary/50 font-semibold mb-1.5">
          {t('form_birth_date')}
        </label>
        <input
          id="birthDate"
          {...register('birthDate')}
          type="date"
          autoComplete="bday"
          className={inputClass(!!errors.birthDate)}
        />
      </div>

      <div>
        <label htmlFor="notes" className="block font-sans text-[10px] uppercase tracking-[0.15em] text-secondary/50 font-semibold mb-1.5">
          {t('form_notes')}
        </label>
        <textarea
          id="notes"
          {...register('notes')}
          placeholder={t('form_notes')}
          rows={3}
          className={`${inputClass(false)} resize-none`}
        />
      </div>

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
