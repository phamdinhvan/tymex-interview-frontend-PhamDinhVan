import ShinyButton from '@/components/ShinyButton'

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
        <ShinyButton
          title='Subcribe'
          className='px-4 py-2 text-sm font-semibold'
        />
      </div>
    </div>
  )
}

export default Subcribe
