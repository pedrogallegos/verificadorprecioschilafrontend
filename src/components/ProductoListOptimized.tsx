/**
 * ============================================
 * COMPONENTE LISTA OPTIMIZADA - VERSIÓN HÍBRIDA
 * ============================================
 * 
 * Mantiene la carga completa pero con optimizaciones
 */

import { useState, useMemo } from 'react'
import { useProductos, useDeleteProducto } from '../hooks/useProductos'
import { ProductoForm } from './ProductoForm'
import { Edit, Trash2, ShoppingCart, AlertCircle, Search } from 'lucide-react'
import type { Producto } from '../types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'

export const ProductoListOptimized = () => {
  const { data: productos, isLoading, error } = useProductos()
  const deleteProducto = useDeleteProducto()
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'nombre' | 'precio' | 'stock'>('nombre')
  const { toast } = useToast()

  // Filtrar y ordenar productos en memoria (optimizado con useMemo)
  const filteredAndSortedProductos = useMemo(() => {
    if (!productos) return []

    const filtered = productos.filter(producto =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.codigoBarra.includes(searchTerm) ||
      producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'precio':
          return a.precioPublico - b.precioPublico
        case 'stock':
          return a.cantidad - b.cantidad
        default:
          return a.nombre.localeCompare(b.nombre)
      }
    })

    return filtered
  }, [productos, searchTerm, sortBy])

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      try {
        await deleteProducto.mutateAsync(productToDelete)
        toast({
          title: "✅ Producto eliminado",
          description: "El producto ha sido eliminado exitosamente.",
        })
        setDeleteDialogOpen(false)
        setProductToDelete(null)
      } catch (error) {
        console.error('Error al eliminar producto:', error)
        toast({
          variant: "destructive",
          title: "❌ Error",
          description: "No se pudo eliminar el producto. Intenta nuevamente.",
        })
      }
    }
  }

  const calculateMargin = (precioPublico: number, precioCompra: number) => {
    return ((precioPublico - precioCompra) / precioCompra * 100).toFixed(1)
  }

  const getStockVariant = (cantidad: number) => {
    if (cantidad === 0) return 'destructive'
    if (cantidad < 10) return 'secondary'
    return 'default'
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
    <div className="space-y-6">
      {/* Header con búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-6 text-foreground">Productos</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {filteredAndSortedProductos.length} de {productos?.length || 0} productos
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {/* Búsqueda mejorada */}
          <div className="relative min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, código o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          {/* Filtros de ordenamiento */}
          <div className="flex gap-2">
            <Button
              variant={sortBy === 'nombre' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('nombre')}
            >
              Nombre
            </Button>
            <Button
              variant={sortBy === 'precio' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('precio')}
            >
              Precio
            </Button>
            <Button
              variant={sortBy === 'stock' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('stock')}
            >
              Stock
            </Button>
          </div>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error al cargar productos. Por favor, intenta de nuevo más tarde.
          </AlertDescription>
        </Alert>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Skeleton className="h-6 w-3/4" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-4" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && filteredAndSortedProductos.length === 0 && productos && productos.length > 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle className="mb-2">No se encontraron productos</CardTitle>
            <p className="text-muted-foreground">
              No hay productos que coincidan con "{searchTerm}"
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoading && (!productos || productos.length === 0) && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle className="mb-2">No hay productos</CardTitle>
            <p className="text-muted-foreground">Comienza agregando tu primer producto.</p>
          </CardContent>
        </Card>
      )}

      {/* Grid de productos */}
      {!isLoading && filteredAndSortedProductos.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedProductos.map((producto) => (
            <Card key={producto._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg truncate">
                    {producto.nombre}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEditingProducto(producto)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setProductToDelete(producto._id)
                        setDeleteDialogOpen(true)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {producto.descripcion}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Precio público:</span>
                    <span className="font-semibold text-lg">${producto.precioPublico}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Precio compra:</span>
                    <span className="text-sm">${producto.precioCompra}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Margen:</span>
                    <span className="text-sm font-medium text-green-600">
                      {calculateMargin(producto.precioPublico, producto.precioCompra)}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Stock:</span>
                    <Badge variant={getStockVariant(producto.cantidad)}>
                      {producto.cantidad} unidades
                    </Badge>
                  </div>
                  
                  <div className="pt-2 text-xs text-muted-foreground">
                    Código: {producto.codigoBarra}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog de confirmación de eliminación */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar producto?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. El producto será eliminado permanentemente del inventario.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
