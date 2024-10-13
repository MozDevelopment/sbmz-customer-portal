import { useState, useCallback } from 'react'
import { FormValuesBC } from '../schema'

export function useBusinessCardPreview() {
  const [cardData, setCardData] = useState<FormValuesBC | null>(null)
  const [shortlink, setShortlink] = useState<string | null>(null)

  const handleSubmit = useCallback(async (data: FormValuesBC) => {
    setCardData(data)
    // Simulating API call to generate shortlink
    setTimeout(() => {
      setShortlink('https://short.link/abc123')
    }, 1000)
  }, [])

  return { cardData, shortlink, handleSubmit }
}
