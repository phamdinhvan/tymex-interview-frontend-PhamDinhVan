import { cn } from '@/utils/cn'
import React from 'react'

interface ButtonShinyProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  className?: string
}

const ShinyButton: React.FC<ButtonShinyProps> = ({
  title,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'hover:btn-shiny rounded-md bg-gradient-to-r from-[#DA458F] to-[#DA34DD] px-2 py-1 text-white hover:bg-pink-500',
        className,
      )}
      {...props}
    >
      {title}
    </button>
  )
}

export default ShinyButton
