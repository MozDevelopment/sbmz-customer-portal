'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface SubmissionConfirmationProps {
  ticketNumber: string
  date: string
  service: string | null
}

const styles = {
  container: 'flex flex-col items-center justify-center space-y-6 text-center',
  image: 'mb-4',
  title: 'text-2xl font-semibold text-green-600',
  text: 'space-y-2 text-gray-700',
  label: 'font-bold text-lg',
  value: 'text-base ml-2', // Add ml-2 for spacing
  button: 'w-full mt-6',
  checkEmail: 'text-sm text-gray-500',
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
    <div className={styles.container}>
      <Image
        src="/greencheck.svg"
        alt="Success"
        width={84}
        height={84}
        className="mb-4"
        aria-hidden="true"
      />
      <h2 className={styles.title}>{t('title')}</h2>
      <div className={styles.text}>
        <div className="flex justify-between">
          <Label className={styles.label} htmlFor="serviceRequested">
            {t('serviceRequested')}
          </Label>
          <span className={styles.value}>{service}</span>
        </div>
        <div className="flex justify-between">
          <Label className={styles.label} htmlFor="requestNumber">
            {t('requestNumber')}
          </Label>
          <span className={styles.value}>{ticketNumber}</span>
        </div>
        <div className="flex justify-between">
          <Label className={styles.label} htmlFor="submissionDate">
            {t('submissionDate')}
          </Label>
          <span className={styles.value}>{date}</span>
        </div>
      </div>
      <Button className={styles.button} onClick={handleSubmitAnother}>
        {t('submitAnother')}
      </Button>
    </div>
  )
}

export default SubmissionConfirmation
