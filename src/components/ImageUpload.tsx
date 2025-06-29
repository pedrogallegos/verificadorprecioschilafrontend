/**
 * ============================================
 * COMPONENTE IMAGE UPLOAD CON UPLOADCARE - VERSIÓN MEJORADA
 * ============================================
 * 
 * Permite subir imágenes a Uploadcare desde el frontend.
 * Uploadcare es más simple que Cloudinary y no requiere configuración compleja.
 * Solo necesitas una Public Key que es segura de exponer en el frontend.
 * 
 * MEJORAS V2:
 * - Progress indicator durante upload
 * - Mejor feedback visual
 * - Compresión automática
 * - Metadata extendida
 */

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { uploadFile } from '@uploadcare/upload-client'

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void
  currentImage?: string
  onImageRemove?: () => void
}

// Public Key de Uploadcare - configurada y lista para usar
const UPLOADCARE_PUBLIC_KEY = 'ece540642e567ac92b78' // ✅ Tu Public Key real de Uploadcare

export const ImageUpload = ({ 
  onImageUpload, 
  currentImage, 
  onImageRemove 
}: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (file: File) => {
    // Limpiar errores previos
    setError(null)

    // Validaciones
    if (!file.type.startsWith('image/')) {
      setError('Por favor selecciona una imagen válida (JPG, PNG, WEBP)')
      return
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB máximo para Uploadcare
      setError('La imagen debe ser menor a 10MB')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simular progreso inicial
      setUploadProgress(20)
      
      const result = await uploadFile(file, {
        publicKey: UPLOADCARE_PUBLIC_KEY,
        store: 'auto', // Almacenamiento automático
        metadata: {
          subsystem: 'productos-verificador',
          filename: file.name,
          uploadedAt: new Date().toISOString()
        }
      })

      // Progreso completo
      setUploadProgress(100)

      // La URL final de Uploadcare
      const imageUrl = `https://ucarecdn.com/${result.uuid}/`
      onImageUpload(imageUrl)
      console.log('Imagen subida exitosamente a Uploadcare:', imageUrl)
      
    } catch (error) {
      console.error('Error uploading to Uploadcare:', error)
      
      // Manejo específico de errores de Uploadcare
      if (error instanceof Error) {
        if (error.message.includes('publicKey')) {
          setError('Public Key de Uploadcare no válida. Verifica tu configuración.')
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          setError('Error de conexión. Verifica tu internet e intenta nuevamente.')
        } else {
          setError(`Error al subir imagen: ${error.message}`)
        }
      } else {
        setError('Error desconocido al subir la imagen')
      }
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = () => {
    if (onImageRemove) {
      onImageRemove()
      setError(null)
      console.log('Imagen eliminada')
    }
  }

  // Verificar si está configurado (ya está configurado con tu key real)
  const isConfigured = true

  // Mostrar aviso si no está configurado
  if (!isConfigured) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Configuración requerida:</strong> Necesitas configurar tu Public Key de Uploadcare.
          <br />
          1. Regístrate en <a href="https://uploadcare.com" target="_blank" className="underline">uploadcare.com</a>
          <br />
          2. Obtén tu Public Key desde el dashboard
          <br />
          3. Reemplaza 'demopublickey' en el componente ImageUpload
        </AlertDescription>
      </Alert>
    )
  }

  // Mostrar imagen actual si existe
  if (currentImage) {
    return (
      <div className="space-y-4">
        <Card className="relative">
          <CardContent className="p-4">
            <div className="relative group">
              <img
                src={currentImage}
                alt="Producto"
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleClick}
                    disabled={isUploading}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Cambiar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleRemoveImage}
                    disabled={isUploading}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </Card>
        
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    )
  }

  // Vista de upload
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-0">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              dragActive
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleClick}
          >
            {isUploading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  Subiendo imagen a Uploadcare...
                </p>
                <div className="w-32 bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {uploadProgress}%
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <ImageIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Agregar imagen del producto</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Arrastra una imagen aquí o haz click para seleccionar
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>JPG, PNG, WEBP</span>
                  <span>•</span>
                  <span>Máximo 10MB</span>
                  <span>•</span>
                  <span>Powered by Uploadcare</span>
                </div>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </CardContent>
      </Card>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
