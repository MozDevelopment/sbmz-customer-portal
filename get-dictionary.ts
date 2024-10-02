import 'server-only'
import type { Locale } from './i18n-config'

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import('./messages/en.json').then((module) => module.default),
  de: () => import('./messages/pt.json').then((module) => module.default),
  cs: () => import('./messages/zh-cn.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.en()
