/**
 * ============================================
 * COMPONENTE PRINCIPAL - APP.TSX (REDISEÑADO CON SHADCN/UI)
 * ============================================
 * 
 * Este es el componente raíz de la aplicación que maneja:
 * - Configuración de React Query (cache de estado del servidor)
 * - Navegación entre diferentes vistas (Lista, Búsqueda, Crear)
 * - Layout general con header y navegación moderno usando shadcn/ui
 * - Proveedor de contexto para toda la aplicación
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ProductoList } from './components/ProductoList'
import { ProductoForm } from './components/ProductoForm'
import { BuscarProducto } from './components/BuscarProducto'
import { CommandPalette } from './components/CommandPalette'
import { ThemeToggle } from './components/ThemeToggle'
import { Logo } from './components/Logo'
import { Package, Plus, Search, Command } from 'lucide-react'
import { Toaster } from '@/components/ui/toaster'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

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

function App() {
  const [commandOpen, setCommandOpen] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card shadow-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Logo className="mr-3" size="md" />
                <h1 className="text-xl font-bold text-foreground">
                  Verificador de Precios
                </h1>
              </div>
              
              {/* Controles del header */}
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCommandOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Command className="h-4 w-4" />
                  Búsqueda rápida
                  <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">
                    Ctrl+K
                  </kbd>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content with Tabs */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="list" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Productos
              </TabsTrigger>
              <TabsTrigger value="search" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Buscar
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Agregar
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              <ProductoList />
            </TabsContent>
            
            <TabsContent value="search">
              <BuscarProducto />
            </TabsContent>
            
            <TabsContent value="create">
              <ProductoForm onSuccess={() => {
                // Cambiar a la tab de productos después de crear
                const listTab = document.querySelector('[value="list"]') as HTMLElement;
                listTab?.click();
              }} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
      
      {/* Command Palette */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
