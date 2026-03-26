'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';

export default function PricingTimeline() {
    const t = useTranslations('pricing');
    const [activePlan, setActivePlan] = useState('B');

    const plans = [
        { id: 'A', label: t('planA') },
        { id: 'B', label: t('planB') },
        { id: 'C', label: t('planC') },
    ];

    type TimelineMonth = {
        month: string;
        dosage: string;
        price: string;
        optional?: boolean;
    };

    const timelineData: Record<string, TimelineMonth[]> = {
        A: [
            { month: `${t('month')} 1`, dosage: `${t('dosage')} 0,25 mg`, price: '€ 179' },
            { month: `${t('month')} 2`, dosage: `${t('dosage')} 0,5 mg`, price: '€ 199' },
            { month: `${t('month')} 3`, dosage: `${t('dosage')} 1,0 mg`, price: '€ 249' },
            { month: `${t('month')} 4`, dosage: `${t('dosage')} 1,0 mg`, price: '€ 249', optional: true },
        ],
        B: [
            { month: `${t('month')} 1`, dosage: `${t('dosage')} 2,5 mg`, price: '€ 249' },
            { month: `${t('month')} 2`, dosage: `${t('dosage')} 5,0 mg`, price: '€ 299' },
            { month: `${t('month')} 3`, dosage: `${t('dosage')} 7,5 mg`, price: '€ 349' },
            { month: `${t('month')} 4`, dosage: `${t('dosage')} 10,0 mg`, price: '€ 349', optional: true },
            { month: `${t('month')} 5`, dosage: `${t('dosage')} 12,5 mg`, price: '€ 399', optional: true },
        ],
        C: [
            { month: `${t('month')} 1`, dosage: `${t('dosage')} 3,0 mg`, price: '€ 149' },
            { month: `${t('month')} 2`, dosage: `${t('dosage')} 3,0 mg`, price: '€ 149' },
            { month: `${t('month')} 3`, dosage: `${t('dosage')} 3,0 mg`, price: '€ 149' },
        ],
    };

    const currentTimeline = timelineData[activePlan];

    return (
        <section id="pricing" className="py-20 md:py-32 bg-background-light overflow-hidden" aria-labelledby="pricing-timeline-title">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-12">

                {/* Header Section */}
                <div className="text-center mb-20 md:mb-32">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        id="pricing-timeline-title"
                        className="font-display text-5xl md:text-8xl text-secondary tracking-tighter mb-8"
                    >
                        {t('title')}
                    </motion.h2>
                    <p className="font-sans text-secondary/70 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
                        {t('desc')}
                    </p>
                </div>

                {/* Tab System */}
                <div className="flex justify-center mb-20 md:mb-32">
                    <div className="inline-flex bg-secondary/5 p-2 rounded-full border border-secondary/10 shadow-inner" role="tablist">
                        {plans.map((plan) => (
                            <button
                                key={plan.id}
                                role="tab"
                                aria-selected={activePlan === plan.id}
                                onClick={() => setActivePlan(plan.id)}
                                className={`relative px-12 py-4 rounded-full font-label text-xs tracking-widest uppercase transition-all duration-500 font-bold z-10 ${activePlan === plan.id ? 'text-white' : 'text-secondary/50 hover:text-primary'
                                    }`}
                            >
                                {activePlan === plan.id && (
                                    <motion.div
                                        layoutId="pricingTabHighlight"
                                        className="absolute inset-0 bg-primary rounded-full -z-10 shadow-xl"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                {plan.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Horizontal Timeline Grid */}
                <div className="max-w-[1700px] mx-auto min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activePlan}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-nowrap overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbars gap-8 md:gap-12"
                        >
                            {currentTimeline.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`flex-none w-[320px] md:w-[400px] snap-center bg-white rounded-[48px] p-12 border transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl ${item.optional ? 'border-dashed border-primary/20 bg-white/50' : 'border-primary/5 shadow-sm shadow-primary/5'
                                        } flex flex-col items-center justify-between min-h-[350px]`}
                                >
                                    {/* Top Label */}
                                    <div className="w-full flex flex-col items-center mb-10 relative">
                                        {item.optional && (
                                            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary mb-4 font-bold">
                                                {t('optional')}
                                            </span>
                                        )}
                                        <h3 className="font-display text-4xl text-secondary italic">
                                            {item.month}
                                        </h3>
                                    </div>

                                    {/* Dosage Indicator */}
                                    <div className="bg-primary/5 px-8 py-4 rounded-full mb-12 border border-primary/10">
                                        <p className="font-label text-primary text-[11px] uppercase tracking-[0.2em] font-bold">
                                            {item.dosage}
                                        </p>
                                    </div>

                                    {/* Price */}
                                    <div className="mt-auto">
                                        <p className="font-display text-6xl text-primary font-bold">
                                            {item.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* CTA */}
                <div className="flex justify-center mt-20">
                    <a
                        href="#bmi"
                        className="px-14 py-7 bg-secondary text-white rounded-full font-label text-xs tracking-[0.4em] uppercase font-bold hover:bg-primary transition-all shadow-2xl hover:scale-105 active:scale-95"
                    >
                        {t('cta')}
                    </a>
                </div>

            </div>

            <style jsx>{`
        .hide-scrollbars::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbars {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </section>
    );
}
