'use client'

import ShinyButton from '@/components/ShinyButton'
import CharacterList from './CharacterList'
import MainCharacter from './MainCharacter'

import { cn } from '@/utils/cn'
import { CloseOutlined, GlobalOutlined, MenuOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const Header = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<string>('MARKETPLACE ROADMAP')

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const menuItems = [
    { label: 'HOME', href: '#' },
    { label: 'ABOUT US', href: '#' },
    { label: 'OUR TEAMS', href: '#' },
    { label: 'MARKETPLACE ROADMAP', href: '#' },
    { label: 'WHITEPAPER', href: '#' },
  ]

  return (
    <div className='bg-[url("/images/header/background.png")] bg-cover bg-[top_center] bg-no-repeat'>
      <div className='size-full bg-[#17161A]/70'>
        <div className='mx-auto flex h-16 max-w-[1700px] items-center justify-between px-4 xl:justify-around'>
          <nav className='hidden items-center space-x-16 font-[family-name:var(--drone-bold)] text-sm xl:flex'>
            {menuItems.map((item) => (
              <div key={item.label} className='relative'>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveItem(item.label)
                  }}
                  className={cn(
                    'relative',
                    activeItem === item.label &&
                      'bg-gradient-to-r from-[#DA458F] to-[#DA34DD] bg-clip-text text-transparent',
                    activeItem !== item.label &&
                      'text-white hover:bg-gradient-to-r hover:from-[#DA458F] hover:to-[#DA34DD] hover:bg-clip-text hover:text-transparent',
                  )}
                >
                  {item.label}
                  <AnimatePresence>
                    <motion.div
                      className='absolute bottom-[-5px] left-0 h-0.5 bg-gradient-to-r from-[#DA458F] to-[#DA34DD]'
                      initial={{ width: 0 }}
                      animate={{
                        width: activeItem === item.label ? '100%' : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      style={{
                        transformOrigin:
                          activeItem === item.label ? 'left' : 'right',
                      }}
                    />
                  </AnimatePresence>
                </a>
              </div>
            ))}
          </nav>

          <button
            onClick={showDrawer}
            className='rounded-md p-2 text-white hover:bg-gray-800 xl:hidden'
          >
            <MenuOutlined className='text-xl' />
          </button>

          <div className='flex items-center space-x-4'>
            <ShinyButton
              title='Connect Wallet'
              className='px-4 py-2 text-sm font-medium'
            />
            <button className='rounded-full bg-transparent p-2 text-white hover:bg-gray-800'>
              <GlobalOutlined className='text-xl' />
            </button>
          </div>
        </div>
      </div>

      <Drawer
        placement='left'
        onClose={onClose}
        open={open}
        closeIcon={<CloseOutlined className='!text-[#89888b]' />}
        className='!bg-black/90'
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <div className='flex flex-col space-y-4 p-4 font-[family-name:var(--drone-bold)]'>
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                setActiveItem(item.label)
                onClose()
              }}
              className={cn(
                'py-2',
                activeItem === item.label &&
                  'bg-gradient-to-r from-[#DA458F] to-[#DA34DD] bg-clip-text text-transparent',
                activeItem !== item.label &&
                  'text-white hover:bg-gradient-to-r hover:from-[#DA458F] hover:to-[#DA34DD] hover:bg-clip-text hover:text-transparent',
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      </Drawer>
      <div className='mx-auto max-w-[1700px] p-12'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src='/images/header/na.png' alt='na' />
      </div>
      <div className='relative xl:h-[240px] 2xl:h-[300px]'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='/images/header/bg.png'
          alt='bottom-bg'
          className='size-full max-xl:h-[240px] max-xl:object-cover 2xl:h-[300px]'
        />
        <div className='absolute inset-0'>
          <div className='relative mx-auto h-full max-w-[1700px]'>
            <MainCharacter />
            <CharacterList />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Header
