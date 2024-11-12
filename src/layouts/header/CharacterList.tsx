import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const CharacterList = () => {
  return (
    <div className='bottom-0 left-[8%] xl:absolute 2xl:left-0'>
      <div className='hidden xl:flex xl:flex-wrap xl:gap-10 xl:p-3 2xl:gap-16 2xl:p-5'>
        <div className='flex flex-col items-center max-2xl:w-[16%]'>
          <div className='cursor-pointer items-center bg-transparent transition-transform duration-200 hover:-translate-y-1'>
            <Image
              src='/images/header/cr-list.png'
              alt='character'
              width={200}
              height={200}
              className='mb-3 object-cover'
            />
          </div>
          <div className='font-[family-name:var(--drone-bold)] text-base font-medium text-gray-800'>
            BASKETBALL GIRL
          </div>
        </div>
        <div className='flex flex-col items-center max-2xl:w-[16%]'>
          <div className='cursor-pointer items-center bg-transparent transition-transform duration-200 hover:-translate-y-1'>
            <Image
              src='/images/header/cr-list.png'
              alt='character'
              width={200}
              height={200}
              className='mb-3 object-cover'
            />
          </div>
          <div className='font-[family-name:var(--drone-bold)] text-base font-medium text-gray-800'>
            BASKETBALL GIRL
          </div>
        </div>
        <div className='flex flex-col items-center max-2xl:w-[16%]'>
          <div className='cursor-pointer items-center bg-transparent transition-transform duration-200 hover:-translate-y-1'>
            <Image
              src='/images/header/cr-list.png'
              alt='character'
              width={200}
              height={200}
              className='mb-3 object-cover'
            />
          </div>
          <div className='font-[family-name:var(--drone-bold)] text-base font-medium text-gray-800'>
            BASKETBALL GIRL
          </div>
        </div>
        <div className='flex flex-col items-center max-2xl:w-[16%]'>
          <div className='cursor-pointer items-center bg-transparent transition-transform duration-200 hover:-translate-y-1'>
            <Image
              src='/images/header/cr-list.png'
              alt='character'
              width={200}
              height={200}
              className='mb-3 object-cover'
            />
          </div>
          <div className='font-[family-name:var(--drone-bold)] text-base font-medium text-gray-800'>
            BASKETBALL GIRL
          </div>
        </div>
      </div>

      <div className='xl:hidden'>
        <Swiper
          modules={[Navigation]}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          navigation
          className='mt-5 w-full rounded-lg'
        >
          {[1, 2, 3, 4].map((_, index) => (
            <SwiperSlide key={index}>
              <div className='flex flex-col items-center'>
                <div className='cursor-pointer items-center bg-transparent transition-transform duration-200 hover:-translate-y-1'>
                  <Image
                    src='/images/header/cr-list.png'
                    alt='character'
                    width={200}
                    height={200}
                    className='mb-3 object-cover'
                  />
                </div>
                <div className='font-[family-name:var(--drone-bold)] text-base font-medium text-gray-800'>
                  BASKETBALL GIRL
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default CharacterList
