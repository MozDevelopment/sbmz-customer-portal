import React from 'react'
import { Button } from '@/components/ui/button' // Assuming you're using Heroicons, otherwise replace with your own SVG
import Image from 'next/image'

interface SubmissionConfirmationProps {
  ticketNumber: string
  date: string
}

const SubmissionConfirmation: React.FC<SubmissionConfirmationProps> = ({ ticketNumber, date }) => {
  const publicResource = {
    title: 'Self Service',
    description:
      "Follow step by step to Register into Quiq or NetPlus. Learn about your spending habits with 'My Financial Check' and more, with just a click.",
    icon: '/greencheck.svg',
    link: '/selfservice/clientrequest',
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <p className="text-lg font-semibold">Your request has been submitted!</p>
      <p className="text-sm">
        Request #: <span className="font-mono">{ticketNumber}</span>
      </p>
      <p className="text-sm">Date: {date}</p>
      <Button onClick={() => window.location.reload()}>Submit Another Request</Button>{' '}
      {/* Optional */}
      <Image
        src={publicResource.icon}
        alt={`${publicResource.title} icon`}
        width={84}
        height={84}
        className="mb-4"
      />
    </div>
  )
}

export default SubmissionConfirmation
