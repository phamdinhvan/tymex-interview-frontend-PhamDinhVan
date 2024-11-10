/* eslint-disable @next/next/no-img-element */
import CharacterList from './CharacterList'
import MainCharacter from './MainCharacter'

const Header = () => {
  return (
    <div className='bg-[url("/images/header/background.png")] bg-cover bg-[top_center] bg-no-repeat'>
      <div className='size-full  bg-[#17161A]/70'>
        <div className='mx-auto flex h-16 max-w-7xl items-center justify-between'>
          <nav className='flex items-center space-x-8 font-[family-name:var(--drone-bold)]'>
            <a href='#' className='text-white hover:text-pink-500'>
              HOME
            </a>
            <a href='#' className='text-white hover:text-pink-500'>
              ABOUT US
            </a>
            <a href='#' className='text-white hover:text-pink-500'>
              OUR TEAMS
            </a>
            <a href='#' className='border-b-2 border-pink-500 text-pink-500'>
              MARKETPLACE ROADMAP
            </a>
            <a href='#' className='text-white hover:text-pink-500'>
              WHITEPAPER
            </a>
          </nav>

          <div className='flex items-center space-x-4'>
            <button className='rounded-md bg-pink-500 px-6 py-2 text-white hover:bg-pink-600'>
              Connect Wallet
            </button>
            <button className='rounded-full bg-transparent p-2 text-white hover:bg-gray-800'>
              🌐
            </button>
          </div>
        </div>
      </div>
      <div className='m-auto max-w-screen-2xl p-20'>
        <img src='/images/header/na.png' alt='na' />
      </div>
      <div className='relative'>
        <div>
          <MainCharacter />
          <CharacterList />
        </div>
        <img
          src='/images/header/bg.png'
          alt='bottom-bg'
          className='h-[300px] w-full'
        />
      </div>
    </div>
  )
}
export default Header
