'use client';

import { motion } from 'motion/react';
import { type ReactNode } from 'react';
import { clsx } from 'clsx';
import MagneticWrapper from '@/components/MagneticWrapper';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit';
  magnetic?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
}

const VARIANT_STYLES = {
  primary:   'bg-primary text-ivory shadow-warm-glow hover:shadow-soft-xl',
  secondary: 'bg-primary/80 text-ivory shadow-soft-md hover:shadow-soft-lg hover:bg-primary',
  ghost:     'bg-transparent border border-primary/20 text-primary hover:border-primary hover:bg-primary hover:text-ivory',
} as const;

const SIZE_STYLES = {
  sm: 'px-8 py-3 text-[10px] tracking-[0.25em]',
  md: 'px-10 py-4 text-[11px] tracking-[0.25em]',
  lg: 'px-12 py-5 text-xs tracking-[0.3em]',
} as const;

/**
 * Unified CTA button.
 * Renders as <a> if `href` is provided, otherwise <button>.
 */
export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  type = 'button',
  magnetic = true,
  className,
  onClick,
  disabled,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = clsx(
    'inline-flex items-center justify-center rounded-pill font-sans uppercase font-light',
    'transition-all duration-500 ease-premium relative overflow-hidden group',
    'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    'active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none',
    VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    className,
  );

  const shimmer = variant === 'primary' && (
    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-ivory/15 to-transparent -skew-x-[30deg] -translate-x-full group-hover:animate-shimmer" />
  );

  const inner = href ? (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={classes}
      aria-label={ariaLabel}
    >
      {shimmer}
      <span className="relative z-10">{children}</span>
    </motion.a>
  ) : (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={classes}
      aria-label={ariaLabel}
    >
      {shimmer}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );

  return magnetic ? <MagneticWrapper>{inner}</MagneticWrapper> : inner;
}
