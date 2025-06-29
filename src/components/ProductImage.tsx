/**
 * ============================================
 * COMPONENTE PRODUCT IMAGE - DISPLAY
 * ============================================
 */

import { useState } from 'react'
import { Package } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface ProductImageProps {
  src?: string
  alt: string
  className?: string
  showModal?: boolean
  size?: 'small' | 'medium' | 'large'
}

export const ProductImage = ({ 
  src, 
  alt, 
  className = '', 
  showModal = false,
  size = 'medium'
}: ProductImageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageError, setImageError] = useState(false)

  const sizeClasses = {
    small: 'h-16 w-16',
    medium: 'h-32 w-32',
    large: 'h-48 w-48'
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageClick = () => {
    if (showModal && src && !imageError) {
      setIsModalOpen(true)
    }
  }

  // Si no hay imagen o hay error, mostrar placeholder
  if (!src || imageError) {
    return (
      <div className={`${sizeClasses[size]} ${className} bg-muted rounded-lg flex items-center justify-center border border-border`}>
        <Package className="h-8 w-8 text-muted-foreground" />
      </div>
    )
  }

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} ${className} object-cover rounded-lg border border-border ${
          showModal ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
        }`}
        onError={handleImageError}
        onClick={handleImageClick}
        loading="lazy"
      />

      {/* Modal para imagen completa */}
      {showModal && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl">
            <img
              src={src}
              alt={alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
