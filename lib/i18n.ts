import { getRequestConfig } from 'next-intl/server';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['nl', 'en'],
  defaultLocale: 'nl',
});

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "nl" | "en")) {
    return {
      locale: routing.defaultLocale,
      messages: (await import(`../messages/${routing.defaultLocale}.json`)).default
    };
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
