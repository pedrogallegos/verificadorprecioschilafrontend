/**
 * ============================================
 * COMPONENTE FORMULARIO DE PRODUCTO (REDISEÑADO CON SHADCN/UI)
 * ============================================
 */

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { useCreateProducto, useUpdateProducto } from '../hooks/useProductos'
import { Save, X } from 'lucide-react'
import type { Producto, ProductoInput } from '../types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useToast } from '@/hooks/use-toast'
import { ImageUpload } from './ImageUpload'

const productoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  precioPublico: z.number().min(0.01, 'El precio público debe ser mayor a 0'),
  precioCompra: z.number().min(0.01, 'El precio de compra debe ser mayor a 0'),
  descripcion: z.string().min(1, 'La descripción es requerida'),
  codigoBarra: z.string().min(1, 'El código de barras es requerido'),
  cantidad: z.number().min(1, 'La cantidad debe ser mayor a 0'),
  imagen: z.string().optional(), // Campo de imagen opcional
})

interface ProductoFormProps {
  producto?: Producto
  onSuccess?: () => void
  onCancel?: () => void
}

export const ProductoForm = ({ producto, onSuccess, onCancel }: ProductoFormProps) => {
  const createProducto = useCreateProducto()
  const updateProducto = useUpdateProducto()
  const isEditing = !!producto
  const { toast } = useToast()
  
  // Estado para la imagen
  const [imageUrl, setImageUrl] = useState<string>(producto?.imagen || '')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ProductoInput>({
    resolver: zodResolver(productoSchema),
    defaultValues: producto ? {
      nombre: producto.nombre,
      precioPublico: producto.precioPublico,
      precioCompra: producto.precioCompra,
      descripcion: producto.descripcion,
      codigoBarra: producto.codigoBarra,
      cantidad: producto.cantidad,
      imagen: producto.imagen || '',
    } : {
      imagen: '',
    },
  })

  // Funciones para manejar la imagen
  const handleImageUpload = (url: string) => {
    setImageUrl(url)
    setValue('imagen', url)
  }

  const handleImageRemove = () => {
    setImageUrl('')
    setValue('imagen', '')
  }

  const onSubmit = async (data: ProductoInput) => {
    try {
      if (isEditing) {
        await updateProducto.mutateAsync({
          identifier: producto._id,
          data,
        })
        toast({
          title: "✅ Producto actualizado",
          description: `${data.nombre} ha sido actualizado exitosamente.`,
        })
      } else {
        await createProducto.mutateAsync(data)
        toast({
          title: "✅ Producto creado",
          description: `${data.nombre} ha sido agregado al inventario.`,
        })
        reset()
      }
      onSuccess?.()
    } catch (error) {
      console.error('Error al guardar producto:', error)
      toast({
        variant: "destructive",
        title: "❌ Error",
        description: "No se pudo guardar el producto. Intenta nuevamente.",
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Imagen del producto */}
            <div className="space-y-2">
              <Label>Imagen del Producto</Label>
              <ImageUpload
                onImageUpload={handleImageUpload}
                currentImage={imageUrl}
                onImageRemove={handleImageRemove}
              />
              <p className="text-xs text-muted-foreground">
                Sube una imagen del producto para una mejor identificación visual
              </p>
            </div>

            {/* Nombre del producto */}
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del Producto</Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Ej: Coca Cola 600ml"
                {...register('nombre')}
              />
              {errors.nombre && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.nombre.message}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Precios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="precioPublico">Precio Público</Label>
                <Input
                  id="precioPublico"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register('precioPublico', { valueAsNumber: true })}
                />
                {errors.precioPublico && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.precioPublico.message}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="precioCompra">Precio de Compra</Label>
                <Input
                  id="precioCompra"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register('precioCompra', { valueAsNumber: true })}
                />
                {errors.precioCompra && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.precioCompra.message}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <textarea
                id="descripcion"
                rows={3}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Descripción del producto..."
                {...register('descripcion')}
              />
              {errors.descripcion && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.descripcion.message}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Código de barras y cantidad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="codigoBarra">Código de Barras</Label>
                <Input
                  id="codigoBarra"
                  type="text"
                  placeholder="7501055362011"
                  {...register('codigoBarra')}
                />
                {errors.codigoBarra && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.codigoBarra.message}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cantidad">Cantidad</Label>
                <Input
                  id="cantidad"
                  type="number"
                  placeholder="0"
                  {...register('cantidad', { valueAsNumber: true })}
                />
                {errors.cantidad && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.cantidad.message}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-2 pt-4">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Guardando...' : 'Guardar'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
