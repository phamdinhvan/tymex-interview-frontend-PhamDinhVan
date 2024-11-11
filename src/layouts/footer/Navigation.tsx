const Navigation = () => {
  return (
    <div className='text-center md:text-left'>
      <h3 className='mb-4 font-[family-name:var(--drone-bold)] text-lg font-bold'>
        NAVIGATION
      </h3>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <div>
          <a href='#' className='mb-2 block'>
            Home
          </a>
          <a href='#' className='mb-2 block'>
            About us
          </a>
          <a href='#' className='mb-2 block'>
            Our teams
          </a>
        </div>
        <div>
          <a href='#' className='mb-2 block'>
            Whitepaper
          </a>
          <a href='#' className='mb-2 block'>
            Marketplace
          </a>
          <a href='#' className='mb-2 block'>
            Roadmap
          </a>
        </div>
        <div>
          <a href='#' className='mb-2 block'>
            FAQs
          </a>
          <a href='#' className='mb-2 block'>
            News
          </a>
          <a href='#' className='mb-2 block'>
            Community
          </a>
        </div>
      </div>
    </div>
  )
}

export default Navigation
