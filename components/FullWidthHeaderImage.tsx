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
            className="relative w-full h-[70vh] md:h-[100vh] overflow-hidden bg-secondary flex items-center justify-center p-4 md:p-12 mb-20"
        >
            <motion.div
                style={{ scale, y }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/images/hero-atmos.png"
                    alt="Premium FAB Clinic Experience"
                    fill
                    priority
                    className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-secondary/30 mix-blend-multiply" />
            </motion.div>

            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8 md:gap-20">
                <div className="max-w-3xl text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="font-label text-primary text-xs md:text-sm tracking-[0.5em] uppercase mb-4 block font-bold">
                            Medical Excellence
                        </span>
                        <h2 className="font-display text-6xl md:text-8xl lg:text-[10rem] text-background-light leading-[0.8] tracking-tighter">
                            Elegance <br />
                            <span className="italic font-light text-primary tracking-normal">Redefined</span>
                        </h2>
                    </motion.div>
                </div>

                <motion.div
                    className="max-w-md text-left pb-10"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="w-16 h-px bg-primary/50 mb-8" />
                    <p className="font-sans font-light text-background-light/80 text-lg md:text-2xl leading-relaxed tracking-wide">
                        Our specialized clinicians combine artistic vision with advanced medical precision to enhance your natural beauty.
                    </p>
                </motion.div>
            </div>

            {/* Floating Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 opacity-50"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
                <span className="font-label text-[10px] text-primary tracking-[0.3em] uppercase font-bold">Explore</span>
            </motion.div>
        </section>
    );
}
