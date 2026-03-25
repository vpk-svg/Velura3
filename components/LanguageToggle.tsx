'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/lib/navigation';

export default function LanguageToggle() {
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

  return (
    <div className="flex items-center space-x-1 bg-transparent border border-brand-gold/30 rounded-full p-1 font-label text-[10px] tracking-[0.2em]">
      <button
        onClick={() => handleLocaleChange('nl')}
        disabled={isPending}
        aria-label="Switch to Dutch"
        className={`px-3 py-1 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:outline-none ${locale === 'nl'
          ? 'bg-brand-teal-deep text-white'
          : 'text-brand-gold hover:text-white'
          }`}
      >
        NL
      </button>
      <span className="text-brand-gold/50">|</span>
      <button
        onClick={() => handleLocaleChange('en')}
        disabled={isPending}
        aria-label="Switch to English"
        className={`px-3 py-1 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:outline-none ${locale === 'en'
          ? 'bg-brand-teal-deep text-white'
          : 'text-brand-gold hover:text-white'
          }`}
      >
        EN
      </button>
    </div>
  );
}
