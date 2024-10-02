import Footer from '@/components/Footer'
import Header from '@/components/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SBMZ Dashboard Starter',
  description: 'Dashboard FOR SBMZ',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="h-full min-h-[400px] w-full flex-grow bg-[url('/images/stmbz_400kb.jpg')] bg-cover bg-center bg-no-repeat sm:min-h-[500px] md:min-h-[600px]">
        {children}
      </div>
      <Footer />
    </div>
  )
}
