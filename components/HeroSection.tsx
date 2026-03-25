'use client';

import { motion, useScroll, useVelocity, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import MagneticWrapper from './MagneticWrapper';

export default function HeroSection() {
  const t = useTranslations('hero');
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroScale = useTransform(scrollY, [0, 800], [1.1, 1]);

  const itemVariants: any = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative h-[90vh] md:h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-secondary">

      {/* Cinematic Background Image */}
      <motion.div
        style={{
          scale: shouldReduceMotion ? 1 : heroScale,
          y: shouldReduceMotion ? 0 : parallaxY
        }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/hero-atmos.png"
          alt="Luxury Medical Wellness"
          fill
          priority
          className="object-cover opacity-50 brightness-[0.8]"
        />
        {/* Deep Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-transparent to-secondary" />
      </motion.div>

      {/* Cinematic Noise & Grain Overlay */}
      <div className="absolute inset-0 z-10 opacity-[0.12] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Main Content */}
      <motion.div
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-center w-full max-w-5xl mx-auto">
          <motion.div variants={itemVariants} className="mb-10">
            <span className="font-label text-primary text-xs md:text-sm tracking-[0.5em] uppercase font-bold">
              {t('label')}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-display text-7xl md:text-9xl lg:text-[12rem] leading-[0.8] tracking-tighter mb-12"
          >
            <span className="block text-background-light font-thin drop-shadow-2xl">{t('h1_line1')}</span>
            <span className="block text-primary italic font-medium -mt-4 drop-shadow-xl pl-12 md:pl-24">{t('h1_line2')}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="font-sans font-light text-background-light/90 text-lg md:text-2xl max-w-2xl mx-auto mb-16 leading-relaxed tracking-wide"
          >
            {t('subtext')}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4"
          >
            <MagneticWrapper>
              <a
                href="#treatments"
                className="group relative inline-flex items-center justify-center px-10 py-5 bg-primary text-white rounded-full font-label text-xs tracking-[0.3em] font-bold uppercase transition-all duration-300 shadow-[0_15px_45px_-10px_rgba(198,166,93,0.6)] hover:shadow-primary/40 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {t('cta_primary')}
              </a>
            </MagneticWrapper>
            <MagneticWrapper>
              <a
                href="#consult"
                className="group relative inline-flex items-center justify-center px-10 py-5 bg-transparent border border-primary text-primary rounded-full font-label text-xs tracking-[0.3em] font-bold uppercase hover:bg-primary/5 transition-all duration-300"
              >
                {t('cta_secondary')}
              </a>
            </MagneticWrapper>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
