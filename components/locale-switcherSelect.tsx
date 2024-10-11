'use client'

import React, { useState, useCallback } from 'react'
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
import fs from 'fs/promises'
import path from 'path'
import BotsService from '@/app/[locale]/selfservice/clientrequest/botsServices'
import OtpForm from '@/app/[locale]/selfservice/clientrequest/clientOTPSignUp'
import InitialForm from '@/app/[locale]/selfservice/clientrequest/clientSignupService'
import {
  InitialFormValues,
  OtpFormValues,
  initialFormSchema,
  otpFormSchema,
} from '@/app/[locale]/selfservice/clientrequest/formTypes'
import SubmissionConfirmation from '@/app/[locale]/selfservice/clientrequest/submissionConfirmation'

interface FormData extends InitialFormValues, OtpFormValues {
  service: string | null
  ticketNumber?: string
  submissionDate?: string
}

export default function RequestPage() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    otp: '',
    service: null,
  })
  const { toast } = useToast()
  const t = useTranslations('RequestPage')
  const { locale } = useParams()

  const initialForm = useForm<InitialFormValues>({
    resolver: zodResolver(initialFormSchema),
  })

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpFormSchema),
  })

  const onServiceSelect = useCallback((service: string) => {
    setFormData((prevData) => ({ ...prevData, service }))
    setStep(1)
  }, [])

  const onInitialSubmit: SubmitHandler<InitialFormValues> = useCallback(
    (data) => {
      const currentDate = new Date().toLocaleString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
      setFormData((prevData) => ({
        ...prevData,
        ...data,
        submissionDate: currentDate,
      }))
      setStep(2)
      toast({
        title: t('toasts.initialSubmit.title'),
        description: t('toasts.initialSubmit.description'),
      })
    },
    [locale, t, toast]
  )

  const onOtpSubmit: SubmitHandler<OtpFormValues> = useCallback(
    async (data) => {
      const generatedTicketNumber = `${formData.service?.toUpperCase().slice(0, 3)}-${Math.floor(
        Math.random() * 1000000
      )}`
      const updatedFormData = {
        ...formData,
        ...data,
        ticketNumber: generatedTicketNumber,
      }
      setFormData(updatedFormData)
      await saveFormDataToFile(updatedFormData)
      setStep(3)
      toast({
        title: t('toasts.serviceSubmit.title'),
        description: t('toasts.serviceSubmit.description', { ticketNumber: generatedTicketNumber }),
      })
    },
    [formData, t, toast]
  )

  const saveFormDataToFile = async (data: FormData) => {
    try {
      const filePath = path.join(process.cwd(), 'formData.json')
      await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    } catch (error) {
      console.error('Failed to save form data to file:', error)
      toast({
        title: t('toasts.error.title'),
        description: t('toasts.error.saveData'),
        variant: 'destructive',
      })
    }
  }

  const renderStepContent = useCallback(() => {
    switch (step) {
      case 0:
        return <BotsService onServiceSelect={onServiceSelect} />
      case 1:
        return <InitialForm form={initialForm} onSubmit={onInitialSubmit} />
      case 2:
        return <OtpForm form={otpForm} onSubmit={onOtpSubmit} />
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
  }, [step, onServiceSelect, initialForm, onInitialSubmit, otpForm, onOtpSubmit, formData])

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto w-full max-w-2xl">
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
