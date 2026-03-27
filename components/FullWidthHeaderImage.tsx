'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef } from 'react';
import BmiCalculator from './BmiCalculator';
import Button from './ui/Button';
import { EASE_PREMIUM } from '@/lib/motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function FullWidthHeaderImage() {
    const t = useTranslations('cinematic');
    const tElig = useTranslations('eligibility');
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);

    const eligibilityPoints = [
        tElig('point1'),
        tElig('point2'),
        tElig('point3'),
        tElig('point4'),
    ];

    return (
        <section
            ref={containerRef}
            aria-label={t('label')}
            className="relative w-full min-h-[70vh] md:min-h-screen overflow-hidden bg-secondary flex items-center"
        >
            {/* Parallax background */}
            <motion.div style={{ scale, y }} className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-atmos.png"
                    alt=""
                    fill
                    priority
                    className="object-cover opacity-50"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-secondary/40 mix-blend-multiply" />
            </motion.div>

            {/* 3-Column Content */}
            <div className="relative z-10 w-full max-w-container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 px-4 md:px-8 py-24 md:py-32">

                {/* Left Column: Eligibility / "Geschikt voor mij?" */}
                <motion.div
                    className="flex flex-col justify-center order-2 lg:order-1"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: EASE_PREMIUM }}
                >
                    <div className="bg-white/95 backdrop-blur-md rounded-md p-6 md:p-8 shadow-soft-xl border border-white/20">
                        <span className="font-sans text-primary text-[10px] tracking-[0.2em] uppercase mb-3 block font-semibold">
                            {tElig('label')}
                        </span>
                        <h3 className="font-display text-2xl md:text-3xl text-secondary mb-6 italic">
                            {tElig('title')} <span className="text-primary not-italic">{tElig('title_accent')}</span>
                        </h3>
                        <p className="font-sans font-light text-secondary/70 text-sm leading-relaxed mb-6">
                            {tElig('desc')}
                        </p>
                        <ul className="space-y-3 mb-8">
                            {eligibilityPoints.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <CheckCircle size={18} className="text-primary shrink-0 mt-0.5" />
                                    <span className="font-sans font-light text-secondary/80 text-sm leading-relaxed">{point}</span>
                                </li>
                            ))}
                        </ul>
                        <Button href="#shop" variant="primary" size="md" className="w-full justify-center">
                            {tElig('cta')} <ArrowRight size={16} className="ml-2" />
                        </Button>
                    </div>
                </motion.div>

                {/* Center Column: Hero Content */}
                <motion.div
                    className="flex flex-col justify-center text-center order-1 lg:order-2"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: EASE_PREMIUM }}
                >
                    <span className="font-sans text-primary text-xs md:text-sm tracking-[0.3em] uppercase mb-8 block font-semibold">
                        {t('label')}
                    </span>
                    <h1 className="font-display text-display-xl text-background-light leading-[0.85] mb-8">
                        {t('title1')} <br />
                        <span className="italic font-light text-primary tracking-normal">{t('title2')}</span>
                    </h1>
                    <div className="w-20 h-px bg-primary/50 mx-auto mb-8" />
                    <p className="font-sans font-light text-background-light/80 text-lg md:text-xl leading-relaxed tracking-wide italic max-w-md mx-auto">
                        &ldquo;{t('desc')}&rdquo;
                    </p>
                </motion.div>

                {/* Right Column: BMI Calculator */}
                <motion.div
                    className="flex flex-col justify-center order-3"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: EASE_PREMIUM }}
                >
                    <div className="bg-white/95 backdrop-blur-md rounded-md p-6 md:p-8 shadow-soft-xl border border-white/20">
                        <BmiCalculator isEmbed />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
