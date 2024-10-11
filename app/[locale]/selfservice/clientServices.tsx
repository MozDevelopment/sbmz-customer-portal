'use client'

import React, { useCallback } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import CardService from './cardService'

const CustomerServiceLinks: React.FC = () => {
  const t = useTranslations('CustomerServiceLinks')
  const { locale } = useParams()
  const router = useRouter()

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

  const handleCardClick = useCallback(
    (card: (typeof cards)[0]) => {
      // Log the interaction for analytics
      console.log(`Card clicked: ${card.title}`)

      // You can add more detailed logging here, e.g.:
      const interactionData = {
        cardId: card.id,
        cardTitle: card.title,
        timestamp: new Date().toISOString(),
        locale: locale,
      }
      console.log('Interaction data:', interactionData)

      // Here you would typically send this data to your analytics service
      // For example:
      // analyticsService.logInteraction(interactionData)

      // Navigate to the card's link
      router.push(`/${locale}${card.link}`)
    },
    [locale, router]
  )

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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <CardService
            key={card.id}
            {...card}
            locale={locale as string}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
    </div>
  )
}

export default CustomerServiceLinks
