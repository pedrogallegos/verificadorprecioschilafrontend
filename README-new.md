# Verificador de Precios - Frontend

Frontend moderno para el sistema de verificación de precios, construido con React, TypeScript y Tailwind CSS.

## 🚀 Características

- **CRUD Completo**: Crear, leer, actualizar y eliminar productos
- **Búsqueda Inteligente**: Buscar por código de barras, nombre o ID
- **Cálculo de Márgenes**: Visualización automática de márgenes de ganancia
- **Interfaz Moderna**: Diseño responsivo con Tailwind CSS
- **Alertas de Stock**: Notificaciones para productos con stock bajo
- **Validación Robusta**: Formularios validados con Zod y React Hook Form

## 🛠️ Tecnologías

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y servidor de desarrollo
- **Tailwind CSS** - Framework de CSS utility-first
- **TanStack Query** - Manejo de estado del servidor
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos

## 📦 Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
# Crear archivo .env
VITE_API_URL=http://localhost:4000/api
```

3. Iniciar servidor de desarrollo:
```bash
npm run dev
```

## 🏗️ Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Previsualizar build de producción
- `npm run lint` - Ejecutar linter

## 🔧 Configuración para Deployment

### Railway

1. Conectar repositorio a Railway
2. Configurar variables de entorno:
   - `VITE_API_URL`: URL de tu API backend
3. Railway detectará automáticamente que es un proyecto Vite y lo deployará

### Otras plataformas

Para otros servicios de hosting:

1. Ejecutar `npm run build`
2. Subir la carpeta `dist/` generada
3. Configurar las variables de entorno necesarias

## 📱 Estructura del Proyecto

```
src/
├── components/         # Componentes React
│   ├── BuscarProducto.tsx
│   ├── ProductoForm.tsx
│   └── ProductoList.tsx
├── hooks/             # Custom hooks
│   └── useProductos.ts
├── services/          # Servicios de API
│   └── api.ts
├── types/            # Definiciones de tipos
│   └── index.ts
├── App.tsx           # Componente principal
└── main.tsx          # Punto de entrada
```

## 🔌 API Integration

El frontend se conecta a una API REST que debe tener los siguientes endpoints:

- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/:id` - Obtener producto por ID/código/nombre
- `POST /api/productos` - Crear nuevo producto
- `PATCH /api/productos/:id` - Actualizar producto
- `DELETE /api/productos/:id` - Eliminar producto

## 📋 Modelo de Datos

```typescript
interface Producto {
  _id: string
  nombre: string
  precioPublico: number
  precioCompra: number
  descripcion: string
  codigoBarra: string
  cantidad: number
  createdAt: string
  updatedAt: string
}
```

## 🎨 Características de UI

- **Responsive Design**: Adaptado para móviles, tablets y desktop
- **Dark Mode Ready**: Preparado para modo oscuro
- **Loading States**: Estados de carga para mejor UX
- **Error Handling**: Manejo elegante de errores
- **Form Validation**: Validación en tiempo real
- **Stock Alerts**: Alertas visuales para stock bajo

## 🚢 Deployment en Railway

1. Haz fork de este repositorio
2. Conecta tu repositorio a Railway
3. Configura la variable de entorno `VITE_API_URL`
4. Railway detectará automáticamente el proyecto y lo deployará

## 📝 Licencia

MIT
