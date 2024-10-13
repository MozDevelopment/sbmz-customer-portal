import { Header } from '@/components/Header'
import Footer from '@/components/Footer'
import { Sidebar } from '@/components/sidebar'
import { MobileHeader } from '@/components/mobile-header'

const PortalLayout: React.FC<{
  children: React.ReactNode
}> = async ({ children }) => {
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

export default PortalLayout
