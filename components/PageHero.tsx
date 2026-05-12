'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { ReactNode } from 'react';
import { clsx } from 'clsx';
import Container from '@/components/ui/Container';
import { EASE_PREMIUM } from '@/lib/motion';

interface PageHeroProps {
  label?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  meta?: ReactNode;
  backgroundImageSrc?: string;
  backgroundImageAlt?: string;
  backgroundImageClassName?: string;
  overlayClassName?: string;
  sectionBgClassName?: string;
  align?: 'left' | 'center';
  minHeightClassName?: string;
  contentWidthClassName?: string;
  descriptionClassName?: string;
  descriptionWidthClassName?: string;
  className?: string;
  titleId?: string;
  imagePriority?: boolean;
  bottomDecoration?: ReactNode;
  children?: ReactNode;
}

export default function PageHero({
  label,
  title,
  description,
  actions,
  meta,
  backgroundImageSrc,
  backgroundImageAlt = '',
  backgroundImageClassName,
  overlayClassName,
  sectionBgClassName = 'bg-secondary',
  align = 'left',
  minHeightClassName = 'min-h-[78vh] md:min-h-[82vh]',
  contentWidthClassName,
  descriptionClassName,
  descriptionWidthClassName,
  className,
  titleId,
  imagePriority = true,
  bottomDecoration,
  children,
}: PageHeroProps) {
  const centered = align === 'center';

  return (
    <section
      aria-labelledby={titleId}
      className={clsx(
        'relative w-full flex items-center overflow-hidden',
        sectionBgClassName,
        minHeightClassName,
        className
      )}
    >
      {(backgroundImageSrc || overlayClassName) && (
        <div className="absolute inset-0 z-0">
          {backgroundImageSrc && (
            <Image
              src={backgroundImageSrc}
              alt={backgroundImageAlt}
              fill
              priority={imagePriority}
              className={clsx('object-cover', backgroundImageClassName)}
              sizes="100vw"
              aria-hidden={backgroundImageAlt === ''}
            />
          )}
          {overlayClassName && <div className={clsx('absolute inset-0', overlayClassName)} />}
        </div>
      )}

      <Container className="relative z-10 py-32 md:py-36">
        <div
          className={clsx(
            'flex flex-col justify-center',
            centered ? 'mx-auto text-center items-center' : 'text-left',
            contentWidthClassName ?? (centered ? 'max-w-4xl' : 'max-w-3xl')
          )}
        >
          {label && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_PREMIUM }}
              className={clsx(
                'font-sans text-primary text-xs tracking-[0.3em] uppercase mb-6 font-semibold',
                centered ? 'inline-flex items-center gap-2' : 'block'
              )}
            >
              {label}
            </motion.div>
          )}

          <motion.h1
            id={titleId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: EASE_PREMIUM }}
            className="font-display text-display-xl text-background-light mb-6 md:mb-8"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_PREMIUM }}
              className={clsx(
                'font-sans font-light text-lg md:text-xl leading-relaxed mb-10',
                descriptionClassName ?? 'text-background-light/75',
                centered ? 'mx-auto' : '',
                descriptionWidthClassName ?? 'max-w-2xl'
              )}
            >
              {description}
            </motion.p>
          )}

          {actions && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE_PREMIUM }}
              className={clsx(
                'flex flex-wrap gap-4',
                centered ? 'items-center justify-center' : 'items-center'
              )}
            >
              {actions}
            </motion.div>
          )}

          {meta && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: EASE_PREMIUM }}
              className={clsx('mt-8', centered ? 'mx-auto' : '')}
            >
              {meta}
            </motion.div>
          )}

          {children}
        </div>
      </Container>

      {bottomDecoration}
    </section>
  );
}
