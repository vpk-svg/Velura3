'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef } from 'react';
import { EASE_PREMIUM } from '@/lib/motion';
import { ArrowRight } from 'lucide-react';

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
            className="relative w-full min-h-[70vh] md:min-h-screen overflow-hidden bg-secondary flex items-center"
        >
            {/* Parallax background */}
            <motion.div style={{ scale, y }} className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-atmos.webp"
                    alt="FAB Clinic — The Skin Centre"
                    fill
                    priority
                    className="object-cover opacity-75"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-secondary/55 mix-blend-multiply" />
            </motion.div>

            {/* Centered Hero Content */}
            <div className="relative z-10 w-full max-w-container mx-auto px-4 md:px-8 py-24 md:py-32">
                <motion.div
                    className="flex flex-col justify-center text-center max-w-4xl mx-auto"
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
                    <p className="font-sans font-light text-background-light/80 text-lg md:text-xl leading-relaxed tracking-wide max-w-2xl mx-auto mb-12">
                        {t('hero_subtitle')}
                    </p>
                    <div className="flex items-center justify-center">
                        <a
                            href="/consult/plan?focus=other"
                            className="inline-flex items-center justify-center gap-2 rounded-pill font-sans uppercase font-bold px-10 py-4 text-[11px] tracking-[0.25em] bg-primary text-white shadow-gold-glow hover:shadow-soft-xl transition-all duration-300 active:scale-[0.97]"
                        >
                            {t('cta_treatments')} <ArrowRight size={14} />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
