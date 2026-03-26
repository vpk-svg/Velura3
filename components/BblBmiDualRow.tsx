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
                        className="relative group bg-white rounded-[48px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-secondary/5 flex flex-col"
                    >
                        <div className="relative aspect-[16/10] overflow-hidden bg-secondary/5">
                            <Image
                                src="/images/bbl-example.png"
                                alt="Liquid BBL Contouring Illustration"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-secondary/5 group-hover:bg-transparent transition-colors duration-1000" />
                            <div className="absolute top-8 left-8 text-secondary/10 font-display text-7xl pointer-events-none group-hover:opacity-40 transition-opacity italic">BBL</div>
                        </div>
                        <div className="p-12 md:p-16 flex flex-col flex-grow">
                            <span className="font-label text-brand-gold-dark text-xs tracking-[0.5em] uppercase mb-8 block font-bold">
                                {t_bbl('label')}
                            </span>
                            <h3 className="font-display text-5xl md:text-7xl text-secondary mb-10 italic leading-tight">
                                {t_bbl('title1')} <span className="text-primary not-italic">{t_bbl('title2')}</span>
                            </h3>
                            <p className="font-sans font-light text-secondary/70 text-xl md:text-2xl leading-relaxed mb-12 flex-grow">
                                {t_bbl('desc')}
                            </p>
                            <MagneticWrapper>
                                <a
                                    href="#consult"
                                    className="inline-flex px-12 py-5 bg-secondary text-white rounded-full font-label text-xs tracking-[0.3em] uppercase font-bold hover:shadow-2xl transition-all duration-300 shadow-xl"
                                >
                                    {t_bbl('cta')}
                                </a>
                            </MagneticWrapper>
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
