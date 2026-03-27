'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef } from 'react';
import BmiCalculator from './BmiCalculator';
import { EASE_PREMIUM } from '@/lib/motion';

export default function FullWidthHeaderImage() {
    const t = useTranslations('cinematic');
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);

    return (
        <section
            ref={containerRef}
            aria-label={t('label')}
            className="relative w-full min-h-[70vh] md:min-h-screen overflow-hidden bg-secondary flex items-center p-4 md:p-12"
        >
            {/* Parallax background */}
            <motion.div style={{ scale, y }} className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-atmos.png"
                    alt="Premium FAB Clinic Experience"
                    fill
                    priority
                    className="object-cover opacity-60"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-secondary/30 mix-blend-multiply" />
            </motion.div>

            {/* Content: Left = Hero text, Right = BMI Calculator */}
            <div className="relative z-10 w-full max-w-container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 py-16 md:py-24">
                {/* Left: Hero text */}
                <div className="flex-1 max-w-2xl text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: EASE_PREMIUM }}
                    >
                        <span className="font-sans text-primary text-xs md:text-sm tracking-[0.3em] uppercase mb-8 block font-semibold border-l-2 border-primary pl-6">
                            {t('label')}
                        </span>
                        <h1 className="font-display text-display-xl text-background-light leading-[0.85] mb-8">
                            {t('title1')} <br />
                            <span className="italic font-light text-primary tracking-normal">{t('title2')}</span>
                        </h1>
                        <div className="w-20 h-px bg-primary/50 mb-8" />
                        <p className="font-sans font-light text-background-light/80 text-lg md:text-xl leading-relaxed tracking-wide italic max-w-lg">
                            &ldquo;{t('desc')}&rdquo;
                        </p>
                    </motion.div>
                </div>

                {/* Right: BMI Calculator */}
                <motion.div
                    className="flex-1 w-full max-w-lg"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3, ease: EASE_PREMIUM }}
                >
                    <div className="bg-white/95 backdrop-blur-md rounded-md p-6 md:p-8 shadow-soft-xl border border-white/20">
                        <BmiCalculator isEmbed />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
