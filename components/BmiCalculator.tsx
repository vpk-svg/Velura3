'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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

export default function BmiCalculator() {
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

  return (
    <section id="bmi" className="py-20 md:py-32 bg-background-light text-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20 md:mb-32">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-label text-primary text-xs tracking-[0.4em] uppercase mb-6 block font-bold"
          >
            {t('label')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-8xl lg:text-9xl text-secondary mb-8 tracking-tighter"
          >
            {t('title')} <span className="italic font-light text-primary">Calculator</span>
          </motion.h2>
          <p className="font-sans font-light text-secondary/70 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white border border-primary/20 rounded-[48px] p-10 md:p-24 shadow-2xl shadow-primary/5">
          {/* Unit Toggle */}
          <div className="flex justify-center mb-16">
            <div className="bg-secondary/5 p-2 rounded-full flex shadow-inner border border-secondary/5">
              <button
                onClick={() => setUnit('metric')}
                className={`px-10 py-4 rounded-full font-label text-xs tracking-widest transition-all duration-500 uppercase font-bold ${unit === 'metric' ? 'bg-primary text-white shadow-xl' : 'text-secondary/60 hover:text-primary'
                  }`}
              >
                {t('unit_metric')}
              </button>
              <button
                onClick={() => setUnit('imperial')}
                className={`px-10 py-4 rounded-full font-label text-xs tracking-widest transition-all duration-500 uppercase font-bold ${unit === 'imperial' ? 'bg-primary text-white shadow-xl' : 'text-secondary/60 hover:text-primary'
                  }`}
              >
                {t('unit_imperial')}
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={unit === 'metric' ? handleMetricSubmit(calculateMetric) : handleImperialSubmit(calculateImperial)} className="space-y-12">
            {unit === 'metric' ? (
              <div className="grid grid-cols-2 gap-12">
                <div className="group">
                  <label className="block font-label text-[11px] text-primary tracking-widest uppercase mb-4 font-bold">{t('height_cm')}</label>
                  <input
                    type="number"
                    {...registerMetric('heightCm', { valueAsNumber: true })}
                    className="w-full bg-transparent border-b-2 border-secondary/10 focus:border-primary text-secondary font-display text-4xl md:text-5xl py-4 outline-none transition-all placeholder:text-secondary/20"
                  />
                </div>
                <div className="group">
                  <label className="block font-label text-[11px] text-primary tracking-widest uppercase mb-4 font-bold">{t('weight_kg')}</label>
                  <input
                    type="number"
                    {...registerMetric('weightKg', { valueAsNumber: true })}
                    className="w-full bg-transparent border-b-2 border-secondary/10 focus:border-primary text-secondary font-display text-4xl md:text-5xl py-4 outline-none transition-all placeholder:text-secondary/20"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-12">
                <div className="flex space-x-8">
                  <div className="w-1/2">
                    <label className="block font-label text-[11px] text-primary tracking-widest uppercase mb-4 font-bold">{t('height_ft')}</label>
                    <input
                      type="number"
                      {...registerImperial('heightFt', { valueAsNumber: true })}
                      className="w-full bg-transparent border-b-2 border-secondary/10 focus:border-primary text-secondary font-display text-4xl md:text-5xl py-4 outline-none transition-all"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block font-label text-[11px] text-primary tracking-widest uppercase mb-4 font-bold">{t('height_in')}</label>
                    <input
                      type="number"
                      {...registerImperial('heightIn', { valueAsNumber: true })}
                      className="w-full bg-transparent border-b-2 border-secondary/10 focus:border-primary text-secondary font-display text-4xl md:text-5xl py-4 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-label text-[11px] text-primary tracking-widest uppercase mb-4 font-bold">{t('weight_lbs')}</label>
                  <input
                    type="number"
                    {...registerImperial('weightLbs', { valueAsNumber: true })}
                    className="w-full bg-transparent border-b-2 border-secondary/10 focus:border-primary text-secondary font-display text-4xl md:text-5xl py-4 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <label className="block font-label text-[11px] text-primary tracking-widest uppercase mb-4 font-bold">{t('age')}</label>
                <input
                  type="number"
                  {...(unit === 'metric' ? registerMetric('age', { valueAsNumber: true }) : registerImperial('age', { valueAsNumber: true }))}
                  className="w-full bg-transparent border-b-2 border-secondary/10 focus:border-primary text-secondary font-display text-4xl md:text-5xl py-4 outline-none transition-all"
                />
              </div>
              <div className="flex flex-col">
                <label className="block font-label text-[11px] text-primary tracking-widest uppercase mb-4 font-bold">{t('gender')}</label>
                <div className="flex space-x-12 mt-4 h-full items-center">
                  <label className="flex items-center space-x-4 cursor-pointer group">
                    <input type="radio" value="male" {...(unit === 'metric' ? registerMetric('gender') : registerImperial('gender'))} className="w-6 h-6 text-primary focus:ring-primary bg-transparent border-secondary/20 transition-all" />
                    <span className="font-label text-xs md:text-sm uppercase tracking-widest text-secondary/70 group-hover:text-primary transition-colors font-bold">{t('male')}</span>
                  </label>
                  <label className="flex items-center space-x-4 cursor-pointer group">
                    <input type="radio" value="female" {...(unit === 'metric' ? registerMetric('gender') : registerImperial('gender'))} className="w-6 h-6 text-primary focus:ring-primary bg-transparent border-secondary/20 transition-all" />
                    <span className="font-label text-xs md:text-sm uppercase tracking-widest text-secondary/70 group-hover:text-primary transition-colors font-bold">{t('female')}</span>
                  </label>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-8 mt-12 bg-primary text-white font-label text-sm tracking-[0.4em] uppercase rounded-full shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all font-bold"
            >
              {t('calculate')}
            </motion.button>
          </form>

          {/* Results Panel */}
          <AnimatePresence>
            {bmiResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 30 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-20 pt-20 border-t border-secondary/5"
              >
                <div className="text-center mb-16">
                  <span className={`font-display text-8xl md:text-[12rem] leading-none ${getBmiCategory(bmiResult).color}`}>
                    {bmiResult}
                  </span>
                  <div className="font-label text-[14px] tracking-[0.5em] uppercase mt-8 text-secondary/60 font-bold">
                    {getBmiCategory(bmiResult).label}
                  </div>
                </div>

                {/* Scale Bar */}
                <div className="relative h-4 bg-secondary/5 rounded-full mb-20 px-1 flex items-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-green-400 via-amber-400 via-orange-500 to-red-500 opacity-20 rounded-full" />
                  <motion.div
                    initial={{ left: '0%' }}
                    animate={{ left: getBmiCategory(bmiResult).position }}
                    transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                    className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white border-4 border-primary rounded-full shadow-2xl z-10"
                  />
                </div>

                {/* Advice Box */}
                <div className="bg-secondary p-12 md:p-20 rounded-[40px] text-center text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 opacity-50 transition-opacity group-hover:opacity-100" />
                  <h4 className="font-label text-primary text-[12px] tracking-widest uppercase mb-8 font-bold">
                    {t('advice_title')}
                  </h4>
                  <p className="font-sans font-light text-2xl md:text-3xl leading-relaxed mb-12 text-background-light/90 italic">
                    "{getAdvice(bmiResult).text}"
                  </p>
                  <a
                    href={getAdvice(bmiResult).link}
                    className="inline-flex px-12 py-5 bg-primary text-white rounded-full font-label text-[12px] tracking-[0.3em] uppercase font-bold hover:bg-white hover:text-secondary transition-all shadow-xl"
                  >
                    {getAdvice(bmiResult).cta}
                  </a>
                </div>

                <p className="font-sans text-[11px] italic text-secondary/30 text-center mt-16 uppercase tracking-[0.3em] font-bold">
                  {t('disclaimer')}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
