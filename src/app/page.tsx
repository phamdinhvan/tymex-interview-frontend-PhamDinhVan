import MarketplaceGrid from '@/layouts/content'
import Footer from '@/layouts/footer'
import Header from '@/layouts/header'

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <MarketplaceGrid />
      </main>
      <Footer />
    </div>
  )
}
