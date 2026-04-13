'use client'

import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  onClick?: () => void
  className?: string
}

export default function Button({ children, variant = 'primary', onClick, className = '' }: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-full transition-all duration-300 font-medium'
  
  const variants = {
    primary: 'bg-white text-black hover:scale-105',
    secondary: 'border border-white/40 hover:bg-white hover:text-black',
    outline: 'border border-white/20 hover:border-white/60',
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}