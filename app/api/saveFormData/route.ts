import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import { FormStatus, RequestFormData } from '@/app/[locale]/selfservice/types'
import { DATA_FILE_PATH } from '@/app/constants/config'
import { ensureDirectoryExists } from '@/app/[locale]/selfservice/utils/ensureDirectory'

/**
 * Handles POST requests to create a new form submission.
 *
 * Expects a JSON body containing `email` and `phoneNumber` to create a form entry.
 * The submission includes a randomly generated OTP, and the updated form data is persisted to a JSON file.
 *
 * Structured logging and basic analytics tracking are incorporated for better debugging and monitoring.
 *
 * @param {NextRequest} req - The Next.js request object.
 * @returns {Promise<NextResponse>} NextResponse - A response with either a success message containing the OTP or an error status.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Extracting email and phone number from the request body
    const formData: Omit<RequestFormData, 'otp' | 'status' | 'submissionDate'> = await req.json()

    // Basic validation of request data
    if (!validateEmail(formData.email) || !validatePhoneNumber(formData.phoneNumber)) {
      logEvent('Validation Failed', { email: formData.email, phoneNumber: formData.phoneNumber })
      return NextResponse.json({ error: 'Invalid email or phone number format' }, { status: 400 })
    }

    // Attempting to read existing form data from the JSON file
    let existingData: RequestFormData[] = []
    try {
      const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8')
      existingData = JSON.parse(fileContent)
    } catch (error) {
      logWarning('Data File Read Error', { error })
      // If the file doesn't exist or is empty, start with an empty array
      existingData = []
    }

    // Generate a random OTP
    const otp = generateOtp()

    // Create a new form data entry
    const newEntry: RequestFormData = {
      ...formData,
      otp,
      status: FormStatus.Pending,
      submissionDate: new Date().toISOString(),
    }

    // Add the new entry to the existing data
    existingData.push(newEntry)

    // Ensure the directory exists before writing to the JSON file
    await ensureDirectoryExists()

    // Persist the updated data
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(existingData, null, 2))

    // Log successful form submission
    logEvent('Form Submitted', { email: formData.email, otp })

    // Hook for analytics tracking
    trackAnalytics('FormSubmission', { email: formData.email, status: 'Pending' })

    // Return a success response with the generated OTP
    return NextResponse.json({ message: 'Form data saved successfully', otp })
  } catch (error) {
    // Log any errors that occur during the process
    logError('Form Submission Failed', { error })
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

/**
 * Validates the format of the provided email.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid, false otherwise.
 */
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates the phone number format (simple validation for demonstration purposes).
 *
 * @param {string} phoneNumber - The phone number to validate.
 * @returns {boolean} - Returns true if the phone number is valid, false otherwise.
 */
function validatePhoneNumber(phoneNumber: string): boolean {
  const phoneRegex = /^[0-9]{10,15}$/
  return phoneRegex.test(phoneNumber)
}

/**
 * Generates a 6-digit random OTP (One-Time Password).
 *
 * @returns {string} - A randomly generated 6-digit OTP.
 */
function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/**
 * Placeholder function for logging events in a structured format.
 *
 * @param {string} message - The log message.
 * @param {object} data - Additional log data for context.
 */
function logEvent(message: string, data: Record<string, unknown>) {
  console.info(`[INFO]: ${message}`, data)
}

/**
 * Placeholder function for logging warnings.
 *
 * @param {string} message - The log warning message.
 * @param {object} data - Additional log data for context.
 */
function logWarning(message: string, data: Record<string, unknown>) {
  console.warn(`[WARNING]: ${message}`, data)
}

/**
 * Placeholder function for logging errors in a structured format.
 *
 * @param {string} message - The error message.
 * @param {object} data - Additional log data for context.
 */
function logError(message: string, data: Record<string, unknown>) {
  console.error(`[ERROR]: ${message}`, data)
}

/**
 * Placeholder function to simulate analytics tracking.
 *
 * @param {string} event - The event name to track.
 * @param {object} data - Additional event data for analytics tracking.
 */
function trackAnalytics(event: string, data: Record<string, unknown>) {
  console.info(`[ANALYTICS]: ${event}`, data)
}
