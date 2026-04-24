'use client';

import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import {
  Instagram,
  Facebook,
  Mail,
  MapPin,
  Clock,
  Lock,
  CheckCircle2,
  Loader2,
  ClipboardList,
  PhoneCall,
  CalendarCheck,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import NewsletterSection from '@/components/NewsletterSection';
import { intakeSchema, type IntakeFormData } from '@/lib/schemas/contact';
import {
  getClinicContactInfo,
  getIntakeTreatmentOptions,
  type Locale,
} from '@/lib/clinic-data';

/* ── Constants ────────────────────────────────────────────────── */

const TEAM_MEMBERS = [
  { nameKey: 'member2_name', roleKey: 'member2_role', bigKey: 'member2_big', img: '/images/Newteam/Ava.jpg' },
  { nameKey: 'member3_name', roleKey: 'member3_role', bigKey: 'member3_big', img: '/images/Newteam/Elissa.jpg' },
  { nameKey: 'member4_name', roleKey: 'member4_role', bigKey: 'member4_big', img: '/images/Newteam/Mevlut.jpg' },
] as const;

const INPUT_CLASSES =
  'w-full rounded-xl border border-secondary/20 bg-white px-4 py-3 text-sm font-sans text-secondary outline-none input-glow shadow-input-rest transition-all duration-300 ease-premium placeholder:text-secondary/30 focus:border-primary focus:shadow-input-focus';

const LABEL_CLASSES = 'block font-sans text-xs uppercase tracking-[0.2em] text-primary font-semibold';

/* ── Inline error display ─────────────────────────────────────── */

function FieldError({ message, id }: { message?: string; id: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="font-sans text-xs text-rose-dark mt-1 animate-fade-in-up">
      {message}
    </p>
  );
}

/* ── Page Component ───────────────────────────────────────────── */

export default function ContactPage() {
  const locale = useLocale() as Locale;
  const contact = getClinicContactInfo(locale);
  const treatmentOptions = getIntakeTreatmentOptions(locale);
  const t = useTranslations('intake');
  const tTeam = useTranslations('team');
  const formId = useId();

  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      treatment: '' as IntakeFormData['treatment'],
      name: '',
      email: '',
      dob: '',
      phone: '',
      description: '',
      consent: false as unknown as true,
      website: '',
    },
  });

  const onSubmit = async (data: Record<string, unknown>) => {
    setFormState('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Server error');
      setFormState('success');
      reset();
    } catch {
      setFormState('error');
    }
  };

  /* Date constraints: min 1920-01-01, max 18 years ago */
  const maxDob = new Date();
  maxDob.setFullYear(maxDob.getFullYear() - 18);
  const maxDobStr = maxDob.toISOString().split('T')[0];

  /* Error-id helper */
  const errId = (field: string) => `${formId}-err-${field}`;

  return (
    <>
      <div className="pt-32" />

      {/* ═══════ TOP: Intake Form + Team side-by-side ═══════ */}
      <section className="py-section-y bg-page-contact">
        <Container>
          <SectionHeader
            label={t('page_label')}
            title={t('page_title')}
            subtitle={t('page_subtitle')}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ── Intake Form ───────────────────────────────── */}
            {formState === 'success' ? (
              <div className="rounded-xl border border-primary/15 bg-white p-10 shadow-soft-sm flex flex-col items-center justify-center text-center gap-5">
                <CheckCircle2 size={48} className="text-primary" aria-hidden="true" />
                <h3 className="font-display text-3xl italic text-secondary">{t('success_title')}</h3>
                <p className="font-sans text-secondary/70 text-base max-w-sm">{t('success_body')}</p>
                <Button
                  onClick={() => setFormState('idle')}
                  variant="ghost"
                  size="sm"
                >
                  {t('success_cta')}
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="rounded-xl border border-primary/15 bg-white p-8 lg:p-10 shadow-soft-sm space-y-5"
              >
                <h3 className="font-display text-3xl italic text-secondary mb-1">
                  {t('form_title')}
                </h3>

                {/* Honeypot - visually hidden, skipped by tab */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor={`${formId}-website`}>Website</label>
                  <input
                    id={`${formId}-website`}
                    type="text"
                    autoComplete="off"
                    tabIndex={-1}
                    {...register('website')}
                  />
                </div>

                {/* Treatment */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor={`${formId}-treatment`} className={LABEL_CLASSES}>
                    {t('field_treatment')} <span aria-hidden="true">*</span>
                  </label>
                  <select
                    id={`${formId}-treatment`}
                    aria-required="true"
                    aria-invalid={!!errors.treatment}
                    aria-describedby={errors.treatment ? errId('treatment') : undefined}
                    className={INPUT_CLASSES}
                    defaultValue=""
                    {...register('treatment')}
                  >
                    <option value="" disabled>
                      {t('field_treatment_placeholder')}
                    </option>
                    {treatmentOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <FieldError message={errors.treatment ? t('errors.treatment') : undefined} id={errId('treatment')} />
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor={`${formId}-name`} className={LABEL_CLASSES}>
                    {t('field_name')} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`${formId}-name`}
                    type="text"
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? errId('name') : undefined}
                    placeholder={t('field_name')}
                    className={INPUT_CLASSES}
                    {...register('name')}
                  />
                  <FieldError message={errors.name?.message ? t(`errors.${errors.name.message.split('.').pop()}` as Parameters<typeof t>[0]) : undefined} id={errId('name')} />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor={`${formId}-email`} className={LABEL_CLASSES}>
                    {t('field_email')} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`${formId}-email`}
                    type="email"
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? errId('email') : undefined}
                    placeholder={t('field_email')}
                    className={INPUT_CLASSES}
                    {...register('email')}
                  />
                  <FieldError message={errors.email ? t('errors.email') : undefined} id={errId('email')} />
                </div>

                {/* Date of birth */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor={`${formId}-dob`} className={LABEL_CLASSES}>
                    {t('field_dob')} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`${formId}-dob`}
                    type="date"
                    min="1920-01-01"
                    max={maxDobStr}
                    autoComplete="bday"
                    aria-required="true"
                    aria-invalid={!!errors.dob}
                    aria-describedby={errors.dob ? errId('dob') : undefined}
                    className={INPUT_CLASSES}
                    {...register('dob')}
                  />
                  <FieldError message={errors.dob?.message ? t(`errors.${errors.dob.message.split('.').pop()}` as Parameters<typeof t>[0]) : undefined} id={errId('dob')} />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor={`${formId}-phone`} className={LABEL_CLASSES}>
                    {t('field_phone')} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`${formId}-phone`}
                    type="tel"
                    autoComplete="tel"
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? errId('phone') : undefined}
                    placeholder={t('field_phone')}
                    className={INPUT_CLASSES}
                    {...register('phone')}
                  />
                  <FieldError message={errors.phone?.message ? t(`errors.${errors.phone.message.split('.').pop()}` as Parameters<typeof t>[0]) : undefined} id={errId('phone')} />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor={`${formId}-description`} className={LABEL_CLASSES}>
                    {t('field_description')}
                  </label>
                  <textarea
                    id={`${formId}-description`}
                    rows={4}
                    aria-describedby={errors.description ? errId('description') : undefined}
                    placeholder={t('field_description_placeholder')}
                    className={`${INPUT_CLASSES} min-h-[7rem] resize-y`}
                    {...register('description')}
                  />
                  <FieldError message={errors.description ? t('errors.description_max') : undefined} id={errId('description')} />
                </div>

                {/* GDPR Consent */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    id={`${formId}-consent`}
                    type="checkbox"
                    aria-required="true"
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? errId('consent') : undefined}
                    className="mt-1 h-4 w-4 rounded border-secondary/20 text-primary focus:ring-primary accent-primary"
                    {...register('consent')}
                  />
                  <label htmlFor={`${formId}-consent`} className="font-sans text-xs text-secondary/70 leading-relaxed">
                    {t.rich('consent_label', {
                      a: (children) => (
                        <Link href={`/${locale}/terms`} className="underline hover:text-primary transition-colors" target="_blank">
                          {children}
                        </Link>
                      ),
                    })}
                  </label>
                </div>
                {errors.consent && (
                  <FieldError message={t('errors.consent')} id={errId('consent')} />
                )}

                {/* Generic server error */}
                {formState === 'error' && (
                  <div role="alert" className="rounded-lg border border-rose-dark/20 bg-rose-soft p-3 font-sans text-sm text-rose-dark">
                    {t('error_generic')}
                  </div>
                )}

                {/* Submit */}
                <div className="flex flex-col gap-3 pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={formState === 'submitting'}
                    magnetic
                  >
                    {formState === 'submitting' ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                        {t('submitting')}
                      </span>
                    ) : (
                      t('submit')
                    )}
                  </Button>

                  {/* Trust micro-copy */}
                  <p className="flex items-center gap-1.5 font-sans text-[11px] text-secondary/50">
                    <Lock size={12} aria-hidden="true" />
                    {t('trust_line')}
                  </p>
                </div>
              </form>
            )}

            {/* ── Team column ───────────────────────────────── */}
            <div className="rounded-xl border border-primary/15 bg-white p-8 lg:p-10 shadow-soft-sm flex flex-col">
              <h3 className="font-display text-3xl italic text-secondary mb-5">
                {t('team_title')}
              </h3>
              <div className="space-y-4 flex-1">
                {TEAM_MEMBERS.map((member) => {
                  const name = tTeam(member.nameKey as Parameters<typeof tTeam>[0]);
                  const role = tTeam(member.roleKey as Parameters<typeof tTeam>[0]);
                  const big = tTeam(member.bigKey as Parameters<typeof tTeam>[0]);
                  return (
                    <article key={member.nameKey} className="rounded-xl border border-primary/10 p-4 flex items-center gap-4 transition-all duration-300 hover:shadow-soft-sm">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={member.img}
                          alt={name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div>
                        <h4 className="font-display text-lg italic text-secondary leading-snug">{name}</h4>
                        <p className="font-sans text-sm text-secondary/70">{role}</p>
                        {big && <p className="font-sans text-xs text-primary/70 mt-0.5">{big}</p>}
                      </div>
                    </article>
                  );
                })}
              </div>
              <Link
                href={`/${locale}/team`}
                className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-primary hover:text-primary-dark transition-colors mt-6 font-semibold"
              >
                {t('team_cta')} →
              </Link>

              {/* ── What happens next? ────────────────────────── */}
              <div className="mt-8 pt-8 border-t border-primary/10">
                <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-5">
                  {t('steps_title')}
                </h4>
                <ol className="space-y-4">
                  {[
                    { icon: <ClipboardList size={18} />, title: t('step1_title'), desc: t('step1_desc') },
                    { icon: <PhoneCall size={18} />, title: t('step2_title'), desc: t('step2_desc') },
                    { icon: <CalendarCheck size={18} />, title: t('step3_title'), desc: t('step3_desc') },
                  ].map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary shrink-0" aria-hidden="true">
                        {step.icon}
                      </span>
                      <div>
                        <p className="font-sans text-sm font-semibold text-secondary">{step.title}</p>
                        <p className="font-sans text-xs text-secondary/60">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════ BOTTOM: FabClinic EDE – Clinic Info + Map ═══════ */}
      <section className="py-section-y bg-white">
        <Container>
          <SectionHeader
            label="FABCLINIC EDE"
            title={t('clinic_title')}
            subtitle={t('clinic_subtitle')}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-xl border border-primary/15 bg-background-light p-8 lg:p-10 shadow-soft-sm">
              <h2 className="font-display text-3xl italic text-secondary mb-6">{contact.clinicName}</h2>
              <dl className="space-y-5 font-sans text-secondary/75">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-primary mb-1">{t('clinic_address_label')}</dt>
                    <dd>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(contact.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        {contact.address}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-primary mb-1">{t('clinic_email_label')}</dt>
                    <dd>
                      <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors">
                        {contact.email}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-primary mb-1">{t('clinic_hours_label')}</dt>
                    <dd>{contact.openingHours}</dd>
                  </div>
                </div>
              </dl>

              {/* Social media icons */}
              <div className="flex gap-3 mt-6">
                <a href="https://www.instagram.com/fabclinic.nl" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-secondary/50 hover:text-primary hover:border-primary transition-all duration-300">
                  <Instagram size={18} />
                </a>
                <a href="https://www.facebook.com/fabclinic" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-secondary/50 hover:text-primary hover:border-primary transition-all duration-300">
                  <Facebook size={18} />
                </a>
              </div>

              <div className="mt-6 rounded-xl border border-primary/30 bg-champagne/30 p-5">
                <p className="font-display italic text-2xl text-secondary mb-2">
                  {t('clinic_trust_heading')}
                </p>
                <p className="font-sans text-secondary/70 text-sm">
                  {t('clinic_trust_body')}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-primary/15 overflow-hidden bg-white shadow-soft-sm min-h-[480px]">
              <iframe
                title="FabClinic EDE map"
                src={contact.mapsEmbedUrl}
                className="w-full h-full min-h-[480px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════ COMING SOON: Amsterdam, Rotterdam, Den Haag ═══════ */}
      <section className="py-section-y bg-page-contact">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-sans text-primary text-xs tracking-[0.3em] uppercase mb-4 block font-semibold">
              {locale === 'nl' ? 'UITBREIDING' : 'EXPANSION'}
            </span>
            <h2 className="font-display text-display-md text-secondary italic mb-4">
              {locale === 'nl' ? 'Binnenkort ook bij u in de buurt' : 'Coming soon near you'}
            </h2>
            <p className="font-sans text-secondary/60 text-base leading-relaxed mb-10">
              {locale === 'nl'
                ? 'FAB Clinic breidt uit naar de drie grootste steden van Nederland. Wij laten u weten zodra onze deuren opengaan.'
                : 'FAB Clinic is expanding to the three largest cities in the Netherlands. We will notify you as soon as our doors open.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { city: 'Amsterdam' },
                { city: 'Rotterdam' },
                { city: locale === 'nl' ? 'Den Haag' : 'The Hague' },
              ].map(({ city }) => (
                <div
                  key={city}
                  className="rounded-xl border border-primary/15 bg-white p-8 shadow-soft-sm flex flex-col items-center gap-3"
                >
                  <MapPin size={24} className="text-primary" aria-hidden="true" />
                  <h3 className="font-display text-2xl italic text-secondary">{city}</h3>
                  <span className="inline-flex items-center gap-1.5 rounded-pill bg-primary/10 text-primary px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold">
                    {locale === 'nl' ? 'Binnenkort' : 'Coming Soon'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <NewsletterSection />
    </>
  );
}
