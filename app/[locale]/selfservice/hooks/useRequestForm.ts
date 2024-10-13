import { useState, useCallback, useMemo } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { initialFormSchema, otpFormSchema, validateOTPSchema } from '../schema/schema'
import { useToast } from '@/hooks/use-toast'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { saveFormDataToAPI, validateOtp } from '../utils/api'
import { InitialFormValues, OtpFormValues, RequestFormData, FormStatus } from '../types'
import { randomInt } from 'crypto'

const OTP_EXPIRATION_TIME = 5 * 60 * 1000 // 5 minutes in milliseconds
// const OTP_EXPIRATION_TIME = useMemo(() => 5 * 60 * 1000, []) // Memoizing a constant

/**
 * Custom hook to manage the request form submission process.
 *
 * This hook manages the state of the request form submission process, including the current step, form data, generated OTP, and OTP expiration time. It also provides functions to handle form submission, resend OTP, and go to the previous step.
 *
 * @returns an object with the following properties:
 *   - `step`: the current step of the request form submission process
 *   - `formData`: the form data that has been submitted so far
 *   - `initialForm`: the react-hook-form instance for the initial form
 *   - `otpForm`: the react-hook-form instance for the OTP form
 *   - `onServiceSelect`: a function to handle selecting a service
 *   - `onInitialSubmit`: a function to handle submitting the initial form
 *   - `onOtpSubmit`: a function to handle submitting the OTP form
 *   - `onResendOtp`: a function to handle resending the OTP
 *   - `goToPreviousStep`: a function to go to the previous step
 *   - `otpError`: an error message if the OTP is invalid or expired
 */
export const useRequestForm = () => {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<RequestFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    otp: '',
    service: null,
    status: FormStatus.Created,
    submissionDate: '',
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
    const otp = randomInt(100000, 999999).toString() // Use cryptographically secure OTP generation
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
        const message = error instanceof Error ? error.message : 'Unknown error occurred'
        toast({
          title: 'Error',
          description: message,
          variant: 'destructive',
        })
      }
    },
    [formData, locale, t, toast]
  )

  const onOtpSubmit: SubmitHandler<OtpFormValues> = useCallback(
    async (data) => {
      setOtpError(null)

      if (!validateOTPSchema(data.otp, generatedOTP, otpExpirationTime)) {
        setOtpError('Invalid or expired OTP. Please try again.')
        return
      }

      try {
        const result = await validateOtp(formData.email, formData.phoneNumber, data.otp)

        const updatedFormData = {
          ...formData,
          ...data,
          ticketNumber: result.ticketNumber,
          status: FormStatus.Submitted,
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
