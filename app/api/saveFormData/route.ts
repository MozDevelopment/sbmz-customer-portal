import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { RequestFormData } from '@/app/[locale]/selfservice/types'

/**
 * The path to the JSON file where form data will be stored.
 */
const DATA_FILE_PATH = path.join(process.cwd(), 'api', 'data', 'formData.json')

/**
 * Handles POST requests to this API endpoint.
 *
 * Expects a JSON body containing `email` and `phoneNumber` properties to create a new form submission.
 * Generates a random OTP, adds the submission to the existing data, and writes the updated data to the JSON file.
 *
 * @param req - The Next.js request object.
 * @returns NextResponse object with a message indicating success or an error message and status code.
 */
export async function POST(req: NextRequest) {
  try {
    // Extract email and phone number from the request body
    const formData: Omit<RequestFormData, 'otp' | 'status' | 'submissionDate'> = await req.json()

    // Read existing form data from the JSON file
    let existingData: RequestFormData[] = []
    try {
      const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8')
      existingData = JSON.parse(fileContent)
    } catch (error) {
      // If the file doesn't exist or is empty, start with an empty array
      console.log('No existing data found, starting with empty array')
    }

    // Generate a random OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Create a new form data entry with the provided information, generated OTP, and initial status
    const newEntry: RequestFormData = {
      ...formData,
      otp,
      status: 'Pending',
      submissionDate: new Date().toISOString(),
    }

    // Add the new entry to the existing data
    existingData.push(newEntry)

    // Ensure the directory exists before writing the file
    await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true })

    // Write the updated data back to the JSON file
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(existingData, null, 2))

    // Return a success response with the generated OTP
    return NextResponse.json({ message: 'Form data saved successfully', otp })
  } catch (error) {
    console.error('Error saving form data:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
