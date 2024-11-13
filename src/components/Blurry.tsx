import RandomTextReveal from './RandomTextReveal'

const Blurry = () => {
  return (
    <div className='hide-element fixed left-0 top-0 z-10 h-screen w-screen font-[family-name:var(--ibm-mono)]'>
      <div className='flex h-screen items-center justify-center'>
        <div className='text-2xl font-semibold'>
          <RandomTextReveal duration={1} text='Initializing ...' />
        </div>
      </div>
    </div>
  )
}

export default Blurry
