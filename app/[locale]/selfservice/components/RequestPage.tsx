'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRequestForm } from '../hooks/useRequestForm'
import BotsService from './BotsService'
import InitialForm from './InitialForm'
import SubmissionConfirmation from './SubmissionConfirmation'
import OtpForm from './OtpForm'

const RequestPage: React.FC = () => {
  const t = useTranslations('RequestPage')
  const {
    step,
    formData,
    initialForm,
    otpForm,
    onServiceSelect,
    onInitialSubmit,
    onOtpSubmit,
    onResendOtp,
    goToPreviousStep,
    otpError,
  } = useRequestForm()

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <BotsService onServiceSelect={onServiceSelect} />
      case 1:
        return <InitialForm form={initialForm} onSubmit={onInitialSubmit} />
      case 2:
        return (
          <OtpForm
            form={otpForm}
            onSubmit={onOtpSubmit}
            onResendOtp={onResendOtp}
            error={otpError}
          />
        )
      case 3:
        return (
          <SubmissionConfirmation
            ticketNumber={formData.ticketNumber || ''}
            date={formData.submissionDate || ''}
            service={formData.service}
          />
        )
      default:
        return null
    }
  }

  return (
    <main className="container mx-auto p-4">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{t('cardTitle')}</CardTitle>
          <CardDescription>{t('stepDescription', { step: step + 1 })}</CardDescription>
        </CardHeader>
        <CardContent>{renderStepContent()}</CardContent>
        <CardFooter className="flex justify-between">
          {step > 0 && (
            <Button variant="outline" onClick={goToPreviousStep}>
              {t('backButton')}
            </Button>
          )}
          {step < 3 && step > 0 && (
            <Button
              onClick={() => {
                if (step === 1) initialForm.handleSubmit(onInitialSubmit)()
                else if (step === 2) otpForm.handleSubmit(onOtpSubmit)()
              }}
            >
              {step === 2 ? t('submitButton') : t('nextButton')}
            </Button>
          )}
        </CardFooter>
      </Card>
    </main>
  )
}

export default RequestPage
