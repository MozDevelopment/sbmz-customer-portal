import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { RequestFormData } from '@/app/[locale]/selfservice/types'

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'formData.json')

export async function POST(req: NextRequest) {
  try {
    const { email, phoneNumber, otp } = await req.json()

    // Read existing data
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8')
    const formData: RequestFormData[] = JSON.parse(fileContent)

    // Find the matching submission
    const submissionIndex = formData.findIndex(
      (entry: RequestFormData) =>
        entry.email === email && entry.phoneNumber === phoneNumber && entry.otp === otp
    )

    if (submissionIndex === -1) {
      return NextResponse.json({ error: 'Invalid OTP or submission not found' }, { status: 400 })
    }

    // Generate ticket number and update status
    const ticketNumber = `TICKET-${Math.floor(100000 + Math.random() * 900000)}`
    formData[submissionIndex].ticketNumber = ticketNumber
    formData[submissionIndex].status = 'Submitted'

    // Write updated data back to file
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(formData, null, 2))

    return NextResponse.json({ ticketNumber, status: 'Submitted' })
  } catch (error) {
    console.error('Error validating OTP:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
