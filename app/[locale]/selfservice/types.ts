import { z } from 'zod'
import { initialFormSchema, otpFormSchema } from './schema/schema'

export type InitialFormValues = z.infer<typeof initialFormSchema>
export type OtpFormValues = z.infer<typeof otpFormSchema>

// export interface RequestFormData extends InitialFormValues, OtpFormValues {
//   service: string | null
//   otp: string
//   ticketNumber?: string
//   submissionDate: string
//   status: 'Created' | 'Pending' | 'Submitted'
// }

export enum FormStatus {
  Created = 'Created',
  Pending = 'Pending',
  Submitted = 'Submitted',
}

export interface RequestFormData extends InitialFormValues, OtpFormValues {
  service: string | null
  otp: string
  ticketNumber?: string
  submissionDate: string
  status: FormStatus
}
