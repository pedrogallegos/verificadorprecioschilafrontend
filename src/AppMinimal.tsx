/**
 * ============================================
 * LAYOUT MINIMALISTA - ENFOQUE EN VELOCIDAD
 * ============================================
 * 
 * Diseño ultra-limpio para máxima velocidad de uso
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { ProductoList } from './components/ProductoList'
import { ProductoForm } from './components/ProductoForm'
import { BuscarProducto } from './components/BuscarProducto'
import { ThemeToggle } from './components/ThemeToggle'
import { 
  Search, 
  Plus, 
  Package,
  Zap,
  ArrowRight
} from 'lucide-react'
import { Toaster } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function AppMinimal() {
  const [quickSearch, setQuickSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  // Atajos de teclado para máxima velocidad
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowForm(false)
        setShowSearch(false)
        setQuickSearch('')
      }
      
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault()
            setShowSearch(!showSearch)
            break
          case 'n':
            e.preventDefault()
            setShowForm(!showForm)
            break
          case '/':
            e.preventDefault()
            document.getElementById('quick-search')?.focus()
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showForm, showSearch])

  if (showForm) {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Nuevo Producto
              </h1>
              <Button 
                variant="outline" 
                onClick={() => setShowForm(false)}
              >
                ← Volver
              </Button>
            </div>
            <ProductoForm 
              onSuccess={() => setShowForm(false)} 
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
        <Toaster />
      </QueryClientProvider>
    )
  }

  if (showSearch) {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Búsqueda Avanzada
              </h1>
              <Button 
                variant="outline" 
                onClick={() => setShowSearch(false)}
              >
                ← Volver
              </Button>
            </div>
            <BuscarProducto />
          </div>
        </div>
        <Toaster />
      </QueryClientProvider>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        
        {/* Header ultra-simple */}
        <header className="border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white dark:text-black" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Verificador Chila
                </h1>
              </div>
              
              <div className="flex items-center space-x-3">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        {/* Barra de búsqueda principal */}
        <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                <Input
                  id="quick-search"
                  type="text"
                  placeholder="Buscar producto rápidamente... (Ctrl+/)"
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-0 focus:ring-2 focus:ring-black dark:focus:ring-white rounded-lg shadow-sm"
                />
                {quickSearch && (
                  <Button 
                    onClick={() => setShowSearch(true)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                    size="sm"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              {/* Atajos de teclado */}
              <div className="flex items-center justify-center space-x-6 mt-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <kbd className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                    Ctrl+K
                  </kbd>
                  <span>Búsqueda avanzada</span>
                </div>
                <div className="flex items-center space-x-2">
                  <kbd className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                    Ctrl+N
                  </kbd>
                  <span>Nuevo producto</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white"
              onClick={() => setShowForm(true)}
            >
              <CardContent className="p-6 text-center">
                <Plus className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Agregar Producto
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Agregar nuevo producto al inventario
                </p>
                <div className="mt-4">
                  <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                    Crear Producto
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white"
              onClick={() => setShowSearch(true)}
            >
              <CardContent className="p-6 text-center">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Búsqueda Avanzada
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Buscar productos con filtros específicos
                </p>
                <div className="mt-4">
                  <Button variant="outline" className="border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black">
                    Buscar Productos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Lista de productos */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Package className="h-6 w-6 text-gray-900 dark:text-white" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Inventario
                </h2>
              </div>
            </div>
            
            <ProductoList />
          </div>
        </div>
      </div>
      
      <Toaster />
    </QueryClientProvider>
  )
}

export default AppMinimal
