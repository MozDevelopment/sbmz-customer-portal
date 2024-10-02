'use client'

import React, { useTransition } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Locale, usePathname, useRouter } from '@/app/i18n/routing'
import { useParams } from 'next/navigation'

const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
    <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-blue-500"></div>
  </div>
)

export default function LanguageSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

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

  const localeChangeHandler = (newLocale: string) => {
    startTransition(() => {
      router.replace({ pathname, params }, { locale: newLocale as Locale })
    })
  }

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
