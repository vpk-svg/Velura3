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

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  // Compute a continuous x value combining linear time and scroll velocity overrides
  const x = useTransform(scrollY, (value) => {
    return `${(value * -0.5) % 100}%`;
  });

  const itemVariants: any = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative h-[90vh] md:h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-brand-teal-deep">

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
          className="object-cover opacity-60 brightness-[0.7]"
        />
        {/* Deep Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-teal-deep/30 via-transparent to-brand-teal-deep" />
      </motion.div>

      {/* Cinematic Noise & Grain Overlay */}
      <div className="absolute inset-0 z-10 opacity-[0.14] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Main Content */}
      <motion.div
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Editorial Vertical Lines */}
        <div className="absolute inset-y-0 left-4 md:left-8 w-px border-l border-dashed border-white/10 hidden sm:block" aria-hidden="true" />
        <div className="absolute inset-y-0 right-4 md:right-8 w-px border-r border-dashed border-white/10 hidden sm:block" aria-hidden="true" />

        <div className="text-center w-full max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="mb-6">
            <span className="font-label text-brand-gold text-xs md:text-sm tracking-[0.3em] uppercase">
              {t('label')}
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter mb-8">
            <span className="block text-white font-thin">{t('h1_line1')}</span>
            <span className="block text-brand-gold italic font-medium mt-2">{t('h1_line2')}</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="font-sans font-light text-brand-ivory text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed opacity-90 tracking-wide">
            {t('subtext')}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <MagneticWrapper>
              <a
                href="#shop"
                aria-label={t('cta_primary')}
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-brand-gold text-brand-teal-deep rounded-full font-label text-sm tracking-[0.2em] font-medium uppercase hover:bg-brand-gold-light transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(201,168,76,0.6)] hover:shadow-[0_15px_50px_-5px_rgba(201,168,76,0.8)] focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-teal-deep focus-visible:outline-none"
              >
                {t('cta_primary')}
              </a>
            </MagneticWrapper>
            <MagneticWrapper>
              <a
                href="#bmi"
                aria-label={t('cta_secondary')}
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-label text-sm tracking-[0.2em] uppercase hover:bg-white/10 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                {t('cta_secondary')}
              </a>
            </MagneticWrapper>
          </motion.div>
        </div>
      </motion.div>

      {/* Marquee Strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-brand-teal-mid py-3 border-t border-brand-gold/20 overflow-hidden z-20">
        <motion.div
          className="whitespace-nowrap flex"
          style={{ x }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="font-label text-brand-gold/80 text-xs tracking-[0.2em] px-4">
              {t('marquee')}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
