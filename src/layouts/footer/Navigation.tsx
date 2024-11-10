const Navigation = () => {
  return (
    <div>
      <h3 className='mb-4 text-lg font-bold'>NAVIGATION</h3>
      <div className='grid grid-cols-3 gap-4'>
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
