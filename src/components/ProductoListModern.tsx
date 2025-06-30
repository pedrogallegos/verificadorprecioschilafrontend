/**
 * ============================================
 * TARJETAS DE PRODUCTO REDISEÑADAS - VERSIÓN MODERNA
 * ============================================
 */

import { useState } from 'react'
import { useProductos, useDeleteProducto } from '../hooks/useProductos'
import { ProductoForm } from './ProductoForm'
import { 
  Edit, 
  Trash2, 
  AlertCircle, 
  Eye,
  Package,
  TrendingUp,
  DollarSign
} from 'lucide-react'
import type { Producto } from '../types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'

export const ProductoListModern = () => {
  const { data: productos, isLoading, error } = useProductos()
  const deleteProducto = useDeleteProducto()
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null)
  const [viewingProducto, setViewingProducto] = useState<Producto | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const { toast } = useToast()

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

  const getStockStatus = (cantidad: number) => {
    if (cantidad === 0) return { label: 'Sin stock', variant: 'destructive' as const, color: 'text-red-600' }
    if (cantidad < 10) return { label: 'Stock bajo', variant: 'secondary' as const, color: 'text-yellow-600' }
    return { label: 'En stock', variant: 'default' as const, color: 'text-green-600' }
  }

  if (editingProducto) {
    return (
      <div className="max-w-2xl mx-auto">
        <ProductoForm
          producto={editingProducto}
          onSuccess={() => setEditingProducto(null)}
          onCancel={() => setEditingProducto(null)}
        />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-square">
              <Skeleton className="h-full w-full" />
            </div>
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error al cargar productos. Por favor, intenta de nuevo más tarde.
        </AlertDescription>
      </Alert>
    )
  }

  if (!productos || productos.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No hay productos
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Comienza agregando tu primer producto al inventario
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productos.map((producto) => {
          const stockStatus = getStockStatus(producto.cantidad)
          const margin = calculateMargin(producto.precioPublico, producto.precioCompra)
          
          return (
            <Card 
              key={producto._id} 
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:scale-[1.02]"
            >
              {/* Imagen del producto */}
              <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                {producto.imagen ? (
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="h-16 w-16 text-gray-400" />
                  </div>
                )}
                
                {/* Overlay con acciones */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setViewingProducto(producto)}
                      className="bg-white/90 text-gray-900 hover:bg-white"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setEditingProducto(producto)}
                      className="bg-white/90 text-gray-900 hover:bg-white"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setProductToDelete(producto._id)
                        setDeleteDialogOpen(true)
                      }}
                      className="bg-red-500/90 text-white hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Badge de stock */}
                <div className="absolute top-3 right-3">
                  <Badge variant={stockStatus.variant} className="shadow-sm">
                    {producto.cantidad} unidades
                  </Badge>
                </div>
              </div>

              {/* Contenido de la tarjeta */}
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 mb-1">
                    {producto.nombre}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {producto.descripcion}
                  </p>
                </div>
                
                {/* Precio destacado */}
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${producto.precioPublico}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                    ${producto.precioCompra}
                  </span>
                </div>
                
                {/* Métricas */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-600">+{margin}%</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${stockStatus.color}`}>
                    <Package className="h-4 w-4" />
                    <span className="font-medium">{stockStatus.label}</span>
                  </div>
                </div>
                
                {/* Código de barras */}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    {producto.codigoBarra}
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Modal de vista detallada */}
      <Dialog open={!!viewingProducto} onOpenChange={() => setViewingProducto(null)}>
        <DialogContent className="max-w-2xl">
          {viewingProducto && (
            <div>
              <DialogHeader>
                <DialogTitle className="text-2xl">{viewingProducto.nombre}</DialogTitle>
                <DialogDescription className="text-base">
                  {viewingProducto.descripcion}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Imagen */}
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                  {viewingProducto.imagen ? (
                    <img
                      src={viewingProducto.imagen}
                      alt={viewingProducto.nombre}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-24 w-24 text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Detalles */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Precio Público
                      </label>
                      <div className="flex items-center space-x-2 mt-1">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${viewingProducto.precioPublico}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Precio Compra
                      </label>
                      <div className="flex items-center space-x-2 mt-1">
                        <DollarSign className="h-5 w-5 text-gray-500" />
                        <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                          ${viewingProducto.precioCompra}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Margen
                      </label>
                      <div className="flex items-center space-x-2 mt-1">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <span className="text-xl font-bold text-green-600">
                          +{calculateMargin(viewingProducto.precioPublico, viewingProducto.precioCompra)}%
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Stock
                      </label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Package className="h-5 w-5 text-blue-600" />
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {viewingProducto.cantidad}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          unidades
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Código de Barras
                    </label>
                    <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="font-mono text-lg text-gray-900 dark:text-white">
                        {viewingProducto.codigoBarra}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="mt-6">
                <Button
                  onClick={() => {
                    setViewingProducto(null)
                    setEditingProducto(viewingProducto)
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Producto
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
    </>
  )
}
