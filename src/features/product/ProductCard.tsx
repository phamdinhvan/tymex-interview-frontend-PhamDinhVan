import { cn } from '@/utils/cn'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface ProductCardProps {
  tier: string
  title: string
  price: number
  isFavorite: boolean
  author: {
    avatar: string
    firstName: string
    lastName: string
  }
}

const ProductCard: React.FC<ProductCardProps> = ({
  tier,
  title,
  price,
  isFavorite,
  author,
}) => {
  const gradients = [
    'from-[#49DD81] to-[#22B4C6]',
    'from-[#43A6F6] to-[#5868F3]',
    'from-[#FE5A5A] to-[#F163D2]',
    'from-[#FE955A] to-[#F1DA63]',
    'from-[#DD5AFE] to-[#6366F1]',
  ]

  const randomGradient = () => {
    const randomIndex = Math.floor(Math.random() * gradients.length)
    return gradients[randomIndex]
  }

  const randomImage = () => {
    return `/images/content/cr-${Math.floor(Math.random() * 5) + 1}.png`
  }

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className='m-2 size-full cursor-pointer rounded-lg bg-[#3A384199] p-4'>
        <div className={cn('rounded-lg bg-gradient-to-r', randomGradient())}>
          <div className='flex items-center justify-between p-2'>
            <div className='w-fit rounded bg-[#313B4580] px-2 py-1 text-xs'>
              {tier}
            </div>
            {isFavorite ? <HeartFilled /> : <HeartOutlined />}
          </div>
          <div className='flex w-full justify-center'>
            <Image
              src={randomImage()}
              alt='character-img'
              width={280}
              height={197}
              objectFit='contain'
            />
          </div>
        </div>
        <div className='flex items-center justify-between px-1 py-4'>
          <div className='line-clamp-1 text-base font-bold'>{title}</div>
          <div className='flex items-center gap-1'>
            <Image
              src='/images/content/eth.png'
              alt='eth-logo'
              width={8}
              height={13}
            />
            <div className='line-clamp-1 text-sm font-medium'>{price} ETH</div>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Avatar src={author.avatar} />
          <div className='text-xs font-medium'>
            {author.firstName} {author.lastName}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
