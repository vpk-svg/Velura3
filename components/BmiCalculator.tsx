'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Container from './ui/Container';
import SectionHeader from './ui/SectionHeader';
import { EASE_PREMIUM } from '@/lib/motion';

const metricSchema = z.object({
  heightCm: z.number().min(100).max(250),
  weightKg: z.number().min(30).max(300),
  age: z.number().min(18).max(120),
  gender: z.enum(['male', 'female']),
});

const imperialSchema = z.object({
  heightFt: z.number().min(3).max(8),
  heightIn: z.number().min(0).max(11),
  weightLbs: z.number().min(60).max(660),
  age: z.number().min(18).max(120),
  gender: z.enum(['male', 'female']),
});

const inputClasses = 'w-full bg-transparent border-b-2 border-secondary/10 focus:border-primary text-secondary font-display text-3xl md:text-4xl py-3 outline-none transition-colors duration-300 placeholder:text-secondary/20';
const errorClasses = 'text-red-500 text-xs mt-1.5 font-sans tracking-wide';

export default function BmiCalculator({ isEmbed = false }: { isEmbed?: boolean }) {
  const t = useTranslations('bmi');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [bmiResult, setBmiResult] = useState<number | null>(null);

  const { register: registerMetric, handleSubmit: handleMetricSubmit, formState: { errors: metricErrors } } = useForm<z.infer<typeof metricSchema>>({
    resolver: zodResolver(metricSchema),
  });

  const { register: registerImperial, handleSubmit: handleImperialSubmit, formState: { errors: imperialErrors } } = useForm<z.infer<typeof imperialSchema>>({
    resolver: zodResolver(imperialSchema),
  });

  const calculateMetric = (data: z.infer<typeof metricSchema>) => {
    const heightM = data.heightCm / 100;
    const bmi = data.weightKg / (heightM * heightM);
    setBmiResult(Number(bmi.toFixed(1)));
  };

  const calculateImperial = (data: z.infer<typeof imperialSchema>) => {
    const totalInches = (data.heightFt * 12) + data.heightIn;
    const bmi = (data.weightLbs / (totalInches * totalInches)) * 703;
    setBmiResult(Number(bmi.toFixed(1)));
  };

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: t('underweight'), color: 'text-blue-500', barColor: 'bg-blue-400', position: '10%' };
    if (bmi < 25) return { label: t('healthy'), color: 'text-emerald-600', barColor: 'bg-green-400', position: '30%' };
    if (bmi < 30) return { label: t('overweight'), color: 'text-amber-600', barColor: 'bg-amber-400', position: '50%' };
    if (bmi < 35) return { label: t('obesity1'), color: 'text-orange-600', barColor: 'bg-orange-500', position: '70%' };
    return { label: t('obesity2'), color: 'text-red-600', barColor: 'bg-red-500', position: '90%' };
  };

  const getAdvice = (bmi: number) => {
    if (bmi < 25) return { text: t('advice_under25'), cta: t('cta_under25'), link: '#methods' };
    if (bmi < 30) return { text: t('advice_25_29'), cta: t('cta_25_29'), link: '#shop' };
    if (bmi < 35) return { text: t('advice_30_34'), cta: t('cta_30_34'), link: '#consult' };
    return { text: t('advice_over35'), cta: t('cta_over35'), link: '#consult' };
  };

  const innerContent = (
    <div className={isEmbed ? 'w-full' : 'max-w-4xl mx-auto bg-white border border-primary/10 rounded-md p-8 md:p-10 shadow-soft-lg'}>
      {/* Unit Toggle */}
      <div className="flex justify-center mb-12">
        <div className="bg-secondary/5 p-1.5 rounded-pill flex shadow-inner border border-secondary/5">
          <button
            type="button"
            onClick={() => setUnit('metric')}
            className={`px-8 py-3.5 rounded-pill font-sans text-xs tracking-widest transition-all duration-300 ease-premium uppercase font-semibold ${unit === 'metric' ? 'bg-primary text-white shadow-gold-glow' : 'text-secondary/60 hover:text-primary'}`}
          >
            {t('unit_metric')}
          </button>
          <button
            type="button"
            onClick={() => setUnit('imperial')}
            className={`px-8 py-3.5 rounded-pill font-sans text-xs tracking-widest transition-all duration-300 ease-premium uppercase font-semibold ${unit === 'imperial' ? 'bg-primary text-white shadow-gold-glow' : 'text-secondary/60 hover:text-primary'}`}
          >
            {t('unit_imperial')}
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={unit === 'metric' ? handleMetricSubmit(calculateMetric) : handleImperialSubmit(calculateImperial)} className="space-y-10" noValidate>
        {unit === 'metric' ? (
          <div className="grid grid-cols-2 gap-6 md:gap-10">
            <div>
              <label className="block font-sans text-[11px] text-primary tracking-widest uppercase mb-3 font-semibold">{t('height_cm')}</label>
              <input type="number" {...registerMetric('heightCm', { valueAsNumber: true })} className={inputClasses} />
              {metricErrors.heightCm && <p className={errorClasses} role="alert">100–250 cm</p>}
            </div>
            <div>
              <label className="block font-sans text-[11px] text-primary tracking-widest uppercase mb-3 font-semibold">{t('weight_kg')}</label>
              <input type="number" {...registerMetric('weightKg', { valueAsNumber: true })} className={inputClasses} />
              {metricErrors.weightKg && <p className={errorClasses} role="alert">30–300 kg</p>}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:gap-10">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block font-sans text-[11px] text-primary tracking-widest uppercase mb-3 font-semibold">{t('height_ft')}</label>
                <input type="number" {...registerImperial('heightFt', { valueAsNumber: true })} className={inputClasses} />
                {imperialErrors.heightFt && <p className={errorClasses} role="alert">3–8 ft</p>}
              </div>
              <div className="w-1/2">
                <label className="block font-sans text-[11px] text-primary tracking-widest uppercase mb-3 font-semibold">{t('height_in')}</label>
                <input type="number" {...registerImperial('heightIn', { valueAsNumber: true })} className={inputClasses} />
                {imperialErrors.heightIn && <p className={errorClasses} role="alert">0–11 in</p>}
              </div>
            </div>
            <div>
              <label className="block font-sans text-[11px] text-primary tracking-widest uppercase mb-3 font-semibold">{t('weight_lbs')}</label>
              <input type="number" {...registerImperial('weightLbs', { valueAsNumber: true })} className={inputClasses} />
              {imperialErrors.weightLbs && <p className={errorClasses} role="alert">60–660 lbs</p>}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div>
            <label className="block font-sans text-[11px] text-primary tracking-widest uppercase mb-3 font-semibold">{t('age')}</label>
            <input
              type="number"
              {...(unit === 'metric' ? registerMetric('age', { valueAsNumber: true }) : registerImperial('age', { valueAsNumber: true }))}
              className={inputClasses}
            />
            {(unit === 'metric' ? metricErrors.age : imperialErrors.age) && <p className={errorClasses} role="alert">18–120</p>}
          </div>
          <fieldset>
            <legend className="block font-sans text-[11px] text-primary tracking-widest uppercase mb-3 font-semibold">{t('gender')}</legend>
            <div className="flex gap-8 mt-3 h-full items-center">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" value="male" {...(unit === 'metric' ? registerMetric('gender') : registerImperial('gender'))} className="w-5 h-5 text-primary focus:ring-primary bg-transparent border-secondary/20 transition-colors" />
                {t('male')}
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" value="female" {...(unit === 'metric' ? registerMetric('gender') : registerImperial('gender'))} className="w-5 h-5 text-primary focus:ring-primary bg-transparent border-secondary/20 transition-colors" />
                {t('female')}
              </label>
            </div>
            {(unit === 'metric' ? metricErrors.gender : imperialErrors.gender) && <p className={errorClasses} role="alert">Required</p>}
          </fieldset>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-5 md:py-7 mt-4 md:mt-8 bg-primary text-white font-sans text-sm tracking-[0.3em] uppercase rounded-pill shadow-gold-glow hover:shadow-soft-xl transition-shadow duration-300 font-semibold focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {t('calculate')}
        </motion.button>
      </form>

      {/* Results Panel */}
      <AnimatePresence>
        {bmiResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 24 }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            className="mt-12 pt-12 border-t border-secondary/5"
            role="region"
            aria-live="polite"
            aria-label={t('result_aria_label')}
          >
            <div className="text-center mb-10">
              <span className={`font-display text-6xl md:text-8xl leading-none ${getBmiCategory(bmiResult).color}`}>
                {bmiResult}
              </span>
              <div className="font-sans text-xs tracking-[0.3em] uppercase mt-4 text-secondary/60 font-semibold">
                {getBmiCategory(bmiResult).label}
              </div>
            </div>

            {/* Scale Bar */}
            <div className="relative h-4 bg-secondary/5 rounded-pill mb-12 px-1 flex items-center border border-secondary/5 shadow-inner" aria-hidden="true">
              <div
                className="absolute inset-0 opacity-20 rounded-pill"
                style={{ background: 'linear-gradient(to right, #60a5fa, #4ade80, #fbbf24, #f97316, #ef4444)' }}
              />
              <div className="absolute inset-0 flex justify-between px-[10%] pointer-events-none">
                <div className="w-px h-full bg-secondary/10" />
                <div className="w-px h-full bg-secondary/10" />
                <div className="w-px h-full bg-secondary/10" />
                <div className="w-px h-full bg-secondary/10" />
              </div>
              <motion.div
                initial={{ left: '0%' }}
                animate={{ left: getBmiCategory(bmiResult).position }}
                transition={{ type: 'spring', stiffness: 40, damping: 15 }}
                className="absolute top-1/2 -translate-y-1/2 w-7 h-7 bg-white border-4 border-primary rounded-full shadow-soft-md z-20 flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-primary rounded-full" />
              </motion.div>
            </div>

            {/* Advice Box */}
            <div className="bg-secondary p-6 md:p-8 rounded-md text-center text-white relative overflow-hidden shadow-soft-xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 opacity-50" aria-hidden="true" />
              <h4 className="font-sans text-primary text-[10px] tracking-widest uppercase mb-4 font-semibold">
                {t('advice_title')}
              </h4>
              <p className="font-sans font-light text-lg leading-relaxed mb-8 text-background-light/90 italic">
                &ldquo;{getAdvice(bmiResult).text}&rdquo;
              </p>
              <a
                href={getAdvice(bmiResult).link}
                className="inline-flex px-8 py-3.5 bg-primary text-white rounded-pill font-sans text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-ivory hover:text-secondary transition-colors duration-300 shadow-gold-glow focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {getAdvice(bmiResult).cta}
              </a>
            </div>

            <p className="font-sans text-[10px] italic text-secondary/30 text-center mt-8 uppercase tracking-[0.2em] font-semibold">
              {t('disclaimer')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (isEmbed) {
    return (
      <div className="w-full">
        <div className="mb-8">
          {t('label')}
          <h3 className="font-display text-3xl md:text-4xl text-secondary italic">
            BMI <span className="text-primary not-italic">Calculator</span>
          </h3>
        </div>
        {innerContent}
      </div>
    );
  }

  return (
    <section id="bmi" className="py-section-y bg-background-light text-secondary" aria-labelledby="bmi-title">
      <Container>
        <SectionHeader
          label={t('label')}
          title={<>{t('title')} Calculator</>}
          subtitle={t('subtitle')}
        />
        {innerContent}
      </Container>
    </section>
  );
}
