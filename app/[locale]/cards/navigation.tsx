'use client'

import Link from 'next/link'
import { Search, Lock } from 'lucide-react'
import SBLogoIcon from '@/components/SBLogoIcon'
import { useTranslations } from 'next-intl'
import { FC } from 'react'

const styles = {
  nav: 'bg-blue-900 text-white py-4 px-4',
  container: 'container mx-auto flex justify-between items-center',
  logoSection: 'flex items-center space-x-8',
  logoLink: 'flex items-center space-x-2',
  logoTitle: 'text-lg font-bold',
  navList: 'flex space-x-6',
  navItem: 'hover:underline',
  iconContainer: 'flex items-center space-x-4',
  lockIconContainer: 'bg-blue-500 p-2 rounded',
  iconSize: 'w-6 h-6',
}

/**
 * The top-level navigation bar component for the site.
 *
 * It provides a SB logo link to the portal page, a navigation list with
 * links to key pages, and a search and lock icon.
 *
 * @returns The JSX Element for the navigation bar.
 */
const Navigation: FC = (): JSX.Element => {
  const t = useTranslations('NavigationSite') // Load translations for this component

  const navItems = [
    { href: '#', label: t('productsAndServices') },
    { href: '#', label: t('standardBankConnect') },
    { href: '#', label: t('learn') },
  ]

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <Link href="/portal" className={styles.logoLink}>
            <SBLogoIcon />
          </Link>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.navItem}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.iconContainer}>
          <Search className={styles.iconSize} />
          <div className={styles.lockIconContainer}>
            <Lock className={styles.iconSize} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
