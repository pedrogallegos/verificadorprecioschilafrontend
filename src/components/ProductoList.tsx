import { useState } from 'react'
import { useProductos, useDeleteProducto } from '../hooks/useProductos'
import { ProductoForm } from './ProductoForm'
import { Edit, Trash2, ShoppingCart, AlertCircle } from 'lucide-react'
import type { Producto } from '../types'

export const ProductoList = () => {
  const { data: productos, isLoading, error } = useProductos()
  const deleteProducto = useDeleteProducto()
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null)

  const handleDelete = async (identifier: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteProducto.mutateAsync(identifier)
      } catch (error) {
        console.error('Error al eliminar producto:', error)
      }
    }
  }

  const calculateMargin = (precioPublico: number, precioCompra: number) => {
    return ((precioPublico - precioCompra) / precioCompra * 100).toFixed(1)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error al cargar productos</h3>
        <p className="text-gray-500">Por favor, intenta de nuevo más tarde.</p>
      </div>
    )
  }

  if (editingProducto) {
    return (
      <ProductoForm
        producto={editingProducto}
        onSuccess={() => setEditingProducto(null)}
        onCancel={() => setEditingProducto(null)}
      />
    )
  }

  return (
    <div>
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h2 className="text-2xl font-bold leading-6 text-gray-900">Productos</h2>
          <p className="mt-2 text-sm text-gray-700">
            Lista de todos los productos en el inventario.
          </p>
        </div>
      </div>

      {productos && productos.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay productos</h3>
          <p className="text-gray-500">Comienza agregando tu primer producto.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {productos?.map((producto) => (
            <div key={producto._id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {producto.nombre}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingProducto(producto)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(producto._id)}
                    className="text-red-600 hover:text-red-800"
                    disabled={deleteProducto.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {producto.descripcion}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Precio Público:</span>
                  <span className="font-medium text-green-600">
                    ${producto.precioPublico.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Precio Compra:</span>
                  <span className="font-medium text-gray-900">
                    ${producto.precioCompra.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Margen:</span>
                  <span className="font-medium text-blue-600">
                    {calculateMargin(producto.precioPublico, producto.precioCompra)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Cantidad:</span>
                  <span className={`font-medium ${
                    producto.cantidad < 10 ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {producto.cantidad}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Código:</span>
                  <span className="font-mono text-sm text-gray-900">
                    {producto.codigoBarra}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
