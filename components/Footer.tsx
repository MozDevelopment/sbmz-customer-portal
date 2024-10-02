'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

const styles = {
  footer: 'bg-[#0a2140] text-white py-8 border-t-2 border-slate-200',
  container: 'container mx-auto px-4',
  contentWrapper: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
  logoSection: 'flex flex-col items-center md:items-start',
  logo: 'text-2xl font-bold mb-4',
  nav: 'flex flex-col space-y-2 ',
  linkGroup: 'mb-6',
  linkHeader: 'text-lg font-semibold mb-2',
  link: 'hover:text-blue-300 transition duration-150 ease-in-out',
  legalSection: 'text-center md:text-left text-sm text-gray-400 mt-8',
  copyrightSection:
    'mt-8 pt-8 border-t border-gray-700 text-sm text-center md:text-left text-gray-400',
}

export const Footer = () => {
  const t = useTranslations('Footer')

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {/* Links Section */}
          <nav className={styles.nav}>
            <Link href="https://www.standardbank.com/" className={styles.link}>
              {t('sbgroup')}
            </Link>
            <Link href="https://www.standardbank.co.mz/Sobre-Nos" className={styles.link}>
              {t('about')}
            </Link>
            <Link href="https://www.standardbank.co.mz/avisolegal" className={styles.link}>
              {t('legalNotice')}
            </Link>
            <Link href="https://www.standardbank.co.mz/privacidade" className={styles.link}>
              {t('privacyStatement')}
            </Link>
            <Link href="https://www.standardbank.co.mz/acesso" className={styles.link}>
              {t('accessConditions')}
            </Link>
          </nav>

          {/* Legal Section */}
          <div className={styles.legalSection}>
            <p>{t('legalSection')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
