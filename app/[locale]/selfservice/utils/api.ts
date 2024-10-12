import { RequestFormData } from '../types'

/**
 * Saves the given form data to the API.
 *
 * @param formData The form data to save
 *
 * @returns A promise that resolves to an object with an OTP property
 *
 * @throws If the API request fails
 */
export const saveFormDataToAPI = async (formData: RequestFormData): Promise<{ otp: string }> => {
  try {
    const response = await fetch('/api/saveFormData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    if (!result.otp) {
      throw new Error('OTP not received from the server')
    }

    return { otp: result.otp }
  } catch (error) {
    console.error('Error saving form data:', error)
    throw new Error('Failed to save form data')
  }
}

/**
 * Validates the given OTP against the server.
 *
 * @param email The email address of the user who submitted the form
 * @param phoneNumber The phone number of the user who submitted the form
 * @param otp The OTP to validate
 *
 * @returns A promise that resolves to an object with a ticketNumber and status property
 *
 * @throws If the OTP is invalid
 */
export const validateOtp = async (
  email: string,
  phoneNumber: string,
  otp: string
): Promise<{ ticketNumber: string; status: string }> => {
  try {
    const response = await fetch('/api/validateOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, phoneNumber, otp }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'OTP validation failed')
    }

    const result = await response.json()

    if (!result.ticketNumber || !result.status) {
      throw new Error('Invalid response from OTP validation')
    }

    return result
  } catch (error) {
    console.error('Error validating OTP:', error)
    throw error
  }
}
