import { useState } from 'react'

export interface ThemeColors {
  primary: string
  primaryLight: string
  primaryDark: string
  success: string
  warning: string
  error: string
}

export interface AppTheme {
  id: string
  name: string
  description: string
  primary: string
  secondary: string
  accent: string
  colors: ThemeColors
}

// Hook para usar el tema
export const useAppTheme = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'blue'
  })

  const changeTheme = (theme: AppTheme) => {
    setCurrentTheme(theme.id)
  }

  return {
    currentTheme,
    changeTheme
  }
}
