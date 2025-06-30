/**
 * ============================================
 * LAYOUT TIPO E-COMMERCE - MODERNO Y VISUAL
 * ============================================
 * 
 * Diseño moderno similar a tiendas online, enfocado en la experiencia visual
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
  ShoppingBag,
  Filter,
  Grid3X3,
  List
} from 'lucide-react'
import { Toaster } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

type ViewType = 'products' | 'search' | 'create'

function AppEcommerce() {
  const [currentView, setCurrentView] = useState<ViewType>('products')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        
        {/* Hero Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto">
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    Inventario Chila
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <ThemeToggle />
                <Button 
                  onClick={() => setCurrentView('create')}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Producto
                </Button>
              </div>
            </div>
            
            {/* Search and navigation */}
            <div className="px-4 py-6">
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="¿Qué producto estás buscando?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-400"
                  />
                  {searchTerm && (
                    <Button 
                      onClick={() => setCurrentView('search')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      size="sm"
                    >
                      Buscar
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Category navigation */}
              <nav className="mt-6">
                <div className="flex items-center justify-center space-x-8">
                  <button
                    onClick={() => setCurrentView('products')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      currentView === 'products' 
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Package className="h-5 w-5" />
                    <span className="font-medium">Todos los Productos</span>
                  </button>
                  
                  <button
                    onClick={() => setCurrentView('search')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      currentView === 'search' 
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Search className="h-5 w-5" />
                    <span className="font-medium">Búsqueda Avanzada</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </header>

        {/* Filters and view controls */}
        {currentView === 'products' && (
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                  <Badge variant="secondary">145 productos</Badge>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {currentView === 'products' && (
            <div>
              {/* Featured/Promotional Section */}
              <div className="mb-8">
                <Card className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">
                          🎉 Gestión Eficiente de Inventario
                        </h2>
                        <p className="text-white/90 mb-4">
                          Mantén tu tienda organizada con nuestro sistema de verificación de precios
                        </p>
                        <div className="flex items-center space-x-4">
                          <Badge className="bg-white/20 text-white border-white/30">
                            ⚡ Búsqueda rápida
                          </Badge>
                          <Badge className="bg-white/20 text-white border-white/30">
                            📊 Control de stock
                          </Badge>
                          <Badge className="bg-white/20 text-white border-white/30">
                            💰 Márgenes automáticos
                          </Badge>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                          <ShoppingBag className="h-16 w-16 text-white/80" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <ProductoList />
            </div>
          )}
          {currentView === 'search' && <BuscarProducto />}
          {currentView === 'create' && (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Agregar Nuevo Producto
                </h2>
                <ProductoForm onSuccess={() => setCurrentView('products')} />
              </CardContent>
            </Card>
          )}
        </main>
      </div>
      
      <Toaster />
    </QueryClientProvider>
  )
}

export default AppEcommerce
