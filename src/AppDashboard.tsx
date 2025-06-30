/**
 * ============================================
 * DASHBOARD PROFESIONAL CON SIDEBAR
 * ============================================
 * 
 * Template estilo admin panel moderno con navegación lateral
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
  Home,
  BarChart3,
  Settings,
  Users,
  Bell,
  Menu,
  X
} from 'lucide-react'
import { Toaster } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const queryClient = new QueryClient()

export default function AppDashboard() {
  const [showForm, setShowForm] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Package, label: 'Productos', active: false },
    { icon: BarChart3, label: 'Reportes', active: false },
    { icon: Users, label: 'Usuarios', active: false },
    { icon: Settings, label: 'Configuración', active: false },
  ]

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <div className="flex items-center gap-2">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">PriceCheck</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="mt-6 px-3">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon
              return (
                <a
                  key={index}
                  href="#"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1 ${
                    item.active 
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </a>
              )
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
          {/* Top Header */}
          <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-semibold text-gray-900">
                Verificador de Precios
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <ThemeToggle />
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+20% desde el mes pasado</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
                  <Badge variant="destructive">⚠️</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">Requieren atención</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ventas del Día</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2,350</div>
                  <p className="text-xs text-muted-foreground">+12% vs ayer</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Margen Promedio</CardTitle>
                  <Badge variant="secondary">📈</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">35%</div>
                  <p className="text-xs text-muted-foreground">Objetivo: 30%</p>
                </CardContent>
              </Card>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <BuscarProducto />
              </div>
              <Button 
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                {showForm ? 'Cancelar' : 'Nuevo Producto'}
              </Button>
            </div>

            {/* Form/List Content */}
            <div className="space-y-6">
              {showForm && (
                <Card>
                  <CardHeader>
                    <CardTitle>Agregar Nuevo Producto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ProductoForm onSuccess={() => setShowForm(false)} />
                  </CardContent>
                </Card>
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle>Lista de Productos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProductoList />
                </CardContent>
              </Card>
            </div>
          </main>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
      <Toaster />
    </QueryClientProvider>
  )
}
