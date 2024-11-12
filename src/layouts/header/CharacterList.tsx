import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import CharacterItem from './CharacterItem'
import { characterItems } from '@/constants/mock'

//global swiper style
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const CharacterList = () => {
  return (
    <div className='bottom-0 left-[8%] xl:absolute 2xl:left-0'>
      <div className='hidden xl:flex xl:flex-wrap xl:gap-10 xl:p-3 2xl:gap-16 2xl:p-5'>
        {characterItems.map((character, index) => (
          <CharacterItem
            key={index}
            src={character.src}
            name={character.name}
          />
        ))}
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
          {characterItems.map((character, index) => (
            <SwiperSlide key={index}>
              <CharacterItem src={character.src} name={character.name} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default CharacterList
