import { randomInt } from 'crypto'

// utils/otp.ts
export const generateOTP = (expirationTime: number): { otp: string; expiresAt: number } => {
  const otp = randomInt(100000, 999999).toString()
  const expiresAt = Date.now() + expirationTime
  return { otp, expiresAt }
}
