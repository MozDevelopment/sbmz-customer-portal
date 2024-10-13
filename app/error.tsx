'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

interface Props {
  error: Error
  reset: () => void
}

const ErrorPage: React.FC<Props> = ({ error, reset }) => {
  const t = useTranslations('ErrorPage')

  console.error('Application error:', error)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-bold">{t('title')}</h1>
      <p className="mb-6">{t('description')}</p>
      <Button onClick={reset} variant="default" size="lg">
        {t('retry')}
      </Button>
    </div>
  )
}

export default ErrorPage
