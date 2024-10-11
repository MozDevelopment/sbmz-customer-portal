'use client'

import React, { useState, useTransition, useCallback } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { Locale, usePathname, useRouter } from '@/app/i18n/routing'

const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
    <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-blue-500"></div>
  </div>
)

export default function LanguageSwitcherSite() {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const locales = [
    { value: 'en', label: t('locale', { locale: 'en' }), image: '/ukflag_circle.svg' },
    { value: 'pt', label: t('locale', { locale: 'pt' }), image: '/circle-mz.png' },
    { value: 'zh', label: t('locale', { locale: 'zh' }), image: '/zhflag_circle.svg' },
  ]

  const localeChangeHandler = useCallback(
    (newLocale: Locale) => {
      startTransition(() => {
        router.replace(pathname, { locale: newLocale })
        setIsOpen(false)
      })
    },
    [router, pathname]
  )

  const currentLocale = locales.find(({ value }) => value === locale)

  return (
    <div className="relative">
      <button
        className="flex items-center rounded px-3 py-2 transition-colors hover:bg-blue-100"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        disabled={isPending}
      >
        <Image
          src={currentLocale?.image || '/circle-mz.png'}
          alt={t('flagAlt')}
          width={24}
          height={16}
          className="mr-2"
        />
        <span className="sr-only">{t('currentLanguage')}</span>
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      {isOpen && (
        <ul
          className="absolute right-0 z-20 mt-2 w-48 rounded-md bg-white py-2 shadow-xl"
          role="listbox"
        >
          {locales.map(({ value, label, image }) => (
            <li key={value} role="option" aria-selected={locale === value}>
              <button
                className={`w-full px-4 py-2 text-left hover:bg-blue-100 ${
                  locale === value ? 'font-bold' : ''
                }`}
                onClick={() => localeChangeHandler(value as Locale)}
              >
                <Image
                  src={image}
                  alt={label}
                  width={24}
                  height={16}
                  className="mr-2 inline-block"
                />
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
      {isPending && <LoadingSpinner />}
    </div>
  )
}
