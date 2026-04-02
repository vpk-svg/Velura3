'use client';

import { type ComponentType } from 'react';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  Dumbbell,
  Pill,
  Sparkles,
  Stethoscope,
  Syringe,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import type { ConsultSubject } from '@/components/consult/ConsultTrigger';

/* ── Types ───────────────────────────────────────────────── */
type Pillar = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  nl: { title: string; description: string; cta: string };
  en: { title: string; description: string; cta: string };
  href: (locale: string) => string;
};

type ContextOption = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  nl: { title: string; description: string; cta: string };
  en: { title: string; description: string; cta: string };
  href: (locale: string) => string;
};

/* ── 3 homepage pillars ──────────────────────────────────── */
const PILLARS: Pillar[] = [
  {
    id: 'behandeling',
    icon: Syringe,
    nl: {
      title: 'Behandeling',
      description:
        'Maak een afspraak voor een behandeling: Botox, Fillers of Body Contouring. Geen vragenlijst nodig — kies uw behandeling en plan direct een consult.',
      cta: 'Kies Behandeling',
    },
    en: {
      title: 'Treatment',
      description:
        'Book an appointment for a treatment: Botox, Fillers or Body Contouring. No questionnaire needed — choose your treatment and schedule a consultation.',
      cta: 'Choose Treatment',
    },
    href: (locale) => `/${locale}/consult/plan?focus=other`,
  },
  {
    id: 'medicatie',
    icon: Pill,
    nl: {
      title: 'Medicatie',
      description:
        'Start uw medisch begeleid afvaltraject. Vul de verplichte intake-vragenlijst in zodat onze arts de juiste medicatie kan voorschrijven.',
      cta: 'Start Vragenlijst',
    },
    en: {
      title: 'Medication',
      description:
        'Start your medically guided weight loss journey. Complete the required intake questionnaire so our doctor can prescribe the right medication.',
      cta: 'Start Questionnaire',
    },
    href: (locale) => `/${locale}/weightloss?openSurvey=1`,
  },
  {
    id: 'intake',
    icon: Stethoscope,
    nl: {
      title: 'Intake Gesprek',
      description:
        'Nog niet zeker welke richting? Plan een vrijblijvend intakegesprek. Onze arts bespreekt uw wensen en adviseert over de beste aanpak.',
      cta: 'Plan Intake',
    },
    en: {
      title: 'Intake Consultation',
      description:
        'Not sure which direction? Schedule a no-obligation intake consultation. Our doctor will discuss your goals and recommend the best approach.',
      cta: 'Schedule Intake',
    },
    href: (locale) => `/${locale}/consult/plan?focus=other`,
  },
];

/* ── Context-aware options for specific pages ────────────── */
function getContextOptions(from: ConsultSubject): ContextOption[] | null {
  switch (from) {
    case 'bbl':
      return [
        {
          id: 'bbl-standard',
          icon: Dumbbell,
          nl: { title: 'BBL Standaard', description: 'Lipofilling voor natuurlijke bilcontouring.', cta: 'Kies BBL Standaard' },
          en: { title: 'BBL Standard', description: 'Lipofilling for natural buttock contouring.', cta: 'Choose BBL Standard' },
          href: (locale) => `/${locale}/consult/plan?focus=bbl`,
        },
        {
          id: 'bbl-premium',
          icon: Sparkles,
          nl: { title: 'BBL Premium (360°)', description: 'Uitgebreide bilcontouring met 360° benadering.', cta: 'Kies BBL Premium' },
          en: { title: 'BBL Premium (360°)', description: 'Comprehensive buttock contouring with 360° approach.', cta: 'Choose BBL Premium' },
          href: (locale) => `/${locale}/consult/plan?focus=bbl`,
        },
        {
          id: 'eyelid',
          icon: Sparkles,
          nl: { title: 'Ooglidcorrectie', description: 'Blepharoplastiek voor een frissere uitstraling.', cta: 'Kies Ooglidcorrectie' },
          en: { title: 'Eyelid Correction', description: 'Blepharoplasty for a fresher appearance.', cta: 'Choose Eyelid Correction' },
          href: (locale) => `/${locale}/consult/plan?focus=bbl`,
        },
        {
          id: 'double-chin',
          icon: Sparkles,
          nl: { title: 'Vet Onderkin', description: 'Minimaal invasieve vetverwijdering voor een strakker profiel.', cta: 'Kies Onderkin' },
          en: { title: 'Double Chin', description: 'Minimally invasive fat removal for a tighter jawline.', cta: 'Choose Double Chin' },
          href: (locale) => `/${locale}/consult/plan?focus=bbl`,
        },
      ];
    case 'botox':
      return [
        {
          id: 'botox-consult',
          icon: Syringe,
          nl: { title: 'Botox Consult', description: 'Bespreek zones, verwachtingen en een persoonlijk behandelplan.', cta: 'Plan Botox Consult' },
          en: { title: 'Botox Consultation', description: 'Discuss zones, expectations, and a personal treatment plan.', cta: 'Schedule Botox Consult' },
          href: (locale) => `/${locale}/consult/plan?focus=botox`,
        },
      ];
    case 'fillers':
      return [
        {
          id: 'filler-consult',
          icon: Sparkles,
          nl: { title: 'Filler Consult', description: 'Kies volumeherstel en contourbehandeling die bij u past.', cta: 'Plan Filler Consult' },
          en: { title: 'Filler Consultation', description: 'Select the right volume and contour treatment for you.', cta: 'Schedule Filler Consult' },
          href: (locale) => `/${locale}/consult/plan?focus=fillers`,
        },
      ];
    default:
      return null;
  }
}

/* ── Helpers ──────────────────────────────────────────────── */
function normalizeFrom(value: string | null): ConsultSubject {
  if (
    value === 'weightloss' ||
    value === 'botox' ||
    value === 'fillers' ||
    value === 'bbl' ||
    value === 'medicatie' ||
    value === 'intake' ||
    value === 'other' ||
    value === 'home'
  ) {
    return value;
  }
  return 'home';
}

/* ── Component ───────────────────────────────────────────── */
export default function ConsultChooserPage() {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const isNl = locale === 'nl';
  const from = normalizeFrom(searchParams.get('from'));

  // Weightloss / medicatie → go straight to survey
  if (from === 'weightloss' || from === 'medicatie') {
    if (typeof window !== 'undefined') {
      window.location.replace(`/${locale}/weightloss?openSurvey=1`);
    }
    return null;
  }

  // Intake → go straight to plan page
  if (from === 'intake') {
    if (typeof window !== 'undefined') {
      window.location.replace(`/${locale}/consult/plan?focus=other`);
    }
    return null;
  }

  const contextOptions = from !== 'home' && from !== 'other' ? getContextOptions(from) : null;
  const showPillars = !contextOptions;

  return (
    <section className="min-h-screen bg-gradient-to-b from-background-light to-white pt-36 pb-16">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="font-sans text-primary text-xs uppercase tracking-[0.25em] font-semibold mb-4">
              {isNl ? 'GRATIS CONSULT' : 'FREE CONSULTATION'}
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-secondary leading-tight mb-4">
              {showPillars
                ? isNl
                  ? 'Waarvoor wilt u een afspraak?'
                  : 'What would you like to book?'
                : isNl
                  ? 'Kies uw behandeling'
                  : 'Choose your treatment'}
            </h1>
            <p className="font-sans text-secondary/70 text-lg leading-relaxed max-w-2xl mx-auto">
              {showPillars
                ? isNl
                  ? 'Kies een van de drie opties hieronder. U kunt altijd van richting veranderen.'
                  : 'Choose one of the three options below. You can always change direction.'
                : isNl
                  ? 'Selecteer de behandeling die u interesseert en plan uw consult.'
                  : 'Select the treatment that interests you and schedule your consultation.'}
            </p>
          </div>

          {/* 3 Pillars — Home view */}
          {showPillars && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PILLARS.map((pillar) => (
                <a
                  key={pillar.id}
                  href={pillar.href(locale)}
                  className="group relative flex flex-col rounded-[2rem] border border-primary/15 bg-white p-8 shadow-soft-lg hover:shadow-soft-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Accent top bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary/20 group-hover:bg-primary transition-colors duration-300" />

                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <pillar.icon className="w-7 h-7" />
                  </div>

                  <h2 className="font-display text-2xl md:text-3xl text-secondary mb-3">
                    {isNl ? pillar.nl.title : pillar.en.title}
                  </h2>

                  <p className="font-sans text-secondary/65 text-sm leading-relaxed mb-8 flex-1">
                    {isNl ? pillar.nl.description : pillar.en.description}
                  </p>

                  <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] font-bold text-primary group-hover:gap-3 transition-all duration-300">
                    {isNl ? pillar.nl.cta : pillar.en.cta}
                    <ArrowRight size={14} />
                  </span>
                </a>
              ))}
            </div>
          )}

          {/* Context-specific options — From specific page */}
          {contextOptions && (
            <div
              className={`grid gap-6 ${
                contextOptions.length === 1
                  ? 'grid-cols-1 max-w-lg mx-auto'
                  : contextOptions.length === 2
                    ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto'
                    : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
              }`}
            >
              {contextOptions.map((option) => (
                <a
                  key={option.id}
                  href={option.href(locale)}
                  className="group flex flex-col rounded-[2rem] border border-primary/15 bg-white p-8 shadow-soft-lg hover:shadow-soft-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <option.icon className="w-6 h-6" />
                  </div>

                  <h2 className="font-display text-xl md:text-2xl text-secondary mb-2">
                    {isNl ? option.nl.title : option.en.title}
                  </h2>

                  <p className="font-sans text-secondary/65 text-sm leading-relaxed mb-6 flex-1">
                    {isNl ? option.nl.description : option.en.description}
                  </p>

                  <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] font-bold text-primary group-hover:gap-3 transition-all duration-300">
                    {isNl ? option.nl.cta : option.en.cta}
                    <ArrowRight size={14} />
                  </span>
                </a>
              ))}
            </div>
          )}

          {/* Back to all options link when in context mode */}
          {contextOptions && (
            <div className="text-center mt-10">
              <a
                href={`/${locale}/consult?from=home`}
                className="font-sans text-sm text-secondary/50 hover:text-primary underline underline-offset-4 transition-colors"
              >
                {isNl ? '← Bekijk alle opties' : '← View all options'}
              </a>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
