'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import MagneticWrapper from './MagneticWrapper';

export default function SplitTreatments() {
    const t = useTranslations('treatments');
    const t_bbl = useTranslations('bbl');

    return (
        <section id="splits" className="py-20 md:py-32 bg-background-light overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 lg:px-12 space-y-20 md:space-y-32">
                {/* Botox Section */}
                <div id="botox" className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 relative aspect-video w-full rounded-[48px] overflow-hidden shadow-2xl group"
                    >
                        <Image
                            src="/images/hero-atmos.png"
                            alt="Bespoke Botox"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors duration-1000" />
                        <div className="absolute top-10 left-10 text-white/20 font-display text-8xl pointer-events-none group-hover:opacity-40 transition-opacity">01</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 max-w-2xl px-4"
                    >
                        <span className="font-label text-brand-gold-dark text-xs tracking-[0.5em] uppercase mb-8 block font-bold">
                            {t('botox_title')}
                        </span>
                        <h2 className="font-display text-6xl md:text-8xl text-secondary mb-10 italic">
                            {t('botox_subtitle')}
                        </h2>
                        <p className="font-sans font-light text-secondary/70 text-xl md:text-2xl leading-relaxed mb-12">
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
                    </motion.div>
                </div>

                {/* BBL Section */}
                <div id="bbl" className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-32 pb-12">
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 relative aspect-video w-full rounded-[48px] overflow-hidden shadow-2xl group"
                    >
                        <Image
                            src="/images/lifestyle-atmos.png"
                            alt="Liquid BBL"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors duration-1000" />
                        <div className="absolute top-10 right-10 text-white/20 font-display text-8xl pointer-events-none group-hover:opacity-40 transition-opacity">02</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 max-w-2xl px-4 text-right"
                    >
                        <span className="font-label text-brand-gold-dark text-xs tracking-[0.5em] uppercase mb-8 block font-bold">
                            {t_bbl('label')}
                        </span>
                        <h2 className="font-display text-6xl md:text-8xl text-secondary mb-10 italic">
                            {t_bbl('title1')} <span className="text-primary not-italic">{t_bbl('title2')}</span>
                        </h2>
                        <p className="font-sans font-light text-secondary/70 text-xl md:text-2xl leading-relaxed mb-12">
                            {t_bbl('desc')}
                        </p>
                        <div className="flex justify-end">
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
                </div>
            </div>
        </section>
    );
}
