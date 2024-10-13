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

/**
 * A component that renders a multi-step form for submitting a request to a service desk.
 *
 * The component uses the `useRequestForm` hook to manage the form state and submission process.
 *
 * The component renders a card with a header, content, and footer. The card header displays the title and description of the current step. The card content displays the current step's form. The card footer displays a back button if the current step is not the first step, and a next or submit button if the current step is not the last step.
 *
 * The component also renders a confirmation message if the submission is successful.
 */
const RequestPage: React.FC = (): JSX.Element => {
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
      <Card className="mx-auto">
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
