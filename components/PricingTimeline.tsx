'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import Container from './ui/Container';
import SectionHeader from './ui/SectionHeader';
import ConsultTrigger from './consult/ConsultTrigger';
import { EASE_PREMIUM } from '@/lib/motion';

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
        <section id="pricing" className="py-section-y bg-background-light overflow-hidden" aria-labelledby="pricing-title">
            <Container>
                <SectionHeader
                    label={t('planB')}
                    title={t('title')}
                    subtitle={t('desc')}
                />

                {/* Tab System */}
                <div className="flex justify-center mb-16 md:mb-20">
                    <div className="inline-flex bg-secondary/5 p-1.5 rounded-pill border border-secondary/10 shadow-inner" role="tablist" aria-label={t('tab_aria_label')}>
                        {plans.map((plan) => (
                            <button
                                key={plan.id}
                                role="tab"
                                aria-selected={activePlan === plan.id}
                                aria-controls={`panel-${plan.id}`}
                                onClick={() => setActivePlan(plan.id)}
                                className={`relative px-10 py-3.5 rounded-pill font-sans text-xs tracking-widest uppercase transition-all duration-300 ease-premium font-semibold z-10 focus-visible:ring-2 focus-visible:ring-primary ${activePlan === plan.id ? 'text-white' : 'text-secondary/50 hover:text-primary'}`}
                            >
                                {activePlan === plan.id && (
                                    <motion.div
                                        layoutId="pricingTabHighlight"
                                        className="absolute inset-0 bg-primary rounded-pill -z-10 shadow-gold-glow"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                {plan.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Horizontal Timeline */}
                <div className="max-w-container mx-auto min-h-[380px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activePlan}
                            id={`panel-${activePlan}`}
                            role="tabpanel"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                            className="flex flex-nowrap overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar gap-6 md:gap-10"
                            tabIndex={0}
                            aria-label={t('timeline_aria_label')}
                        >
                            {currentTimeline.map((item, idx) => (
                                <article
                                    key={idx}
                                    className={`flex-none w-[280px] md:w-[340px] snap-center bg-white rounded-md p-8 border transition-all duration-300 ease-premium hover:-translate-y-3 hover:shadow-soft-lg ${item.optional ? 'border-dashed border-primary/20 bg-white/60' : 'border-primary/5 shadow-soft-sm'} flex flex-col items-center justify-between min-h-[320px]`}
                                >
                                    <div className="w-full flex flex-col items-center mb-8">
                                        {item.optional && (
                                            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-primary mb-3 font-semibold">
                                                {t('optional')}
                                            </span>
                                        )}
                                        <h3 className="font-display text-display-sm text-secondary italic">
                                            {item.month}
                                        </h3>
                                    </div>

                                    <div className="bg-primary/5 px-6 py-3 rounded-pill mb-10 border border-primary/10">
                                        <p className="font-sans text-primary text-[11px] uppercase tracking-[0.2em] font-semibold">
                                            {item.dosage}
                                        </p>
                                    </div>

                                    <p className="mt-auto font-display text-display-md text-primary font-bold">
                                        {item.price}
                                    </p>
                                </article>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* CTA */}
                <div className="flex flex-col items-center gap-4 mt-16">
                    <p className="font-sans text-sm text-secondary/50">
                        {t('total_label')}: <span className="font-semibold text-secondary">{currentTimeline.reduce((sum, item) => sum + parseInt(item.price.replace(/[^\d]/g, ''), 10), 0).toLocaleString('nl-NL', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 })}</span>
                        {currentTimeline.some(item => item.optional) && <span className="text-secondary/40"> ({t('excl_optional')})</span>}
                    </p>
                    <ConsultTrigger className="inline-flex items-center justify-center rounded-pill font-sans uppercase font-bold px-12 py-5 text-xs tracking-[0.25em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]">
                        {t('cta')}
                    </ConsultTrigger>
                </div>
            </Container>
        </section>
    );
}
