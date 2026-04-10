'use client';

import { useCallback, useContext, useEffect, useMemo, useState, createContext, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

const SurveyCtx = createContext<{ open: () => void }>({ open: () => {} });

export const useSurvey = () => useContext(SurveyCtx);

type YesNo = 'yes' | 'no' | '';
type Gender = 'male' | 'female' | '';

type SurveyStep =
  | 'q1_reasons'
  | 'q2_bio'
  | 'q3_duration'
  | 'q4_past_attempts'
  | 'q5_exercise_challenges'
  | 'q6_eating_challenges'
  | 'q7_maintenance'
  | 'q8_critical'
  | 'q9_history'
  | 'q10_current_meds'
  | 'q11_glp1'
  | 'q12_allergies'
  | 'q13_preferences'
  | 'q14_marketing'
  | 'q15_legal'
  | 'loading'
  | 'results';

const STEPS: SurveyStep[] = [
  'q1_reasons',
  'q2_bio',
  'q3_duration',
  'q4_past_attempts',
  'q5_exercise_challenges',
  'q6_eating_challenges',
  'q7_maintenance',
  'q8_critical',
  'q9_history',
  'q10_current_meds',
  'q11_glp1',
  'q12_allergies',
  'q13_preferences',
  'q14_marketing',
  'q15_legal',
];

/* ── Phase grouping for progress display ─────────────────── */
const PHASE_KEYS = [
  { labelKey: 'phase_goals', steps: ['q1_reasons', 'q2_bio', 'q3_duration'] },
  { labelKey: 'phase_history', steps: ['q4_past_attempts', 'q5_exercise_challenges', 'q6_eating_challenges', 'q7_maintenance'] },
  { labelKey: 'phase_screening', steps: ['q8_critical', 'q9_history', 'q10_current_meds', 'q11_glp1', 'q12_allergies'] },
  { labelKey: 'phase_preferences', steps: ['q13_preferences', 'q14_marketing', 'q15_legal'] },
] as const;

function getPhaseForStep(step: SurveyStep): { phaseIndex: number; phaseLabelKey: string } {
  for (let i = 0; i < PHASE_KEYS.length; i++) {
    if ((PHASE_KEYS[i].steps as readonly string[]).includes(step)) {
      return { phaseIndex: i, phaseLabelKey: PHASE_KEYS[i].labelKey };
    }
  }
  return { phaseIndex: 0, phaseLabelKey: PHASE_KEYS[0].labelKey };
}

const REASON_KEYS = [
  'reason_health',
  'reason_condition',
  'reason_look_feel',
  'reason_active',
  'reason_mood',
  'reason_sleep_energy',
  'reason_other',
];

const DURATION_KEYS = [
  'duration_12m',
  'duration_5y',
  'duration_10y',
  'duration_life',
  'duration_never',
];

const PAST_ATTEMPT_KEYS = [
  'past_active',
  'past_dieting',
  'past_calories',
  'past_programs',
  'past_shakes',
  'past_other',
  'past_nothing',
];

const EXERCISE_CHALLENGE_KEYS = [
  'exercise_time',
  'exercise_motivation',
  'exercise_injury',
  'exercise_enjoy',
  'exercise_uncomfortable',
  'exercise_not_tried',
  'exercise_other',
];

const EATING_CHALLENGE_KEYS = [
  'eating_hunger',
  'eating_binge',
  'eating_snacking',
  'eating_stress',
  'eating_yoyo',
  'eating_nutrition',
  'eating_other',
];

const MAINTENANCE_KEYS = [
  'maintenance_motivation',
  'maintenance_consistency',
  'maintenance_time',
  'maintenance_yoyo',
  'maintenance_other',
];

const CRITICAL_CONDITION_KEYS = [
  'critical_liver_kidney',
  'critical_heart',
  'critical_pancreatitis',
  'critical_men2',
  'critical_cancer',
  'critical_type1',
  'critical_thyroid_cancer',
  'critical_eating_disorder',
  'critical_gallbladder',
  'critical_ibd_gastroparesis',
];

const HISTORY_KEYS = [
  'history_type2',
  'history_bp',
  'history_cholesterol',
  'history_ed',
  'history_apnea',
  'history_asthma',
  'history_osteo',
  'history_back',
  'history_depression',
  'history_pcos',
  'history_fatty_liver',
  'history_malabsorption',
];

const PREFERENCE_KEYS = [
  'pref_side_effects',
  'pref_results',
  'pref_convenience',
  'pref_consistency',
];

interface FormState {
  reasons: string[];
  gender: Gender;
  heightCm: string;
  weightKg: string;
  targetWeightKg: string;
  duration: string;
  pastAttempts: string[];
  exerciseChallenges: string[];
  eatingChallenges: string[];
  maintenanceChallenge: string;
  criticalConditionsAnswer: YesNo;
  medicalHistory: Record<string, YesNo>;
  usesCurrentMeds: YesNo;
  usesOtherGlp1: YesNo;
  medicationAllergy: YesNo;
  preferences: string[];
  marketingOptIn: boolean;
  legalPersonalUse: boolean;
  legalOffLabel: boolean;
  legalTruthfulAnswers: boolean;
  legalGpNotification: boolean;
}

const initialMedicalHistory: Record<string, YesNo> = HISTORY_KEYS.reduce((acc, key) => {
  acc[key] = '';
  return acc;
}, {} as Record<string, YesNo>);

const initialForm: FormState = {
  reasons: [],
  gender: '',
  heightCm: '',
  weightKg: '',
  targetWeightKg: '',
  duration: '',
  pastAttempts: [],
  exerciseChallenges: [],
  eatingChallenges: [],
  maintenanceChallenge: '',
  criticalConditionsAnswer: '',
  medicalHistory: initialMedicalHistory,
  usesCurrentMeds: '',
  usesOtherGlp1: '',
  medicationAllergy: '',
  preferences: [],
  marketingOptIn: false,
  legalPersonalUse: false,
  legalOffLabel: false,
  legalTruthfulAnswers: false,
  legalGpNotification: false,
};

type ErrorMap = Record<string, string>;

const sanitizeInteger = (value: string) => value.replace(/[^0-9]/g, '');

const sanitizeDecimal = (value: string) => {
  const cleaned = value.replace(/[^0-9.]/g, '');
  const parts = cleaned.split('.');
  if (parts.length <= 2) return cleaned;
  return `${parts[0]}.${parts.slice(1).join('')}`;
};

const parseStrictNumber = (value: string) => {
  if (!/^\d+(\.\d{1,2})?$/.test(value.trim())) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

function toggleArrayValue(current: string[], value: string): string[] {
  return current.includes(value) ? current.filter((entry) => entry !== value) : [...current, value];
}

function getStepErrors(step: SurveyStep, form: FormState, t: (key: string) => string): ErrorMap {
  const errors: ErrorMap = {};

  if (step === 'q1_reasons' && form.reasons.length === 0) {
    errors.reasons = t('err_select_one');
  }

  if (step === 'q2_bio') {
    if (!form.gender) {
      errors.gender = t('err_gender');
    }

    const h = parseStrictNumber(form.heightCm);
    if (h === null) errors.heightCm = t('err_height');
    else if (h < 120 || h > 230) errors.heightCm = t('err_height_range');

    const w = parseStrictNumber(form.weightKg);
    if (w === null) errors.weightKg = t('err_weight');
    else if (w < 35 || w > 300) errors.weightKg = t('err_weight_range');

    const tgt = parseStrictNumber(form.targetWeightKg);
    if (tgt === null) errors.targetWeightKg = t('err_target');
    else if (tgt < 35 || tgt > 250) errors.targetWeightKg = t('err_target_range');

    if (w !== null && tgt !== null && tgt >= w) {
      errors.targetWeightKg = t('err_target_lower');
    }
  }

  if (step === 'q3_duration' && !form.duration) {
    errors.duration = t('err_choose_one');
  }

  if (step === 'q4_past_attempts' && form.pastAttempts.length === 0) {
    errors.pastAttempts = t('err_select_one');
  }

  if (step === 'q5_exercise_challenges' && form.exerciseChallenges.length === 0) {
    errors.exerciseChallenges = t('err_select_one');
  }

  if (step === 'q6_eating_challenges' && form.eatingChallenges.length === 0) {
    errors.eatingChallenges = t('err_select_one');
  }

  if (step === 'q7_maintenance' && !form.maintenanceChallenge) {
    errors.maintenanceChallenge = t('err_choose_one');
  }

  if (step === 'q8_critical' && !form.criticalConditionsAnswer) {
    errors.criticalConditionsAnswer = t('err_yes_no');
  }

  if (step === 'q9_history') {
    const unanswered = Object.values(form.medicalHistory).some((answer) => answer === '');
    if (unanswered) {
      errors.medicalHistory = t('err_history');
    }
  }

  if (step === 'q10_current_meds' && !form.usesCurrentMeds) {
    errors.usesCurrentMeds = t('err_yes_no');
  }

  if (step === 'q11_glp1' && !form.usesOtherGlp1) {
    errors.usesOtherGlp1 = t('err_yes_no');
  }

  if (step === 'q12_allergies' && !form.medicationAllergy) {
    errors.medicationAllergy = t('err_yes_no');
  }

  if (step === 'q13_preferences' && form.preferences.length === 0) {
    errors.preferences = t('err_preference');
  }

  if (step === 'q15_legal') {
    if (!form.legalPersonalUse) errors.legalPersonalUse = t('err_required');
    if (!form.legalOffLabel) errors.legalOffLabel = t('err_required');
    if (!form.legalTruthfulAnswers) errors.legalTruthfulAnswers = t('err_required');
    if (!form.legalGpNotification) errors.legalGpNotification = t('err_required');
  }

  return errors;
}

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-sm font-medium text-red-700">{message}</p>;
}

function Progress({ currentStep, step, t }: { currentStep: number; step: SurveyStep; t: (key: string) => string }) {
  const { phaseIndex } = getPhaseForStep(step);
  return (
    <div className="mb-6" aria-label="Survey progress" tabIndex={0}>
      {/* Phase pills */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {PHASE_KEYS.map((phase, i) => (
          <span
            key={phase.labelKey}
            className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
              i < phaseIndex ? 'bg-secondary text-white' :
              i === phaseIndex ? 'bg-secondary text-white' :
              'bg-[#F5F0E8] text-secondary/50'
            }`}
          >
            {t(phase.labelKey)}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-secondary/80">{t('step_of').replace('{current}', String(currentStep)).replace('{total}', String(STEPS.length))}</p>
        {currentStep === 1 && (
          <p className="text-xs text-secondary/50">~4 min</p>
        )}
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#F5F0E8]">
        <div
          className="h-2 rounded-full bg-secondary transition-all duration-300"
          style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

function QuestionSection({
  question,
  hint,
  children,
}: {
  question: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="rounded-lg border border-primary/20 bg-white p-4">
      <legend className="px-1 text-base font-bold text-secondary">{question}</legend>
      {hint && <p className="mb-3 text-sm text-secondary/80">{hint}</p>}
      {children}
    </fieldset>
  );
}

function SurveyOverlay({ onClose }: { onClose: () => void }) {
  const t = useTranslations('survey_flow');

  // Restore from localStorage
  const savedData = typeof window !== 'undefined'
    ? (() => { try { return JSON.parse(localStorage.getItem('velura_survey') || 'null'); } catch { return null; } })()
    : null;

  const [step, setStep] = useState<SurveyStep>(
    savedData?.step && STEPS.includes(savedData.step) ? savedData.step : 'q1_reasons'
  );
  const [form, setForm] = useState<FormState>(savedData?.form ?? initialForm);
  const [errors, setErrors] = useState<ErrorMap>({});
  const [isLoadingResult, setIsLoadingResult] = useState(false);

  // Persist to localStorage on step/form change
  useEffect(() => {
    if (step !== 'loading' && step !== 'results') {
      try {
        localStorage.setItem('velura_survey', JSON.stringify({ step, form }));
      } catch { /* quota exceeded - ignore */ }
    }
  }, [step, form]);

  // Clear saved state on completion
  const clearSaved = useCallback(() => {
    try { localStorage.removeItem('velura_survey'); } catch { /* ignore */ }
  }, []);

  const stepIndex = STEPS.indexOf(step);

  const bmi = useMemo(() => {
    const h = parseStrictNumber(form.heightCm);
    const w = parseStrictNumber(form.weightKg);
    if (h === null || w === null || h <= 0) return null;
    const heightMeters = h / 100;
    const result = w / (heightMeters * heightMeters);
    return Math.round(result * 10) / 10;
  }, [form.heightCm, form.weightKg]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (step !== 'loading') return;
    setIsLoadingResult(true);
    const timer = window.setTimeout(() => {
      setIsLoadingResult(false);
      setStep('results');
    }, 1100);
    return () => window.clearTimeout(timer);
  }, [step]);

  const updateField = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  }, []);

  const updateMedicalHistory = useCallback((item: string, answer: YesNo) => {
    setForm((prev) => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        [item]: answer,
      },
    }));
    setErrors((prev) => {
      if (!prev.medicalHistory) return prev;
      const next = { ...prev };
      delete next.medicalHistory;
      return next;
    });
  }, []);

  const handleNext = () => {
    const nextErrors = getStepErrors(step, form, t);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (step === 'q15_legal') {
      setStep('loading');
      clearSaved();
      return;
    }

    const currentIndex = STEPS.indexOf(step);
    const nextStep = STEPS[currentIndex + 1];
    if (nextStep) setStep(nextStep);
  };

  const handleBack = () => {
    if (step === 'loading' || step === 'results') return;
    const currentIndex = STEPS.indexOf(step);
    if (currentIndex > 0) {
      setErrors({});
      setStep(STEPS[currentIndex - 1]);
    }
  };

  const questionContent = () => {
    switch (step) {
      case 'q1_reasons':
        return (
          <QuestionSection
            question={t('q1_title')}
            hint={t('q1_hint')}
          >
            <div className="grid gap-2">
              {REASON_KEYS.map((key) => (
                  <label key={key} htmlFor={`reason-${key}`} className="flex cursor-pointer items-start gap-3 rounded-md border border-primary/20 p-3 text-secondary hover:bg-[#FAF8F4]">
                    <input
                      id={`reason-${key}`}
                      type="checkbox"
                      tabIndex={0}
                      checked={form.reasons.includes(key)}
                      onChange={() => updateField('reasons', toggleArrayValue(form.reasons, key))}
                      className="mt-0.5 h-4 w-4 accent-primary"
                      aria-label={t(key)}
                    />
                    <span className="text-sm font-medium">{t(key)}</span>
                  </label>
              ))}
            </div>
            <ErrorText message={errors.reasons} />
          </QuestionSection>
        );

      case 'q2_bio':
        return (
          <QuestionSection question={t('q2_title')}>
            <fieldset className="mb-4 rounded-md border border-primary/20 p-3">
              <legend className="px-1 text-sm font-semibold text-secondary">{t('gender_label')}</legend>
              <div className="grid grid-cols-2 gap-2">
                <label htmlFor="gender-male" className="flex cursor-pointer items-center gap-2 rounded border border-primary/20 p-2 text-sm hover:bg-[#FAF8F4]">
                  <input
                    id="gender-male"
                    name="gender"
                    type="radio"
                    tabIndex={0}
                    checked={form.gender === 'male'}
                    onChange={() => updateField('gender', 'male')}
                    className="h-4 w-4 accent-primary"
                  />
                  {t('gender_male')}
                </label>
                <label htmlFor="gender-female" className="flex cursor-pointer items-center gap-2 rounded border border-primary/20 p-2 text-sm hover:bg-[#FAF8F4]">
                  <input
                    id="gender-female"
                    name="gender"
                    type="radio"
                    tabIndex={0}
                    checked={form.gender === 'female'}
                    onChange={() => updateField('gender', 'female')}
                    className="h-4 w-4 accent-primary"
                  />
                  {t('gender_female')}
                </label>
              </div>
              <ErrorText message={errors.gender} />
            </fieldset>

            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label htmlFor="heightCm" className="mb-1 block text-sm font-semibold text-secondary">{t('height_label')}</label>
                <input
                  id="heightCm"
                  type="text"
                  inputMode="numeric"
                  tabIndex={0}
                  value={form.heightCm}
                  onChange={(event) => updateField('heightCm', sanitizeInteger(event.target.value))}
                  className="w-full rounded-md border border-primary/20 px-3 py-2 text-secondary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  aria-label={t('height_label')}
                />
                <ErrorText message={errors.heightCm} />
              </div>

              <div>
                <label htmlFor="weightKg" className="mb-1 block text-sm font-semibold text-secondary">{t('weight_label')}</label>
                <input
                  id="weightKg"
                  type="text"
                  inputMode="decimal"
                  tabIndex={0}
                  value={form.weightKg}
                  onChange={(event) => updateField('weightKg', sanitizeDecimal(event.target.value))}
                  className="w-full rounded-md border border-primary/20 px-3 py-2 text-secondary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  aria-label={t('weight_label')}
                />
                <ErrorText message={errors.weightKg} />
              </div>

              <div>
                <label htmlFor="targetWeightKg" className="mb-1 block text-sm font-semibold text-secondary">{t('target_label')}</label>
                <input
                  id="targetWeightKg"
                  type="text"
                  inputMode="decimal"
                  tabIndex={0}
                  value={form.targetWeightKg}
                  onChange={(event) => updateField('targetWeightKg', sanitizeDecimal(event.target.value))}
                  className="w-full rounded-md border border-primary/20 px-3 py-2 text-secondary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  aria-label={t('target_label')}
                />
                <ErrorText message={errors.targetWeightKg} />
              </div>
            </div>
          </QuestionSection>
        );

      case 'q3_duration':
        return (
          <QuestionSection question={t('q3_title')}>
            <div className="grid gap-2">
              {DURATION_KEYS.map((key) => (
                  <label key={key} htmlFor={`duration-${key}`} className="flex cursor-pointer items-center gap-3 rounded-md border border-primary/20 p-3 hover:bg-[#FAF8F4]">
                    <input
                      id={`duration-${key}`}
                      name="duration"
                      type="radio"
                      tabIndex={0}
                      checked={form.duration === key}
                      onChange={() => updateField('duration', key)}
                      className="h-4 w-4 accent-primary"
                    />
                    <span className="text-sm font-medium text-secondary">{t(key)}</span>
                  </label>
              ))}
            </div>
            <ErrorText message={errors.duration} />
          </QuestionSection>
        );

      case 'q4_past_attempts':
        return (
          <QuestionSection question={t('q4_title')}>
            <div className="grid gap-2">
              {PAST_ATTEMPT_KEYS.map((key) => (
                  <label key={key} htmlFor={`past-${key}`} className="flex cursor-pointer items-start gap-3 rounded-md border border-primary/20 p-3 hover:bg-[#FAF8F4]">
                    <input
                      id={`past-${key}`}
                      type="checkbox"
                      tabIndex={0}
                      checked={form.pastAttempts.includes(key)}
                      onChange={() => updateField('pastAttempts', toggleArrayValue(form.pastAttempts, key))}
                      className="mt-0.5 h-4 w-4 accent-primary"
                      aria-label={t(key)}
                    />
                    <span className="text-sm font-medium text-secondary">{t(key)}</span>
                  </label>
              ))}
            </div>
            <ErrorText message={errors.pastAttempts} />
          </QuestionSection>
        );

      case 'q5_exercise_challenges':
        return (
          <QuestionSection question={t('q5_title')}>
            <div className="grid gap-2">
              {EXERCISE_CHALLENGE_KEYS.map((key) => (
                  <label key={key} htmlFor={`exercise-${key}`} className="flex cursor-pointer items-start gap-3 rounded-md border border-primary/20 p-3 hover:bg-[#FAF8F4]">
                    <input
                      id={`exercise-${key}`}
                      type="checkbox"
                      tabIndex={0}
                      checked={form.exerciseChallenges.includes(key)}
                      onChange={() => updateField('exerciseChallenges', toggleArrayValue(form.exerciseChallenges, key))}
                      className="mt-0.5 h-4 w-4 accent-primary"
                      aria-label={t(key)}
                    />
                    <span className="text-sm font-medium text-secondary">{t(key)}</span>
                  </label>
              ))}
            </div>
            <ErrorText message={errors.exerciseChallenges} />
          </QuestionSection>
        );

      case 'q6_eating_challenges':
        return (
          <QuestionSection question={t('q6_title')}>
            <div className="grid gap-2">
              {EATING_CHALLENGE_KEYS.map((key) => (
                  <label key={key} htmlFor={`eating-${key}`} className="flex cursor-pointer items-start gap-3 rounded-md border border-primary/20 p-3 hover:bg-[#FAF8F4]">
                    <input
                      id={`eating-${key}`}
                      type="checkbox"
                      tabIndex={0}
                      checked={form.eatingChallenges.includes(key)}
                      onChange={() => updateField('eatingChallenges', toggleArrayValue(form.eatingChallenges, key))}
                      className="mt-0.5 h-4 w-4 accent-primary"
                      aria-label={t(key)}
                    />
                    <span className="text-sm font-medium text-secondary">{t(key)}</span>
                  </label>
              ))}
            </div>
            <ErrorText message={errors.eatingChallenges} />
          </QuestionSection>
        );

      case 'q7_maintenance':
        return (
          <QuestionSection question={t('q7_title')}>
            <div className="grid gap-2">
              {MAINTENANCE_KEYS.map((key) => (
                  <label key={key} htmlFor={`maintenance-${key}`} className="flex cursor-pointer items-center gap-3 rounded-md border border-primary/20 p-3 hover:bg-[#FAF8F4]">
                    <input
                      id={`maintenance-${key}`}
                      name="maintenance"
                      type="radio"
                      tabIndex={0}
                      checked={form.maintenanceChallenge === key}
                      onChange={() => updateField('maintenanceChallenge', key)}
                      className="h-4 w-4 accent-primary"
                    />
                    <span className="text-sm font-medium text-secondary">{t(key)}</span>
                  </label>
              ))}
            </div>
            <ErrorText message={errors.maintenanceChallenge} />
          </QuestionSection>
        );

      case 'q8_critical':
        return (
          <QuestionSection question={t('q8_title')}>
            <ul className="mb-3 list-disc space-y-1 pl-5 text-sm text-secondary/90">
              {CRITICAL_CONDITION_KEYS.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
            <fieldset className="rounded-md border border-primary/20 p-3">
              <legend className="px-1 text-sm font-semibold text-secondary">{t('answer_label')}</legend>
              <div className="flex gap-2">
                <label htmlFor="critical-yes" className="flex cursor-pointer items-center gap-2 rounded border border-primary/20 px-3 py-2 text-sm hover:bg-[#FAF8F4]">
                  <input
                    id="critical-yes"
                    name="criticalConditions"
                    type="radio"
                    tabIndex={0}
                    checked={form.criticalConditionsAnswer === 'yes'}
                    onChange={() => updateField('criticalConditionsAnswer', 'yes')}
                    className="h-4 w-4 accent-primary"
                  />
                  {t('yes')}
                </label>
                <label htmlFor="critical-no" className="flex cursor-pointer items-center gap-2 rounded border border-primary/20 px-3 py-2 text-sm hover:bg-[#FAF8F4]">
                  <input
                    id="critical-no"
                    name="criticalConditions"
                    type="radio"
                    tabIndex={0}
                    checked={form.criticalConditionsAnswer === 'no'}
                    onChange={() => updateField('criticalConditionsAnswer', 'no')}
                    className="h-4 w-4 accent-primary"
                  />
                  {t('no')}
                </label>
              </div>
            </fieldset>
            <ErrorText message={errors.criticalConditionsAnswer} />
          </QuestionSection>
        );

      case 'q9_history':
        return (
          <QuestionSection question={t('q9_title')}>
            <div className="space-y-2">
              {HISTORY_KEYS.map((key) => (
                <fieldset key={key} className="rounded-md border border-primary/20 p-3">
                  <legend className="px-1 text-sm font-semibold text-secondary">{t(key)}</legend>
                  <div className="flex gap-2">
                    <label htmlFor={`history-${key}-yes`} className="flex cursor-pointer items-center gap-2 rounded border border-primary/20 px-3 py-1.5 text-sm hover:bg-[#FAF8F4]">
                      <input
                        id={`history-${key}-yes`}
                        name={`history-${key}`}
                        type="radio"
                        tabIndex={0}
                        checked={form.medicalHistory[key] === 'yes'}
                        onChange={() => updateMedicalHistory(key, 'yes')}
                        className="h-4 w-4 accent-primary"
                        aria-label={`${t(key)} ${t('yes')}`}
                      />
                      {t('yes')}
                    </label>
                    <label htmlFor={`history-${key}-no`} className="flex cursor-pointer items-center gap-2 rounded border border-primary/20 px-3 py-1.5 text-sm hover:bg-[#FAF8F4]">
                      <input
                        id={`history-${key}-no`}
                        name={`history-${key}`}
                        type="radio"
                        tabIndex={0}
                        checked={form.medicalHistory[key] === 'no'}
                        onChange={() => updateMedicalHistory(key, 'no')}
                        className="h-4 w-4 accent-primary"
                        aria-label={`${t(key)} ${t('no')}`}
                      />
                      {t('no')}
                    </label>
                  </div>
                </fieldset>
              ))}
            </div>
            <ErrorText message={errors.medicalHistory} />
          </QuestionSection>
        );

      case 'q10_current_meds':
        return (
          <QuestionSection question={t('q10_title')}>
            <div className="flex gap-2">
              <label htmlFor="meds-yes" className="flex cursor-pointer items-center gap-2 rounded border border-primary/20 px-3 py-2 text-sm hover:bg-[#FAF8F4]">
                <input
                  id="meds-yes"
                  name="currentMeds"
                  type="radio"
                  tabIndex={0}
                  checked={form.usesCurrentMeds === 'yes'}
                  onChange={() => updateField('usesCurrentMeds', 'yes')}
                  className="h-4 w-4 accent-primary"
                />
                {t('yes')}
              </label>
              <label htmlFor="meds-no" className="flex cursor-pointer items-center gap-2 rounded border border-primary/20 px-3 py-2 text-sm hover:bg-[#FAF8F4]">
                <input
                  id="meds-no"
                  name="currentMeds"
                  type="radio"
                  tabIndex={0}
                  checked={form.usesCurrentMeds === 'no'}
                  onChange={() => updateField('usesCurrentMeds', 'no')}
                  className="h-4 w-4 accent-primary"
                />
                {t('no')}
              </label>
            </div>
            <ErrorText message={errors.usesCurrentMeds} />
          </QuestionSection>
        );

      case 'q11_glp1':
        return (
          <QuestionSection question={t('q11_title')}>
            <div className="flex gap-2">
              <label htmlFor="glp1-yes" className="flex cursor-pointer items-center gap-2 rounded border border-primary/20 px-3 py-2 text-sm hover:bg-[#FAF8F4]">
                <input
                  id="glp1-yes"
                  name="glp1"
                  type="radio"
                  tabIndex={0}
                  checked={form.usesOtherGlp1 === 'yes'}
                  onChange={() => updateField('usesOtherGlp1', 'yes')}
                  className="h-4 w-4 accent-primary"
                />
                {t('yes')}
              </label>
              <label htmlFor="glp1-no" className="flex cursor-pointer items-center gap-2 rounded border border-primary/20 px-3 py-2 text-sm hover:bg-[#FAF8F4]">
                <input
                  id="glp1-no"
                  name="glp1"
                  type="radio"
                  tabIndex={0}
                  checked={form.usesOtherGlp1 === 'no'}
                  onChange={() => updateField('usesOtherGlp1', 'no')}
                  className="h-4 w-4 accent-primary"
                />
                {t('no')}
              </label>
            </div>
            <ErrorText message={errors.usesOtherGlp1} />
          </QuestionSection>
        );

      case 'q12_allergies':
        return (
          <QuestionSection question={t('q12_title')}>
            <div className="flex gap-2">
              <label htmlFor="allergy-yes" className="flex cursor-pointer items-center gap-2 rounded border border-primary/20 px-3 py-2 text-sm hover:bg-[#FAF8F4]">
                <input
                  id="allergy-yes"
                  name="allergies"
                  type="radio"
                  tabIndex={0}
                  checked={form.medicationAllergy === 'yes'}
                  onChange={() => updateField('medicationAllergy', 'yes')}
                  className="h-4 w-4 accent-primary"
                />
                {t('yes')}
              </label>
              <label htmlFor="allergy-no" className="flex cursor-pointer items-center gap-2 rounded border border-primary/20 px-3 py-2 text-sm hover:bg-[#FAF8F4]">
                <input
                  id="allergy-no"
                  name="allergies"
                  type="radio"
                  tabIndex={0}
                  checked={form.medicationAllergy === 'no'}
                  onChange={() => updateField('medicationAllergy', 'no')}
                  className="h-4 w-4 accent-primary"
                />
                {t('no')}
              </label>
            </div>
            <ErrorText message={errors.medicationAllergy} />
          </QuestionSection>
        );

      case 'q13_preferences':
        return (
          <QuestionSection question={t('q13_title')}>
            <div className="grid gap-2">
              {PREFERENCE_KEYS.map((key) => (
                  <label key={key} htmlFor={`pref-${key}`} className="flex cursor-pointer items-start gap-3 rounded-md border border-primary/20 p-3 hover:bg-[#FAF8F4]">
                    <input
                      id={`pref-${key}`}
                      type="checkbox"
                      tabIndex={0}
                      checked={form.preferences.includes(key)}
                      onChange={() => updateField('preferences', toggleArrayValue(form.preferences, key))}
                      className="mt-0.5 h-4 w-4 accent-primary"
                      aria-label={t(key)}
                    />
                    <span className="text-sm font-medium text-secondary">{t(key)}</span>
                  </label>
              ))}
            </div>
            <ErrorText message={errors.preferences} />
          </QuestionSection>
        );

      case 'q14_marketing':
        return (
          <QuestionSection
            question={t('q14_title')}
            hint={t('q14_hint')}
          >
            <label htmlFor="marketing-opt-in" className="flex cursor-pointer items-start gap-3 rounded-md border border-primary/20 p-3 hover:bg-[#FAF8F4]">
              <input
                id="marketing-opt-in"
                type="checkbox"
                tabIndex={0}
                checked={form.marketingOptIn}
                onChange={() => updateField('marketingOptIn', !form.marketingOptIn)}
                className="mt-0.5 h-4 w-4 accent-primary"
                aria-label={t('marketing_opt_in')}
              />
              <span className="text-sm font-medium text-secondary">{t('marketing_opt_in')}</span>
            </label>
          </QuestionSection>
        );

      case 'q15_legal':
        return (
          <QuestionSection question={t('q15_title')}>
            <p className="mb-3 text-sm text-secondary/80">{t('q15_hint')}</p>
            <div className="grid gap-2">
              <label htmlFor="legal-personal-use" className="flex cursor-pointer items-start gap-3 rounded-md border border-primary/20 p-3 hover:bg-[#FAF8F4]">
                <input
                  id="legal-personal-use"
                  type="checkbox"
                  tabIndex={0}
                  checked={form.legalPersonalUse}
                  onChange={() => updateField('legalPersonalUse', !form.legalPersonalUse)}
                  className="mt-0.5 h-4 w-4 accent-primary"
                />
                <span className="text-sm font-medium text-secondary">{t('legal_personal_use')}</span>
              </label>
              <ErrorText message={errors.legalPersonalUse} />

              <label htmlFor="legal-off-label" className="flex cursor-pointer items-start gap-3 rounded-md border border-primary/20 p-3 hover:bg-[#FAF8F4]">
                <input
                  id="legal-off-label"
                  type="checkbox"
                  tabIndex={0}
                  checked={form.legalOffLabel}
                  onChange={() => updateField('legalOffLabel', !form.legalOffLabel)}
                  className="mt-0.5 h-4 w-4 accent-primary"
                />
                <span className="text-sm font-medium text-secondary">{t('legal_off_label')}</span>
              </label>
              <ErrorText message={errors.legalOffLabel} />

              <label htmlFor="legal-truthful" className="flex cursor-pointer items-start gap-3 rounded-md border border-primary/20 p-3 hover:bg-[#FAF8F4]">
                <input
                  id="legal-truthful"
                  type="checkbox"
                  tabIndex={0}
                  checked={form.legalTruthfulAnswers}
                  onChange={() => updateField('legalTruthfulAnswers', !form.legalTruthfulAnswers)}
                  className="mt-0.5 h-4 w-4 accent-primary"
                />
                <span className="text-sm font-medium text-secondary">{t('legal_truthful')}</span>
              </label>
              <ErrorText message={errors.legalTruthfulAnswers} />

              <label htmlFor="legal-gp" className="flex cursor-pointer items-start gap-3 rounded-md border border-primary/20 p-3 hover:bg-[#FAF8F4]">
                <input
                  id="legal-gp"
                  type="checkbox"
                  tabIndex={0}
                  checked={form.legalGpNotification}
                  onChange={() => updateField('legalGpNotification', !form.legalGpNotification)}
                  className="mt-0.5 h-4 w-4 accent-primary"
                />
                <span className="text-sm font-medium text-secondary">{t('legal_gp')}</span>
              </label>
              <ErrorText message={errors.legalGpNotification} />
            </div>
          </QuestionSection>
        );

      case 'loading':
        return (
          <div className="rounded-lg border border-primary/20 bg-white p-8 text-center" aria-live="polite">
            <h2 className="mb-2 text-xl font-bold text-secondary">{t('loading_title')}</h2>
            <p className="mb-4 text-sm text-secondary/80">{t('loading_desc')}</p>
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" aria-label={t('loading_title')} />
          </div>
        );

      case 'results':
        return (
          <section className="rounded-lg border border-primary/20 bg-white p-6" aria-live="polite">
            {form.criticalConditionsAnswer === 'yes' ? (
              /* ── Empathetic disqualification ────────── */
              <>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/30">
                  <span className="text-2xl">🤝</span>
                </div>
                <h2 className="mb-2 text-xl font-bold text-secondary">{t('results_not_eligible_title')}</h2>
                <p className="mb-4 text-sm leading-relaxed text-secondary/80">
                  {t('results_not_eligible_desc')}
                </p>
                <div className="mb-4 rounded-md border border-primary/10 bg-[#FAF8F4] p-4 space-y-2">
                  <p className="text-sm font-semibold text-secondary">{t('results_recommend')}</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-secondary/80">
                    <li>{t('results_recommend_gp')}</li>
                    <li>{t('results_recommend_lifestyle')}</li>
                    <li>{t('results_recommend_contact')}</li>
                  </ul>
                </div>
                <a
                  href="/contact"
                  className="inline-block rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-white hover:bg-secondary/90"
                >
                  {t('book_consultation')}
                </a>
              </>
            ) : (
              /* ── Qualified results ────────── */
              <>
                <h2 className="mb-2 text-xl font-bold text-secondary">{t('results_title')}</h2>
                <p className="mb-4 text-sm text-secondary/80">
                  {t('results_eligible_desc')}
                </p>
                <div className="mb-4 rounded-md border border-primary/20 bg-[#FAF8F4] p-3">
                  <p className="text-sm font-semibold text-secondary">{t('results_bmi')}</p>
                  <p className="text-2xl font-bold text-secondary">{bmi ?? t('results_na')}</p>
                </div>
                <div className="space-y-1 text-sm text-secondary/90">
                  <p>{t('results_critical')}<strong>{t('no')}</strong></p>
                  <p>{t('results_meds')}<strong>{form.usesCurrentMeds === 'yes' ? t('yes') : t('no')}</strong></p>
                  <p>{t('results_glp1')}<strong>{form.usesOtherGlp1 === 'yes' ? t('yes') : t('no')}</strong></p>
                </div>
              </>
            )}
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/60 p-0 md:items-center md:p-6">
      <div
        className="absolute inset-0"
        aria-hidden="true"
      />

      <section
        className="relative z-10 flex h-[100dvh] w-full max-w-3xl flex-col bg-page-shape text-secondary md:h-[90vh] md:rounded-xl md:shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={t('dialog_aria')}
        tabIndex={0}
      >
        <header className="flex items-center justify-between border-b border-primary/20 bg-white px-5 py-4">
          <h1 className="text-lg font-bold text-secondary">{t('dialog_title')}</h1>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-primary/20 bg-white p-2 text-secondary hover:bg-[#F5F0E8] focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-label={t('close')}
            tabIndex={0}
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5">
          {step !== 'loading' && step !== 'results' && <Progress currentStep={stepIndex + 1} step={step} t={t} />}
          {questionContent()}
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-primary/20 bg-white px-5 py-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={stepIndex <= 0 || step === 'loading' || step === 'results'}
            className="rounded-md border border-primary/20 bg-white px-4 py-2 text-sm font-semibold text-secondary disabled:cursor-not-allowed disabled:opacity-50"
            tabIndex={0}
          >
            {t('back')}
          </button>

          {step !== 'results' && (
            <button
              type="button"
              onClick={handleNext}
              disabled={step === 'loading' || isLoadingResult}
              className="rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-white hover:bg-secondary/90 disabled:cursor-not-allowed disabled:bg-primary/50"
              tabIndex={0}
            >
              {step === 'q15_legal' ? t('submit') : t('next')}
            </button>
          )}

          {step === 'results' && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-white hover:bg-secondary/90"
              tabIndex={0}
            >
              {t('close')}
            </button>
          )}
        </footer>
      </section>
    </div>
  );
}

export function SurveyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <SurveyCtx.Provider value={{ open }}>
      {children}
      {isOpen && <SurveyOverlay onClose={close} />}
    </SurveyCtx.Provider>
  );
}

export function SurveyTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const { open } = useSurvey();

  return (
    <button type="button" onClick={open} className={className} tabIndex={0}>
      {children}
    </button>
  );
}
