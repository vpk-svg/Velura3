'use client';

import { useEffect, useId, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Loader2, X } from 'lucide-react';
import { EASE_PREMIUM } from '@/lib/motion';
import { teamContactSchema, type TeamContactFormData } from '@/lib/schemas/team-contact';

const INPUT_CLASSES =
  'w-full rounded-xl border border-secondary/20 bg-white px-4 py-3 text-sm font-sans text-secondary outline-none input-glow shadow-input-rest transition-all duration-300 ease-premium placeholder:text-secondary/30 focus:border-primary focus:shadow-input-focus';

const LABEL_CLASSES = 'block font-sans text-xs uppercase tracking-[0.2em] text-primary font-semibold';

export default function TeamContactModal({
  doctorName,
  isOpen,
  onClose,
}: {
  doctorName: string | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('team');
  const formId = useId();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeamContactFormData>({
    resolver: zodResolver(teamContactSchema),
    defaultValues: {
      doctorName: doctorName ?? '',
      name: '',
      email: '',
      phone: '',
      website: '',
    },
  });

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    reset({
      doctorName: doctorName ?? '',
      name: '',
      email: '',
      phone: '',
      website: '',
    });
    setStatus('idle');
  }, [doctorName, reset]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const onSubmit = async (data: TeamContactFormData) => {
    setStatus('submitting');
    try {
      const response = await fetch('/api/team-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && doctorName ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10002] flex items-center justify-center bg-secondary/80 px-4 py-8 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: EASE_PREMIUM }}
            className="relative w-full max-w-xl rounded-[2rem] border border-primary/20 bg-white p-8 md:p-10 shadow-[0_32px_100px_rgba(0,0,0,0.3)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-secondary/10 bg-secondary/[0.03] text-secondary/40 hover:bg-secondary/10 hover:text-secondary transition-all duration-300"
              aria-label={t('form_close')}
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-primary font-semibold">
                {t('form_label')}
              </p>
              <h3 className="mt-3 font-display text-3xl italic text-secondary">
                {t('form_title', { name: doctorName })}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-secondary/70">
                {t('form_desc')}
              </p>
            </div>

            {status === 'success' ? (
              <div className="rounded-2xl border border-primary/15 bg-primary/5 px-6 py-8 text-center">
                <p className="font-display text-2xl italic text-secondary">{t('form_success_title')}</p>
                <p className="mt-3 font-sans text-sm text-secondary/70">{t('form_success_body')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor={`${formId}-website`}>Website</label>
                  <input id={`${formId}-website`} type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
                </div>
                <input type="hidden" {...register('doctorName')} value={doctorName} />

                <div className="flex flex-col gap-1.5">
                  <label htmlFor={`${formId}-name`} className={LABEL_CLASSES}>{t('form_name')}</label>
                  <input id={`${formId}-name`} type="text" autoComplete="name" className={INPUT_CLASSES} {...register('name')} />
                  {errors.name ? <p className="font-sans text-xs text-rose-dark">{t('form_error')}</p> : null}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={`${formId}-phone`} className={LABEL_CLASSES}>{t('form_phone')}</label>
                    <input id={`${formId}-phone`} type="tel" autoComplete="tel" className={INPUT_CLASSES} {...register('phone')} />
                    {errors.phone ? <p className="font-sans text-xs text-rose-dark">{t('form_error')}</p> : null}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={`${formId}-email`} className={LABEL_CLASSES}>{t('form_email')}</label>
                    <input id={`${formId}-email`} type="email" autoComplete="email" className={INPUT_CLASSES} {...register('email')} />
                    {errors.email ? <p className="font-sans text-xs text-rose-dark">{t('form_error')}</p> : null}
                  </div>
                </div>

                {status === 'error' ? <p className="font-sans text-sm text-rose-dark">{t('form_error_submit')}</p> : null}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-pill bg-primary px-8 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-white shadow-gold-glow transition-all duration-300 hover:shadow-soft-xl disabled:opacity-60"
                >
                  {status === 'submitting' ? <Loader2 size={16} className="animate-spin" /> : null}
                  {t('form_submit')}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
