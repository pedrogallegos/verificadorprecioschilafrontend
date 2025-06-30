/**
 * ============================================
 * CONFIGURADOR DE TEMAS - PALETAS DE COLORES
 * ============================================
 * 
 * Permite cambiar los colores base de la aplicación
 */

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { AppTheme } from '@/hooks/useAppTheme'
import { 
  Palette, 
  Check,
  Sunrise,
  Waves,
  TreePine,
  Zap,
  Heart,
  Moon
} from 'lucide-react'

const colorThemes = [
  {
    id: 'blue',
    name: 'Azul Corporativo',
    description: 'Azul profesional y confiable',
    icon: Waves,
    primary: 'bg-blue-600',
    secondary: 'bg-blue-100',
    accent: 'bg-blue-500',
    colors: {
      primary: '#2563eb',
      primaryLight: '#dbeafe',
      primaryDark: '#1d4ed8',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    }
  },
  {
    id: 'emerald',
    name: 'Verde Esmeralda',
    description: 'Verde moderno y fresco',
    icon: TreePine,
    primary: 'bg-emerald-600',
    secondary: 'bg-emerald-100',
    accent: 'bg-emerald-500',
    colors: {
      primary: '#059669',
      primaryLight: '#d1fae5',
      primaryDark: '#047857',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    }
  },
  {
    id: 'orange',
    name: 'Naranja Energético',
    description: 'Naranja vibrante y dinámico',
    icon: Sunrise,
    primary: 'bg-orange-600',
    secondary: 'bg-orange-100',
    accent: 'bg-orange-500',
    colors: {
      primary: '#ea580c',
      primaryLight: '#fed7aa',
      primaryDark: '#c2410c',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    }
  },
  {
    id: 'purple',
    name: 'Morado Elegante',
    description: 'Morado sofisticado y moderno',
    icon: Zap,
    primary: 'bg-purple-600',
    secondary: 'bg-purple-100',
    accent: 'bg-purple-500',
    colors: {
      primary: '#9333ea',
      primaryLight: '#e9d5ff',
      primaryDark: '#7c3aed',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    }
  },
  {
    id: 'rose',
    name: 'Rosa Moderno',
    description: 'Rosa contemporáneo y elegante',
    icon: Heart,
    primary: 'bg-rose-600',
    secondary: 'bg-rose-100',
    accent: 'bg-rose-500',
    colors: {
      primary: '#e11d48',
      primaryLight: '#fecdd3',
      primaryDark: '#be123c',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    }
  },
  {
    id: 'slate',
    name: 'Gris Minimalista',
    description: 'Gris elegante y neutro',
    icon: Moon,
    primary: 'bg-slate-600',
    secondary: 'bg-slate-100',
    accent: 'bg-slate-500',
    colors: {
      primary: '#475569',
      primaryLight: '#f1f5f9',
      primaryDark: '#334155',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    }
  }
]

interface ThemeConfiguratorProps {
  onThemeChange: (theme: AppTheme) => void
  currentTheme: string
}

export const ThemeConfigurator = ({ onThemeChange, currentTheme }: ThemeConfiguratorProps) => {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme)

  const applyTheme = (theme: AppTheme) => {
    // Función para convertir hex a HSL para shadcn/ui
    const hexToHsl = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255
      const g = parseInt(hex.slice(3, 5), 16) / 255
      const b = parseInt(hex.slice(5, 7), 16) / 255
      
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let h: number, s: number
      const l = (max + min) / 2
      
      if (max === min) {
        h = s = 0
      } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break
          case g: h = (b - r) / d + 2; break
          case b: h = (r - g) / d + 4; break
          default: h = 0
        }
        h /= 6
      }
      
      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
    }
    
    // Cambiar variables CSS
    const root = document.documentElement
    const primaryHsl = hexToHsl(theme.colors.primary)
    
    // Actualizar variables personalizadas
    root.style.setProperty('--primary-hex', theme.colors.primary)
    root.style.setProperty('--primary-light', theme.colors.primaryLight)
    root.style.setProperty('--primary-dark', theme.colors.primaryDark)
    
    // Actualizar variables de shadcn/ui para que los botones se vean bien
    root.style.setProperty('--primary', primaryHsl)
  }

  // Inicializar el tema al cargar el componente
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') || 'blue'
    const theme = colorThemes.find(t => t.id === savedTheme)
    if (theme) {
      applyTheme(theme)
    }
  }, [])

  const handleThemeChange = (theme: AppTheme) => {
    setSelectedTheme(theme.id)
    applyTheme(theme)
    onThemeChange(theme)
    localStorage.setItem('app-theme', theme.id)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Palette className="h-8 w-8 text-primary" />
          <h2 className="text-2xl font-bold">Configurador de Colores</h2>
        </div>
        <p className="text-gray-600">
          Elige la paleta de colores que más te guste para tu aplicación
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colorThemes.map((theme) => {
          const Icon = theme.icon
          const isSelected = selectedTheme === theme.id
          
          return (
            <Card 
              key={theme.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg relative ${
                isSelected 
                  ? 'ring-2 ring-blue-500 shadow-lg transform scale-105' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => handleThemeChange(theme)}
            >
              {isSelected && (
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="bg-green-500 text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-2">
                <div className={`w-12 h-12 ${theme.primary} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{theme.name}</CardTitle>
                {isSelected && (
                  <Badge variant="default" className="mt-1">
                    Seleccionado
                  </Badge>
                )}
              </CardHeader>
              
              <CardContent className="text-center space-y-3">
                <p className="text-sm text-gray-600">{theme.description}</p>
                
                {/* Preview de colores */}
                <div className="flex justify-center gap-2">
                  <div 
                    className={`w-8 h-8 rounded-full ${theme.primary}`}
                    title="Color primario"
                  />
                  <div 
                    className={`w-8 h-8 rounded-full ${theme.secondary}`}
                    title="Color secundario"
                  />
                  <div 
                    className={`w-8 h-8 rounded-full ${theme.accent}`}
                    title="Color de acento"
                  />
                </div>
                
                {/* Preview de componentes */}
                <div className="space-y-2">
                  <div 
                    className={`${theme.primary} text-white px-3 py-1 rounded text-xs`}
                  >
                    Botón Primario
                  </div>
                  <div 
                    className={`${theme.secondary} text-gray-700 px-3 py-1 rounded text-xs`}
                  >
                    Fondo Suave
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500">
          Los cambios se aplicarán inmediatamente. El tema se guardará para futuras sesiones.
        </p>
      </div>
    </div>
  )
}