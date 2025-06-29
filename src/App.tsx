/**
 * ============================================
 * COMPONENTE PRINCIPAL - APP.TSX
 * ============================================
 * 
 * Este es el componente raíz de la aplicación que maneja:
 * - Configuración de React Query (cache de estado del servidor)
 * - Navegación entre diferentes vistas (Lista, Búsqueda, Crear)
 * - Layout general con header y navegación
 * - Proveedor de contexto para toda la aplicación
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ProductoList } from './components/ProductoList'
import { ProductoForm } from './components/ProductoForm'
import { BuscarProducto } from './components/BuscarProducto'
import { Logo } from './components/Logo'
import { Package, Plus, Search } from 'lucide-react'

/**
 * CONFIGURACIÓN DE REACT QUERY
 * 
 * React Query maneja el cache y sincronización con el servidor:
 * - retry: 1 → Solo reintenta una vez en caso de error
 * - refetchOnWindowFocus: false → No recargar al cambiar de ventana
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

/**
 * TIPOS PARA NAVEGACIÓN
 * 
 * Define las vistas disponibles en la aplicación:
 * - 'list': Lista de todos los productos
 * - 'create': Formulario para agregar producto nuevo
 * - 'search': Búsqueda de productos por nombre
 */
type View = 'list' | 'create' | 'search'

function App() {
  // Estado para controlar qué vista está activa
  const [currentView, setCurrentView] = useState<View>('list')

  /**
   * RENDERIZADO CONDICIONAL DE VISTAS
   * 
   * Función que determina qué componente mostrar según la vista activa.
   * Cada vista maneja su propia lógica y estado interno.
   */
  const renderView = () => {
    switch (currentView) {
      case 'create':
        // Formulario con callback para volver a lista después de crear
        return <ProductoForm onSuccess={() => setCurrentView('list')} />
      case 'search':
        // Componente de búsqueda independiente
        return <BuscarProducto />
      default:
        // Vista por defecto: lista completa de productos
        return <ProductoList />
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Logo className="mr-3" size="md" />
                <h1 className="text-xl font-bold text-gray-900">
                  Verificador de Precios
                </h1>
              </div>
              
              {/* Navigation */}
              <nav className="flex space-x-4">
                <button
                  onClick={() => setCurrentView('list')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'list'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Package className="h-4 w-4 inline mr-2" />
                  Productos
                </button>
                <button
                  onClick={() => setCurrentView('search')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'search'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Search className="h-4 w-4 inline mr-2" />
                  Buscar
                </button>
                <button
                  onClick={() => setCurrentView('create')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'create'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Plus className="h-4 w-4 inline mr-2" />
                  Agregar
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderView()}
        </main>
      </div>
    </QueryClientProvider>
  )
}

export default App
