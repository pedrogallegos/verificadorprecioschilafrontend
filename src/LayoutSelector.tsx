/**
 * ============================================
 * SELECTOR DE LAYOUTS - PARA PROBAR DISEÑOS
 * ============================================
 */

import { useState } from 'react'
import App from './App'
import AppFunctional from './AppFunctional'
import AppPOS from './AppPOS'
import AppEcommerce from './AppEcommerce'
import AppMinimal from './AppMinimal'
import AppDashboard from './AppDashboard'
import AppMobile from './AppMobile'
import AppRetail from './AppRetail'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  LayoutDashboard, 
  Store, 
  ShoppingBag, 
  Minimize2,
  Palette,
  Sidebar,
  Smartphone,
  Package,
  Zap
} from 'lucide-react'

const layouts = [
  {
    id: 'default',
    name: 'Original',
    description: 'Diseño inicial del proyecto',
    icon: LayoutDashboard,
    component: App,
    color: 'bg-blue-500'
  },
  {
    id: 'functional',
    name: '🔥 Funcional',
    description: 'CON TUS DATOS REALES - Estadísticas calculadas',
    icon: Zap,
    component: AppFunctional,
    color: 'bg-yellow-500',
    featured: true
  },
  {
    id: 'dashboard',
    name: 'Dashboard Pro',
    description: 'Admin panel con sidebar profesional',
    icon: Sidebar,
    component: AppDashboard,
    color: 'bg-indigo-500'
  },
  {
    id: 'mobile',
    name: 'Mobile App',
    description: 'Diseño tipo app móvil con tabs',
    icon: Smartphone,
    component: AppMobile,
    color: 'bg-pink-500'
  },
  {
    id: 'retail',
    name: 'Retail Manager',
    description: 'Especializado en gestión de inventario',
    icon: Package,
    component: AppRetail,
    color: 'bg-orange-500'
  },
  {
    id: 'pos',
    name: 'Dashboard POS',
    description: 'Estilo Point of Sale profesional',
    icon: Store,
    component: AppPOS,
    color: 'bg-green-500'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Diseño moderno tipo tienda online',
    icon: ShoppingBag,
    component: AppEcommerce,
    color: 'bg-purple-500'
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    description: 'Interfaz limpia y simple',
    icon: Minimize2,
    component: AppMinimal,
    color: 'bg-gray-500'
  }
]

export default function LayoutSelector() {
  const [selectedLayout, setSelectedLayout] = useState('default')
  const [showSelector, setShowSelector] = useState(true)

  const currentLayout = layouts.find(l => l.id === selectedLayout)
  const CurrentComponent = currentLayout?.component || App

  if (!showSelector) {
    return <CurrentComponent />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Palette className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Selector de Diseños UI/UX
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Elige el diseño que más te guste para tu verificador de precios
          </p>
        </div>

        {/* Layout Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {layouts.map((layout) => {
            const Icon = layout.icon
            const isSelected = selectedLayout === layout.id
            
            return (
              <Card 
                key={layout.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg relative ${
                  isSelected 
                    ? 'ring-2 ring-blue-500 shadow-lg transform scale-105' 
                    : 'hover:shadow-md'
                } ${layout.featured ? 'ring-2 ring-yellow-400 shadow-md' : ''}`}
                onClick={() => setSelectedLayout(layout.id)}
              >
                {layout.featured && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <Badge className="bg-yellow-500 text-yellow-900 animate-pulse">
                      ¡RECOMENDADO!
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <div className={`w-12 h-12 ${layout.color} rounded-full flex items-center justify-center mx-auto mb-2 ${layout.featured ? 'animate-pulse' : ''}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{layout.name}</CardTitle>
                  {isSelected && (
                    <Badge variant="default" className="mt-1">
                      Seleccionado
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="text-center">
                  <p className={`text-sm text-gray-600 ${layout.featured ? 'font-medium' : ''}`}>
                    {layout.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Preview Section */}
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">
            Vista previa: {currentLayout?.name}
          </h2>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => setShowSelector(false)}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Ver diseño completo
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                // Abrir en nueva pestaña
                window.open('/preview', '_blank')
              }}
            >
              Abrir en nueva pestaña
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-center">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Puedes cambiar entre diseños fácilmente editando el archivo <code>main.tsx</code>
          </p>
        </div>
      </div>
    </div>
  )
}
