import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises' // Import for asynchronous file system operations
import path from 'path' // Import for path manipulation
import { RequestFormData } from '@/app/[locale]/selfservice/types'

/**
 * Interface defining the structure of a request form data entry.
 *
 * @property email - The user's email address submitted in the form.
 * @property phoneNumber - The user's phone number submitted in the form.
 * @property otp - The one-time password (OTP) submitted by the user.
 * @property ticketNumber - (Optional) The generated ticket number assigned to the submission (populated on successful validation).
 * @property status - (Optional) The status of the submission (defaults to empty, set to 'Submitted' upon successful validation).
 */
// type RequestFormData = {
//   email: string
//   phoneNumber: string
//   otp: string
//   ticketNumber?: string
//   status?: string
// }

const DATA_FILE_PATH = path.join(process.cwd(), 'api', 'data', 'formData.json') // Absolute path to the form data file

/**
 * Handles POST requests to this API endpoint.
 *
 * Expects a JSON body containing `email`, `phoneNumber`, and `otp` properties
 * to validate a user's submission and assign a ticket number.
 *
 * @param req - The Next.js request object.
 * @returns NextResponse object with appropriate JSON response data and status code.
 */
export async function POST(req: NextRequest) {
  try {
    // Extract email, phone number, and OTP from request body
    const { email, phoneNumber, otp } = await req.json()

    // Read existing form data from the JSON file
    let formData: RequestFormData[] = []
    try {
      const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8')
      formData = JSON.parse(fileContent)
    } catch (error) {
      console.error('Error reading form data:', error)
      return NextResponse.json({ error: 'Error reading form data' }, { status: 500 })
    }

    // Find the matching submission based on email, phone number, and OTP
    const submissionIndex = formData.findIndex(
      (entry: RequestFormData) =>
        entry.email === email && entry.phoneNumber === phoneNumber && entry.otp === otp
    )

    if (submissionIndex === -1) {
      // Submission not found or invalid OTP
      return NextResponse.json({ error: 'Invalid OTP or submission not found' }, { status: 400 })
    }

    // Generate a unique ticket number
    const ticketNumber = `TICKET-${Math.floor(100000 + Math.random() * 900000)}`

    // Update the submission data with the generated ticket number and status
    formData[submissionIndex].ticketNumber = ticketNumber
    formData[submissionIndex].status = 'Submitted'

    // Write the updated form data back to the JSON file
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(formData, null, 2))

    // Successful response with ticket number and status
    return NextResponse.json({ ticketNumber, status: 'Submitted' })
  } catch (error) {
    console.error('Error validating OTP:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
