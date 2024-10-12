import { useState, useCallback } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { saveFormDataToAPI, validateOtp } from '../utils/api'
import { InitialFormValues, OtpFormValues, RequestFormData } from '../types'
import { initialFormSchema, otpFormSchema, validateOTP } from '../schema/schema'

const OTP_EXPIRATION_TIME = 5 * 60 * 1000 // 5 minutes in milliseconds

export const useRequestForm = () => {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<RequestFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    otp: '',
    service: null,
    status: ' ',
  })
  const [generatedOTP, setGeneratedOTP] = useState('')
  const [otpExpirationTime, setOtpExpirationTime] = useState(0)
  const [otpError, setOtpError] = useState<string | null>(null)
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

  const generateOTP = useCallback(() => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOTP(otp)
    setOtpExpirationTime(Date.now() + OTP_EXPIRATION_TIME)
    return otp
  }, [])

  const onInitialSubmit: SubmitHandler<InitialFormValues> = useCallback(
    async (data) => {
      const currentDate = new Date().toLocaleString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })

      const updatedFormData = {
        ...formData,
        ...data,
        submissionDate: currentDate,
      }

      try {
        const { otp } = await saveFormDataToAPI(updatedFormData)
        setGeneratedOTP(otp)
        setOtpExpirationTime(Date.now() + OTP_EXPIRATION_TIME)
        setFormData({ ...updatedFormData, otp })
        setStep(2)
        toast({
          title: t('toasts.initialSubmit.title'),
          description: t('toasts.initialSubmit.description'),
        })
      } catch (error) {
        console.error('Error submitting form:', error)
        toast({
          title: 'Error',
          description: 'Failed to save form data. Please try again.',
          variant: 'destructive',
        })
      }
    },
    [formData, locale, t, toast]
  )

  const onOtpSubmit: SubmitHandler<OtpFormValues> = useCallback(
    async (data) => {
      setOtpError(null)

      if (!validateOTP(data.otp, generatedOTP, otpExpirationTime)) {
        setOtpError('Invalid or expired OTP. Please try again.')
        return
      }

      try {
        const result = await validateOtp(formData.email, formData.phoneNumber, data.otp)

        const updatedFormData = {
          ...formData,
          ...data,
          ticketNumber: result.ticketNumber,
          status: result.status,
        }

        setFormData(updatedFormData)
        setStep(3)
        toast({
          title: t('toasts.serviceSubmit.title'),
          description: t('toasts.serviceSubmit.description', {
            ticketNumber: result.ticketNumber,
          }),
        })
      } catch (error) {
        console.error('Error validating OTP:', error)
        setOtpError('OTP validation failed. Please try again.')
      }
    },
    [formData, t, toast, generatedOTP, otpExpirationTime]
  )

  const onResendOtp = useCallback(async () => {
    try {
      const { otp } = await saveFormDataToAPI({ ...formData, otp: '' })
      setGeneratedOTP(otp)
      setOtpExpirationTime(Date.now() + OTP_EXPIRATION_TIME)
      setFormData((prevData) => ({ ...prevData, otp }))
      setOtpError(null)
      toast({
        title: 'OTP Resent',
        description: 'A new OTP has been sent to your phone number.',
      })
    } catch (error) {
      console.error('Error resending OTP:', error)
      toast({
        title: 'Error',
        description: 'Failed to resend OTP. Please try again.',
        variant: 'destructive',
      })
    }
  }, [formData, toast])

  const goToPreviousStep = useCallback(() => {
    setStep((prevStep) => prevStep - 1)
  }, [])

  return {
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
  }
}
