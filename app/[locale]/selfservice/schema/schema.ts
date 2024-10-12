import { z } from 'zod'

const fullNameRegex = /^[A-Za-z\s]+$/
const phoneRegex = /^[+]{0,1}[0-9]{7,11}$/
const otpRegex = /^\d+$/

export const initialFormSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Full name is required')
    .max(100, 'Full name must be 100 characters or less')
    .regex(fullNameRegex, 'Full name must contain only letters and spaces'),
  email: z.string().email('Invalid email address').max(255, 'Email must be 255 characters or less'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .max(15, 'Phone number must be 15 characters or less')
    .regex(phoneRegex, 'Phone number must be 7 to 11 digits without special characters'),
})

export const otpFormSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(otpRegex, 'OTP must contain only digits'),
})

export type InitialFormValues = z.infer<typeof initialFormSchema>
export type OtpFormValues = z.infer<typeof otpFormSchema>

// Additional validation for OTP
export const validateOTPSchema = (
  otp: string,
  generatedOTP: string,
  expirationTime: number
): boolean => {
  if (!otpRegex.test(otp)) {
    return false // OTP contains invalid characters
  }

  if (otp !== generatedOTP) {
    return false // OTP doesn't match the generated one
  }

  const currentTime = Date.now()
  if (currentTime > expirationTime) {
    return false // OTP has expired
  }

  return true // OTP is valid
}
