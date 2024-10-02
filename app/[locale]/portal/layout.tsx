import { getMessages } from 'next-intl/server'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer'
import { Sidebar } from '@/components/sidebar'
import { MobileHeader } from '@/components/mobile-header'

export default async function PortalLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const messages = await getMessages()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 bg-[url('/images/signin-bg.jpg')]">
        <Sidebar className="hidden lg:block" />
        {children}
      </div>
      <Footer />
      <MobileHeader />
    </div>
  )
}
