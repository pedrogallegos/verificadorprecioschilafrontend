/**
 * ============================================
 * COMPONENTE LISTA DE PRODUCTOS (REDISEÑADO CON SHADCN/UI)
 * ============================================
 */

import { useState } from 'react'
import { useProductos, useDeleteProducto } from '../hooks/useProductos'
import { ProductoForm } from './ProductoForm'
import { Edit, Trash2, ShoppingCart, AlertCircle } from 'lucide-react'
import type { Producto } from '../types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'

export const ProductoList = () => {
  const { data: productos, isLoading, error } = useProductos()
  const deleteProducto = useDeleteProducto()
  const [editingProducto, setEditingProducto] = useState<Producto | null>(null)
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

  const getStockVariant = (cantidad: number) => {
    if (cantidad === 0) return 'destructive'
    if (cantidad < 10) return 'secondary'
    return 'default'
  }

  if (isLoading) {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold leading-6 text-foreground">Productos</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Lista de todos los productos en el inventario.
          </p>
        </div>
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
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
      <div className="mb-6">
        <h2 className="text-2xl font-bold leading-6 text-foreground">Productos</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Lista de todos los productos en el inventario.
        </p>
      </div>

      {productos && productos.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle className="mb-2">No hay productos</CardTitle>
            <p className="text-muted-foreground">Comienza agregando tu primer producto.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {productos?.map((producto) => (
            <Card key={producto._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg truncate">
                    {producto.nombre}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingProducto(producto)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setProductToDelete(producto._id)
                            setDeleteDialogOpen(true)
                          }}
                          disabled={deleteProducto.isPending}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>¿Eliminar producto?</DialogTitle>
                          <DialogDescription>
                            ¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.
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
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {producto.descripcion}
                </p>

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
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Código:</span>
                    <span className="font-mono text-sm">
                      {producto.codigoBarra}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
