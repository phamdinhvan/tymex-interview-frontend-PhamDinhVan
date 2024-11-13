import Image from 'next/image'

interface CharacterItemProps {
  src: string
  name: string
  isSwiper?: boolean
}

const CharacterItem = ({ src, name }: CharacterItemProps) => (
  <div className='flex flex-col items-center'>
    <div className='cursor-pointer items-center bg-transparent transition-transform duration-200 hover:-translate-y-1'>
      <Image
        src={src}
        alt='character'
        width={200}
        loading='lazy'
        height={200}
        className='mb-3 object-cover'
      />
    </div>
    <div className='font-[family-name:var(--drone-bold)] text-base font-medium text-gray-800'>
      {name}
    </div>
  </div>
)

export default CharacterItem
