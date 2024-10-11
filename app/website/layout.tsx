import Header from './web-site-header'

const WebsiteLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto px-4 py-8"></main>
        </div>
    )
}

export default WebsiteLayout
