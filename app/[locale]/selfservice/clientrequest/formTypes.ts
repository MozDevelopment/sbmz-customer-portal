// types/formTypes.ts
import * as z from 'zod'

export const initialFormSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Invalid phone number'),
})

export type InitialFormValues = z.infer<typeof initialFormSchema>

export const otpFormSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

export type OtpFormValues = z.infer<typeof otpFormSchema>

export const serviceFormSchema = z.object({
  service: z.enum(['Service1', 'Service2', 'Service3', 'Service4']),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
})

export type ServiceFormValues = z.infer<typeof serviceFormSchema>
