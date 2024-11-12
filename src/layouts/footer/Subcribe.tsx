const Subcribe = () => {
  return (
    <div>
      <h3 className='mb-4 font-[family-name:var(--drone-bold)] text-base font-bold md:text-lg'>
        SUBCRIBE TO RECEIVE OUR LATEST UPDATE
      </h3>
      <div className='flex gap-2'>
        <input
          type='email'
          placeholder='Your email address'
          className='flex-1 rounded border border-gray-600 bg-transparent px-4 py-2'
        />
        <button className='hover:btn-shiny rounded-md bg-gradient-to-r from-[#DA458F] to-[#DA34DD] px-2 py-1 text-white hover:bg-pink-500'>
          Subcribe
        </button>
      </div>
    </div>
  )
}

export default Subcribe
