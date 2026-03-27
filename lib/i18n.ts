import { getRequestConfig } from 'next-intl/server';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['nl', 'en'],
  defaultLocale: 'nl',
});

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const isValid = locale && routing.locales.includes(locale as (typeof routing.locales)[number]);
  const resolvedLocale = isValid ? locale : routing.defaultLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
  };
});
