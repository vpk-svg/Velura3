'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { usePathname, useRouter } from '@/lib/navigation';

interface LanguageToggleProps {
  isScrolled?: boolean;
}

export default function LanguageToggle({ isScrolled = false }: LanguageToggleProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const shouldReduceMotion = useReducedMotion();

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) return;

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  const activeColorClass = 'text-background-light';
  const inactiveColorClass = 'text-secondary/60 hover:text-primary';
  const borderColor = 'border-secondary/20';

  return (
    <div className={`flex items-center space-x-1 bg-transparent border ${borderColor} rounded-full p-1.5 font-sans text-[10px] tracking-[0.2em] transition-all duration-500`}>
      <button
        onClick={() => handleLocaleChange('nl')}
        disabled={isPending}
        className="relative px-4 py-1.5 rounded-full transition-all duration-300 font-bold"
      >
        {locale === 'nl' ? (
          <motion.span
            layoutId="active-locale-pill"
            className="absolute inset-0 rounded-full bg-secondary"
            transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 35, mass: 0.7 }}
          />
        ) : null}
        <span className={`relative z-[1] ${locale === 'nl' ? activeColorClass : inactiveColorClass}`}>NL</span>
      </button>
      <button
        onClick={() => handleLocaleChange('en')}
        disabled={isPending}
        className="relative px-4 py-1.5 rounded-full transition-all duration-300 font-bold"
      >
        {locale === 'en' ? (
          <motion.span
            layoutId="active-locale-pill"
            className="absolute inset-0 rounded-full bg-secondary"
            transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 35, mass: 0.7 }}
          />
        ) : null}
        <span className={`relative z-[1] ${locale === 'en' ? activeColorClass : inactiveColorClass}`}>EN</span>
      </button>
    </div>
  );
}
