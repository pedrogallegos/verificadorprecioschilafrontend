import React from 'react'
import { Button } from '@/components/ui/button'
import type { ButtonProps } from '@/components/ui/button'

interface ThemedButtonProps extends Omit<ButtonProps, 'variant'> {
  themeColor?: string
  themeVariant?: 'primary' | 'secondary' | 'outline'
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({ 
  themeColor, 
  themeVariant = 'primary', 
  style, 
  onMouseEnter,
  onMouseLeave,
  disabled,
  children,
  ...props 
}) => {
  const baseColor = themeColor || '#2563eb'
  
  const getButtonStyle = () => {
    if (themeVariant === 'primary') {
      return {
        backgroundColor: baseColor,
        borderColor: baseColor,
        color: 'white',
        ...style
      }
    }
    return style
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && themeVariant === 'primary') {
      e.currentTarget.style.backgroundColor = baseColor
      e.currentTarget.style.opacity = '0.9'
      e.currentTarget.style.borderColor = baseColor
      e.currentTarget.style.color = 'white'
    }
    if (onMouseEnter) onMouseEnter(e)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && themeVariant === 'primary') {
      e.currentTarget.style.backgroundColor = baseColor
      e.currentTarget.style.opacity = '1'
      e.currentTarget.style.borderColor = baseColor
      e.currentTarget.style.color = 'white'
    }
    if (onMouseLeave) onMouseLeave(e)
  }

  return (
    <Button
      {...props}
      disabled={disabled}
      style={getButtonStyle()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Button>
  )
}
