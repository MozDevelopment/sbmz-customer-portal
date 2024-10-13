'use client'

import React from 'react'
import { FormValuesBC } from '../schema'
import BusinessCardForm from './BusinessCardForm'
import BusinessCard from './BusinessCard'
import { Button } from '@/components/ui/button'
import { BlueTemplate, GreenTemplate, PurpleTemplate } from './CardTemplates'
import { useBusinessCardPreview } from '../useBusinessCard'
import { useBusinessCardActions } from '../useBusinessCardActions'

export default function BusinessCardGenerator() {
  const { cardData, shortlink, handleSubmit } = useBusinessCardPreview()
  const { handleSave, handleDownloadPDF } = useBusinessCardActions(cardData)

  return (
    <div className="container mx-auto space-y-8 p-4">
      <div className="space-y-6">
        <BusinessCardForm onSubmit={handleSubmit} />
        <div className="rounded-lg bg-gray-100 p-4">
          <h3 className="mb-2 text-lg font-semibold">Live Preview</h3>
          {cardData && (
            <div className="mx-auto max-w-md">
              {cardData.template === '1' && <BlueTemplate data={cardData} />}
              {cardData.template === '2' && <GreenTemplate data={cardData} />}
              {cardData.template === '3' && <PurpleTemplate data={cardData} />}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold">Final Preview</h2>
        {cardData && (
          <div className="rounded-lg bg-white p-4 shadow-md">
            <BusinessCard data={cardData} />
          </div>
        )}
        {shortlink && (
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm">
              Shortlink:{' '}
              <a href={shortlink} className="text-blue-600 hover:underline">
                {shortlink}
              </a>
            </p>
          </div>
        )}
        <div className="flex space-x-4">
          <Button onClick={handleSave} disabled={!cardData}>
            Save Card
          </Button>
          <Button onClick={handleDownloadPDF} disabled={!cardData} variant="outline">
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
