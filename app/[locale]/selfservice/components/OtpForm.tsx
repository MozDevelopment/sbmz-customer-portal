import React from 'react'
import { useTranslations } from 'next-intl'
import { UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { OtpFormValues } from '../types'

interface OtpFormProps {
  form: UseFormReturn<OtpFormValues>
  onSubmit: (data: OtpFormValues) => void
  onResendOtp: () => void
  error: string | null
}

const OtpForm: React.FC<OtpFormProps> = ({ form, onSubmit, onResendOtp, error }) => {
  const t = useTranslations('BotsForm')
  const {
    register,
    formState: { errors },
    reset,
  } = form

  React.useEffect(() => {
    if (error) {
      reset()
    }
  }, [error, reset])

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="otp">{t('otpLabel')}</Label>
        <Input id="otp" {...register('otp')} />
        {errors.otp && <p className="text-sm text-red-500">{errors.otp.message}</p>}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between">
        <Button type="button" variant="link" onClick={onResendOtp}>
          {t('resendOtp')}
        </Button>
      </div>
    </form>
  )
}

export default OtpForm
