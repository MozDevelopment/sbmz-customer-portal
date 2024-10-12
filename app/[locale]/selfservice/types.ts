import { z } from 'zod'
import { initialFormSchema, otpFormSchema } from './schema/schema'

export type InitialFormValues = z.infer<typeof initialFormSchema>
export type OtpFormValues = z.infer<typeof otpFormSchema>

export interface RequestFormData extends InitialFormValues, OtpFormValues {
  service: string | null
  otp: string
  ticketNumber?: string
  submissionDate: string
  status: 'Pending' | 'Submitted'
}
