import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { RequestFormData } from '@/app/[locale]/selfservice/types'

const DATA_FILE_PATH = path.join(process.cwd(), 'api', 'data', 'formData.json')

/**
 * Handles POST requests to save form data to a JSON file.
 *
 * @returns {Promise<NextResponse>}
 *   A JSON response with a success message and the generated OTP, or an error
 *   message and a 500 status code if there was an error.
 */
export async function POST(req: NextRequest) {
  try {
    const formData: RequestFormData = await req.json()

    // Read existing data
    let existingData: RequestFormData[] = []
    try {
      const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8')
      existingData = JSON.parse(fileContent)
    } catch (error) {
      // If file doesn't exist or is empty, we'll start with an empty array
      console.log('No existing data found, starting with empty array')
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Add new form data with OTP and initial status
    const newEntry: RequestFormData = {
      ...formData,
      otp,
      status: 'Pending',
      submissionDate: new Date().toISOString(),
    }
    existingData.push(newEntry)

    // Ensure the directory exists
    await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true })

    // Write updated data back to file
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(existingData, null, 2))

    return NextResponse.json({ message: 'Form data saved successfully', otp })
  } catch (error) {
    console.error('Error saving form data:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
