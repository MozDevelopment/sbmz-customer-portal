import Footer from '@/components/Footer'
import Header from '@/components/Header'
import type { PropsWithChildren } from 'react'
const SelfServiceLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-4">{children}</main>
      <Footer />
    </div>
  )
}

export default SelfServiceLayout
