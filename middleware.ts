import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames, excluding api, _next, etc.
  matcher: ['/((?!api|_next|.*\\..*).*)', '/', '/(nl|en)/:path*']
};
