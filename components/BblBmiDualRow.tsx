'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import BmiCalculator from './BmiCalculator';
import MagneticWrapper from './MagneticWrapper';

export default function BblBmiDualRow() {
    const t_bbl = useTranslations('bbl');

    return (
        <section id="bbl-bmi-dual" className="py-20 md:py-32 bg-background-light overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                    {/* BBL Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative group bg-secondary rounded-[48px] overflow-hidden shadow-2xl flex flex-col"
                    >
                        {/* Background Atmos */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="/images/hero-atmos.png"
                                alt="BBL Aesthetic Contouring"
                                fill
                                className="object-cover opacity-30 grayscale-[0.5] scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 to-secondary" />
                        </div>

                        <div className="relative z-10 p-12 md:p-16 flex flex-col h-full justify-center">
                            <span className="font-label text-primary text-xs tracking-[0.5em] uppercase mb-8 block font-bold">
                                {t_bbl('label')}
                            </span>
                            <h3 className="font-display text-5xl md:text-8xl text-white mb-10 italic">
                                {t_bbl('title1')} <span className="text-primary not-italic">{t_bbl('title2')}</span>
                            </h3>
                            <p className="font-sans font-light text-background-light/70 text-xl md:text-2xl leading-relaxed mb-12">
                                {t_bbl('desc')}
                            </p>
                            <MagneticWrapper>
                                <a
                                    href="#consult"
                                    className="inline-flex px-12 py-5 bg-primary text-white rounded-full font-label text-xs tracking-[0.3em] uppercase font-bold hover:shadow-2xl transition-all duration-300 shadow-xl"
                                >
                                    {t_bbl('cta')}
                                </a>
                            </MagneticWrapper>
                        </div>

                        {/* Cinematic Accent */}
                        <div className="absolute bottom-10 right-10 hidden md:block">
                            <div className="relative w-32 h-32 border border-primary/20 rounded-full flex items-center justify-center animate-spin-slow">
                                <span className="font-label text-primary text-[6px] tracking-[0.2em] uppercase font-bold text-center px-2">FAB CLINIC · BODY · ESTHETICS ·</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* BMI Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-white rounded-[48px] overflow-hidden shadow-sm border border-secondary/5 flex flex-col p-8 md:p-12"
                    >
                        {/* We use the original component but we'll need to wrap it or 
                            create a more compact version if it feels too cramped.
                            For now, let's see how the original fits. 
                            Actually, the original BmiCalculator has its own section/max-width.
                            I'll create a variant of it or modify it to be container-aware.
                        */}
                        <BmiCalculator isEmbed />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
