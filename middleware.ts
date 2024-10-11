// import createMiddleware from 'next-intl/middleware';
// import {routing, locales, localePrefix} from './app/i18n/routing';

export default createMiddleware(routing)

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(pt|en|zh)/:path*']
// };

import createMiddleware from 'next-intl/middleware'
import { routing } from './app/i18n/routing'

// export default createMiddleware(routing, (request) => {
//   console.log('Middleware called for:', request.url)
// })

export const config = {
  matcher: ['/', '/(pt|en|zh)/:path*'],
}
