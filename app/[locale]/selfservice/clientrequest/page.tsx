'use client'

import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { useToast } from '@/hooks/use-toast'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { initialFormSchema, InitialFormValues, otpFormSchema, OtpFormValues } from './formTypes'
import BotsService from './botsServices'
import InitialForm from './clientSignupService'
import SubmissionConfirmation from './submissionConfirmation'
import OtpForm from './clientOTPSignUp'

export default function RequestPage() {
  const [step, setStep] = useState(0)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [initialData, setInitialData] = useState<InitialFormValues | null>(null)
  const [ticketNumber, setTicketNumber] = useState<string | null>(null)
  const [submissionDate, setSubmissionDate] = useState<string | null>(null)
  const { toast } = useToast()
  const t = useTranslations('RequestPage')
  const { locale } = useParams()

  const initialForm = useForm<InitialFormValues>({
    resolver: zodResolver(initialFormSchema),
  })

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpFormSchema),
  })

  const onServiceSelect = (service: string) => {
    setSelectedService(service)
    setStep(1)
  }

  const onInitialSubmit: SubmitHandler<InitialFormValues> = async (data) => {
    try {
      setInitialData(data)
      await saveFormData({ ...data, service: selectedService })
      setStep(2)
      toast({
        title: t('toasts.initialSubmit.title'),
        description: t('toasts.initialSubmit.description'),
      })
    } catch (error) {
      toast({
        title: t('toasts.error.title'),
        description: t('toasts.error.initialSubmit'),
        variant: 'destructive',
      })
    }
  }

  const onOtpSubmit: SubmitHandler<OtpFormValues> = async (data) => {
    try {
      await saveFormData(data)
      const generatedTicketNumber = `${selectedService?.toUpperCase().slice(0, 3)}-${Math.floor(
        Math.random() * 1000000
      )}`
      const currentDate = new Date().toLocaleString()

      setTicketNumber(generatedTicketNumber)
      setSubmissionDate(currentDate)

      await saveFormData({
        ...data,
        ticketNumber: generatedTicketNumber,
        submissionDate: currentDate,
      })

      setStep(3)
      toast({
        title: t('toasts.serviceSubmit.title'),
        description: t('toasts.serviceSubmit.description', { ticketNumber: generatedTicketNumber }),
      })
    } catch (error) {
      toast({
        title: t('toasts.error.title'),
        description: t('toasts.error.otpVerify'),
        variant: 'destructive',
      })
    }
  }

  const saveFormData = async (data: any) => {
    const response = await fetch('/api/save-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to save form data')
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <BotsService onServiceSelect={onServiceSelect} />
      case 1:
        return <InitialForm form={initialForm} onSubmit={onInitialSubmit} />
      case 2:
        return <OtpForm form={otpForm} onSubmit={onOtpSubmit} />
      case 3:
        return ticketNumber && submissionDate ? (
          <SubmissionConfirmation
            ticketNumber={ticketNumber}
            date={submissionDate}
            service={selectedService}
          />
        ) : null
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto">
        <CardHeader>
          <CardTitle>{t('cardTitle')}</CardTitle>
          <CardDescription>{t('stepDescription', { step: step + 1 })}</CardDescription>
        </CardHeader>
        <CardContent>{renderStepContent()}</CardContent>
        <CardFooter className="flex justify-between">
          {step > 0 && (
            <Button variant="outline" onClick={() => setStep((prevStep) => prevStep - 1)}>
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
    </div>
  )
}
