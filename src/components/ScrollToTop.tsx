'use client'

import { cn } from '@/utils/cn'
import { UpOutlined } from '@ant-design/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ScrollToTopProps {
  className?: string
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled up to given distance
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    // Cleanup
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className={cn(
            'fixed bottom-8 right-8 z-50 cursor-pointer',
            className,
          )}
        >
          <motion.div
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
            className='flex size-10 items-center justify-center rounded-full bg-gradient-to-r from-[#DA458F] to-[#DA34DD] text-white shadow-lg'
          >
            <motion.div
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <UpOutlined />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop
