'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export default function CtaBanner() {
  const t = useTranslations('blog'); // Reusing blog translations or fallback if cta_banner not fully setup

  return (
    <section className="py-20 md:py-32 px-6 lg:px-12 bg-background-light">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1800px] mx-auto bg-primary rounded-[48px] p-16 md:p-32 text-center relative overflow-hidden shadow-2xl"
      >
        {/* SVG Noise Grain Overlay */}
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>

        {/* Animated Shimmer Sweep */}
        <motion.div
          className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear', repeatDelay: 2 }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl text-secondary font-bold mb-8 italic"
          >
            Your Transformation Begins Today
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans font-light text-secondary/80 text-xl md:text-2xl max-w-2xl mx-auto mb-16 leading-relaxed"
          >
            Join 50,000+ patients who have transformed their lives with our medically-guided programs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#shop"
              className="w-full sm:w-auto px-12 py-6 bg-secondary text-white rounded-full font-label text-xs tracking-[0.3em] uppercase font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Start Consultation
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#bmi"
              className="w-full sm:w-auto px-12 py-6 bg-transparent border border-secondary text-secondary rounded-full font-label text-xs tracking-[0.3em] uppercase font-bold hover:bg-secondary/5 transition-all duration-300"
            >
              Calculate BMI
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
