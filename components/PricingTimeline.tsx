'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function PricingTimeline() {
    const [activePlan, setActivePlan] = useState('B');

    const plans = [
        { id: 'A', label: 'Prijsplan A' },
        { id: 'B', label: 'Prijsplan B' },
        { id: 'C', label: 'Prijsplan C' },
    ];

    type TimelineMonth = {
        month: string;
        dosage: string;
        price: string;
        optional?: boolean;
    };

    const timelineData: Record<string, TimelineMonth[]> = {
        A: [
            { month: 'Maand 1', dosage: 'dosering 0,25 mg', price: '€ 179' },
            { month: 'Maand 2', dosage: 'dosering 0,5 mg', price: '€ 199' },
            { month: 'Maand 3', dosage: 'dosering 1,0 mg', price: '€ 249' },
            { month: 'Maand 4', dosage: 'dosering 1,0 mg', price: '€ 249', optional: true },
        ],
        B: [
            { month: 'Maand 1', dosage: 'dosering 2,5 mg', price: '€ 249' },
            { month: 'Maand 2', dosage: 'dosering 5,0 mg', price: '€ 299' },
            { month: 'Maand 3', dosage: 'dosering 7,5 mg', price: '€ 349' },
            { month: 'Maand 4', dosage: 'dosering 10,0 mg', price: '€ 349', optional: true },
            { month: 'Maand 5', dosage: 'dosering 12,5 mg', price: '€ 399', optional: true },
        ],
        C: [
            { month: 'Maand 1', dosage: 'dosering 3,0 mg', price: '€ 149' },
            { month: 'Maand 2', dosage: 'dosering 3,0 mg', price: '€ 149' },
            { month: 'Maand 3', dosage: 'dosering 3,0 mg', price: '€ 149' },
        ],
    };

    const currentTimeline = timelineData[activePlan];

    return (
        <section className="py-24 bg-brand-ivory" aria-labelledby="pricing-timeline-title">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 id="pricing-timeline-title" className="font-display text-4xl md:text-5xl lg:text-5xl text-brand-teal-deep italic font-light mb-6">
                        Wat kost afvallen met GLP-1 door de maanden heen?
                    </h2>
                    <p className="font-sans text-brand-charcoal/70 text-lg max-w-3xl mx-auto font-light leading-relaxed">
                        Onze gespecialiseerde medische begeleiding en hoogwaardige medicatie zijn inbegrepen in de vaste maandelijkse prijzen. Er zijn geen verborgen kosten en je plan is afhankelijk van medische goedkeuring.
                    </p>
                </div>

                {/* Tab System */}
                <div className="flex justify-center mb-16">
                    <div className="inline-flex bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-brand-charcoal/10 shadow-sm" role="tablist">
                        {plans.map((plan) => (
                            <button
                                key={plan.id}
                                role="tab"
                                aria-selected={activePlan === plan.id}
                                onClick={() => setActivePlan(plan.id)}
                                className={`flex-1 relative px-8 py-3 rounded-full font-label text-xs tracking-widest uppercase transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:outline-none z-10 ${activePlan === plan.id ? 'text-brand-teal-deep font-semibold' : 'text-brand-charcoal/50 hover:text-brand-charcoal/80'
                                    }`}
                            >
                                {activePlan === plan.id && (
                                    <motion.div
                                        layoutId="pricingTabHighlight"
                                        className="absolute inset-0 bg-[#e6f4f1] rounded-full border border-brand-teal-light/20 -z-10 shadow-sm"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                {plan.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Horizontal Timeline Grid */}
                <div className="max-w-6xl mx-auto min-h-[300px]">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={activePlan}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="flex flex-nowrap overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbars gap-6"
                        >
                            {currentTimeline.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`flex-none w-[260px] snap-center bg-white rounded-2xl p-8 border hover:shadow-lg transition-all duration-300 ${item.optional ? 'border-dashed border-brand-charcoal/20 opacity-90' : 'border-brand-charcoal/10 shadow-sm'
                                        } flex flex-col items-center justify-between min-h-[220px]`}
                                >
                                    {/* Top Label */}
                                    <div className="w-full flex justify-center mb-6 relative">
                                        {item.optional && (
                                            <span className="absolute -top-4 font-label text-[9px] uppercase tracking-widest text-[#a8a8a8]">
                                                Optioneel
                                            </span>
                                        )}
                                        <h3 className="font-display text-2xl text-brand-teal-deep font-medium">
                                            {item.month}
                                        </h3>
                                    </div>

                                    {/* Dosage Indicator */}
                                    <div className="bg-[#e6f4f1] px-5 py-2.5 rounded-full mb-8 shadow-sm">
                                        <p className="font-label text-brand-teal-deep text-[10px] uppercase tracking-widest font-semibold">
                                            {item.dosage}
                                        </p>
                                    </div>

                                    {/* Price */}
                                    <div className="mt-auto">
                                        <p className="font-display text-4xl text-brand-gold">
                                            {item.price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* CTA */}
                <div className="flex justify-center mt-12">
                    <a
                        href="#bmi"
                        className="px-10 py-4 bg-brand-gold text-brand-teal-deep rounded-full font-label text-sm tracking-widest uppercase hover:bg-brand-gold-light transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-brand-teal-deep focus-visible:outline-none"
                    >
                        Kom ik in aanmerking?
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
