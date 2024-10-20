'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

interface CardServiceProps {
  title: string
  description: string
  icon: string
  link: string
  locale: string
  onClick: () => void
}

const styles = {
  cardContainer:
    'bg-white p-10 b-5 rounded-lg shadow-lg text-center max-w-xs flex flex-col justify-between group/item',
  iconWrapper: 'flex justify-center mb-8',
  title: 'text-lg font-semibold mb-2 text-blue-900',
  description: 'text-black-900 mb-4',
  linkWrapper: 'flex justify-center mt-auto',
  link: 'text-blue-500 cursor-pointer duration-200 ease-in-out rounded-md hover:bg-blue-300 active:scale-95 flex items-center space-x-2',
  image: 'h-28 w-28',
}

const CardService: React.FC<CardServiceProps> = ({ title, description, icon, onClick }) => {
  return (
    <div className={styles.cardContainer} onClick={onClick}>
      <div className={styles.iconWrapper}>
        <Image src={icon} alt={`${title} Icon`} className={styles.image} height={112} width={112} />
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

export default CardService
