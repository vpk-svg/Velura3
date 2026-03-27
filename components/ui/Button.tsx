'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';
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

const variantStyles = {
  primary:   'bg-primary text-white shadow-gold-glow hover:shadow-soft-xl',
  secondary: 'bg-secondary text-white shadow-soft-md hover:shadow-soft-lg hover:bg-secondary-deep',
  ghost:     'bg-transparent border border-secondary/10 text-secondary hover:border-primary hover:text-primary',
};

const sizeStyles = {
  sm: 'px-8 py-3 text-[10px] tracking-[0.2em]',
  md: 'px-10 py-4 text-[11px] tracking-[0.25em]',
  lg: 'px-12 py-5 text-xs tracking-[0.3em]',
};

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
  className = '',
  onClick,
  disabled,
  ...rest
}: ButtonProps) {
  const base = `
    inline-flex items-center justify-center rounded-pill font-label uppercase font-bold
    transition-all duration-300 ease-premium
    focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
    active:scale-[0.97]
    disabled:opacity-50 disabled:pointer-events-none
    ${variantStyles[variant]} ${sizeStyles[size]} ${className}
  `;

  const inner = href ? (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={base}
      {...rest}
    >
      {children}
    </motion.a>
  ) : (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={base}
      {...rest}
    >
      {children}
    </motion.button>
  );

  if (magnetic) {
    return <MagneticWrapper>{inner}</MagneticWrapper>;
  }

  return inner;
}
