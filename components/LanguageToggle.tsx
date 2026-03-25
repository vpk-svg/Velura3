'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/lib/navigation';

interface LanguageToggleProps {
  isScrolled?: boolean;
}

export default function LanguageToggle({ isScrolled = false }: LanguageToggleProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) return;

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  const activeColorClass = isScrolled ? 'bg-secondary text-background-light' : 'bg-background-light text-secondary';
  const inactiveColorClass = isScrolled ? 'text-secondary/60 hover:text-primary' : 'text-background-light/70 hover:text-primary';
  const borderColor = isScrolled ? 'border-secondary/20' : 'border-background-light/20';

  return (
    <div className={`flex items-center space-x-1 bg-transparent border ${borderColor} rounded-full p-1.5 font-label text-[10px] tracking-[0.2em] transition-all duration-500`}>
      <button
        onClick={() => handleLocaleChange('nl')}
        disabled={isPending}
        className={`px-4 py-1.5 rounded-full transition-all duration-300 font-bold ${locale === 'nl' ? activeColorClass : inactiveColorClass}`}
      >
        NL
      </button>
      <button
        onClick={() => handleLocaleChange('en')}
        disabled={isPending}
        className={`px-4 py-1.5 rounded-full transition-all duration-300 font-bold ${locale === 'en' ? activeColorClass : inactiveColorClass}`}
      >
        EN
      </button>
    </div>
  );
}
