'use client'

import React, { useTransition } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useTranslations } from 'next-intl'
import { Locale, usePathname, useRouter } from '@/app/i18n/routing'
import { useParams } from 'next/navigation'

type LocaleSwitcherProps = {
  defaultValue: string
  label: string
}

const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
    <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-blue-500"></div>
  </div>
)

export default function LocaleSwitcherSelect({
  defaultValue,
  label,
}: Readonly<LocaleSwitcherProps>) {
  const t = useTranslations('LocaleSwitcher')
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  // Define locales based on translation
  const locales = [
    { value: 'en', label: t('locale', { locale: 'en' }) },
    { value: 'pt', label: t('locale', { locale: 'pt' }) },
    { value: 'zh', label: t('locale', { locale: 'zh' }) },
  ]

  // Style object for class names
  const styles = {
    container: 'relative',
    label: 'sr-only',
    trigger: `w-[180px] bg-white text-gray-900 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
      isPending ? 'opacity-50 cursor-not-allowed' : ''
    }`,
  }

  const localeChangeHandler = (locale: string) => {
    startTransition(() => {
      router.replace({ pathname, params }, { locale: locale as Locale })
    })
  }

  return (
    <div className={styles.container}>
      <Label htmlFor="locale-select" className={styles.label}>
        {label}
      </Label>
      <Select
        defaultValue={defaultValue}
        disabled={isPending}
        aria-labelledby="locale-select"
        onValueChange={localeChangeHandler}
      >
        <SelectTrigger
          id="locale-select"
          className={styles.trigger}
          aria-busy={isPending}
          aria-disabled={isPending}
        >
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {locales.map(({ value, label: localeLabel }) => (
            <SelectItem key={value} value={value}>
              {localeLabel}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isPending && <LoadingSpinner />}
    </div>
  )
}
