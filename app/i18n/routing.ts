import { createLocalizedPathnamesNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const locales = ['en', 'pt', 'zh'] as const
export const localePrefix = 'always' // or 'as-needed', depending on your preference

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/pathnames': {
      en: '/pathnames',
      pt: '/caminhos',
      zh: '/路径名/',
    },
  },
})

export type Pathnames = keyof typeof routing.pathnames
export type Locale = (typeof locales)[number]

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation(routing)
