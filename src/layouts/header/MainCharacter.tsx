const MainCharacter = () => {
  return (
    <div className='absolute bottom-0 right-[8%] max-2xl:w-1/5 2xl:right-0'>
      <div className='relative px-4'>
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
          <div className='absolute inset-0 flex items-center justify-center font-[family-name:var(--drone-bold)] text-4xl font-bold text-white 2xl:text-7xl'>
            THE DJ
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainCharacter
