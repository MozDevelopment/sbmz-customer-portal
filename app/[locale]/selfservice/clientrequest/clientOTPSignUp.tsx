// components/OtpForm.tsx
import React from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { OtpFormValues } from './formTypes'

interface OtpFormProps {
  form: UseFormReturn<OtpFormValues>
  onSubmit: SubmitHandler<OtpFormValues>
}

const OtpForm: React.FC<OtpFormProps> = ({ form, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input {...register('otp')} placeholder="Enter OTP" />
        {errors.otp && <p className="text-sm text-red-500">{errors.otp.message}</p>}
      </div>
      <Button type="submit">Validate OTP</Button>
    </form>
  )
}

export default OtpForm
