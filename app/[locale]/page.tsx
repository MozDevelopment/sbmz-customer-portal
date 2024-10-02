'use client'

import PageLayout from '@/components/pageLayout'
import { useTranslations } from 'next-intl'

export default function PageRoot() {
  const t = useTranslations('PageRoot')

  return (
    <PageLayout title={t('title')}>
      <div className="relative border-dashed border-indigo-400"></div>
    </PageLayout>
  )
}
