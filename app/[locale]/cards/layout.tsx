import { FC } from 'react'
import WebsiteHeader from '../website/web-site-header'
import Cards from './cards'
import Navigation from './navigation'

/**
 * The root layout component for the cards page.
 *
 * @returns The JSX Element for the layout.
 */
const Layout: FC = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gray-100">
      <WebsiteHeader />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Cards />
      </main>
    </div>
  )
}

export default Layout
