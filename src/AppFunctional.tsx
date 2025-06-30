/**
 * ============================================
 * TEMPLATE FUNCIONAL - INTEGRADO CON TU LÓGICA
 * ============================================
 * 
 * Este template SÍ usa todas tus funciones y hooks existentes
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, useMemo } from 'react'
import { ProductoList } from './components/ProductoList'
import { ProductoForm } from './components/ProductoForm'
import { BuscarProducto } from './components/BuscarProducto'
import { ThemeToggle } from './components/ThemeToggle'
import { useProductos } from './hooks/useProductos'
import { 
  Package, 
  Plus, 
  AlertTriangle,
  TrendingUp,
  Eye,
  Search
} from 'lucide-react'
import { Toaster } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const queryClient = new QueryClient()

// Componente interno que usa los hooks
function AppContentWithData() {
  const [showForm, setShowForm] = useState(false)
  const { data: productos = [], isLoading, error } = useProductos()

  // Estadísticas calculadas con TUS DATOS REALES
  const stats = useMemo(() => {
    if (!productos.length) return {
      total: 0,
      stockBajo: 0,
      valorTotal: 0,
      margenPromedio: 0,
      sinImagen: 0
    }

    const stockBajo = productos.filter(p => p.cantidad <= 5).length
    const valorTotal = productos.reduce((sum, p) => sum + (p.precioPublico * p.cantidad), 0)
    const margenPromedio = productos.length > 0 
      ? productos.reduce((sum, p) => {
          const margen = ((p.precioPublico - p.precioCompra) / p.precioPublico) * 100
          return sum + (isNaN(margen) ? 0 : margen)
        }, 0) / productos.length
      : 0
    const sinImagen = productos.filter(p => !p.imagen).length

    return {
      total: productos.length,
      stockBajo,
      valorTotal,
      margenPromedio,
      sinImagen
    }
  }, [productos])

  // Productos destacados (stock bajo, sin imagen, etc.)
  const productosStockBajo = useMemo(() => 
    productos.filter(p => p.cantidad <= 5).slice(0, 3)
  , [productos])

  const productosSinImagen = useMemo(() => 
    productos.filter(p => !p.imagen).slice(0, 3)
  , [productos])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-gray-600">Cargando productos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Error al cargar</h2>
            <p className="text-gray-600 mb-4">No se pudieron cargar los productos</p>
            <Button onClick={() => window.location.reload()}>
              Reintentar
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Verificador de Precios</h1>
                <p className="text-sm text-gray-500">{stats.total} productos registrados</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {stats.stockBajo > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  ⚠️ {stats.stockBajo} con stock bajo
                </Badge>
              )}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estadísticas REALES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
              <Package className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-xs text-gray-600 mt-1">
                Valor total: ${stats.valorTotal.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className={`border-l-4 ${stats.stockBajo > 0 ? 'border-l-red-500' : 'border-l-green-500'}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
              <AlertTriangle className={`h-4 w-4 ${stats.stockBajo > 0 ? 'text-red-500' : 'text-green-500'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.stockBajo}</div>
              <div className={`text-xs mt-1 ${stats.stockBajo > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {stats.stockBajo > 0 ? 'Requieren atención' : 'Todo en orden'}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Margen Promedio</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.margenPromedio.toFixed(1)}%</div>
              <div className="text-xs text-gray-600 mt-1">
                Calculado con precios reales
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sin Imagen</CardTitle>
              <Eye className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.sinImagen}</div>
              <div className="text-xs text-orange-600 mt-1">
                Productos sin foto
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alertas REALES */}
        {(productosStockBajo.length > 0 || productosSinImagen.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Stock Bajo Real */}
            {productosStockBajo.length > 0 && (
              <Card className="bg-red-50 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Productos con Stock Bajo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {productosStockBajo.map((producto) => (
                      <div key={producto._id} className="flex justify-between text-sm">
                        <span className="truncate">{producto.nombre}</span>
                        <Badge variant="destructive">{producto.cantidad} unid.</Badge>
                      </div>
                    ))}
                  </div>
                  <Button size="sm" className="w-full mt-4" variant="outline">
                    Ver todos ({stats.stockBajo})
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Sin Imagen Real */}
            {productosSinImagen.length > 0 && (
              <Card className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-800 flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Sin Imagen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {productosSinImagen.map((producto) => (
                      <div key={producto._id} className="flex justify-between text-sm">
                        <span className="truncate">{producto.nombre}</span>
                        <Badge variant="secondary">Sin foto</Badge>
                      </div>
                    ))}
                  </div>
                  <Button size="sm" className="w-full mt-4" variant="outline">
                    Ver todos ({stats.sinImagen})
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Búsqueda y Acciones */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Buscar y Gestionar Productos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-3">
                <BuscarProducto />
              </div>
              <div>
                <Button 
                  onClick={() => setShowForm(!showForm)}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {showForm ? 'Cancelar' : 'Nuevo Producto'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulario y Lista */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {showForm && (
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Agregar Producto</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProductoForm onSuccess={() => setShowForm(false)} />
                </CardContent>
              </Card>
            </div>
          )}
          
          <div className={showForm ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Lista de Productos</span>
                  <Badge variant="outline">{stats.total} items</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProductoList />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AppFunctional() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContentWithData />
      <Toaster />
    </QueryClientProvider>
  )
}
