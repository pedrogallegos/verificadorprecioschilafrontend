/**
 * ============================================
 * TEMPLATE RETAIL/INVENTARIO - ESPECIALIZADO
 * ============================================
 * 
 * Diseño específico para gestión de inventario retail
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ProductoList } from './components/ProductoList'
import { ProductoForm } from './components/ProductoForm'
import { BuscarProducto } from './components/BuscarProducto'
import { ThemeToggle } from './components/ThemeToggle'
import { 
  Package, 
  Plus, 
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Barcode,
  Truck,
  ShoppingCart
} from 'lucide-react'
import { Toaster } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const queryClient = new QueryClient()

export default function AppRetail() {
  const [showForm, setShowForm] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">RetailManager</h1>
                  <p className="text-sm text-gray-500">Sistema de Inventario</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-green-600 border-green-600">
                  📊 Dashboard Activo
                </Badge>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inventario Total</CardTitle>
                <Package className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231</div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">+12% vs mes anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Stock Crítico</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <div className="text-xs text-red-600 mt-2">
                  Productos requieren reposición
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Margen Promedio</CardTitle>
                <DollarSign className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">34.5%</div>
                <div className="text-xs text-green-600 mt-2">
                  Objetivo: 30% ✅
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Movimientos Hoy</CardTitle>
                <Truck className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <div className="text-xs text-gray-600 mt-2">
                  Entradas y salidas
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Centro de Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Search */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Buscar Producto
                  </label>
                  <BuscarProducto />
                </div>
                
                {/* Quick Add */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Acciones Rápidas
                  </label>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => setShowForm(!showForm)}
                      className="flex-1"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Nuevo
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Barcode className="mr-2 h-4 w-4" />
                      Scan
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alerts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Stock Crítico
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Producto A</span>
                    <Badge variant="destructive">2 unid.</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Producto B</span>
                    <Badge variant="destructive">0 unid.</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Producto C</span>
                    <Badge variant="destructive">1 unid.</Badge>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-4">
                  Ver Todos
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Más Vendidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Producto X</span>
                    <Badge variant="secondary">45 ventas</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Producto Y</span>
                    <Badge variant="secondary">32 ventas</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Producto Z</span>
                    <Badge variant="secondary">28 ventas</Badge>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-4">
                  Ver Reporte
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Rentabilidad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">$2,340</div>
                  <div className="text-sm text-green-600">Ganancia del día</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    68% del objetivo diario
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Column */}
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
            
            {/* Products List */}
            <div className={showForm ? 'lg:col-span-2' : 'lg:col-span-3'}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Inventario de Productos</span>
                    <Badge variant="outline">1,234 items</Badge>
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
      <Toaster />
    </QueryClientProvider>
  )
}
