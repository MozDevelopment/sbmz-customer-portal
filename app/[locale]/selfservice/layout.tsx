import type { PropsWithChildren } from 'react'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer'
const SelfServiceLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 bg-[url('/images/signin-bg.jpg')]">{children}</div>
      <Footer />
    </div>
  )
}

export default SelfServiceLayout
