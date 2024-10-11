'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

interface SubmissionConfirmationProps {
  ticketNumber: string
  date: string
  service: string | null
}

const SubmissionConfirmation: React.FC<SubmissionConfirmationProps> = ({
  ticketNumber,
  date,
  service,
}) => {
  const router = useRouter()
  const t = useTranslations('SubmissionConfirmation')

  const handleSubmitAnother = () => {
    router.refresh()
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center">
      <Image
        src="/greencheck.svg"
        alt=""
        width={84}
        height={84}
        className="mb-4"
        aria-hidden="true"
      />
      <h2 className="text-2xl font-semibold text-green-600">{t('title')}</h2>
      <div className="space-y-2 text-gray-700">
        <p className="text-lg">
          {t('serviceRequested')}: <span className="font-medium">{service}</span>
        </p>
        <p>
          {t('requestNumber')}: <span className="font-mono font-medium">{ticketNumber}</span>
        </p>
        <p>
          {t('submissionDate')}: <span className="font-medium">{date}</span>
        </p>
      </div>
      <div className="mt-6 space-y-4">
        <Button onClick={handleSubmitAnother} className="w-full">
          {t('submitAnother')}
        </Button>
        <Button variant="outline" className="w-full" onClick={() => router.push('/')}>
          {t('backToHome')}
        </Button>
      </div>
      {/* <p className="text-sm text-gray-500">{t('checkEmail')}</p> */}
    </div>
  )
}

export default SubmissionConfirmation
