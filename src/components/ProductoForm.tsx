import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCreateProducto, useUpdateProducto } from '../hooks/useProductos'
import { Save, X } from 'lucide-react'
import type { Producto, ProductoInput } from '../types'

const productoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  precioPublico: z.number().min(0.01, 'El precio público debe ser mayor a 0'),
  precioCompra: z.number().min(0.01, 'El precio de compra debe ser mayor a 0'),
  descripcion: z.string().min(1, 'La descripción es requerida'),
  codigoBarra: z.string().min(1, 'El código de barras es requerido'),
  cantidad: z.number().min(1, 'La cantidad debe ser mayor a 0'),
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductoInput>({
    resolver: zodResolver(productoSchema),
    defaultValues: producto ? {
      nombre: producto.nombre,
      precioPublico: producto.precioPublico,
      precioCompra: producto.precioCompra,
      descripcion: producto.descripcion,
      codigoBarra: producto.codigoBarra,
      cantidad: producto.cantidad,
    } : undefined,
  })

  const onSubmit = async (data: ProductoInput) => {
    try {
      if (isEditing) {
        await updateProducto.mutateAsync({
          identifier: producto._id,
          data,
        })
      } else {
        await createProducto.mutateAsync(data)
        reset()
      }
      onSuccess?.()
    } catch (error) {
      console.error('Error al guardar producto:', error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Producto
            </label>
            <input
              type="text"
              id="nombre"
              {...register('nombre')}
              className="input-field"
              placeholder="Ej: Coca Cola 600ml"
            />
            {errors.nombre && (
              <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="precioPublico" className="block text-sm font-medium text-gray-700 mb-2">
                Precio Público
              </label>
              <input
                type="number"
                step="0.01"
                id="precioPublico"
                {...register('precioPublico', { valueAsNumber: true })}
                className="input-field"
                placeholder="0.00"
              />
              {errors.precioPublico && (
                <p className="mt-1 text-sm text-red-600">{errors.precioPublico.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="precioCompra" className="block text-sm font-medium text-gray-700 mb-2">
                Precio de Compra
              </label>
              <input
                type="number"
                step="0.01"
                id="precioCompra"
                {...register('precioCompra', { valueAsNumber: true })}
                className="input-field"
                placeholder="0.00"
              />
              {errors.precioCompra && (
                <p className="mt-1 text-sm text-red-600">{errors.precioCompra.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              id="descripcion"
              rows={3}
              {...register('descripcion')}
              className="input-field"
              placeholder="Descripción del producto..."
            />
            {errors.descripcion && (
              <p className="mt-1 text-sm text-red-600">{errors.descripcion.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="codigoBarra" className="block text-sm font-medium text-gray-700 mb-2">
                Código de Barras
              </label>
              <input
                type="text"
                id="codigoBarra"
                {...register('codigoBarra')}
                className="input-field"
                placeholder="7501055362011"
              />
              {errors.codigoBarra && (
                <p className="mt-1 text-sm text-red-600">{errors.codigoBarra.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700 mb-2">
                Cantidad
              </label>
              <input
                type="number"
                id="cantidad"
                {...register('cantidad', { valueAsNumber: true })}
                className="input-field"
                placeholder="0"
              />
              {errors.cantidad && (
                <p className="mt-1 text-sm text-red-600">{errors.cantidad.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <X className="h-4 w-4 inline mr-2" />
                Cancelar
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <Save className="h-4 w-4 inline mr-2" />
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
