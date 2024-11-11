'use client'

import CharacterList from './CharacterList'
import MainCharacter from './MainCharacter'

import { Drawer } from 'antd'
import { useState } from 'react'
import { MenuOutlined, GlobalOutlined } from '@ant-design/icons'

const Header = () => {
  const [open, setOpen] = useState<boolean>(false)

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
    { label: 'MARKETPLACE ROADMAP', href: '#', active: true },
    { label: 'WHITEPAPER', href: '#' },
  ]

  return (
    <div className='bg-[url("/images/header/background.png")] bg-cover bg-[top_center] bg-no-repeat'>
      <div className='size-full bg-[#17161A]/70'>
        <div className='mx-auto flex h-16 max-w-[1700px] items-center justify-between px-4 xl:justify-around'>
          <nav className='hidden items-center space-x-16 font-[family-name:var(--drone-bold)] text-sm xl:flex'>
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`${
                  item.active
                    ? 'border-b-2 border-pink-500 text-pink-500'
                    : 'text-white hover:text-pink-500'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            onClick={showDrawer}
            className='rounded-md p-2 text-white hover:bg-gray-800 xl:hidden'
          >
            <MenuOutlined className='text-xl' />
          </button>

          <div className='flex items-center space-x-4'>
            <button className='rounded-md bg-pink-500 px-6 py-2 text-white hover:bg-pink-600'>
              Connect Wallet
            </button>
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
              onClick={onClose}
              className={`${
                item.active
                  ? 'text-pink-500'
                  : 'text-gray-800 hover:text-pink-500'
              } py-2`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </Drawer>
      <div className='mx-auto max-w-[1700px] p-12'>
        <img src='/images/header/na.png' alt='na' />
      </div>
      <div className='relative xl:h-[240px] 2xl:h-[300px]'>
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
