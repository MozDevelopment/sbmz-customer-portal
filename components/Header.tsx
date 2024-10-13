'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import SBLogoIcon from './SBLogoIcon'
import LanguageSwitcher from './language-switcher'

const styles = {
  header: 'bg-[#002391] p-5  w-full',
  container: 'mx-auto max-w-screen-2xl flex items-center justify-between',
  logoSection: 'flex items-center',
  logoTitle: 'text-white text-2xl font-bold ml-2',
  navLinks: 'flex items-center gap-6',
  linkContainer: 'flex gap-6',
  link: 'text-white hover:text-blue-200 px-4 py-2',
  mainSiteLink: 'bg-[#0189ff] text-white px-4 py-2 rounded hover:bg-blue-600',
}

/**
 * The Header component renders the header section of the page, including the Standard Bank logo, title, and navigation links.
 * It also includes a language switcher component.
 *
 * The component uses the `next-intl` library to translate the text in the component.
 *
 * @returns {JSX.Element} The rendered Header component.
 */
export const Header: React.FC = (): JSX.Element => {
  const t = useTranslations('LocaleRootPage')

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo Section */}
        <Link href="/portal" className={styles.logoSection}>
          <SBLogoIcon />
          <h1 className={styles.logoTitle}>{t('title')}</h1>
        </Link>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          <nav className={styles.linkContainer}>
            <Link href="/" className={styles.link}>
              {t('title')}
            </Link>
            <Link href="/help" className={styles.mainSiteLink}>
              {t('navHelp')}
            </Link>
          </nav>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}

export default Header
