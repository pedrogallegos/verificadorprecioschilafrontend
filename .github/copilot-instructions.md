<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Verificador de Precios - Frontend

Este es un proyecto React + TypeScript + Vite para el frontend del verificador de precios.

## Tecnologías usadas
- React 19 con TypeScript
- Vite como build tool
- Tailwind CSS para estilos
- TanStack Query para manejo de estado del servidor
- React Hook Form + Zod para formularios
- Axios para peticiones HTTP
- Lucide React para iconos

## Estructura del proyecto
- `/src/components/` - Componentes React reutilizables
- `/src/hooks/` - Custom hooks para lógica de negocio
- `/src/services/` - Servicios para API calls
- `/src/types/` - Definiciones de tipos TypeScript

## API Backend
El frontend se conecta a una API REST que maneja productos con los siguientes campos:
- nombre: string
- precioPublico: number
- precioCompra: number
- descripcion: string
- codigoBarra: string
- cantidad: number

## Características principales
- CRUD completo de productos
- Búsqueda por código de barras, nombre o ID
- Cálculo automático de márgenes de ganancia
- Interfaz responsive y moderna
- Alertas de stock bajo
- Validación de formularios

## Comandos disponibles
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Previsualizar build de producción
