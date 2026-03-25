'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function BBLSection() {
    const t = useTranslations('bbl');

    return (
        <section id="bbl" className="relative h-screen min-h-[800px] w-full bg-secondary overflow-hidden">
            {/* Background Image / Atmos */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-atmos.png"
                    alt="BBL Aesthetic Contouring"
                    fill
                    className="object-cover opacity-30 grayscale-[0.8] scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent" />
            </div>

            <div className="max-w-[1800px] mx-auto px-6 lg:px-12 h-full flex items-center relative z-10">
                <div className="max-w-4xl">
                    <motion.span
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="font-label text-primary text-xs md:text-sm tracking-[0.5em] uppercase mb-10 block font-bold"
                    >
                        {t('label')}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="font-display text-7xl md:text-[10rem] lg:text-[12rem] text-background-light tracking-tighter mb-12 leading-[0.8]"
                    >
                        {t('title1')} <br />
                        <span className="italic font-light text-primary">{t('title2')}</span>
                    </motion.h2>
                    <p className="font-sans font-light text-background-light/70 text-xl md:text-3xl max-w-2xl mb-16 leading-relaxed">
                        {t('desc')}
                    </p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <a href="#consult" className="px-14 py-7 bg-primary text-white rounded-full font-label text-xs tracking-[0.4em] uppercase font-bold shadow-2xl hover:shadow-primary/40 transition-all hover:scale-105 active:scale-95">
                            {t('cta')}
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Cinematic Accent */}
            <div className="absolute bottom-20 right-20 hidden lg:block">
                <div className="relative w-64 h-64 border border-primary/20 rounded-full flex items-center justify-center animate-spin-slow">
                    <span className="font-label text-primary text-[10px] tracking-[0.3em] uppercase font-bold text-center px-4">FAB CLINIC · BODY · ESTHETICS · VELURA ·</span>
                </div>
            </div>
        </section>
    );
}
