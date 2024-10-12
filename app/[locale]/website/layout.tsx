import { ReactNode } from 'react'
import Header from './web-site-header'

interface LayoutProps {
  children: ReactNode
}

const WebsiteLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}

export default WebsiteLayout
