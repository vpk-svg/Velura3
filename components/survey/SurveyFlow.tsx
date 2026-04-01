'use client';

import {
  useState, useCallback, useMemo, useEffect, useRef,
  createContext, useContext, type ReactNode, type ElementType,
} from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'motion/react';
import { useTranslations } from 'next-intl';
import { EASE_PREMIUM } from '@/lib/motion';
import {
  ArrowRight, ArrowLeft, User, Ruler, Weight, Calendar, Target,
  Heart, ShieldAlert, Mail, Phone, CheckCircle2, XCircle,
  Activity, Scale, X, Shield, Stethoscope, Package, HeartPulse, Star,
  Check,
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
   Premium Sub-Components (extracted, never re-mount)
   ═══════════════════════════════════════════════════ */

/* --- Option Button (radio-style, single select) --- */
function SurveyOption({ selected, onClick, children }: {
  selected: boolean; onClick: () => void; children: ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.975 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={`group w-full text-left px-6 py-5 rounded-lg border-[1.5px] transition-all duration-300 ease-premium font-sans text-base relative overflow-hidden ${
        selected
          ? 'border-primary/60 bg-gradient-to-br from-primary/[0.06] to-primary/[0.02] text-secondary shadow-option-selected'
          : 'border-secondary/[0.07] bg-surface-elevated text-secondary/60 hover:border-secondary/15 hover:bg-white shadow-input-rest'
      }`}
    >
      <span className="flex items-center justify-between relative z-10">
        <span className="font-medium">{children}</span>
        {/* Custom radio indicator */}
        <span className={`w-6 h-6 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-all duration-300 ${
          selected
            ? 'border-primary bg-primary'
            : 'border-secondary/15 group-hover:border-secondary/25'
        }`}>
          {selected && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 600, damping: 20 }}
            >
              <Check size={11} strokeWidth={3} className="text-white" />
            </motion.span>
          )}
        </span>
      </span>
    </motion.button>
  );
}

/* --- Checkbox Button (multi-select) --- */
function SurveyCheck({ on, onClick, children }: {
  on: boolean; onClick: () => void; children: ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.975 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={`group w-full text-left px-5 py-5 rounded-lg border-[1.5px] transition-all duration-300 ease-premium font-sans text-base ${
        on
          ? 'border-primary/60 bg-gradient-to-br from-primary/[0.06] to-primary/[0.02] text-secondary shadow-option-selected'
          : 'border-secondary/[0.07] bg-surface-elevated text-secondary/60 hover:border-secondary/15 shadow-input-rest'
      }`}
    >
      <span className="flex items-center gap-3">
        {/* Custom checkbox */}
        <span className={`w-6 h-6 rounded-[5px] shrink-0 border-[1.5px] flex items-center justify-center transition-all duration-300 ${
          on ? 'border-primary bg-primary' : 'border-secondary/15 group-hover:border-secondary/25'
        }`}>
          {on && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 600, damping: 20 }}
            >
              <Check size={10} strokeWidth={3} className="text-white" />
            </motion.span>
          )}
        </span>
        <span className="leading-snug">{children}</span>
      </span>
    </motion.button>
  );
}

/* --- Premium Text Input --- */
function SurveyInput({ icon: Ic, label, value, onChange, inputMode, placeholder, unit, autoFocus, type = 'text' }: {
  icon: ElementType; label: string; value: string;
  onChange: (v: string) => void; type?: string;
  inputMode?: 'numeric' | 'decimal' | 'text' | 'email' | 'tel';
  placeholder?: string; unit?: string; autoFocus?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (autoFocus && ref.current) {
      const id = setTimeout(() => ref.current?.focus(), 320);
      return () => clearTimeout(id);
    }
  }, [autoFocus]);

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-[0.2em] text-secondary/60">
        <Ic size={12} className={`transition-colors duration-300 ${focused ? 'text-primary' : 'text-secondary/30'}`} />
        {label}
      </label>
      <div className="relative">
        <input
          ref={ref}
          type={type}
          inputMode={inputMode}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoComplete="off"
          className="input-glow w-full px-5 py-5 rounded-lg border-[1.5px] border-secondary/[0.12] bg-surface-elevated font-sans
            text-secondary text-lg shadow-input-rest outline-none cursor-text
            placeholder:text-secondary/30"
        />
        {unit && (
          <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-sans uppercase tracking-[0.15em] pointer-events-none transition-colors duration-300 ${
            focused ? 'text-primary/50' : 'text-secondary/25'
          }`}>
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

/* --- Step Header --- */
function StepHeader({ icon: Ic, label, title, center }: {
  icon: ElementType; label: string; title: string; center?: boolean;
}) {
  return (
    <div className={center ? 'text-center' : ''}>
      <div className={`flex items-center gap-2 mb-3 ${center ? 'justify-center' : ''}`}>
        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Ic size={16} className="text-primary" />
        </span>
        <span className="font-sans text-xs tracking-[0.2em] uppercase text-secondary/50 font-semibold">
          {label}
        </span>
      </div>
      <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.25rem)] text-secondary italic leading-tight">{title}</h2>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Animated Counter (for BMI reveal)
   ═══════════════════════════════════════════════════ */
function AnimatedBMI({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 80, damping: 20 });
  const display = useTransform(spring, (v) => v.toFixed(1));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <motion.span>{display}</motion.span>
  );
}

/* ═══════════════════════════════════════════════════
   Types & Constants
   ═══════════════════════════════════════════════════ */
type Sex = 'male' | 'female' | '';
type Step =
  | 'welcome' | 'sex' | 'age' | 'height' | 'weight'
  | 'bmi_result' | 'target_weight' | 'previous_attempts'
  | 'comorbidities' | 'contraindications'
  | 'medication_use' | 'allergies' | 'medical_history'
  | 'smoking_alcohol' | 'exercise' | 'goal' | 'speed'
  | 'medication_pref' | 'coaching_pref'
  | 'contact'
  | 'disqualified' | 'qualified';

interface FormState {
  sex: Sex; age: string; height: string; weight: string; targetWeight: string;
  previousAttempts: string[]; comorbidities: string[]; contraindications: string[];
  currentMedication: string[]; allergies: string[]; medicalHistory: string[];
  smoking: string; alcohol: string; exerciseFreq: string;
  goal: string; speed: string; medicationPref: string; coachingPref: string;
  firstName: string; lastName: string; email: string; phone: string; consent: boolean;
}

type DqReason = 'age' | 'bmi_low' | 'bmi_27_no_comorbidity' | 'contraindication';

const PREV_KEYS = ['diets', 'exercise', 'otc_supplements', 'other_rx', 'none'] as const;
const COMORBID_KEYS = ['diabetes_type2', 'high_bp', 'high_cholesterol', 'sleep_apnea', 'pcos'] as const;
const CONTRA_KEYS = ['pregnant', 'mtc_men2', 'eating_disorder'] as const;
const MEDICATION_KEYS = ['blood_pressure', 'diabetes_meds', 'thyroid', 'antidepressants', 'blood_thinners', 'none'] as const;
const ALLERGY_KEYS = ['penicillin', 'nsaids', 'latex', 'soy', 'none'] as const;
const MEDICAL_HISTORY_KEYS = ['heart_disease', 'kidney_disease', 'liver_disease', 'pancreatitis', 'gallstones', 'none'] as const;
const GOAL_KEYS = ['lose_weight', 'more_energy', 'health_improvement', 'confidence', 'doctor_advice'] as const;
const SPEED_KEYS = ['gradual', 'moderate', 'fast'] as const;
const MED_PREF_KEYS = ['no_preference', 'weekly_injection', 'daily_injection', 'oral'] as const;
const COACHING_KEYS = ['full_coaching', 'light_support', 'self_guided'] as const;

const STEP_ORDER: Step[] = [
  'welcome', 'sex', 'age', 'height', 'weight', 'bmi_result',
  'target_weight', 'previous_attempts', 'comorbidities',
  'contraindications', 'medication_use', 'allergies', 'medical_history',
  'smoking_alcohol', 'exercise', 'goal', 'speed',
  'medication_pref', 'coaching_pref', 'contact',
];

/* Only fade — no x-slide so inputs stay mounted in position */
const fadeVariants = {
  enter: { opacity: 0, y: 6 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
};

/* ═══════════════════════════════════════════════════
   Segmented Progress Bar
   ═══════════════════════════════════════════════════ */
function SegmentedProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1 px-6 pt-4 pb-1">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="h-[3px] flex-1 rounded-pill overflow-hidden bg-secondary/[0.04]">
          <motion.div
            className="h-full rounded-pill bg-gradient-to-r from-primary to-primary-light"
            initial={{ width: 0 }}
            animate={{ width: i < current ? '100%' : i === current ? '50%' : '0%' }}
            transition={{ duration: 0.5, ease: EASE_PREMIUM }}
          />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   The Survey Overlay
   ═══════════════════════════════════════════════════ */
function SurveyOverlay({ onClose }: { onClose: () => void }) {
  const t = useTranslations('survey');
  const tQ = useTranslations('qualified');

  const [step, setStep] = useState<Step>('welcome');
  const [dqReason, setDqReason] = useState<DqReason | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [f, setF] = useState<FormState>({
    sex: '', age: '', height: '', weight: '', targetWeight: '',
    previousAttempts: [], comorbidities: [], contraindications: [],
    currentMedication: [], allergies: [], medicalHistory: [],
    smoking: '', alcohol: '', exerciseFreq: '',
    goal: '', speed: '', medicationPref: '', coachingPref: '',
    firstName: '', lastName: '', email: '', phone: '', consent: false,
  });

  /* ── Helpers ─── */
  const bmi = useMemo(() => {
    const h = parseFloat(f.height) / 100;
    const w = parseFloat(f.weight);
    return h > 0 && w > 0 ? Math.round((w / (h * h)) * 10) / 10 : 0;
  }, [f.height, f.weight]);

  const idx = STEP_ORDER.indexOf(step);
  const totalSteps = STEP_ORDER.length;

  const upd = useCallback(<K extends keyof FormState>(k: K, v: FormState[K]) =>
    setF((p) => ({ ...p, [k]: v })), []);

  const tog = useCallback(
    (k: 'previousAttempts' | 'comorbidities' | 'contraindications' | 'currentMedication' | 'allergies' | 'medicalHistory', v: string) =>
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
        go('medication_use');
        break;
      }
      case 'medication_use': go('allergies'); break;
      case 'allergies': go('medical_history'); break;
      case 'medical_history': go('smoking_alcohol'); break;
      case 'smoking_alcohol': go('exercise'); break;
      case 'exercise': go('goal'); break;
      case 'goal': go('speed'); break;
      case 'speed': go('medication_pref'); break;
      case 'medication_pref': go('coaching_pref'); break;
      case 'coaching_pref': go('contact'); break;
    }
  }, [step, f, bmi, go, dq]);

  const back = useCallback(() => {
    if (idx > 0) go(STEP_ORDER[idx - 1]);
  }, [idx, go]);

  const submit = useCallback(async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
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
        return !isNaN(a) && a > 0 && a < 120;
      }
      case 'height': {
        const h = parseFloat(f.height);
        return !isNaN(h) && h > 100 && h < 250;
      }
      case 'weight': {
        const w = parseFloat(f.weight);
        return !isNaN(w) && w > 30 && w < 300;
      }
      case 'bmi_result': return true;
      case 'target_weight': {
        const tw = parseFloat(f.targetWeight);
        return !isNaN(tw) && tw > 30 && tw < 300;
      }
      case 'previous_attempts': return f.previousAttempts.length > 0;
      case 'comorbidities': return true;
      case 'contraindications': return true;
      case 'medication_use': return f.currentMedication.length > 0;
      case 'allergies': return f.allergies.length > 0;
      case 'medical_history': return f.medicalHistory.length > 0;
      case 'smoking_alcohol': return f.smoking !== '' && f.alcohol !== '';
      case 'exercise': return f.exerciseFreq !== '';
      case 'goal': return f.goal !== '';
      case 'speed': return f.speed !== '';
      case 'medication_pref': return f.medicationPref !== '';
      case 'coaching_pref': return f.coachingPref !== '';
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

  const bmiClr = bmi < 25 ? 'text-mint-dark' : bmi < 30 ? 'text-amber-600' : 'text-rose-dark';
  const bmiRingClr = bmi < 25 ? 'ring-mint-dark/20' : bmi < 30 ? 'ring-amber-500/20' : 'ring-rose-dark/20';
  const bmiBgClr = bmi < 25 ? 'bg-mint' : bmi < 30 ? 'bg-amber-soft' : 'bg-rose-soft';
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
          <div className="text-center space-y-7">
            {/* Animated icon with subtle pulse ring */}
            <div className="relative w-16 h-16 mx-auto">
              <span className="absolute inset-0 rounded-full bg-primary/8 animate-subtle-pulse" />
              <span className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center">
                <Activity size={26} className="text-primary" />
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.5rem,4vw,1.875rem)] text-secondary italic leading-tight">
              {t('welcome_title')}
            </h2>
            <p className="font-sans font-light text-secondary/50 text-[15px] leading-relaxed max-w-sm mx-auto">
              {t('welcome_desc')}
            </p>
            <div className="flex items-center justify-center gap-5 flex-wrap">
              {(['welcome_point1', 'welcome_point2', 'welcome_point3'] as const).map((k) => (
                <span key={k} className="flex items-center gap-1.5 text-xs text-secondary/40 font-sans font-medium">
                  <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check size={9} strokeWidth={3} className="text-primary" />
                  </span>
                  {t(k)}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-secondary/25 font-sans">{t('welcome_time')}</p>
          </div>
        );

      case 'sex':
        return (
          <div className="space-y-6">
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

      case 'age':
        return (
          <div className="space-y-6">
            <StepHeader icon={Calendar} label={t('age_label')} title={t('age_title')} />
            <SurveyInput
              icon={Calendar} label={t('age_input_label')}
              value={f.age} onChange={(v) => upd('age', digits(v))}
              inputMode="numeric" placeholder="35" unit={t('age_unit')} autoFocus
            />
          </div>
        );

      case 'height':
        return (
          <div className="space-y-6">
            <StepHeader icon={Ruler} label={t('height_label')} title={t('height_title')} />
            <SurveyInput
              icon={Ruler} label={t('height_input_label')}
              value={f.height} onChange={(v) => upd('height', digits(v))}
              inputMode="numeric" placeholder="175" unit="cm" autoFocus
            />
          </div>
        );

      case 'weight':
        return (
          <div className="space-y-6">
            <StepHeader icon={Weight} label={t('weight_label')} title={t('weight_title')} />
            <SurveyInput
              icon={Scale} label={t('weight_input_label')}
              value={f.weight} onChange={(v) => upd('weight', decimal(v))}
              inputMode="decimal" placeholder="85" unit="kg" autoFocus
            />
          </div>
        );

      case 'bmi_result':
        return (
          <div className="space-y-7 text-center">
            <StepHeader icon={Activity} label={t('bmi_label')} title={t('bmi_title')} center />
            {/* Premium BMI display with ring accent */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.15 }}
              className={`inline-flex flex-col items-center justify-center w-36 h-36 rounded-full ${bmiBgClr} ring-1 ${bmiRingClr} mx-auto`}
            >
              <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-secondary/30 mb-0.5">
                {t('bmi_your_bmi')}
              </p>
              <p className={`font-display text-[2.75rem] font-semibold leading-none ${bmiClr}`}>
                <AnimatedBMI value={bmi} />
              </p>
              <p className={`font-sans text-xs mt-1 font-medium ${bmiClr}`}>{bmiLabel}</p>
            </motion.div>
            <p className="font-sans font-light text-secondary/45 text-[13px] leading-relaxed max-w-sm mx-auto">
              {bmi >= 30 ? t('bmi_qualifies_directly') : t('bmi_qualifies_with_conditions')}
            </p>
          </div>
        );

      case 'target_weight':
        return (
          <div className="space-y-6">
            <StepHeader icon={Target} label={t('target_label')} title={t('target_title')} />
            <SurveyInput
              icon={Target} label={t('target_input_label')}
              value={f.targetWeight} onChange={(v) => upd('targetWeight', decimal(v))}
              inputMode="decimal" placeholder="72" unit="kg" autoFocus
            />
            {f.targetWeight && wLoss > 0 && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-sans text-secondary/35 text-center"
              >
                {t('target_loss_label')}:{' '}
                <span className="font-semibold text-primary">{wLoss.toFixed(1)} kg</span>
              </motion.p>
            )}
          </div>
        );

      case 'previous_attempts':
        return (
          <div className="space-y-5">
            <StepHeader icon={Heart} label={t('attempts_label')} title={t('attempts_title')} />
            <p className="font-sans font-light text-secondary/40 text-[13px]">{t('attempts_desc')}</p>
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
          <div className="space-y-5">
            <StepHeader icon={Heart} label={t('comorbid_label')} title={t('comorbid_title')} />
            <p className="font-sans font-light text-secondary/40 text-[13px]">{t('comorbid_desc')}</p>
            {bmi < 30 && (
              <div className="bg-amber-soft border border-amber-200/60 rounded-lg px-4 py-3 text-[12px] font-sans text-amber-700 leading-relaxed">
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
          <div className="space-y-5">
            <StepHeader icon={ShieldAlert} label={t('contra_label')} title={t('contra_title')} />
            <p className="font-sans font-light text-secondary/40 text-[13px]">{t('contra_desc')}</p>
            <div className="space-y-2">
              {CONTRA_KEYS.map((k) => (
                <SurveyCheck key={k} on={f.contraindications.includes(k)} onClick={() => tog('contraindications', k)}>
                  {t(`contra_${k}`)}
                </SurveyCheck>
              ))}
            </div>
          </div>
        );

      case 'medication_use':
        return (
          <div className="space-y-5">
            <StepHeader icon={Heart} label={t('med_use_label')} title={t('med_use_title')} />
            <p className="font-sans font-light text-secondary/40 text-[13px]">{t('med_use_desc')}</p>
            <div className="space-y-2">
              {MEDICATION_KEYS.map((k) => (
                <SurveyCheck key={k} on={f.currentMedication.includes(k)} onClick={() => tog('currentMedication', k)}>
                  {t(`med_use_${k}`)}
                </SurveyCheck>
              ))}
            </div>
          </div>
        );

      case 'allergies':
        return (
          <div className="space-y-5">
            <StepHeader icon={ShieldAlert} label={t('allergy_label')} title={t('allergy_title')} />
            <p className="font-sans font-light text-secondary/40 text-[13px]">{t('allergy_desc')}</p>
            <div className="space-y-2">
              {ALLERGY_KEYS.map((k) => (
                <SurveyCheck key={k} on={f.allergies.includes(k)} onClick={() => tog('allergies', k)}>
                  {t(`allergy_${k}`)}
                </SurveyCheck>
              ))}
            </div>
          </div>
        );

      case 'medical_history':
        return (
          <div className="space-y-5">
            <StepHeader icon={Heart} label={t('med_hist_label')} title={t('med_hist_title')} />
            <p className="font-sans font-light text-secondary/40 text-[13px]">{t('med_hist_desc')}</p>
            <div className="space-y-2">
              {MEDICAL_HISTORY_KEYS.map((k) => (
                <SurveyCheck key={k} on={f.medicalHistory.includes(k)} onClick={() => tog('medicalHistory', k)}>
                  {t(`med_hist_${k}`)}
                </SurveyCheck>
              ))}
            </div>
          </div>
        );

      case 'smoking_alcohol':
        return (
          <div className="space-y-6">
            <StepHeader icon={Activity} label={t('lifestyle_label')} title={t('lifestyle_title')} />
            <div className="space-y-4">
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-secondary/40 font-semibold">{t('smoking_question')}</p>
              <div className="grid grid-cols-3 gap-2">
                {(['never', 'former', 'current'] as const).map((k) => (
                  <SurveyOption key={k} selected={f.smoking === k} onClick={() => upd('smoking', k)}>
                    {t(`smoking_${k}`)}
                  </SurveyOption>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-secondary/40 font-semibold">{t('alcohol_question')}</p>
              <div className="grid grid-cols-3 gap-2">
                {(['none', 'moderate', 'regular'] as const).map((k) => (
                  <SurveyOption key={k} selected={f.alcohol === k} onClick={() => upd('alcohol', k)}>
                    {t(`alcohol_${k}`)}
                  </SurveyOption>
                ))}
              </div>
            </div>
          </div>
        );

      case 'exercise':
        return (
          <div className="space-y-5">
            <StepHeader icon={Activity} label={t('exercise_label')} title={t('exercise_title')} />
            <div className="space-y-2">
              {(['sedentary', 'light', 'moderate', 'active'] as const).map((k) => (
                <SurveyOption key={k} selected={f.exerciseFreq === k} onClick={() => upd('exerciseFreq', k)}>
                  {t(`exercise_${k}`)}
                </SurveyOption>
              ))}
            </div>
          </div>
        );

      case 'goal':
        return (
          <div className="space-y-5">
            <StepHeader icon={Target} label={t('goal_label')} title={t('goal_title')} />
            <div className="space-y-2">
              {GOAL_KEYS.map((k) => (
                <SurveyOption key={k} selected={f.goal === k} onClick={() => upd('goal', k)}>
                  {t(`goal_${k}`)}
                </SurveyOption>
              ))}
            </div>
          </div>
        );

      case 'speed':
        return (
          <div className="space-y-5">
            <StepHeader icon={Target} label={t('speed_label')} title={t('speed_title')} />
            <p className="font-sans font-light text-secondary/40 text-[13px]">{t('speed_desc')}</p>
            <div className="space-y-2">
              {SPEED_KEYS.map((k) => (
                <SurveyOption key={k} selected={f.speed === k} onClick={() => upd('speed', k)}>
                  {t(`speed_${k}`)}
                </SurveyOption>
              ))}
            </div>
          </div>
        );

      case 'medication_pref':
        return (
          <div className="space-y-5">
            <StepHeader icon={Heart} label={t('med_pref_label')} title={t('med_pref_title')} />
            <p className="font-sans font-light text-secondary/40 text-[13px]">{t('med_pref_desc')}</p>
            <div className="space-y-2">
              {MED_PREF_KEYS.map((k) => (
                <SurveyOption key={k} selected={f.medicationPref === k} onClick={() => upd('medicationPref', k)}>
                  {t(`med_pref_${k}`)}
                </SurveyOption>
              ))}
            </div>
          </div>
        );

      case 'coaching_pref':
        return (
          <div className="space-y-5">
            <StepHeader icon={HeartPulse} label={t('coaching_label')} title={t('coaching_title')} />
            <p className="font-sans font-light text-secondary/40 text-[13px]">{t('coaching_desc')}</p>
            <div className="space-y-2">
              {COACHING_KEYS.map((k) => (
                <SurveyOption key={k} selected={f.coachingPref === k} onClick={() => upd('coachingPref', k)}>
                  {t(`coaching_${k}`)}
                </SurveyOption>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-5">
            <StepHeader icon={Mail} label={t('contact_label')} title={t('contact_title')} />
            <p className="font-sans font-light text-secondary/40 text-[13px]">{t('contact_desc')}</p>
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
            {/* Consent checkbox */}
            <button
              type="button"
              onClick={() => upd('consent', !f.consent)}
              className="flex items-start gap-3 w-full text-left active:scale-[0.995] transition-transform"
            >
              <span className={`w-[18px] h-[18px] mt-0.5 rounded-[5px] shrink-0 border-[1.5px] flex items-center justify-center transition-all duration-300 ${
                f.consent ? 'border-primary bg-primary' : 'border-secondary/15'
              }`}>
                {f.consent && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 600, damping: 20 }}
                  >
                    <Check size={10} strokeWidth={3} className="text-white" />
                  </motion.span>
                )}
              </span>
              <span className="font-sans text-[11px] text-secondary/40 leading-relaxed">
                {t('contact_consent')}
              </span>
            </button>
          </div>
        );

      case 'disqualified':
        return (
          <div className="text-center space-y-7 py-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="w-16 h-16 rounded-full bg-rose-soft ring-1 ring-rose-dark/10 flex items-center justify-center mx-auto"
            >
              <XCircle size={28} className="text-rose-dark/70" />
            </motion.div>
            <h2 className="font-display text-[clamp(1.4rem,3vw,1.75rem)] text-secondary italic leading-tight">
              {t(`dq_${dqReason}_title`)}
            </h2>
            <p className="font-sans font-light text-secondary/50 text-[14px] leading-relaxed max-w-md mx-auto">
              {t(`dq_${dqReason}_desc`)}
            </p>
            {dqReason === 'bmi_low' && (
              <a
                href="#lifestyle"
                onClick={onClose}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-pill bg-secondary text-white font-sans text-[10px] uppercase tracking-[0.15em] font-bold transition-all hover:bg-secondary-deep shadow-soft-md hover:shadow-soft-lg active:scale-[0.97]"
              >
                {t('dq_bmi_low_cta')}
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="block mx-auto font-sans text-sm text-primary hover:text-primary-dark transition-colors underline underline-offset-4 decoration-primary/30"
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
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center"
    >
      {/* Backdrop — frosted dark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-secondary-deep/40 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Panel — glassmorphism on desktop, full-height mobile */}
      <motion.div
        initial={{ y: '100%', opacity: 0.8 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE_PREMIUM }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full h-[100dvh] md:h-auto md:max-h-[88vh] md:max-w-lg
          md:rounded-xl glass-heavy md:shadow-panel md:ring-1 md:ring-secondary/[0.04]
          flex flex-col overflow-hidden"
      >
        {/* Segmented Progress */}
        {step !== 'disqualified' && step !== 'qualified' && (
          <SegmentedProgress current={idx} total={totalSteps} />
        )}

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3.5 shrink-0">
          <span className="font-display text-lg text-primary font-semibold tracking-tight">
            FAB <span className="italic">CLINIC</span>
          </span>
          <div className="flex items-center gap-4">
            {step !== 'welcome' && step !== 'disqualified' && step !== 'qualified' && (
              <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-secondary/25 font-medium">
                {t('step_counter', { current: idx, total: STEP_ORDER.length - 1 })}
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 -mr-2 rounded-full text-secondary/30 hover:text-secondary/60 hover:bg-secondary/[0.04] transition-all duration-200"
              aria-label="Sluiten"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Subtle separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-secondary/[0.06] to-transparent mx-6" />

        {/* Content — scrollable with generous padding */}
        <div className="flex-grow overflow-y-auto overscroll-contain px-6 py-7 md:px-8 md:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={fadeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom nav — elevated with subtle top border */}
        {step !== 'disqualified' && step !== 'qualified' && (
          <div
            className="shrink-0 px-6 py-4 bg-surface/80 backdrop-blur-sm"
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-secondary/[0.06] to-transparent mb-4" />
            <div className="flex items-center justify-between gap-3">
              {step !== 'welcome' ? (
                <button
                  type="button"
                  onClick={back}
                  className="flex items-center gap-1.5 px-5 py-3 rounded-pill font-sans text-[10px] uppercase tracking-[0.15em] font-bold text-secondary/30 hover:text-secondary/60 transition-colors active:scale-95"
                >
                  <ArrowLeft size={14} /> {t('back')}
                </button>
              ) : (
                <div />
              )}

              {step === 'contact' ? (
                <motion.button
                  type="button"
                  onClick={submit}
                  disabled={!valid || submitting}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-pill font-sans text-[10px] uppercase tracking-[0.2em] font-bold
                    bg-gradient-to-r from-primary to-primary-light text-white shadow-gold-glow
                    transition-all disabled:opacity-40 disabled:pointer-events-none
                    hover:shadow-soft-xl"
                >
                  {submitting ? t('submitting') : t('submit_cta')}{' '}
                  {!submitting && <ArrowRight size={14} />}
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  onClick={next}
                  disabled={!valid}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-pill font-sans text-[10px] uppercase tracking-[0.2em] font-bold
                    bg-gradient-to-r from-primary to-primary-light text-white shadow-gold-glow
                    transition-all disabled:opacity-40 disabled:pointer-events-none
                    hover:shadow-soft-xl"
                >
                  {step === 'welcome' ? t('start_cta') : t('next')}{' '}
                  <ArrowRight size={14} />
                </motion.button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   Qualified — premium result screen
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
      <div className="text-center space-y-5">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/20 flex items-center justify-center mx-auto"
        >
          <motion.span
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.3 }}
          >
            <CheckCircle2 size={34} className="text-primary" />
          </motion.span>
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="font-sans text-primary text-[10px] tracking-[0.2em] uppercase block font-semibold"
        >
          {t('hero_label')}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="font-display text-[clamp(1.5rem,4vw,1.875rem)] text-secondary italic leading-tight"
        >
          {name ? t('hero_title_personal', { name }) : t('hero_title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="font-sans font-light text-secondary/50 text-[14px] leading-relaxed"
        >
          {t('hero_desc')}
        </motion.p>

        {/* Stats in frosted pills */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-4"
        >
          <div className="text-center px-5 py-3 rounded-xl bg-surface-elevated shadow-soft-sm ring-1 ring-secondary/[0.04]">
            <p className="font-display text-2xl text-primary font-semibold">{bmi}</p>
            <p className="font-sans text-[9px] uppercase tracking-[0.15em] text-secondary/30 mt-0.5">BMI</p>
          </div>
          <div className="text-center px-5 py-3 rounded-xl bg-surface-elevated shadow-soft-sm ring-1 ring-secondary/[0.04]">
            <p className="font-display text-2xl text-primary font-semibold">
              {weightLoss > 0 ? `${weightLoss.toFixed(1)} kg` : '—'}
            </p>
            <p className="font-sans text-[9px] uppercase tracking-[0.15em] text-secondary/30 mt-0.5">
              {t('stat_to_lose')}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Process steps */}
      <div className="space-y-1">
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-primary font-semibold mb-4">
          {t('process_label')}
        </p>
        {processSteps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="flex items-start gap-3.5 py-3.5 border-b border-secondary/[0.04] last:border-0"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/[0.07] flex items-center justify-center shrink-0 mt-0.5">
              <s.icon size={16} className="text-primary" />
            </div>
            <div>
              <p className="font-sans text-sm font-semibold text-secondary">
                {t('step_prefix')} {i + 1}: {s.title}
              </p>
              <p className="font-sans text-[13px] text-secondary/40 font-light leading-relaxed mt-0.5">
                {s.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust — frosted grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {trust.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + i * 0.08 }}
            className="flex items-start gap-2.5 p-3.5 rounded-lg bg-surface-elevated ring-1 ring-secondary/[0.04] shadow-soft-sm"
          >
            <span className="w-7 h-7 rounded-md bg-primary/[0.07] flex items-center justify-center shrink-0">
              <item.icon size={14} className="text-primary" />
            </span>
            <div>
              <p className="font-sans text-[12px] font-semibold text-secondary leading-tight">
                {item.title}
              </p>
              <p className="font-sans text-[10px] text-secondary/35 font-light mt-0.5">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTAs */}
      <div className="space-y-3" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
        <motion.a
          href="#shop"
          onClick={onClose}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-pill
            bg-gradient-to-r from-primary to-primary-light text-white
            font-sans text-[10px] uppercase tracking-[0.2em] font-bold
            shadow-gold-glow transition-all hover:shadow-soft-xl"
        >
          {t('cta_schedule')} <ArrowRight size={14} />
        </motion.a>
        <button
          type="button"
          onClick={onClose}
          className="w-full px-6 py-3 rounded-pill border border-secondary/[0.07] font-sans text-[10px] uppercase tracking-[0.15em] font-bold text-secondary/40 hover:text-secondary/60 hover:border-secondary/15 transition-all active:scale-[0.97]"
        >
          {t('cta_close')}
        </button>
      </div>
    </div>
  );
}
