import Navigation from './Navigation'
import Contact from './Contact'
import Subcribe from './Subcribe'

const Footer = () => {
  return (
    <footer className='bg-black py-12 text-white'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          <Navigation />
          <Contact />
          <Subcribe />
        </div>
        <div className='mt-12 flex flex-col items-center justify-between border-t border-gray-700 pt-6 md:flex-row'>
          <p>©2023 Tyme - Edit. All Rights reserved.</p>
          <div className='mt-4 flex gap-6 md:mt-0'>
            <a href='#'>Security</a>
            <a href='#'>Legal</a>
            <a href='#'>Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
