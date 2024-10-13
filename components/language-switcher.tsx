'use client'

import React, { useTransition, useCallback } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Locale, usePathname, useRouter, Pathnames } from '@/app/i18n/routing'

const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
    <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-blue-500"></div>
  </div>
)

/**
 * Renders a language switcher component.
 *
 * It uses the `next-intl` `useTranslations` hook to translate the labels,
 * and the `next/router` `useRouter` hook to navigate to the same path on the
 * selected locale.
 *
 * The component is disabled during navigation, and shows a spinner while
 * navigating.
 *
 * The component is wrapped in a `div` with the class `container`, and the
 * label has the class `sr-only`.
 *
 * The select element has the class `trigger`, and is styled to be a dropdown
 * with a white background, gray text, a blue border and a blue spinner while
 * navigating.
 *
 * The select options are rendered as a `ul` with the class `content`, and the
 * selected option is rendered as a `li` with the class `item`.
 *
 * The component uses the `next/router` `usePathname` hook to get the current
 * pathname.
 *
 * The component uses the `next/router` `useTransition` hook to navigate to the
 * same path on the selected locale.
 */
const LanguageSwitcher: React.FC = (): JSX.Element => {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()

  const locales = [
    { value: 'en', label: t('locale', { locale: 'en' }) },
    { value: 'pt', label: t('locale', { locale: 'pt' }) },
    { value: 'zh', label: t('locale', { locale: 'zh' }) },
  ]

  const styles = {
    container: 'relative',
    label: 'sr-only',
    trigger: `w-[180px] bg-white text-gray-900 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
      isPending ? 'opacity-50 cursor-not-allowed' : ''
    }`,
  }

  const localeChangeHandler = useCallback(
    (newLocale: string) => {
      startTransition(() => {
        const segments = pathname.split('/').filter(Boolean)
        const newPathname = '/' + segments.slice(1).join('/')
        router.push(newPathname as any, { locale: newLocale as Locale })
      })
    },
    [router, pathname]
  )

  return (
    <div className={styles.container}>
      <Label htmlFor="locale-select" className={styles.label}>
        {t('label')}
      </Label>
      <Select defaultValue={locale} disabled={isPending} onValueChange={localeChangeHandler}>
        <SelectTrigger
          id="locale-select"
          className={styles.trigger}
          aria-busy={isPending}
          aria-disabled={isPending}
        >
          <SelectValue placeholder={t('selectLanguage')} />
        </SelectTrigger>
        <SelectContent>
          {locales.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isPending && <LoadingSpinner />}
    </div>
  )
}

export default LanguageSwitcher
