'use client';

import { useState, useRef, useCallback, type FormEvent } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import {
  Check,
  Award,
  Users,
  BookOpen,
  Shield,
  ChevronDown,
  GraduationCap,
  Clock,
  Star,
  Quote,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import CourseDateCard from '@/components/course/CourseDateCard';
import { getCourseDates, type Locale } from '@/lib/clinic-data';
import { EASE_PREMIUM } from '@/lib/motion';
import {
  CURRICULUM,
  LEARNING_OUTCOMES,
  INSTRUCTOR,
  COURSE_TESTIMONIALS,
  COURSE_FAQ,
  PRICING_INCLUSIONS,
  HIGHLIGHT_KEYS,
  TARGET_AUDIENCE_KEYS,
  PREREQUISITE_KEYS,
} from '@/lib/data/course';

/* ── Icon map for highlights ── */
const HIGHLIGHT_ICONS = [Shield, BookOpen, Users, Award] as const;

/* ── Tag color map ── */
const TAG_COLORS: Record<string, string> = {
  tag_theory: 'bg-blue-50 text-blue-700',
  tag_demo: 'bg-violet-50 text-violet-700',
  tag_break: 'bg-amber-50 text-amber-700',
  tag_hands_on: 'bg-emerald-50 text-emerald-700',
  tag_certificate: 'bg-primary/10 text-primary',
};

/* ── Form state ── */
interface FormData {
  name: string;
  email: string;
  phone: string;
  big: string;
  education: string;
  date: string;
  terms: boolean;
  hp: string; // honeypot
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  big?: string;
  education?: string;
  date?: string;
  terms?: string;
  server?: string;
}

const INITIAL_FORM: FormData = {
  name: '',
  email: '',
  phone: '',
  big: '',
  education: '',
  date: '',
  terms: false,
  hp: '',
};

export default function CursusPageClient() {
  const t = useTranslations('cursus');
  const locale = useLocale() as Locale;
  const dates = getCourseDates(locale);

  /* ── Form state ── */
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* ── Date card → form linking ── */
  const [selectedDate, setSelectedDate] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleDateSelect = useCallback((id: string) => {
    setSelectedDate(id);
    setForm((prev) => ({ ...prev, date: id }));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  /* ── Accordion states ── */
  const [openCurriculum, setOpenCurriculum] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  /* ── Form handlers ── */
  const updateField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    [],
  );

  const validate = useCallback((): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = t('err_name');
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = t('err_email');
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 8)
      e.phone = t('err_phone');
    if (!form.big.trim() || !/^\d{9,11}$/.test(form.big.replace(/\s/g, '')))
      e.big = t('err_big');
    if (!form.education.trim()) e.education = t('err_education');
    if (!form.date) e.date = t('err_date');
    if (!form.terms) e.terms = t('err_terms');
    return e;
  }, [form, t]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      // Honeypot check
      if (form.hp) return;

      const errs = validate();
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }

      setSubmitting(true);
      setErrors({});

      try {
        const res = await fetch('/api/course-register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            big: form.big.trim(),
            education: form.education.trim(),
            dateId: form.date,
            locale,
          }),
        });

        if (!res.ok) throw new Error('Server error');
        setSubmitted(true);
      } catch {
        setErrors({ server: t('err_server') });
      } finally {
        setSubmitting(false);
      }
    },
    [form, validate, locale, t],
  );

  /* ── Refs for in-view animations ── */
  const outcomesRef = useRef<HTMLDivElement>(null);
  const outcomesInView = useInView(outcomesRef, { once: true, margin: '-60px' });

  return (
    <>
      {/* ════════════════════════════ HERO ════════════════════════════ */}
      <section className="relative w-full pt-40 pb-24 bg-gradient-to-br from-secondary via-secondary to-burgundy overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/treatments/botox-hero.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            aria-hidden="true"
            priority
          />
        </div>

        <Container>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_PREMIUM }}
                className="inline-block rounded-pill bg-primary/20 text-primary font-sans text-xs tracking-[0.3em] uppercase px-4 py-2 mb-6 font-semibold"
              >
                {t('badge')}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.05, ease: EASE_PREMIUM }}
                className="font-display text-display-xl text-background-light mb-6"
              >
                {t('hero_title')}
                <span className="italic font-light text-primary">{t('hero_title_accent')}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
                className="font-sans font-light text-background-light/70 text-lg max-w-xl mb-4"
              >
                {t('hero_desc')}
              </motion.p>

              {/* Social proof pill */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12, ease: EASE_PREMIUM }}
                className="flex items-center gap-2 mb-8"
              >
                <span className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-primary fill-primary" />
                  ))}
                </span>
                <span className="font-sans text-sm text-background-light/60">{t('social_proof')}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: EASE_PREMIUM }}
                className="flex flex-wrap gap-3"
              >
                <a
                  href="#aanmelden"
                  className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-10 py-4 text-xs tracking-[0.2em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300"
                >
                  {t('cta_register')}
                </a>
                <a
                  href="#curriculum"
                  className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-10 py-4 text-xs tracking-[0.2em] border border-background-light/20 text-background-light/80 hover:bg-background-light/10 transition-all duration-300"
                >
                  {t('cta_curriculum')}
                </a>
              </motion.div>
            </div>

            {/* Hero image — visible on all screens */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_PREMIUM }}
              className="relative aspect-[4/3] lg:aspect-[4/3] aspect-video rounded-2xl overflow-hidden shadow-soft-xl"
            >
              <Image
                src="/images/treatments/fillers-hero.jpg"
                alt={t('hero_img_alt')}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent" />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════ HIGHLIGHTS ════════════════════════════ */}
      <section className="py-section-y bg-page-cursus">
        <Container>
          <SectionHeader
            label={t('overview_label')}
            title={t('overview_title')}
            subtitle={t('overview_subtitle')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {HIGHLIGHT_KEYS.map((key, i) => {
              const Icon = HIGHLIGHT_ICONS[i];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, ease: EASE_PREMIUM }}
                  className="rounded-2xl border border-primary/10 bg-white p-5 flex items-start gap-4 shadow-soft-sm hover:-translate-y-0.5 hover:shadow-soft-md transition-all duration-300"
                >
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-champagne to-primary/10 flex items-center justify-center shrink-0 shadow-soft-sm">
                    <Icon size={18} className="text-primary" />
                  </span>
                  <p className="font-sans text-secondary/80 leading-relaxed">{t(key)}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ════════════════════════════ TARGET AUDIENCE ════════════════════════════ */}
      <section className="py-section-y bg-white">
        <Container>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For whom */}
            <div>
              <SectionHeader
                label={t('audience_label')}
                title={t('audience_title')}
                align="left"
              />
              <ul className="space-y-3">
                {TARGET_AUDIENCE_KEYS.map((key, i) => (
                  <motion.li
                    key={key}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08, ease: EASE_PREMIUM }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-sans text-secondary/80 leading-relaxed">{t(key)}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            {/* Prerequisites */}
            <div>
              <SectionHeader
                label={t('prereq_label')}
                title={locale === 'nl' ? 'Vereisten' : 'Requirements'}
                align="left"
              />
              <ul className="space-y-3">
                {PREREQUISITE_KEYS.map((key, i) => (
                  <motion.li
                    key={key}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08, ease: EASE_PREMIUM }}
                    className="flex items-start gap-3"
                  >
                    <Shield size={18} className="text-primary shrink-0 mt-0.5" />
                    <span className="font-sans text-secondary/80 leading-relaxed">{t(key)}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════ LEARNING OUTCOMES ════════════════════════════ */}
      <section className="py-section-y bg-page-cursus">
        <Container>
          <SectionHeader
            label={t('outcomes_label')}
            title={t('outcomes_title')}
            subtitle={t('outcomes_subtitle')}
          />

          <div
            ref={outcomesRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
          >
            {LEARNING_OUTCOMES.map((lo, i) => (
              <motion.div
                key={lo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={outcomesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * i, ease: EASE_PREMIUM }}
                className="flex items-start gap-3 bg-white rounded-2xl p-4 shadow-soft-sm border border-primary/5"
              >
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="font-sans text-secondary/80 leading-relaxed text-[15px]">
                  {t(lo.textKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ════════════════════════════ CURRICULUM ════════════════════════════ */}
      <section id="curriculum" className="py-section-y bg-white scroll-mt-24">
        <Container>
          <SectionHeader
            label={t('curriculum_label')}
            title={t('curriculum_title')}
            subtitle={t('curriculum_subtitle')}
          />

          <div className="max-w-3xl mx-auto space-y-3">
            {CURRICULUM.map((mod, i) => {
              const isOpen = openCurriculum === mod.id;
              return (
                <motion.div
                  key={mod.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 * i, ease: EASE_PREMIUM }}
                  className="rounded-2xl border border-primary/10 bg-background-light overflow-hidden shadow-soft-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenCurriculum(isOpen ? null : mod.id)}
                    aria-expanded={isOpen}
                    aria-controls={`mod-panel-${mod.id}`}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-primary/[0.03] transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="font-sans text-xs text-secondary/40 tracking-wide whitespace-nowrap w-24 shrink-0">
                        <Clock size={12} className="inline mr-1.5 -mt-0.5" />
                        {mod.timeSlot}
                      </span>
                      <h3 className="font-display text-lg text-secondary truncate">
                        {t(mod.titleKey)}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {mod.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`hidden sm:inline-block text-[10px] uppercase tracking-[0.15em] font-semibold px-2.5 py-1 rounded-pill ${TAG_COLORS[tag] ?? 'bg-secondary/5 text-secondary/50'}`}
                        >
                          {t(tag)}
                        </span>
                      ))}
                      <ChevronDown
                        size={18}
                        className={`text-secondary/30 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`mod-panel-${mod.id}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-0">
                          <div className="border-t border-primary/5 pt-4">
                            <p className="font-sans text-secondary/70 leading-relaxed text-[15px]">
                              {t(mod.descKey)}
                            </p>
                            {/* Mobile tags */}
                            <div className="flex flex-wrap gap-2 mt-3 sm:hidden">
                              {mod.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className={`text-[10px] uppercase tracking-[0.15em] font-semibold px-2.5 py-1 rounded-pill ${TAG_COLORS[tag] ?? 'bg-secondary/5 text-secondary/50'}`}
                                >
                                  {t(tag)}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ════════════════════════════ INSTRUCTOR ════════════════════════════ */}
      <section className="py-section-y bg-page-cursus">
        <Container>
          <SectionHeader
            label={t('instructor_label')}
            title={t('instructor_title')}
          />

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_PREMIUM }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-soft-lg mx-auto md:mx-0 max-w-[280px] w-full transition-all duration-300 hover:shadow-[0_0_38px_rgba(212,175,55,0.48)]"
            >
              <Image
                src={INSTRUCTOR.image}
                alt={INSTRUCTOR.name}
                fill
                className="object-cover"
                sizes="280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent" />
            </motion.div>

            <div>
              <motion.h3
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE_PREMIUM }}
                className="font-display text-3xl text-secondary mb-1"
              >
                {INSTRUCTOR.name}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05, ease: EASE_PREMIUM }}
                className="flex flex-wrap gap-2 mb-4"
              >
                {INSTRUCTOR.credentials.map((cred) => (
                  <span
                    key={cred}
                    className="text-[10px] uppercase tracking-[0.15em] font-semibold bg-primary/10 text-primary px-3 py-1 rounded-pill"
                  >
                    {cred}
                  </span>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
                className="font-sans text-secondary/70 leading-relaxed mb-6"
              >
                {t('instructor_bio')}
              </motion.p>

              <div className="grid grid-cols-3 gap-4">
                {INSTRUCTOR.stats.map((stat, i) => (
                  <motion.div
                    key={stat.labelKey}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08, ease: EASE_PREMIUM }}
                    className="text-center bg-white rounded-2xl p-4 shadow-soft-sm border border-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_34px_rgba(212,175,55,0.42)]"
                  >
                    <p className="font-display text-3xl text-primary mb-1">{stat.value}</p>
                    <p className="font-sans text-xs text-secondary/50 uppercase tracking-wider">
                      {t(stat.labelKey)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════ TESTIMONIALS ════════════════════════════ */}
      <section className="py-section-y bg-white">
        <Container>
          <SectionHeader
            label={t('testimonials_label')}
            title={t('testimonials_title')}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {COURSE_TESTIMONIALS.map((item, i) => (
              <motion.blockquote
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, ease: EASE_PREMIUM }}
                className="rounded-2xl bg-background-light p-6 shadow-soft-sm border border-primary/5 flex flex-col"
              >
                <Quote size={24} className="text-primary/30 mb-3 shrink-0" />
                <p className="font-sans text-secondary/80 leading-relaxed italic flex-1 text-[15px]">
                  &ldquo;{t(item.quoteKey)}&rdquo;
                </p>
                <footer className="mt-4 pt-4 border-t border-primary/5">
                  <p className="font-display text-secondary font-semibold">{t(item.nameKey)}</p>
                  <p className="font-sans text-xs text-secondary/50">{t(item.roleKey)}</p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </Container>
      </section>

      {/* ════════════════════════════ COURSE DATES ════════════════════════════ */}
      <section className="py-section-y bg-page-cursus">
        <Container>
          <SectionHeader
            label={t('dates_label')}
            title={t('dates_title')}
            subtitle={t('dates_subtitle')}
          />

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-4"
            role="listbox"
            aria-label={t('select_date')}
          >
            {dates.map((item, i) => (
              <CourseDateCard
                key={item.id}
                locale={locale}
                item={item}
                selected={selectedDate === item.id}
                onSelect={handleDateSelect}
                index={i}
                t={t}
              />
            ))}
          </div>
          <p className="text-center font-sans text-xs text-secondary/40">
            {t('seats_total')}
          </p>
        </Container>
      </section>

      {/* ════════════════════════════ COURSE FAQ ════════════════════════════ */}
      <section className="py-section-y bg-white">
        <Container>
          <SectionHeader
            label={t('faq_label')}
            title={t('faq_title')}
          />

          <div className="max-w-3xl mx-auto space-y-3">
            {COURSE_FAQ.map((faq, i) => {
              const isOpen = openFaq === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 * i, ease: EASE_PREMIUM }}
                  className="rounded-2xl border border-primary/10 bg-background-light overflow-hidden shadow-soft-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${faq.id}`}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-primary/[0.03] transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none"
                  >
                    <h3 className="font-sans text-secondary font-medium text-[15px]">
                      {t(faq.questionKey)}
                    </h3>
                    <ChevronDown
                      size={18}
                      className={`text-secondary/30 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${faq.id}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5">
                          <p className="font-sans text-secondary/70 leading-relaxed text-[15px]">
                            {t(faq.answerKey)}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ════════════════════════════ SIGNUP + PRICING ════════════════════════════ */}
      <section id="aanmelden" className="py-section-y bg-page-cursus scroll-mt-24">
        <Container>
          <SectionHeader
            label={t('register_title')}
            title={t('register_title')}
            subtitle={t('register_subtitle')}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* ── Registration Form ── */}
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 shadow-soft-sm flex flex-col items-center justify-center text-center gap-4"
                >
                  <CheckCircle2 size={48} className="text-emerald-600" />
                  <h2 className="font-display text-2xl text-secondary">{t('success_title')}</h2>
                  <p className="font-sans text-secondary/70">{t('success_desc')}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  className="rounded-2xl border border-primary/15 bg-white p-8 shadow-soft-sm space-y-5"
                >
                  <fieldset disabled={submitting} className="space-y-5">
                    <legend className="sr-only">{t('register_title')}</legend>

                    {/* Honeypot — hidden from real users */}
                    <div className="absolute -left-[9999px]" aria-hidden="true">
                      <label htmlFor="hp-field">{t('field_honeypot')}</label>
                      <input
                        id="hp-field"
                        name="hp"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.hp}
                        onChange={(e) => updateField('hp', e.target.value)}
                      />
                    </div>

                    {/* Name */}
                    <InputField
                      id="reg-name"
                      label={t('field_name')}
                      type="text"
                      autoComplete="name"
                      required
                      value={form.name}
                      error={errors.name}
                      onChange={(v) => updateField('name', v)}
                    />

                    {/* Email */}
                    <InputField
                      id="reg-email"
                      label={t('field_email')}
                      type="email"
                      autoComplete="email"
                      required
                      value={form.email}
                      error={errors.email}
                      onChange={(v) => updateField('email', v)}
                    />

                    {/* Phone */}
                    <InputField
                      id="reg-phone"
                      label={t('field_phone')}
                      type="tel"
                      autoComplete="tel"
                      required
                      value={form.phone}
                      error={errors.phone}
                      onChange={(v) => updateField('phone', v)}
                    />

                    {/* BIG registration */}
                    <InputField
                      id="reg-big"
                      label={t('field_big')}
                      type="text"
                      inputMode="numeric"
                      required
                      value={form.big}
                      error={errors.big}
                      onChange={(v) => updateField('big', v)}
                    />

                    {/* Education */}
                    <InputField
                      id="reg-education"
                      label={t('field_education')}
                      type="text"
                      required
                      value={form.education}
                      error={errors.education}
                      onChange={(v) => updateField('education', v)}
                    />

                    {/* Date select */}
                    <div>
                      <label
                        htmlFor="reg-date"
                        className="block font-sans text-xs uppercase tracking-[0.15em] text-secondary/60 font-semibold mb-2"
                      >
                        {t('field_date')} <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="reg-date"
                        name="date"
                        required
                        value={form.date}
                        onChange={(e) => updateField('date', e.target.value)}
                        className={`w-full rounded-lg border bg-background-light px-4 py-3 text-sm font-sans outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/30 focus:border-primary ${
                          errors.date ? 'border-rose-400' : 'border-secondary/20'
                        }`}
                        aria-describedby={errors.date ? 'reg-date-err' : undefined}
                      >
                        <option value="">{t('field_date_placeholder')}</option>
                        {dates.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.dateLabel}
                          </option>
                        ))}
                      </select>
                      {errors.date && (
                        <p id="reg-date-err" className="flex items-center gap-1.5 mt-1.5 font-sans text-xs text-rose-600" role="alert">
                          <AlertCircle size={12} /> {errors.date}
                        </p>
                      )}
                    </div>

                    {/* Terms */}
                    <div>
                      <label
                        htmlFor="reg-terms"
                        className="flex items-start gap-3 cursor-pointer"
                      >
                        <input
                          id="reg-terms"
                          name="terms"
                          type="checkbox"
                          checked={form.terms}
                          onChange={(e) => updateField('terms', e.target.checked)}
                          className="mt-1 w-5 h-5 rounded border-secondary/20 accent-primary focus:ring-2 focus:ring-primary/30"
                          aria-describedby={errors.terms ? 'reg-terms-err' : undefined}
                        />
                        <span className="font-sans text-sm text-secondary/75 leading-relaxed">
                          {t('field_terms')}{' '}
                          <Link href={`/${locale}/terms`} className="underline text-primary hover:text-primary/80">
                            {t('field_terms_link')}
                          </Link>
                          {' & '}
                          <Link href={`/${locale}/terms`} className="underline text-primary hover:text-primary/80">
                            {t('field_privacy')}
                          </Link>
                        </span>
                      </label>
                      {errors.terms && (
                        <p id="reg-terms-err" className="flex items-center gap-1.5 mt-1.5 font-sans text-xs text-rose-600 pl-8" role="alert">
                          <AlertCircle size={12} /> {errors.terms}
                        </p>
                      )}
                    </div>

                    {/* Server error */}
                    {errors.server && (
                      <p className="flex items-center gap-2 rounded-lg bg-rose-50 border border-rose-200 p-3 font-sans text-sm text-rose-700" role="alert">
                        <AlertCircle size={16} /> {errors.server}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-pill font-sans uppercase font-bold px-10 py-4 text-xs tracking-[0.25em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          {t('submitting')}
                        </>
                      ) : (
                        t('submit')
                      )}
                    </button>
                  </fieldset>
                </motion.form>
              )}
            </AnimatePresence>

            {/* ── Pricing Card ── */}
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl bg-gradient-to-br from-secondary to-burgundy p-8 text-background-light shadow-soft-xl flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-sans text-xs uppercase tracking-[0.25em] text-primary block">
                      {t('pricing_label')}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.15em] font-semibold bg-primary/20 text-primary px-3 py-1 rounded-pill">
                      {t('pricing_early_bird')}
                    </span>
                  </div>

                  <p className="font-display text-6xl text-background-light mb-1">{t('pricing_amount')}</p>
                  <p className="font-sans text-background-light/50 text-sm mb-2">{t('pricing_vat')}</p>
                  <p className="font-sans text-primary/80 text-xs mb-8">{t('pricing_early_bird_note')}</p>

                  <div className="space-y-2.5">
                    {PRICING_INCLUSIONS.map((key) => (
                      <div key={key} className="flex items-center gap-3">
                        <Check size={14} className="text-primary shrink-0" />
                        <span className="font-sans text-background-light/80 text-sm leading-snug">{t(key)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#aanmelden"
                  onClick={(e) => {
                    e.preventDefault();
                    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="mt-8 w-full inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-8 py-4 text-xs tracking-[0.2em] border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  {t('pricing_cta')}
                </a>
              </div>

              {/* Course environment photo */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-soft-lg">
                <Image
                  src="/images/treatments/botox-hero.jpg"
                  alt={t('env_img_alt')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   Reusable Input Field
   ══════════════════════════════════════════════════════════════════════════ */

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  required?: boolean;
  inputMode?: 'numeric' | 'text' | 'email' | 'tel';
}

function InputField({
  id,
  label,
  type,
  value,
  error,
  onChange,
  autoComplete,
  required,
  inputMode,
}: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-sans text-xs uppercase tracking-[0.15em] text-secondary/60 font-semibold mb-2"
      >
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border bg-background-light px-4 py-3 text-sm font-sans outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/30 focus:border-primary ${
          error ? 'border-rose-400' : 'border-secondary/20'
        }`}
        aria-describedby={error ? `${id}-err` : undefined}
        aria-invalid={error ? 'true' : undefined}
      />
      {error && (
        <p id={`${id}-err`} className="flex items-center gap-1.5 mt-1.5 font-sans text-xs text-rose-600" role="alert">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}
