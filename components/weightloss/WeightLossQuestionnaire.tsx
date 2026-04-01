'use client';

import { useMemo, useState } from 'react';
import type { Locale, QuestionnaireStep } from '@/lib/clinic-data';

interface WeightLossQuestionnaireProps {
  locale: Locale;
  steps: QuestionnaireStep[];
}

export default function WeightLossQuestionnaire({ locale, steps }: WeightLossQuestionnaireProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentStep = steps[stepIndex];
  const progress = useMemo(() => Math.round(((stepIndex + 1) / steps.length) * 100), [stepIndex, steps.length]);

  const setAnswer = (stepId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [stepId]: value }));
  };

  const canGoNext = Boolean(answers[currentStep.id]);

  return (
    <div className="rounded-md border border-primary/15 bg-white p-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-secondary/60">
          {locale === 'nl' ? 'Vragenlijst' : 'Questionnaire'}
        </p>
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-primary">{progress}%</p>
      </div>

      <div className="h-2 rounded-full bg-secondary/10 mb-6 overflow-hidden">
        <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <h3 className="font-display text-3xl italic text-secondary mb-2">{currentStep.question}</h3>
      {currentStep.helperText ? <p className="font-sans text-secondary/70 mb-6">{currentStep.helperText}</p> : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {currentStep.options.map((option) => {
          const active = answers[currentStep.id] === option.value;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setAnswer(currentStep.id, option.value)}
              className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                active
                  ? 'border-primary bg-primary/10 shadow-soft-sm'
                  : 'border-secondary/15 hover:border-primary/40'
              }`}
            >
              <span className="font-sans text-sm text-secondary">{option.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
          disabled={stepIndex === 0}
          className="inline-flex items-center justify-center rounded-pill px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold border border-secondary/20 text-secondary disabled:opacity-40"
        >
          {locale === 'nl' ? 'Vorige' : 'Back'}
        </button>

        {stepIndex < steps.length - 1 ? (
          <button
            type="button"
            onClick={() => setStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
            disabled={!canGoNext}
            className="inline-flex items-center justify-center rounded-pill px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold bg-primary text-white disabled:opacity-40"
          >
            {locale === 'nl' ? 'Volgende' : 'Next'}
          </button>
        ) : (
          <button
            type="button"
            disabled={!canGoNext}
            className="inline-flex items-center justify-center rounded-pill px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold bg-secondary text-white disabled:opacity-40"
          >
            {locale === 'nl' ? 'Afronden' : 'Complete'}
          </button>
        )}
      </div>
    </div>
  );
}
