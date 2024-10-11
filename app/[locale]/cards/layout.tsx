import Cards from './cards'
import Header from '../../website/web-site-header'
import Navigation from './navigation'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Cards />
      </main>
    </div>
  )
}

export default Layout
