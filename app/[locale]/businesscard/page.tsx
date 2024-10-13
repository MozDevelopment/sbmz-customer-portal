import { Metadata } from 'next'
import BusinessCardGenerator from './components/BusinesCardGenerator'

export const metadata: Metadata = {
  title: 'Business Card Generator',
  description: 'Create and customize your professional business card',
}

const PageBusinessCard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Business Card Generator</h1>
      <BusinessCardGenerator />
    </div>
  )
}

export default PageBusinessCard
