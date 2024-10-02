'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import CardService from '../cardService'

interface BotsServiceProps {
  onServiceSelect: (service: string) => void
}

/**
 * Component that renders a grid of service cards. Each card is a button that
 * will call the onServiceSelect prop when clicked.
 *
 * @param {BotsServiceProps} props
 * @prop {Function} onServiceSelect - Callback function that will be called when
 * a service card is clicked. It will receive the title of the service that was
 * clicked as an argument.
 * @returns {ReactElement}
 */
const BotsService: React.FC<BotsServiceProps> = ({ onServiceSelect }) => {
  const t = useTranslations('BotsService')
  const { locale } = useParams()

  const cards = [
    {
      id: 1,
      title: t('cards.nationalTransfers.title'),
      description: t('cards.nationalTransfers.description'),
      icon: t('cards.nationalTransfers.icon'),
      link: t('cards.nationalTransfers.link'),
    },
    {
      id: 2,
      title: t('cards.accountDetailsLetter.title'),
      description: t('cards.accountDetailsLetter.description'),
      icon: t('cards.accountDetailsLetter.icon'),
      link: t('cards.accountDetailsLetter.link'),
    },
    {
      id: 3,
      title: t('cards.internationalTransfers.title'),
      description: t('cards.internationalTransfers.description'),
      icon: t('cards.internationalTransfers.icon'),
      link: t('cards.internationalTransfers.link'),
    },
    {
      id: 4,
      title: t('cards.statementsAndBalance.title'),
      description: t('cards.statementsAndBalance.description'),
      icon: t('cards.statementsAndBalance.icon'),
      link: t('cards.statementsAndBalance.link'),
    },
  ]

  const botsServiceHeader = (
    <header className="mb-8">
      <div className="rounded-lg bg-gray-200 p-8">
        <p className="text-lg font-medium">{t('helpText')}</p>
      </div>
    </header>
  )

  return (
    <div className="flex-1">
      {botsServiceHeader}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <CardService
            key={card.id}
            {...card}
            locale={locale as string}
            onClick={() => onServiceSelect(card.title)}
          />
        ))}
      </div>
    </div>
  )
}

export default BotsService
