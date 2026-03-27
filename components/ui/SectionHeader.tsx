'use client';

import { motion } from 'motion/react';
import { EASE_PREMIUM } from '@/lib/motion';
import { ReactNode } from 'react';

interface SectionHeaderProps {
  label?: string;
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  align?: 'center' | 'left';
  light?: boolean;           // true for dark-bg sections
}

/**
 * Unified section header pattern.
 * Replaces the identical label + h2 + p block duplicated across ~10 sections.
 */
export default function SectionHeader({
  label,
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const labelColor = 'text-primary';
  const titleColor = light ? 'text-background-light' : 'text-secondary';
  const subtitleColor = light ? 'text-background-light/70' : 'text-secondary/70';

  return (
    <header className={`mb-12 md:mb-16 max-w-4xl ${alignClass}`}>
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          className={`font-sans ${labelColor} text-xs tracking-[0.2em] uppercase mb-6 block font-semibold`}
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.05, ease: EASE_PREMIUM }}
        className={`font-display text-display-lg ${titleColor} mb-6`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
          className={`font-sans font-light ${subtitleColor} text-xl md:text-2xl leading-relaxed`}
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  );
}
