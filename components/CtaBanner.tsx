'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { ReactElement } from 'react';

export default function CtaBanner(): ReactElement {
  const t = useTranslations('cta_banner');

  return (
    <section className="relative py-32 bg-brand-gold overflow-hidden">
      {/* SVG Noise Grain Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>

      {/* Animated Shimmer Sweep */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'linear', repeatDelay: 2 }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl text-brand-teal-deep font-light mb-6"
        >
          {t('title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans font-light text-brand-teal-deep/80 text-lg md:text-xl max-w-2xl mx-auto mb-12"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#shop"
            className="w-full sm:w-auto px-8 py-4 bg-brand-teal-deep text-white rounded-full font-label text-sm tracking-wider hover:bg-brand-teal-mid transition-colors duration-300"
          >
            {t('btn_primary')}
          </a>
          <a
            href="#bmi"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-brand-teal-deep text-brand-teal-deep rounded-full font-label text-sm tracking-wider hover:bg-brand-teal-deep/10 transition-colors duration-300"
          >
            {t('btn_secondary')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
