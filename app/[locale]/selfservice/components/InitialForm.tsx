import React from 'react'
import { useTranslations } from 'next-intl'
import { UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InitialFormValues } from '../types'

interface InitialFormProps {
  form: UseFormReturn<InitialFormValues>
  onSubmit: (data: InitialFormValues) => void
}

const InitialForm: React.FC<InitialFormProps> = ({ form, onSubmit }) => {
  const t = useTranslations('BotsForm')
  const {
    register,
    formState: { errors },
  } = form

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="fullName">{t('fullName')}</Label>
        <Input id="fullName" {...register('fullName')} />
        {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
      </div>
      <div>
        <Label htmlFor="email">{t('email')}</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="phoneNumber">{t('phoneNumber')}</Label>
        <Input id="phoneNumber" {...register('phoneNumber')} />
        {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
      </div>
    </form>
  )
}

export default InitialForm
