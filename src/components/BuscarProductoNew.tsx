import { useState } from 'react'
import { useSearchProductos } from '../hooks/useProductos'
import { Search, Package, AlertCircle } from 'lucide-react'
import type { Producto } from '../types'

export const BuscarProducto = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  
  const { data: productos = [], isLoading, error } = useSearchProductos(searchQuery)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      setSearchQuery(searchTerm.trim())
    }
  }

  const calculateMargin = (precioPublico: number, precioCompra: number) => {
    return ((precioPublico - precioCompra) / precioCompra * 100).toFixed(1)
  }

  const getStockColor = (cantidad: number) => {
    if (cantidad === 0) return 'text-red-600 bg-red-50'
    if (cantidad <= 5) return 'text-yellow-600 bg-yellow-50'
    return 'text-green-600 bg-green-50'
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Buscar Productos</h2>
        
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos por nombre (ej: coca, pan, leche...)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !searchTerm.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search className="h-4 w-4 inline mr-2" />
            Buscar
          </button>
        </form>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Buscando productos...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-red-700">
            Error al buscar productos. Intenta nuevamente.
          </span>
        </div>
      )}

      {/* Results */}
      {!isLoading && !error && searchQuery && (
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Resultados de búsqueda para "{searchQuery}"
            </h3>
            <p className="text-sm text-gray-600">
              {productos.length === 0 
                ? 'No se encontraron productos' 
                : `${productos.length} producto${productos.length !== 1 ? 's' : ''} encontrado${productos.length !== 1 ? 's' : ''}`
              }
            </p>
          </div>

          {productos.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No se encontraron productos que coincidan con tu búsqueda.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Intenta con un término diferente o revisa la ortografía.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {productos.map((producto: Producto) => (
                <div key={producto._id} className="card">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {producto.nombre}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">
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
                      <span className="font-medium">
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
                      <span className="text-sm text-gray-500">Stock:</span>
                      <span className={`font-medium px-2 py-1 rounded-full text-xs ${getStockColor(producto.cantidad)}`}>
                        {producto.cantidad} unidades
                      </span>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-400">Código:</span>
                        <span className="text-xs font-mono text-gray-600">
                          {producto.codigoBarra}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Initial State */}
      {!searchQuery && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">
            Ingresa el nombre de un producto para buscar
          </p>
          <p className="text-sm text-gray-400">
            Ejemplos: "coca", "pan", "leche", etc.
          </p>
        </div>
      )}
    </div>
  )
}
