'use client';

import type { ReactNode } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

export type ConsultSubject = 'home' | 'weightloss' | 'botox' | 'fillers' | 'bbl' | 'medicatie' | 'intake' | 'other';

interface ConsultTriggerProps {
  children: ReactNode;
  className?: string;
  from?: ConsultSubject;
}

function subjectFromPath(pathname: string): ConsultSubject {
  if (/^\/(nl|en)?\/?$/.test(pathname)) return 'home';
  if (pathname.includes('/weightloss')) return 'weightloss';
  if (pathname.includes('/medicatie')) return 'medicatie';
  if (pathname.includes('/fillers')) return 'fillers';
  if (pathname.includes('/shape')) return 'bbl';
  if (pathname.includes('/botox') || pathname.includes('/trajecten')) return 'botox';
  return 'other';
}

export default function ConsultTrigger({ children, className, from }: ConsultTriggerProps) {
  const locale = useLocale();
  const pathname = usePathname();

  const source = from ?? subjectFromPath(pathname);
  const href = `/${locale}/consult?from=${source}`;

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
