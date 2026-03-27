'use client';

import {
  useState, useCallback, useMemo, useEffect, useRef,
  createContext, useContext, type ReactNode, type ElementType,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { EASE_PREMIUM } from '@/lib/motion';
import {
  ArrowRight, ArrowLeft, User, Ruler, Weight, Calendar, Target,
  Heart, ShieldAlert, Mail, Phone, CheckCircle2, XCircle,
  Activity, Scale, X, Shield, Stethoscope, Package, HeartPulse, Star,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════
   Context — any CTA on the page can open the survey
   ═══════════════════════════════════════════════════ */
const SurveyCtx = createContext<{ open: () => void }>({ open: () => {} });
export const useSurvey = () => useContext(SurveyCtx);

/* ═══════════════════════════════════════════════════
   Provider — wraps the app, renders the overlay
   ═══════════════════════════════════════════════════ */
export function SurveyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [close]);

  return (
    <SurveyCtx.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && <SurveyOverlay onClose={close} />}
      </AnimatePresence>
    </SurveyCtx.Provider>
  );
}

/* ═══════════════════════════════════════════════════
   Trigger — reusable button that opens the survey
   ═══════════════════════════════════════════════════ */
export function SurveyTrigger({ children, className }: { children: ReactNode; className?: string }) {
  const { open } = useSurvey();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════════════
   Shared UI — OUTSIDE the overlay to avoid re-creation
   ═══════════════════════════════════════════════════ */
function SurveyOption({ selected, onClick, children }: {
  selected: boolean; onClick: () => void; children: ReactNode;
}) {
  return (
    <button type="button" onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-md border-2 transition-all duration-200 font-sans text-sm active:scale-[0.98] ${
        selected
          ? 'border-primary bg-primary/10 text-secondary'
          : 'border-secondary/10 bg-white text-secondary/70 active:border-primary/40'
      }`}>
      <span className="flex items-center justify-between">
        <span>{children}</span>
        {selected && <CheckCircle2 size={18} className="text-primary shrink-0" />}
      </span>
    </button>
  );
}

function SurveyCheck({ on, onClick, children }: {
  on: boolean; onClick: () => void; children: ReactNode;
}) {
  return (
    <button type="button" onClick={onClick}
      className={`w-full text-left px-4 py-3.5 rounded-md border-2 transition-all duration-200 font-sans text-sm active:scale-[0.98] ${
        on ? 'border-primary bg-primary/10 text-secondary' : 'border-secondary/10 bg-white text-secondary/70'
      }`}>
      <span className="flex items-center gap-3">
        <span className={`w-5 h-5 rounded shrink-0 border-2 flex items-center justify-center transition-all ${
          on ? 'border-primary bg-primary' : 'border-secondary/20'
        }`}>
          {on && <CheckCircle2 size={12} className="text-white" />}
        </span>
        <span className="leading-snug">{children}</span>
      </span>
    </button>
  );
}

function SurveyInput({ icon: Ic, label, value, onChange, inputMode, placeholder, unit, autoFocus, type, error }: {
  icon: ElementType; label: string; value: string;
  onChange: (v: string) => void; type?: string;
  inputMode?: 'numeric' | 'decimal' | 'text' | 'email' | 'tel';
  placeholder?: string; unit?: string; autoFocus?: boolean; error?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);

  // Derive the best <input type> for the field:
  // "tel" avoids Android IME auto-completion blur for integer numeric fields.
  const resolvedType = type ?? (inputMode === 'numeric' ? 'tel' : 'text');

  useEffect(() => {
    if (autoFocus && ref.current) {
      // Wait for modal + step-transition animations to finish before focusing.
      const id = setTimeout(() => {
        ref.current?.focus();
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 400);
      return () => clearTimeout(id);
    }
  }, [autoFocus]);

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-secondary/50">
        <Ic size={13} /> {label}
      </label>
      <div className="relative">
        <input
          ref={ref}
          type={resolvedType}
          inputMode={inputMode}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-invalid={!!error}
          aria-describedby={error ? `${label}-error` : undefined}
          className={`w-full px-4 py-3.5 rounded-md border-2 bg-white font-sans
            text-secondary text-base focus:ring-2 focus:ring-primary/20
            outline-none transition-all cursor-text ${
            error
              ? 'border-red-400 focus:border-red-500'
              : 'border-secondary/10 focus:border-primary'
          }`}
        />
        {unit && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-sans text-secondary/30 uppercase pointer-events-none">
            {unit}
          </span>
        )}
      </div>
      {error && (
        <p id={`${label}-error`} role="alert" className="text-xs font-sans text-red-500 leading-snug pt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}

function StepHeader({ icon: Ic, label, title, center }: {
  icon: ElementType; label: string; title: string; center?: boolean;
}) {
  return (
    <div className={center ? 'text-center' : ''}>
      <div className={`flex items-center gap-2 mb-2 ${center ? 'justify-center' : ''}`}>
        <Ic size={14} className="text-primary" />
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-secondary/40 font-semibold">
          {label}
        </span>
      </div>
      <h2 className="font-display text-2xl md:text-3xl text-secondary italic">{title}</h2>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Types & Constants
   ═══════════════════════════════════════════════════ */
type Sex = 'male' | 'female' | '';
type Step =
  | 'welcome' | 'sex' | 'age' | 'height' | 'weight'
  | 'bmi_result' | 'target_weight' | 'previous_attempts'
  | 'comorbidities' | 'contraindications' | 'contact'
  | 'disqualified' | 'qualified';

interface FormState {
  sex: Sex; age: string; height: string; weight: string; targetWeight: string;
  previousAttempts: string[]; comorbidities: string[]; contraindications: string[];
  firstName: string; lastName: string; email: string; phone: string; consent: boolean;
}

type DqReason = 'age' | 'bmi_low' | 'bmi_27_no_comorbidity' | 'contraindication';

const PREV_KEYS = ['diets', 'exercise', 'otc_supplements', 'other_rx', 'none'] as const;
const COMORBID_KEYS = ['diabetes_type2', 'high_bp', 'high_cholesterol', 'sleep_apnea', 'pcos'] as const;
const CONTRA_KEYS = ['pregnant', 'mtc_men2', 'eating_disorder'] as const;

const STEP_ORDER: Step[] = [
  'welcome', 'sex', 'age', 'height', 'weight', 'bmi_result',
  'target_weight', 'previous_attempts', 'comorbidities',
  'contraindications', 'contact',
];

/* Slide-up-fade — premium feel without disrupting keyboard/focus */
const stepVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

/* ═══════════════════════════════════════════════════
   The Survey Overlay
   ═══════════════════════════════════════════════════ */

const SURVEY_STORAGE_KEY = 'fab_survey_v2';

const DEFAULT_FORM: FormState = {
  sex: '', age: '', height: '', weight: '', targetWeight: '',
  previousAttempts: [], comorbidities: [], contraindications: [],
  firstName: '', lastName: '', email: '', phone: '', consent: false,
};

function readPersistedState(): { form: FormState; step: Step } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SURVEY_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Only restore navigable steps, not terminal states
    const step: Step = STEP_ORDER.includes(parsed.step) ? parsed.step : 'welcome';
    return { form: { ...DEFAULT_FORM, ...parsed.form }, step };
  } catch {
    return null;
  }
}

function SurveyOverlay({ onClose }: { onClose: () => void }) {
  const t = useTranslations('survey');
  const tQ = useTranslations('qualified');

  const persisted = useMemo(() => readPersistedState(), []);

  const [step, setStep] = useState<Step>(persisted?.step ?? 'welcome');
  const [dqReason, setDqReason] = useState<DqReason | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [f, setF] = useState<FormState>(persisted?.form ?? DEFAULT_FORM);

  // Persist form state + step to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(SURVEY_STORAGE_KEY, JSON.stringify({ form: f, step }));
    } catch {
      // localStorage may be unavailable (private mode, full quota)
    }
  }, [f, step]);

  /* ── Helpers ─── */
  const bmi = useMemo(() => {
    const h = parseFloat(f.height) / 100;
    const w = parseFloat(f.weight);
    return h > 0 && w > 0 ? Math.round((w / (h * h)) * 10) / 10 : 0;
  }, [f.height, f.weight]);

  const idx = STEP_ORDER.indexOf(step);
  const pct = step === 'disqualified' || step === 'qualified'
    ? 100
    : Math.round(((idx + 1) / STEP_ORDER.length) * 100);

  const upd = useCallback(<K extends keyof FormState>(k: K, v: FormState[K]) =>
    setF((p) => ({ ...p, [k]: v })), []);

  const tog = useCallback(
    (k: 'previousAttempts' | 'comorbidities' | 'contraindications', v: string) =>
      setF((p) => ({
        ...p,
        [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v],
      })),
    [],
  );

  const go = useCallback((s: Step) => setStep(s), []);
  const dq = useCallback((r: DqReason) => { setDqReason(r); go('disqualified'); }, [go]);

  /* ── Navigation logic ─── */
  const next = useCallback(() => {
    switch (step) {
      case 'welcome': go('sex'); break;
      case 'sex': go('age'); break;
      case 'age': {
        const a = parseInt(f.age, 10);
        if (isNaN(a) || a < 18) { dq('age'); return; }
        go('height');
        break;
      }
      case 'height': go('weight'); break;
      case 'weight': {
        const h = parseFloat(f.height) / 100;
        const w = parseFloat(f.weight);
        if (h > 0 && w / (h * h) < 27) { dq('bmi_low'); return; }
        go('bmi_result');
        break;
      }
      case 'bmi_result': go('target_weight'); break;
      case 'target_weight': go('previous_attempts'); break;
      case 'previous_attempts': go('comorbidities'); break;
      case 'comorbidities': {
        if (bmi < 30 && f.comorbidities.length === 0) { dq('bmi_27_no_comorbidity'); return; }
        go('contraindications');
        break;
      }
      case 'contraindications': {
        if (f.contraindications.length > 0) { dq('contraindication'); return; }
        go('contact');
        break;
      }
    }
  }, [step, f, bmi, go, dq]);

  const back = useCallback(() => {
    if (idx > 0) go(STEP_ORDER[idx - 1]);
  }, [idx, go]);

  const submit = useCallback(async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    try { localStorage.removeItem(SURVEY_STORAGE_KEY); } catch { /* ignore */ }
    go('qualified');
    setSubmitting(false);
  }, [go]);

  /* ── Validation ─── */
  const valid = useMemo(() => {
    switch (step) {
      case 'welcome': return true;
      case 'sex': return f.sex !== '';
      case 'age': {
        const a = parseInt(f.age, 10);
        return !isNaN(a) && a >= 18 && a < 120;
      }
      case 'height': {
        const h = parseFloat(f.height);
        return !isNaN(h) && h >= 100 && h <= 250;
      }
      case 'weight': {
        const w = parseFloat(f.weight);
        return !isNaN(w) && w >= 30 && w <= 300;
      }
      case 'bmi_result': return true;
      case 'target_weight': {
        const tw = parseFloat(f.targetWeight);
        const w = parseFloat(f.weight);
        return !isNaN(tw) && tw >= 30 && tw < w;
      }
      case 'previous_attempts': return f.previousAttempts.length > 0;
      case 'comorbidities': return true;
      case 'contraindications': return true;
      case 'contact':
        return (
          f.firstName.trim().length > 0 &&
          f.lastName.trim().length > 0 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email) &&
          f.phone.trim().length >= 6 &&
          f.consent
        );
      default: return false;
    }
  }, [step, f]);

  const bmiLabel = useMemo(() => {
    if (bmi < 18.5) return t('bmi_underweight');
    if (bmi < 25) return t('bmi_healthy');
    if (bmi < 27) return t('bmi_overweight_low');
    if (bmi < 30) return t('bmi_overweight');
    if (bmi < 35) return t('bmi_obese1');
    return t('bmi_obese2');
  }, [bmi, t]);

  const bmiClr = bmi < 25 ? 'text-green-600' : bmi < 30 ? 'text-amber-600' : 'text-red-600';
  const wLoss = parseFloat(f.weight) - parseFloat(f.targetWeight);

  /* ── Digit-only filter for age & height ─── */
  const digits = (v: string) => v.replace(/[^0-9]/g, '');
  /* Allow one decimal point for weight fields */
  const decimal = (v: string) => {
    const cleaned = v.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    return parts.length <= 2 ? cleaned : parts[0] + '.' + parts.slice(1).join('');
  };

  /* ── Render current step ─── */
  const renderStep = () => {
    switch (step) {
      case 'welcome':
        return (
          <div className="text-center space-y-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Activity size={24} className="text-primary" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl text-secondary italic">
              {t('welcome_title')}
            </h2>
            <p className="font-sans font-light text-secondary/60 text-sm leading-relaxed max-w-md mx-auto">
              {t('welcome_desc')}
            </p>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {(['welcome_point1', 'welcome_point2', 'welcome_point3'] as const).map((k) => (
                <span key={k} className="flex items-center gap-1.5 text-xs text-secondary/50 font-sans">
                  <CheckCircle2 size={13} className="text-primary" /> {t(k)}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-secondary/30 font-sans">{t('welcome_time')}</p>
          </div>
        );

      case 'sex':
        return (
          <div className="space-y-5">
            <StepHeader icon={User} label={t('sex_label')} title={t('sex_title')} />
            <div className="grid grid-cols-2 gap-3">
              <SurveyOption selected={f.sex === 'male'} onClick={() => upd('sex', 'male')}>
                {t('sex_male')}
              </SurveyOption>
              <SurveyOption selected={f.sex === 'female'} onClick={() => upd('sex', 'female')}>
                {t('sex_female')}
              </SurveyOption>
            </div>
          </div>
        );

      case 'age': {
        const ageVal = parseInt(f.age, 10);
        const ageError = f.age && (isNaN(ageVal) || ageVal < 18 || ageVal > 119)
          ? t('error_age_range')
          : undefined;
        return (
          <div className="space-y-5">
            <StepHeader icon={Calendar} label={t('age_label')} title={t('age_title')} />
            <SurveyInput
              icon={Calendar} label={t('age_input_label')}
              value={f.age} onChange={(v) => upd('age', digits(v))}
              inputMode="numeric" placeholder="35" unit={t('age_unit')} autoFocus
              error={ageError}
            />
          </div>
        );
      }

      case 'height': {
        const heightVal = parseFloat(f.height);
        const heightError = f.height && (isNaN(heightVal) || heightVal < 100 || heightVal > 250)
          ? t('error_height_range')
          : undefined;
        return (
          <div className="space-y-5">
            <StepHeader icon={Ruler} label={t('height_label')} title={t('height_title')} />
            <SurveyInput
              icon={Ruler} label={t('height_input_label')}
              value={f.height} onChange={(v) => upd('height', digits(v))}
              inputMode="numeric" placeholder="175" unit="cm" autoFocus
              error={heightError}
            />
          </div>
        );
      }

      case 'weight': {
        const weightVal = parseFloat(f.weight);
        const weightError = f.weight && (isNaN(weightVal) || weightVal < 30 || weightVal > 300)
          ? t('error_weight_range')
          : undefined;
        return (
          <div className="space-y-5">
            <StepHeader icon={Weight} label={t('weight_label')} title={t('weight_title')} />
            <SurveyInput
              icon={Scale} label={t('weight_input_label')}
              value={f.weight} onChange={(v) => upd('weight', decimal(v))}
              inputMode="decimal" placeholder="85" unit="kg" autoFocus
              error={weightError}
            />
          </div>
        );
      }

      case 'bmi_result':
        return (
          <div className="space-y-6 text-center">
            <StepHeader icon={Activity} label={t('bmi_label')} title={t('bmi_title')} center />
            <div
              role="status"
              aria-live="polite"
              aria-label={`${t('bmi_your_bmi')}: ${bmi}, ${bmiLabel}`}
              className="bg-ivory rounded-md p-6 border border-secondary/5 min-h-[96px] flex flex-col items-center justify-center"
            >
              <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-secondary/40 mb-1">
                {t('bmi_your_bmi')}
              </p>
              <p className={`font-display text-5xl font-semibold tabular-nums ${bmiClr}`}>{bmi}</p>
              <p className={`font-sans text-xs mt-1 ${bmiClr}`}>{bmiLabel}</p>
            </div>
            <p className="font-sans font-light text-secondary/50 text-xs leading-relaxed max-w-sm mx-auto">
              {bmi >= 30 ? t('bmi_qualifies_directly') : t('bmi_qualifies_with_conditions')}
            </p>
          </div>
        );

      case 'target_weight': {
        const twVal = parseFloat(f.targetWeight);
        const wVal = parseFloat(f.weight);
        const twError = f.targetWeight && (isNaN(twVal) || twVal < 30)
          ? t('error_target_too_low')
          : f.targetWeight && twVal >= wVal
          ? t('error_target_not_lower')
          : undefined;
        return (
          <div className="space-y-5">
            <StepHeader icon={Target} label={t('target_label')} title={t('target_title')} />
            <SurveyInput
              icon={Target} label={t('target_input_label')}
              value={f.targetWeight} onChange={(v) => upd('targetWeight', decimal(v))}
              inputMode="decimal" placeholder="72" unit="kg" autoFocus
              error={twError}
            />
            {f.targetWeight && wLoss > 0 && !twError && (
              <p className="text-xs font-sans text-secondary/40 text-center">
                {t('target_loss_label')}:{' '}
                <span className="font-semibold text-primary">{wLoss.toFixed(1)} kg</span>
              </p>
            )}
          </div>
        );
      }

      case 'previous_attempts':
        return (
          <div className="space-y-4">
            <StepHeader icon={Heart} label={t('attempts_label')} title={t('attempts_title')} />
            <p className="font-sans font-light text-secondary/50 text-xs">{t('attempts_desc')}</p>
            <div className="space-y-2">
              {PREV_KEYS.map((k) => (
                <SurveyCheck key={k} on={f.previousAttempts.includes(k)} onClick={() => tog('previousAttempts', k)}>
                  {t(`attempts_${k}`)}
                </SurveyCheck>
              ))}
            </div>
          </div>
        );

      case 'comorbidities':
        return (
          <div className="space-y-4">
            <StepHeader icon={Heart} label={t('comorbid_label')} title={t('comorbid_title')} />
            <p className="font-sans font-light text-secondary/50 text-xs">{t('comorbid_desc')}</p>
            {bmi < 30 && (
              <div className="bg-amber-50 border border-amber-200 rounded-md px-3 py-2.5 text-[11px] font-sans text-amber-800 leading-snug">
                {t('comorbid_required_notice')}
              </div>
            )}
            <div className="space-y-2">
              {COMORBID_KEYS.map((k) => (
                <SurveyCheck key={k} on={f.comorbidities.includes(k)} onClick={() => tog('comorbidities', k)}>
                  {t(`comorbid_${k}`)}
                </SurveyCheck>
              ))}
            </div>
          </div>
        );

      case 'contraindications':
        return (
          <div className="space-y-4">
            <StepHeader icon={ShieldAlert} label={t('contra_label')} title={t('contra_title')} />
            <p className="font-sans font-light text-secondary/50 text-xs">{t('contra_desc')}</p>
            <div className="space-y-2">
              {CONTRA_KEYS.map((k) => (
                <SurveyCheck key={k} on={f.contraindications.includes(k)} onClick={() => tog('contraindications', k)}>
                  {t(`contra_${k}`)}
                </SurveyCheck>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <StepHeader icon={Mail} label={t('contact_label')} title={t('contact_title')} />
            <p className="font-sans font-light text-secondary/50 text-xs">{t('contact_desc')}</p>
            <div className="grid grid-cols-2 gap-3">
              <SurveyInput
                icon={User} label={t('contact_first')}
                value={f.firstName} onChange={(v) => upd('firstName', v)}
                placeholder="Jan" autoFocus
              />
              <SurveyInput
                icon={User} label={t('contact_last')}
                value={f.lastName} onChange={(v) => upd('lastName', v)}
                placeholder="Jansen"
              />
            </div>
            <SurveyInput
              icon={Mail} label={t('contact_email')}
              value={f.email} onChange={(v) => upd('email', v)}
              type="email" inputMode="email" placeholder="jan@voorbeeld.nl"
            />
            <SurveyInput
              icon={Phone} label={t('contact_phone')}
              value={f.phone} onChange={(v) => upd('phone', v)}
              type="tel" inputMode="tel" placeholder="+31 6 12345678"
            />
            <button
              type="button"
              onClick={() => upd('consent', !f.consent)}
              className="flex items-start gap-3 w-full text-left active:scale-[0.99] transition-transform"
            >
              <span className={`w-5 h-5 mt-0.5 rounded shrink-0 border-2 flex items-center justify-center transition-all ${
                f.consent ? 'border-primary bg-primary' : 'border-secondary/20'
              }`}>
                {f.consent && <CheckCircle2 size={12} className="text-white" />}
              </span>
              <span className="font-sans text-[11px] text-secondary/50 leading-relaxed">
                {t('contact_consent')}
              </span>
            </button>
          </div>
        );

      case 'disqualified':
        return (
          <div className="text-center space-y-6 py-4">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto">
              <XCircle size={24} className="text-red-400" />
            </div>
            <h2 className="font-display text-2xl text-secondary italic">
              {t(`dq_${dqReason}_title`)}
            </h2>
            <p className="font-sans font-light text-secondary/60 text-sm leading-relaxed max-w-md mx-auto">
              {t(`dq_${dqReason}_desc`)}
            </p>
            {dqReason === 'bmi_low' && (
              <a
                href="#lifestyle"
                onClick={onClose}
                className="inline-flex items-center justify-center px-6 py-3 rounded-pill bg-secondary text-white font-sans text-[10px] uppercase tracking-[0.15em] font-bold transition-all hover:bg-secondary-deep active:scale-95"
              >
                {t('dq_bmi_low_cta')}
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="block mx-auto font-sans text-sm text-primary hover:text-primary-dark transition-colors underline underline-offset-4"
            >
              {t('dq_back_home')}
            </button>
          </div>
        );

      case 'qualified':
        return (
          <QualifiedInline
            name={f.firstName}
            bmi={bmi}
            weightLoss={wLoss}
            t={tQ}
            onClose={onClose}
          />
        );

      default:
        return null;
    }
  };

  /* ── Main Render ─── */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <motion.div
        initial={{ y: '100%', opacity: 0.8 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE_PREMIUM }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={t('dialog_label')}
        className="relative z-10 w-full h-[100dvh] md:h-auto md:max-h-[88vh] md:max-w-lg
          md:rounded-md bg-background-light shadow-soft-xl flex flex-col overflow-hidden"
      >
        {/* Progress bar */}
        <div className="h-1 bg-secondary/5 shrink-0">
          <motion.div
            className="h-full bg-primary"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4, ease: EASE_PREMIUM }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-secondary/5 shrink-0">
          <span className="font-display text-lg text-primary font-semibold tracking-tight">
            FAB <span className="italic">CLINIC</span>
          </span>
          <div className="flex items-center gap-4">
            {step !== 'welcome' && step !== 'disqualified' && step !== 'qualified' && (
              <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-secondary/30">
                {t('step_counter', { current: idx, total: STEP_ORDER.length - 1 })}
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 -mr-2 text-secondary/40 hover:text-secondary transition-colors"
              aria-label={t('close')}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content — scrollable */}
        <div className="flex-grow overflow-y-auto overscroll-contain px-5 py-6 md:px-8 md:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: EASE_PREMIUM }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom nav */}
        {step !== 'disqualified' && step !== 'qualified' && (
          <div
            className="shrink-0 px-5 py-4 border-t border-secondary/5 bg-background-light"
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            <div className="flex items-center justify-between gap-3">
              {step !== 'welcome' ? (
                <button
                  type="button"
                  onClick={back}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-pill font-sans text-[10px] uppercase tracking-[0.15em] font-bold text-secondary/40 hover:text-secondary transition-colors active:scale-95"
                >
                  <ArrowLeft size={14} /> {t('back')}
                </button>
              ) : (
                <div />
              )}

              {step === 'contact' ? (
                <button
                  type="button"
                  onClick={submit}
                  disabled={!valid || submitting}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-pill font-sans text-[10px] uppercase tracking-[0.2em] font-bold bg-primary text-white shadow-gold-glow transition-all disabled:opacity-40 disabled:pointer-events-none active:scale-[0.97]"
                >
                  {submitting ? t('submitting') : t('submit_cta')}{' '}
                  {!submitting && <ArrowRight size={14} />}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={next}
                  disabled={!valid}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-pill font-sans text-[10px] uppercase tracking-[0.2em] font-bold bg-primary text-white shadow-gold-glow transition-all disabled:opacity-40 disabled:pointer-events-none active:scale-[0.97]"
                >
                  {step === 'welcome' ? t('start_cta') : t('next')}{' '}
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   Qualified — inline result shown inside the modal
   ═══════════════════════════════════════════════════ */
function QualifiedInline({ name, bmi, weightLoss, t, onClose }: {
  name: string; bmi: number; weightLoss: number;
  t: ReturnType<typeof useTranslations>; onClose: () => void;
}) {
  const processSteps = [
    { icon: Stethoscope, title: t('step1_title'), desc: t('step1_desc') },
    { icon: Package, title: t('step2_title'), desc: t('step2_desc') },
    { icon: HeartPulse, title: t('step3_title'), desc: t('step3_desc') },
  ];

  const trust = [
    { icon: Shield, title: t('trust_1_title'), desc: t('trust_1_desc') },
    { icon: Stethoscope, title: t('trust_2_title'), desc: t('trust_2_desc') },
    { icon: Package, title: t('trust_3_title'), desc: t('trust_3_desc') },
    { icon: Star, title: t('trust_4_title'), desc: t('trust_4_desc') },
  ];

  return (
    <div className="space-y-8 py-2">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto">
          <CheckCircle2 size={32} className="text-primary" />
        </div>
        <span className="font-sans text-primary text-[10px] tracking-[0.2em] uppercase block font-semibold">
          {t('hero_label')}
        </span>
        <h2 className="font-display text-2xl md:text-3xl text-secondary italic leading-tight">
          {name ? t('hero_title_personal', { name }) : t('hero_title')}
        </h2>
        <p className="font-sans font-light text-secondary/60 text-sm leading-relaxed">
          {t('hero_desc')}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <p className="font-display text-2xl text-primary font-semibold">{bmi}</p>
            <p className="font-sans text-[9px] uppercase tracking-[0.15em] text-secondary/40">BMI</p>
          </div>
          <div className="w-px h-8 bg-secondary/10" />
          <div className="text-center">
            <p className="font-display text-2xl text-primary font-semibold">
              {weightLoss > 0 ? `${weightLoss.toFixed(1)} kg` : '—'}
            </p>
            <p className="font-sans text-[9px] uppercase tracking-[0.15em] text-secondary/40">
              {t('stat_to_lose')}
            </p>
          </div>
        </div>
      </div>

      {/* Process steps */}
      <div className="space-y-1">
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-primary font-semibold mb-3">
          {t('process_label')}
        </p>
        {processSteps.map((s, i) => (
          <div key={i} className="flex items-start gap-3 py-3 border-b border-secondary/5 last:border-0">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <s.icon size={16} className="text-primary" />
            </div>
            <div>
              <p className="font-sans text-sm font-semibold text-secondary">
                {t('step_prefix')} {i + 1}: {s.title}
              </p>
              <p className="font-sans text-xs text-secondary/50 font-light leading-relaxed">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Trust */}
      <div className="grid grid-cols-2 gap-3">
        {trust.map((item, i) => (
          <div key={i} className="flex items-start gap-2 p-3 rounded-md bg-ivory border border-secondary/5">
            <item.icon size={16} className="text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-sans text-xs font-semibold text-secondary leading-tight">
                {item.title}
              </p>
              <p className="font-sans text-[10px] text-secondary/40 font-light">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="space-y-3" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
        <a
          href="#shop"
          onClick={onClose}
          className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-pill bg-primary text-white font-sans text-[10px] uppercase tracking-[0.2em] font-bold shadow-gold-glow transition-all active:scale-[0.97]"
        >
          {t('cta_schedule')} <ArrowRight size={14} />
        </a>
        <button
          type="button"
          onClick={onClose}
          className="w-full px-6 py-3 rounded-pill border border-secondary/10 font-sans text-[10px] uppercase tracking-[0.15em] font-bold text-secondary/50 hover:text-secondary transition-all active:scale-[0.97]"
        >
          {t('cta_close')}
        </button>
      </div>
    </div>
  );
}
