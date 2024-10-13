import { useCallback } from 'react'
import { FormValuesBC } from '../schema'

export function useBusinessCardActions(cardData: FormValuesBC | null) {
  const handleSave = useCallback(async () => {
    if (!cardData) return

    try {
      const response = await fetch('/api/save-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
      })

      if (!response.ok) {
        throw new Error('Failed to save business card')
      }

      alert('Business card saved successfully!')
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to save business card. Please try again.')
    }
  }, [cardData])

  const handleDownloadPDF = useCallback(async () => {
    if (!cardData) return

    try {
      const response = await fetch('/api/download-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
      })

      if (!response.ok) {
        throw new Error('Failed to generate PDF')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = 'business-card.pdf'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to download PDF. Please try again.')
    }
  }, [cardData])

  return { handleSave, handleDownloadPDF }
}
