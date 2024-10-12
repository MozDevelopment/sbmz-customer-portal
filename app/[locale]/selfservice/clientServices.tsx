'use client'

import React, { useCallback, useMemo } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import CardService from './cardService'

interface Card {
  id: number
  title: string
  description: string
  icon: string
  link: string
}

// Style object for consistency
const styles = {
  header: 'mb-8',
  link: 'flex w-fit items-center gap-10 p-10',
  headerText: 'text-2xl font-bold text-blue-900',
  helpTextWrapper: 'rounded-lg bg-gray-200 p-4',
  helpText: 'text-lg font-medium',
  cardGrid: 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4',
}

// CardHeader component
const CardHeader: React.FC<{ title: string; helpText: string }> = ({ title, helpText }) => (
  <header className={styles.header}>
    <Link href="/onboarding" className={styles.link}>
      <h1 className={styles.headerText}>{title}</h1>
    </Link>
    <div className={styles.helpTextWrapper}>
      <p className={styles.helpText}>{helpText}</p>
    </div>
  </header>
)

// CardItem component
const CardItem: React.FC<{ card: Card; locale: string; onClick: () => void }> = ({
  card,
  locale,
  onClick,
}) => (
  <article key={card.id}>
    <CardService {...card} locale={locale} onClick={onClick} />
  </article>
)

// CardGrid component
const CardGrid: React.FC<{
  cards: Card[]
  locale: string
  handleCardClick: (card: Card) => void
}> = ({ cards, locale, handleCardClick }) => (
  <section className={styles.cardGrid}>
    {cards.map((card) => (
      <CardItem key={card.id} card={card} locale={locale} onClick={() => handleCardClick(card)} />
    ))}
  </section>
)

const CustomerServiceLinks: React.FC = () => {
  const t = useTranslations('CustomerServiceLinks')
  const { locale } = useParams()
  const router = useRouter()

  // Memoize cards data for efficiency
  const cards: Card[] = useMemo(
    () => [
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
    ],
    [t]
  )

  // Handle card click with analytics logging and navigation
  const handleCardClick = useCallback(
    (card: Card) => {
      console.log(`Card clicked: ${card.title}`)

      const interactionData = {
        cardId: card.id,
        cardTitle: card.title,
        timestamp: new Date().toISOString(),
        locale: locale,
      }
      console.log('Interaction data:', interactionData)

      router.push(`/${locale}${card.link}`)
    },
    [locale, router]
  )

  return (
    <main>
      {/* Header with title and help text */}
      <CardHeader title={t('header')} helpText={t('helpText')} />

      {/* Grid of cards */}
      <CardGrid cards={cards} locale={locale as string} handleCardClick={handleCardClick} />
    </main>
  )
}

export default CustomerServiceLinks
