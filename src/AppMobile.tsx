/**
 * ============================================
 * APP TIPO MÓVIL/TABLET - DESIGN MODERNO
 * ============================================
 * 
 * Template estilo app móvil con navegación bottom
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
  Search,
  Home,
  BarChart3,
  User,
  QrCode,
  Camera
} from 'lucide-react'
import { Toaster } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const queryClient = new QueryClient()

export default function AppMobile() {
  const [activeTab, setActiveTab] = useState('home')
  const [showForm, setShowForm] = useState(false)

  const tabs = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'scan', icon: QrCode, label: 'Escanear' },
    { id: 'products', icon: Package, label: 'Productos' },
    { id: 'stats', icon: BarChart3, label: 'Stats' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            {/* Quick Search */}
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Search className="h-6 w-6" />
                  <h2 className="text-xl font-bold">Búsqueda Rápida</h2>
                </div>
                <BuscarProducto />
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">1,234</div>
                  <div className="text-sm text-muted-foreground">Productos</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Badge variant="destructive" className="mb-2">⚠️</Badge>
                  <div className="text-2xl font-bold">23</div>
                  <div className="text-sm text-muted-foreground">Stock Bajo</div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => setShowForm(true)}
                  className="h-20 flex-col gap-2"
                >
                  <Plus className="h-6 w-6" />
                  Nuevo Producto
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  onClick={() => setActiveTab('scan')}
                >
                  <Camera className="h-6 w-6" />
                  Escanear Código
                </Button>
              </CardContent>
            </Card>
          </div>
        )
      
      case 'scan':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Escanear Código de Barras</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <QrCode className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Coloca el código aquí</h3>
                <p className="text-muted-foreground mb-6">
                  Apunta la cámara al código de barras del producto
                </p>
                <Button className="w-full">
                  <Camera className="mr-2 h-4 w-4" />
                  Activar Cámara
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Búsqueda Manual</CardTitle>
              </CardHeader>
              <CardContent>
                <BuscarProducto />
              </CardContent>
            </Card>
          </div>
        )
      
      case 'products':
        return (
          <div className="space-y-6">
            {showForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Nuevo Producto</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProductoForm onSuccess={() => setShowForm(false)} />
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Productos</CardTitle>
                <Button
                  size="sm"
                  onClick={() => setShowForm(!showForm)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <ProductoList />
              </CardContent>
            </Card>
          </div>
        )
      
      case 'stats':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Resumen del Día</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Productos agregados</span>
                      <Badge>12</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Búsquedas realizadas</span>
                      <Badge>45</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Stock actualizado</span>
                      <Badge>8</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      
      case 'profile':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Tema</span>
                  <ThemeToggle />
                </div>
                <div className="flex items-center justify-between">
                  <span>Notificaciones</span>
                  <Button variant="outline" size="sm">Configurar</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      
      default:
        return <div>Contenido no encontrado</div>
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold">PriceCheck</span>
              </div>
              <Badge variant="secondary">v2.0</Badge>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="px-4 py-6">
          {renderContent()}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
          <div className="grid grid-cols-5">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-3 flex flex-col items-center justify-center transition-colors ${
                    isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </nav>
      </div>
      <Toaster />
    </QueryClientProvider>
  )
}
