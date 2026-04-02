'use client';

import { useMemo, type ComponentType } from 'react';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Dumbbell, Sparkles, Stethoscope, Syringe, TrendingDown } from 'lucide-react';
import Container from '@/components/ui/Container';
import type { ConsultSubject } from '@/components/consult/ConsultTrigger';

type Topic = {
  id: Exclude<ConsultSubject, 'home'>;
  icon: ComponentType<{ className?: string }>;
  nl: {
    title: string;
    description: string;
    cta: string;
  };
  en: {
    title: string;
    description: string;
    cta: string;
  };
};

const TOPICS: Topic[] = [
  {
    id: 'weightloss',
    icon: TrendingDown,
    nl: {
      title: 'Weightloss traject',
      description: 'Start uw medische weightloss intake met begeleiding van onze artsen.',
      cta: 'Start Weightloss Survey',
    },
    en: {
      title: 'Weight Loss Program',
      description: 'Start your medical weight loss intake guided by our doctors.',
      cta: 'Start Weight Loss Survey',
    },
  },
  {
    id: 'botox',
    icon: Syringe,
    nl: {
      title: 'Botox consult',
      description: 'Bespreek zones, verwachtingen en een persoonlijk behandelplan.',
      cta: 'Kies Botox behandeling',
    },
    en: {
      title: 'Botox Consultation',
      description: 'Discuss zones, expectations, and a personal treatment plan.',
      cta: 'Choose Botox Treatment',
    },
  },
  {
    id: 'fillers',
    icon: Sparkles,
    nl: {
      title: 'Filler consult',
      description: 'Kies volumeherstel en contourbehandeling die bij u past.',
      cta: 'Kies Filler behandeling',
    },
    en: {
      title: 'Filler Consultation',
      description: 'Select the right volume and contour treatment for you.',
      cta: 'Choose Filler Treatment',
    },
  },
  {
    id: 'bbl',
    icon: Dumbbell,
    nl: {
      title: 'BBL / Shape consult',
      description: 'Kies body contouring opties zoals BBL, ooglidcorrectie of onderkin.',
      cta: 'Kies Shape behandeling',
    },
    en: {
      title: 'BBL / Shape Consultation',
      description: 'Choose body contouring options such as BBL, eyelid correction, or chin contouring.',
      cta: 'Choose Shape Treatment',
    },
  },
  {
    id: 'other',
    icon: Stethoscope,
    nl: {
      title: 'Ander consult',
      description: 'Twijfelt u nog? Kies meerdere interesses en plan een rustig adviesgesprek.',
      cta: 'Kies op interesse',
    },
    en: {
      title: 'Other Consultation',
      description: 'Not sure yet? Pick multiple interests and plan a calm advisory appointment.',
      cta: 'Choose by Interest',
    },
  },
];

function normalizeFrom(value: string | null): ConsultSubject {
  if (value === 'weightloss' || value === 'botox' || value === 'fillers' || value === 'bbl' || value === 'other' || value === 'home') {
    return value;
  }
  return 'home';
}

function resolvePrimaryTopic(from: ConsultSubject): Exclude<ConsultSubject, 'home'> {
  if (from === 'home') return 'weightloss';
  return from;
}

function topicHref(locale: string, topicId: Exclude<ConsultSubject, 'home'>): string {
  if (topicId === 'weightloss') {
    return `/${locale}/weightloss?openSurvey=1`;
  }

  return `/${locale}/consult/plan?focus=${topicId}`;
}

export default function ConsultChooserPage() {
  const locale = useLocale();
  const searchParams = useSearchParams();

  const copy = locale === 'nl' ? 'nl' : 'en';
  const from = normalizeFrom(searchParams.get('from'));
  const primaryTopicId = resolvePrimaryTopic(from);

  const primaryTopic = useMemo(
    () => TOPICS.find((topic) => topic.id === primaryTopicId) ?? TOPICS[0],
    [primaryTopicId],
  );

  const alternatives = useMemo(
    () => TOPICS.filter((topic) => topic.id !== primaryTopic.id),
    [primaryTopic.id],
  );

  return (
    <section className="min-h-screen bg-gradient-to-b from-background-light to-white pt-36 pb-16">
      <Container>
        <div className="max-w-6xl mx-auto rounded-[2rem] border border-primary/15 bg-white shadow-soft-xl overflow-hidden">
          <div className="px-6 md:px-10 pt-8 md:pt-10 pb-6 border-b border-primary/10">
            <p className="font-sans text-primary text-xs uppercase tracking-[0.25em] font-semibold mb-3">
              {copy === 'nl' ? 'Gratis consult - stap 1 van 2' : 'Free consultation - step 1 of 2'}
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-secondary leading-tight mb-3">
              {copy === 'nl' ? 'Kies eerst uw onderwerp' : 'First choose your topic'}
            </h1>
            <p className="font-sans text-secondary/70 text-lg leading-relaxed max-w-3xl">
              {copy === 'nl'
                ? 'We hebben het zo eenvoudig mogelijk gemaakt. Links staat uw hoofdkeuze, rechts kunt u direct een andere behandeling kiezen.'
                : 'We made this as simple as possible. Your primary option is on the left, and alternatives are on the right.'}
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_1fr]">
            <div className="p-6 md:p-10 bg-secondary">
              <div className="rounded-3xl border border-background-light/10 bg-background-light/5 p-6 md:p-8 h-full">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mb-6">
                  <primaryTopic.icon className="w-7 h-7" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl text-background-light mb-4">
                  {copy === 'nl' ? primaryTopic.nl.title : primaryTopic.en.title}
                </h2>
                <p className="font-sans text-background-light/75 text-lg leading-relaxed mb-8 max-w-xl">
                  {copy === 'nl' ? primaryTopic.nl.description : primaryTopic.en.description}
                </p>
                <a
                  href={topicHref(locale, primaryTopic.id)}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-pill px-8 py-5 text-sm md:text-base font-sans font-bold uppercase tracking-[0.16em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  {copy === 'nl' ? primaryTopic.nl.cta : primaryTopic.en.cta}
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-background-light">
              <p className="font-sans text-secondary/50 text-xs uppercase tracking-[0.25em] font-semibold mb-5">
                {copy === 'nl' ? 'Andere keuzes' : 'Other choices'}
              </p>
              <div className="space-y-4">
                {alternatives.map((topic) => (
                  <a
                    key={topic.id}
                    href={topicHref(locale, topic.id)}
                    className="group flex items-start gap-4 rounded-2xl border border-primary/15 bg-white p-5 hover:border-primary/40 hover:shadow-soft-md transition-all duration-250"
                  >
                    <span className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <topic.icon className="w-5 h-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="font-display text-2xl text-secondary leading-tight block mb-1">
                        {copy === 'nl' ? topic.nl.title : topic.en.title}
                      </span>
                      <span className="font-sans text-secondary/65 text-sm leading-relaxed block">
                        {copy === 'nl' ? topic.nl.description : topic.en.description}
                      </span>
                    </span>
                    <ArrowRight size={18} className="text-primary shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
