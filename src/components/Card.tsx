'use client'

import { cn } from '@/utils/cn'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { HeartFilled } from '@ant-design/icons'
import { Avatar } from 'antd'
import Image from 'next/image'

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    description: string
    link: string
  }[]
  className?: string
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10',
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className='group relative  block size-full p-2'
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className='absolute inset-0 block size-full rounded-3xl bg-neutral-200 dark:bg-slate-800/[0.8]'
                layoutId='hoverBackground'
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className='m-2 w-[276px] rounded-lg bg-[#3A384199] p-4 '>
              <div className='rounded-lg bg-gradient-to-r from-[#DD5AFE] to-[#6366F1]'>
                <div className='flex items-center justify-between p-2'>
                  <div className='w-fit rounded bg-[#313B4580] px-2 py-1 text-xs'>
                    Epic
                  </div>
                  <HeartFilled />
                </div>
                <Image
                  src='/images/content/main-cr.png'
                  alt='character-img'
                  width={235}
                  height={197}
                />
              </div>
              <div className='flex items-center justify-between px-2 py-4'>
                <div className='text-base font-bold'>The DJ</div>
                <div className='flex items-center gap-1'>
                  <Image
                    src='/images/content/eth.png'
                    alt='eth-logo'
                    width={8}
                    height={13}
                  />
                  <div className='text-sm font-medium'>2,75 ETH</div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Avatar>T</Avatar>
                <div className='text-xs font-medium'>Ghozali_Ghozalu</div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export const Card = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20',
        className,
      )}
    >
      <div className='relative z-50'>
        <div className='p-4'>{children}</div>
      </div>
    </div>
  )
}
