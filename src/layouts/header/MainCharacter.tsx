/* eslint-disable @next/next/no-img-element */
const MainCharacter = () => {
  return (
    <div className='absolute bottom-0 right-[8%]'>
      <div className='relative'>
        <img
          src='/images/header/main-cr.png'
          alt='Main character'
          className='h-auto w-[450px]'
        />
        <div className='absolute inset-x-0 bottom-0 pl-10'>
          <img
            src='/images/header/cr-lb.png'
            alt='The DJ label'
            className='w-full pb-1'
          />
          <div className='absolute inset-0 flex items-center justify-center font-[family-name:var(--drone-bold)] text-7xl font-bold text-white'>
            THE DJ
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainCharacter
