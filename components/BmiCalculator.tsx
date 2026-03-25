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
    if (bmi < 18.5) return { label: t('underweight'), color: 'text-blue-400', barColor: 'bg-blue-400', position: '10%' };
    if (bmi < 25) return { label: t('healthy'), color: 'text-green-400', barColor: 'bg-green-400', position: '30%' };
    if (bmi < 30) return { label: t('overweight'), color: 'text-amber-400', barColor: 'bg-amber-400', position: '50%' };
    if (bmi < 35) return { label: t('obesity1'), color: 'text-orange-500', barColor: 'bg-orange-500', position: '70%' };
    return { label: t('obesity2'), color: 'text-red-500', barColor: 'bg-red-500', position: '90%' };
  };

  const getAdvice = (bmi: number) => {
    if (bmi < 25) return { text: t('advice_under25'), cta: t('cta_under25'), link: '#methods' };
    if (bmi < 30) return { text: t('advice_25_29'), cta: t('cta_25_29'), link: '#shop' };
    if (bmi < 35) return { text: t('advice_30_34'), cta: t('cta_30_34'), link: 'https://www.getwellis.com/products/ozempic' };
    return { text: t('advice_over35'), cta: t('cta_over35'), link: 'https://www.getwellis.com/products/mounjaro' };
  };

  return (
    <section id="bmi" className="py-24 bg-brand-teal-deep text-brand-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white italic font-light mb-4">
            {t('title')}
          </h2>
          <p className="font-sans font-light text-brand-ivory/80 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-[600px] mx-auto bg-brand-teal-mid border border-brand-gold/30 rounded-2xl p-8 shadow-2xl">
          {/* Unit Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-brand-teal-deep rounded-full p-1 flex">
              <button
                onClick={() => setUnit('metric')}
                aria-pressed={unit === 'metric'}
                className={`px-6 py-2 rounded-full font-label text-xs tracking-widest transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none ${unit === 'metric' ? 'bg-brand-gold text-brand-teal-deep' : 'text-brand-gold hover:text-white'
                  }`}
              >
                {t('unit_metric')}
              </button>
              <button
                onClick={() => setUnit('imperial')}
                aria-pressed={unit === 'imperial'}
                className={`px-6 py-2 rounded-full font-label text-xs tracking-widest transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none ${unit === 'imperial' ? 'bg-brand-gold text-brand-teal-deep' : 'text-brand-gold hover:text-white'
                  }`}
              >
                {t('unit_imperial')}
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={unit === 'metric' ? handleMetricSubmit(calculateMetric) : handleImperialSubmit(calculateImperial)} className="space-y-6">
            {unit === 'metric' ? (
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block font-label text-[10px] text-brand-gold tracking-widest uppercase mb-2">{t('height_cm')}</label>
                  <input
                    type="number"
                    {...registerMetric('heightCm', { valueAsNumber: true })}
                    className="w-full bg-transparent border-b border-brand-gold/30 focus:border-brand-gold text-white font-sans text-xl py-2 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-label text-[10px] text-brand-gold tracking-widest uppercase mb-2">{t('weight_kg')}</label>
                  <input
                    type="number"
                    {...registerMetric('weightKg', { valueAsNumber: true })}
                    className="w-full bg-transparent border-b border-brand-gold/30 focus:border-brand-gold text-white font-sans text-xl py-2 outline-none transition-colors"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                <div className="flex space-x-2">
                  <div className="w-1/2">
                    <label className="block font-label text-[10px] text-brand-gold tracking-widest uppercase mb-2">{t('height_ft')}</label>
                    <input
                      type="number"
                      {...registerImperial('heightFt', { valueAsNumber: true })}
                      className="w-full bg-transparent border-b border-brand-gold/30 focus:border-brand-gold text-white font-sans text-xl py-2 outline-none transition-colors"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block font-label text-[10px] text-brand-gold tracking-widest uppercase mb-2">{t('height_in')}</label>
                    <input
                      type="number"
                      {...registerImperial('heightIn', { valueAsNumber: true })}
                      className="w-full bg-transparent border-b border-brand-gold/30 focus:border-brand-gold text-white font-sans text-xl py-2 outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-label text-[10px] text-brand-gold tracking-widest uppercase mb-2">{t('weight_lbs')}</label>
                  <input
                    type="number"
                    {...registerImperial('weightLbs', { valueAsNumber: true })}
                    className="w-full bg-transparent border-b border-brand-gold/30 focus:border-brand-gold text-white font-sans text-xl py-2 outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-label text-[10px] text-brand-gold tracking-widest uppercase mb-2">{t('age')}</label>
                <input
                  type="number"
                  {...(unit === 'metric' ? registerMetric('age', { valueAsNumber: true }) : registerImperial('age', { valueAsNumber: true }))}
                  className="w-full bg-transparent border-b border-brand-gold/30 focus:border-brand-gold text-white font-sans text-xl py-2 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-label text-[10px] text-brand-gold tracking-widest uppercase mb-2">{t('gender')}</label>
                <div className="flex space-x-4 mt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" value="male" {...(unit === 'metric' ? registerMetric('gender') : registerImperial('gender'))} className="text-brand-gold focus:ring-brand-gold bg-transparent border-brand-gold/30" />
                    <span className="font-sans font-light text-sm">{t('male')}</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" value="female" {...(unit === 'metric' ? registerMetric('gender') : registerImperial('gender'))} className="text-brand-gold focus:ring-brand-gold bg-transparent border-brand-gold/30" />
                    <span className="font-sans font-light text-sm">{t('female')}</span>
                  </label>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 mt-8 bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-teal-deep font-label text-sm tracking-widest uppercase rounded-full relative overflow-hidden group focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              <span className="relative z-10">{t('calculate')}</span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </motion.button>
          </form>

          {/* Results Panel */}
          <AnimatePresence>
            {bmiResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-12 pt-8 border-t border-brand-gold/20"
              >
                <div className="text-center mb-8">
                  <span className={`font-display text-7xl md:text-[80px] leading-none ${getBmiCategory(bmiResult).color}`}>
                    {bmiResult}
                  </span>
                  <div className="font-label text-xs tracking-[0.3em] uppercase mt-4 text-brand-ivory/80">
                    {getBmiCategory(bmiResult).label}
                  </div>
                </div>

                {/* Scale Bar */}
                <div className="relative h-2 bg-gradient-to-r from-blue-400 via-green-400 via-amber-400 via-orange-500 to-red-500 rounded-full mb-12">
                  <motion.div
                    initial={{ left: '0%' }}
                    animate={{ left: getBmiCategory(bmiResult).position }}
                    transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                    className="absolute top-0 -translate-x-1/2 -translate-y-full pb-2"
                  >
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
                  </motion.div>
                  <div className="absolute top-full left-0 right-0 flex justify-between text-[10px] font-sans text-brand-ivory/50 mt-2">
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>35</span>
                  </div>
                </div>

                {/* Advice Box */}
                <div className="bg-brand-teal-deep/50 p-6 rounded-xl border border-brand-gold/20 text-center">
                  <h4 className="font-label text-brand-gold text-[10px] tracking-widest uppercase mb-4">
                    {t('advice_title')}
                  </h4>
                  <p className="font-sans font-light text-sm leading-relaxed mb-6">
                    {getAdvice(bmiResult).text}
                  </p>
                  <a
                    href={getAdvice(bmiResult).link}
                    target={getAdvice(bmiResult).link.startsWith('http') ? '_blank' : '_self'}
                    rel={getAdvice(bmiResult).link.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="inline-block px-6 py-2 border border-brand-gold text-brand-gold rounded-full font-label text-[10px] tracking-widest uppercase hover:bg-brand-gold hover:text-brand-teal-deep transition-colors"
                  >
                    {getAdvice(bmiResult).cta}
                  </a>
                </div>

                <p className="font-sans text-[11px] italic text-brand-ivory/60 text-center mt-8">
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
