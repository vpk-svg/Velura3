'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef } from 'react';
import { EASE_PREMIUM } from '@/lib/motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function FullWidthHeaderImage() {
    const t = useTranslations('cinematic');
    const locale = useLocale();
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
            className="relative w-full min-h-[75vh] md:min-h-screen overflow-hidden bg-background-light flex items-center"
        >
            {/* Parallax background - Softened */}
            <motion.div style={{ scale, y }} className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-atmos.webp"
                    alt="FAB Clinic"
                    fill
                    priority
                    className="object-cover opacity-25 grayscale-[0.15]"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background-light/50 via-transparent to-background-light/80" />
            </motion.div>

            {/* Centered Hero Content */}
            <div className="relative z-10 w-full max-w-container mx-auto px-4 md:px-12 py-32">
                <motion.div
                    className="flex flex-col justify-center text-center max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: EASE_PREMIUM }}
                >
                    <div className="flex flex-col items-center gap-4 mb-10">
                        <span className="font-sans text-primary text-xs md:text-sm tracking-[0.25em] uppercase font-light">
                            {t('label')}
                        </span>
                        <div className="h-px w-16 bg-primary/30" />
                    </div>

                    <h1 className="font-display text-display-xl text-primary leading-[1] mb-10">
                        {t('title1')} <span className="font-script text-primary/70 text-7xl lowercase relative top-2 ml-2 -mr-2">and</span> <br />
                        <span className="italic font-light">{t('title2')}</span>
                    </h1>

                    <p className="font-sans font-light text-primary/70 text-lg md:text-xl leading-relaxed tracking-wide max-w-2xl mx-auto mb-14 px-4">
                        {t('hero_subtitle')}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <Link
                            href={`/${locale}/behandelingen`}
                            className="btn-primary inline-flex items-center justify-center gap-3 px-12 py-5"
                        >
                            {t('cta_treatments')}
                        </Link>
                        <Link
                            href={`/${locale}/trajecten`}
                            className="btn-ghost inline-flex items-center justify-center gap-3 px-12 py-5"
                        >
                            {t('explore')}
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Soft decorative element */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-light">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
            </div>
        </section>
    );
}
