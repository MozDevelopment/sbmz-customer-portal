'use client'

import LanguageSwitcherSite from '@/components/language-switcher-site'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

interface NavItem {
  href: string
  label: string
  className?: string
}

const WebsiteHeader: React.FC = () => {
  const t = useTranslations('Header')

  const styles = {
    header: 'bg-white px-4 py-4 text-blue-900 shadow-sm',
    container: 'container mx-auto flex flex-col items-center justify-between lg:flex-row',
    nav: 'mb-4 w-full lg:mb-0 lg:w-auto',
    navList: 'flex flex-wrap justify-center space-x-2 lg:justify-start lg:space-x-4',
    link: 'block rounded px-3 py-2 transition-colors hover:bg-blue-100',
    secondaryLinkContainer:
      'flex flex-wrap items-center justify-center space-x-2 lg:justify-end lg:space-x-4',
    languageSwitcher: 'relative',
  }

  const navItems: NavItem[] = [
    { href: '/personal', label: t('personal'), className: 'font-semibold' },
    { href: '/business', label: t('business'), className: 'font-semibold' },
    { href: '/corporate', label: t('corporate') },
    { href: '/news', label: t('news') },
  ]

  const secondaryNavItems: NavItem[] = [
    { href: '/about', label: t('about') },
    { href: '/locate', label: t('locate') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav} aria-label={t('mainNavLabel')}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`${styles.link} ${item.className || ''}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.secondaryLinkContainer}>
          {secondaryNavItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
          <div className={styles.languageSwitcher}>
            <LanguageSwitcherSite />
          </div>
        </div>
      </div>
    </header>
  )
}

export default WebsiteHeader
