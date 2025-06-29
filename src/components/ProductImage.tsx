/**
 * ============================================
 * COMPONENTE PRODUCT IMAGE - DISPLAY CON MEJORAS
 * ============================================
 * 
 * Componente mejorado para mostrar imágenes de productos con:
 * - Lazy loading optimizado
 * - Estados de carga y error mejorados
 * - Animaciones suaves
 * - Mejor accesibilidad
 */

import { useState } from 'react'
import { Package, ImageIcon, Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

interface ProductImageProps {
  src?: string
  alt: string
  className?: string
  showModal?: boolean
  size?: 'small' | 'medium' | 'large'
  priority?: boolean // Para imágenes importantes que deben cargar primero
  onLoad?: () => void // Callback cuando la imagen carga
  onError?: () => void // Callback cuando hay error
}

export const ProductImage = ({ 
  src, 
  alt, 
  className = '', 
  showModal = false,
  size = 'medium',
  priority = false,
  onLoad,
  onError
}: ProductImageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const sizeClasses = {
    small: 'h-16 w-16',
    medium: 'h-32 w-32',
    large: 'h-48 w-48'
  }

  const handleImageError = () => {
    setImageError(true)
    setIsLoading(false)
    onError?.() // Llamar callback si existe
  }

  const handleImageLoad = () => {
    setIsLoading(false)
    onLoad?.() // Llamar callback si existe
  }

  const handleImageClick = () => {
    if (showModal && src && !imageError) {
      setIsModalOpen(true)
    }
  }

  // Si no hay imagen o hay error, mostrar placeholder mejorado
  if (!src || imageError) {
    return (
      <div className={`${sizeClasses[size]} ${className} bg-muted rounded-lg flex flex-col items-center justify-center border border-border transition-all duration-200 hover:bg-muted/80`}>
        <Package className="h-8 w-8 text-muted-foreground mb-1" />
        <span className="text-xs text-muted-foreground">Sin imagen</span>
      </div>
    )
  }

  return (
    <>
      <div className={`${sizeClasses[size]} ${className} relative overflow-hidden rounded-lg border border-border`}>
        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
          </div>
        )}
        
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${
            showModal ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''
          } ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading={priority ? 'eager' : 'lazy'}
          onClick={handleImageClick}
        />
      </div>

      {/* Modal para imagen completa con título */}
      {showModal && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl p-2">
            <DialogTitle className="sr-only">{alt}</DialogTitle>
            <div className="relative">
              <img
                src={src}
                alt={alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-2 left-2 bg-black/70 text-white px-3 py-1 rounded-md text-sm">
                {alt}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
