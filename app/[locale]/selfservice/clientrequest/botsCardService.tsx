'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

interface CardServiceProps {
  title: string
  description: string
  icon: string
  link: string
  locale: string
  onClick?: () => void
}

const styles = {
  cardContainer:
    'bg-white p-10 b-5 rounded-lg shadow-lg text-center max-w-xs flex flex-col justify-between group/item',
  iconWrapper: 'flex justify-center mb-8',
  title: 'text-lg font-semibold mb-2 text-blue-900',
  description: 'text-black-900 mb-4',
  linkWrapper: 'flex justify-center mt-auto',
  link: 'text-blue-500 cursor-pointer duration-200 ease-in-out rounded-md hover:bg-blue-300 active:scale-95 flex items-center space-x-2',
  image: '  h-28 w-28 ',
}

/**
 * A reusable component for a card that represents a service.
 *
 * This component will be used to render a list of services on the homepage.
 *
 * @param title The title of the service.
 * @param description A short description of the service.
 * @param icon The URL of an icon that represents the service.
 * @param link The URL to navigate to when the card is clicked.
 * @param locale The current locale.
 * @param onClick An optional callback to call when the card is clicked.
 *
 * @returns A JSX element representing the card.
 */
const CardServiceBots: React.FC<CardServiceProps> = ({
  title,
  description,
  icon,
  link,
  locale,
  onClick,
}) => {
  const localizedHref = `/${locale}${link}`

  return (
    <div className={styles.cardContainer}>
      <div className={styles.iconWrapper}>
        <Image src={icon} alt={`${title} Icon`} className={styles.image} height={28} width={28} />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>

      <div className={styles.linkWrapper}>
        <Button variant="secondary" className={styles.link}>
          <Image src="/clickcard.svg" alt="ArrowRight" height={20} width={20} />
        </Button>
      </div>
    </div>
  )
}

export default CardServiceBots
