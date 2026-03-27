/**
 * Shared motion presets for Framer Motion.
 * Keeps easing, durations, and variant patterns DRY across all components.
 */
import type { Variants, Transition } from 'motion/react';

/* ── Premium easing (used site-wide) ──────────────── */
export const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Reusable transitions ─────────────────────────── */
export const TRANSITION_BASE: Transition = {
  duration: 0.8,
  ease: EASE_PREMIUM,
};

export const TRANSITION_SLOW: Transition = {
  duration: 1.2,
  ease: EASE_PREMIUM,
};

export const TRANSITION_SPRING = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 25,
};

/* ── Stagger container ────────────────────────────── */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

/* ── Fade-up child ────────────────────────────────── */
export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_PREMIUM },
  },
};

/* ── Slide-in from left / right ───────────────────── */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: EASE_PREMIUM } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: EASE_PREMIUM } },
};
