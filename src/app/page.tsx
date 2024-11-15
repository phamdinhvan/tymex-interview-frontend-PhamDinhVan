import Footer from '@/layouts/footer'
import Header from '@/layouts/header'
import ProductMarketplace from '@/features/product'
import Blurry from '@/components/Blurry'
import ScrollToTop from '@/components/ScrollToTop'

export const revalidate = 7200

export default function Home() {
  return (
    <>
      <Header />
      <ProductMarketplace />
      <Footer />
      <Blurry />
      <ScrollToTop />
    </>
  )
}
