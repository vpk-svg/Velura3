'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';

export default function FullWidthHeaderImage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1]);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[70vh] md:h-[100vh] overflow-hidden bg-brand-teal-deep flex items-center justify-center p-4 md:p-12 mb-20"
        >
            <motion.div
                style={{ scale, y }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/images/hero-atmos.png"
                    alt="Premium Velura Experience"
                    fill
                    priority
                    className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
            </motion.div>

            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8 md:gap-20">
                <div className="max-w-2xl text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="font-label text-brand-gold text-xs md:text-sm tracking-[0.4em] uppercase mb-4 block">
                            Luxury Reborn
                        </span>
                        <h2 className="font-display text-5xl md:text-8xl lg:text-9xl text-white leading-[0.85] tracking-tighter mix-blend-difference">
                            The Art of <br />
                            <span className="italic font-medium text-brand-gold">Transformation</span>
                        </h2>
                    </motion.div>
                </div>

                <motion.div
                    className="max-w-md text-left pb-4"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="w-12 h-px bg-brand-gold/50 mb-6 hidden md:block" />
                    <p className="font-sans font-light text-brand-ivory/80 text-lg md:text-xl leading-relaxed tracking-wide">
                        Discover a new era of medical weight loss. We combine cinematic aesthetics with scientific precision to guide your journey toward a healthier, more vibrant you.
                    </p>
                </motion.div>
            </div>

            {/* Floating Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 opacity-50"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="w-px h-12 bg-gradient-to-b from-brand-gold to-transparent" />
                <span className="font-label text-[10px] text-brand-gold tracking-[0.3em] uppercase">Scroll</span>
            </motion.div>
        </section>
    );
}
