/**
 * ============================================
 * COMPONENTE BUSCAR PRODUCTO (REDISEÑADO CON SHADCN/UI)
 * ============================================
 */

import { useState } from 'react'
import { useSearchProductos } from '../hooks/useProductos'
import { Search, Package, AlertCircle, Loader2 } from 'lucide-react'
import type { Producto } from '../types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ProductImage } from './ProductImage'

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

  const getStockVariant = (cantidad: number) => {
    if (cantidad === 0) return 'destructive'
    if (cantidad <= 5) return 'secondary'
    return 'default'
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Buscar Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar productos por nombre (ej: coca, pan, leche...)"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading || !searchTerm.trim()}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Buscar
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Error State */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error al buscar productos. Intenta nuevamente.
          </AlertDescription>
        </Alert>
      )}

      {/* Results */}
      {!isLoading && !error && searchQuery && (
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              Resultados de búsqueda para "{searchQuery}"
            </h3>
            <p className="text-sm text-muted-foreground">
              {productos.length === 0 
                ? 'No se encontraron productos' 
                : `${productos.length} producto${productos.length !== 1 ? 's' : ''} encontrado${productos.length !== 1 ? 's' : ''}`
              }
            </p>
          </div>

          {productos.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-2">
                  No se encontraron productos que coincidan con tu búsqueda.
                </p>
                <p className="text-sm text-muted-foreground">
                  Intenta con un término diferente o revisa la ortografía.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {productos.map((producto: Producto) => (
                <Card key={producto._id}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <ProductImage
                        src={producto.imagen}
                        alt={producto.nombre}
                        size="small"
                        showModal={true}
                        className="flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">
                          {producto.nombre}
                        </CardTitle>
                        <p className="text-muted-foreground text-sm mt-1">
                          {producto.descripcion}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Precio Público:</span>
                        <span className="font-medium text-green-600">
                          ${producto.precioPublico.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Precio Compra:</span>
                        <span className="font-medium">
                          ${producto.precioCompra.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Margen:</span>
                        <span className="font-medium text-blue-600">
                          {calculateMargin(producto.precioPublico, producto.precioCompra)}%
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Stock:</span>
                        <Badge variant={getStockVariant(producto.cantidad)}>
                          {producto.cantidad} unidades
                        </Badge>
                      </div>
                      
                      <div className="pt-2 border-t border-border">
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Código:</span>
                          <span className="text-xs font-mono text-muted-foreground">
                            {producto.codigoBarra}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Initial State */}
      {!searchQuery && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">
              Ingresa el nombre de un producto para buscar
            </p>
            <p className="text-sm text-muted-foreground">
              Ejemplos: "coca", "pan", "leche", etc.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
