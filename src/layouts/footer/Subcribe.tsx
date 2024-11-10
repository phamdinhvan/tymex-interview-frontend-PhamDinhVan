const Subcribe = () => {
  return (
    <div>
      <h3 className='mb-4 text-lg font-bold'>
        SUBCRIBE TO RECEIVE OUR LATEST UPDATE
      </h3>
      <div className='flex gap-2'>
        <input
          type='email'
          placeholder='Your email address'
          className='flex-1 rounded border border-gray-600 bg-transparent px-4 py-2'
        />
        <button className='rounded bg-pink-500 px-6 py-2'>Subcribe</button>
      </div>
    </div>
  )
}

export default Subcribe
