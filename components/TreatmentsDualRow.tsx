'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import MagneticWrapper from './MagneticWrapper';

export default function TreatmentsDualRow() {
    const t = useTranslations('treatments');

    return (
        <section id="treatments-dual" className="py-20 md:py-32 bg-background-light overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                    {/* Botox Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative group bg-white rounded-[48px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-secondary/5 flex flex-col"
                    >
                        <div className="relative aspect-[16/10] overflow-hidden">
                            <Image
                                src="/images/hero-atmos.png"
                                alt="Bespoke Botox"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors duration-1000" />
                            <div className="absolute top-10 left-10 text-white/20 font-display text-8xl pointer-events-none group-hover:opacity-40 transition-opacity">01</div>
                        </div>
                        <div className="p-12 md:p-16 flex flex-col flex-grow">
                            <span className="font-label text-brand-gold-dark text-xs tracking-[0.5em] uppercase mb-8 block font-bold">
                                {t('botox_title')}
                            </span>
                            <h3 className="font-display text-5xl md:text-7xl text-secondary mb-10 italic">
                                {t('botox_subtitle')}
                            </h3>
                            <p className="font-sans font-light text-secondary/70 text-xl md:text-2xl leading-relaxed mb-12 flex-grow">
                                {t('botox_desc')}
                            </p>
                            <MagneticWrapper>
                                <a
                                    href="#consult"
                                    className="inline-flex px-12 py-5 bg-primary text-white rounded-full font-label text-xs tracking-[0.3em] uppercase font-bold hover:shadow-2xl transition-all duration-300 shadow-xl"
                                >
                                    {t('botox_cta')}
                                </a>
                            </MagneticWrapper>
                        </div>
                    </motion.div>

                    {/* Fillers Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative group bg-white rounded-[48px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-secondary/5 flex flex-col"
                    >
                        <div className="relative aspect-[16/10] overflow-hidden">
                            <Image
                                src="/images/lifestyle-atmos.png"
                                alt="Dermal Fillers"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors duration-1000" />
                            <div className="absolute top-10 right-10 text-white/20 font-display text-8xl pointer-events-none group-hover:opacity-40 transition-opacity">02</div>
                        </div>
                        <div className="p-12 md:p-16 flex flex-col flex-grow">
                            <span className="font-label text-brand-gold-dark text-xs tracking-[0.5em] uppercase mb-8 block font-bold">
                                {t('fillers_title')}
                            </span>
                            <h3 className="font-display text-5xl md:text-7xl text-secondary mb-10 italic">
                                {t('fillers_subtitle')}
                            </h3>
                            <p className="font-sans font-light text-secondary/70 text-xl md:text-2xl leading-relaxed mb-12 flex-grow">
                                {t('fillers_desc')}
                            </p>
                            <MagneticWrapper>
                                <a
                                    href="#consult"
                                    className="inline-flex px-12 py-5 bg-secondary text-white rounded-full font-label text-xs tracking-[0.3em] uppercase font-bold hover:shadow-2xl transition-all duration-300 shadow-xl"
                                >
                                    {t('fillers_cta')}
                                </a>
                            </MagneticWrapper>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
