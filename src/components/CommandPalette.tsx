/**
 * ============================================
 * COMPONENTE COMMAND PALETTE - BÚSQUEDA RÁPIDA
 * ============================================
 */

import { useState, useEffect } from 'react'
import { useProductos } from '../hooks/useProductos'
import { Package, Zap } from 'lucide-react'
import type { Producto } from '../types'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CommandPalette = ({ open, onOpenChange }: CommandPaletteProps) => {
  const { data: productos = [] } = useProductos()
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null)

  // Cerrar el diálogo si se presiona Escape
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, onOpenChange])

  const handleProductSelect = (producto: Producto) => {
    setSelectedProducto(producto)
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
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Búsqueda Rápida
            </DialogTitle>
            <DialogDescription>
              Busca productos rápidamente por nombre, código o descripción
            </DialogDescription>
          </DialogHeader>
          
          <Command className="rounded-lg border shadow-md">
            <CommandInput 
              placeholder="Buscar productos..." 
              className="border-0"
            />
            <CommandList>
              <CommandEmpty>No se encontraron productos.</CommandEmpty>
              <CommandGroup heading="Productos">
                {productos.map((producto) => (
                  <CommandItem
                    key={producto._id}
                    value={`${producto.nombre} ${producto.descripcion} ${producto.codigoBarra}`}
                    onSelect={() => handleProductSelect(producto)}
                    className="flex items-center justify-between p-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{producto.nombre}</div>
                        <div className="text-sm text-muted-foreground">
                          {producto.descripcion}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStockVariant(producto.cantidad)}>
                        {producto.cantidad}
                      </Badge>
                      <span className="text-sm font-medium text-green-600">
                        ${producto.precioPublico.toFixed(2)}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>

          <div className="text-xs text-muted-foreground mt-2">
            Tip: Usa <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">Ctrl+K</kbd> para abrir la búsqueda rápida
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de detalle del producto */}
      {selectedProducto && (
        <Dialog open={!!selectedProducto} onOpenChange={() => setSelectedProducto(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedProducto.nombre}</DialogTitle>
              <DialogDescription>
                Detalles del producto seleccionado
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {selectedProducto.descripcion}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Precio Público</label>
                  <p className="text-lg font-semibold text-green-600">
                    ${selectedProducto.precioPublico.toFixed(2)}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Precio Compra</label>
                  <p className="text-lg font-semibold">
                    ${selectedProducto.precioCompra.toFixed(2)}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Margen</label>
                  <p className="text-lg font-semibold text-blue-600">
                    {calculateMargin(selectedProducto.precioPublico, selectedProducto.precioCompra)}%
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Stock</label>
                  <Badge variant={getStockVariant(selectedProducto.cantidad)} className="text-sm">
                    {selectedProducto.cantidad} unidades
                  </Badge>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Código de Barras</label>
                <p className="font-mono text-sm bg-muted p-2 rounded">
                  {selectedProducto.codigoBarra}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
