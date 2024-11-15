import Navigation from './Navigation'
import Contact from './Contact'
import Subscribe from './Subscribe'

const Footer = () => {
  return (
    <footer className='bg-black py-12 text-white'>
      <div className='mx-auto max-w-[1700px] px-4'>
        <div className='grid grid-cols-1 gap-8 font-medium md:grid-cols-2 lg:grid-cols-3'>
          <Navigation />
          <Contact />
          <Subscribe />
        </div>
        <div className='mt-12 flex flex-col items-center justify-between border-t border-gray-700 pt-6 font-medium md:flex-row'>
          <p className='text-center md:text-left'>
            ©2023 Tyme - Edit. All Rights reserved.
          </p>
          <div className='mt-4 flex flex-wrap justify-center gap-6 md:mt-0'>
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
