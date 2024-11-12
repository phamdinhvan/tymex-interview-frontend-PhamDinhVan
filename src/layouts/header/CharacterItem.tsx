import Image from 'next/image'
import React from 'react'

interface CharacterItemProps {
  src: string
  name: string
}

const CharacterItem = ({ src, name }: CharacterItemProps) => (
  <div className='flex flex-col items-center max-2xl:w-[16%]'>
    <div className='cursor-pointer items-center bg-transparent transition-transform duration-200 hover:-translate-y-1'>
      <Image
        src={src}
        alt='character'
        width={200}
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
