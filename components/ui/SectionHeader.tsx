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
    <header className={`mb-16 md:mb-24 max-w-4xl ${alignClass}`}>
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          className="flex flex-col gap-2 mb-4"
        >
          <span className={`font-sans ${labelColor} text-xs tracking-ultra-wide uppercase block font-semibold`}>
            {label}
          </span>
          <div className={`h-px w-12 bg-primary/30 ${align === 'center' ? 'mx-auto' : ''}`} />
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.1, ease: EASE_PREMIUM }}
        className={`font-display text-display-lg ${titleColor} mb-8 leading-[1.1]`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE_PREMIUM }}
          className={`font-sans font-light ${subtitleColor} text-lg md:text-xl leading-relaxed tracking-wide opacity-80`}
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  );
}
