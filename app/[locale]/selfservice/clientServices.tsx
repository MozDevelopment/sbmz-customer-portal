'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import CardService from './cardService'
import { useParams } from 'next/navigation'

const CustomerServiceLinks: React.FC = () => {
  const t = useTranslations('CustomerServiceLinks') // Use translation hook
  const { locale } = useParams()
  // console.info(locale);

  const cards = [
    {
      id: 1,
      title: t('cards.selfService.title'),
      description: t('cards.selfService.description'),
      icon: t('cards.selfService.icon'),
      link: t('cards.selfService.link'),
    },
    {
      id: 2,
      title: t('cards.internetBanking.title'),
      description: t('cards.internetBanking.description'),
      icon: t('cards.internetBanking.icon'),
      link: t('cards.internetBanking.link'),
    },
    {
      id: 3,
      title: t('cards.personalAccountOpening.title'),
      description: t('cards.personalAccountOpening.description'),
      icon: t('cards.personalAccountOpening.icon'),
      link: t('cards.personalAccountOpening.link'),
    },
    {
      id: 4,
      title: t('cards.quiqChatBanking.title'),
      description: t('cards.quiqChatBanking.description'),
      icon: t('cards.quiqChatBanking.icon'),
      link: t('cards.quiqChatBanking.link'),
    },
  ]

  const selfServiceHeader = (
    <header className="mb-8">
      <Link href="/onboarding" className="flex w-fit items-center gap-10 p-10">
        <h1 className="text-2xl font-bold text-blue-900">{t('header')}</h1>
      </Link>
      <div className="rounded-lg bg-gray-200 p-8">
        <p className="text-lg font-medium">{t('helpText')}</p>
      </div>
    </header>
  )

  return (
    <div className="flex-1 p-8">
      {selfServiceHeader}
      {/* Grid of service cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <CardService key={card.id} {...card} locale={locale as string} />
        ))}
      </div>
    </div>
  )
}

export default CustomerServiceLinks
