import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import RequestPage from '../components/RequestPage'

export const metadata: Metadata = {
  title: 'Self Service Request',
  description: 'Submit a self-service request for our services',
}

export default function Page() {
  const t = useTranslations('RequestPage')

  return (
    <>
      <h1 className="sr-only">{t('pageTitle')}</h1>
      <RequestPage />
    </>
  )
}
