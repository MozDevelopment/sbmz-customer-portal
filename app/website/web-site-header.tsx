'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import LanguageSwitcherSite from '@/components/languagle-switcher-site'

export default function Header() {
  const t = useTranslations('Header')

  const navItems = [
    { href: '/personal', label: t('personal'), className: 'font-semibold' },
    { href: '/business', label: t('business'), className: 'font-semibold' },
    { href: '/corporate', label: t('corporate') },
    { href: '/news', label: t('news') },
  ]

  const secondaryNavItems = [
    { href: '/about', label: t('about') },
    { href: '/locate', label: t('locate') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <header className="bg-white px-4 py-4 text-blue-900 shadow-sm">
      <div className="container mx-auto flex flex-col items-center justify-between lg:flex-row">
        <nav className="mb-4 w-full lg:mb-0 lg:w-auto" aria-label={t('mainNavLabel')}>
          <ul className="flex flex-wrap justify-center space-x-2 lg:justify-start lg:space-x-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded px-3 py-2 transition-colors hover:bg-blue-100 ${item.className || ''
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-wrap items-center justify-center space-x-2 lg:justify-end lg:space-x-4">
          {secondaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-3 py-2 transition-colors hover:bg-blue-100"
            >
              {item.label}
            </Link>
          ))}
          <div className="relative">
            <LanguageSwitcherSite />
          </div>
        </div>
      </div>
    </header>
  )
}
