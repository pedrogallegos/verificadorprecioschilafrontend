# 🎨 **FRONTEND - DOCUMENTACIÓN COMPLETA**

## **🏗️ Estructura del Proyecto Frontend**

```
frontend-verificador-precios-chila/
├── public/                        # Archivos estáticos
├── src/
│   ├── components/               # Componentes React reutilizables
│   │   ├── BuscarProducto.tsx   # Componente de búsqueda de productos
│   │   ├── Logo.tsx             # Logo personalizado del sistema
│   │   ├── ProductoForm.tsx     # Formulario para crear/editar productos
│   │   └── ProductoList.tsx     # Lista de todos los productos
│   ├── hooks/                   # Custom hooks de React
│   │   └── useProductos.ts      # Hooks para manejo de estado de productos
│   ├── services/                # Servicios para comunicación con API
│   │   └── api.ts               # Cliente HTTP y funciones de API
│   ├── types/                   # Definiciones de tipos TypeScript
│   │   └── index.ts             # Tipos para productos y respuestas
│   ├── App.tsx                  # Componente principal de la aplicación
│   ├── index.css                # Estilos globales y clases CSS
│   └── main.tsx                 # Punto de entrada de React
├── .env                         # Variables de entorno
├── package.json                 # Dependencias y scripts
├── tailwind.config.js           # Configuración de Tailwind CSS
├── postcss.config.js            # Configuración de PostCSS
├── tsconfig.json                # Configuración de TypeScript
└── vite.config.ts               # Configuración de Vite
```

---

## 🧩 **TECNOLOGÍAS UTILIZADAS**

### **Framework y Librerías Principales**:
- **React 19**: Framework de UI con hooks modernos
- **TypeScript**: Tipado estático para JavaScript
- **Vite**: Build tool rápido y moderno
- **Tailwind CSS**: Framework de CSS utility-first

### **Gestión de Estado y Datos**:
- **TanStack Query (React Query)**: Cache y sincronización de estado del servidor
- **React Hook Form**: Manejo eficiente de formularios
- **Zod**: Validación de esquemas y datos

### **HTTP y Comunicación**:
- **Axios**: Cliente HTTP para comunicación con API
- **Custom hooks**: Abstracción de lógica de API

### **UI e Iconos**:
- **Lucide React**: Biblioteca de iconos moderna y limpia
- **CSS personalizado**: Clases de componentes reutilizables

---

## 📱 **COMPONENTES PRINCIPALES**

### **1. `App.tsx` - Componente Principal**

**Propósito**: Componente raíz que maneja la navegación y el layout general.

#### **Funcionalidades**:
- **Navegación por tabs**: Lista, Búsqueda, Agregar
- **Layout responsive**: Header fijo con navegación
- **Provider de React Query**: Configuración global de cache
- **Logo personalizado**: Marca visual del sistema

#### **Estados Locales**:
```typescript
const [currentView, setCurrentView] = useState<View>('list')
```

#### **Vistas Disponibles**:
- `'list'`: Lista de todos los productos
- `'search'`: Búsqueda de productos
- `'create'`: Formulario para agregar producto

#### **Estructura del Layout**:
```jsx
<QueryClientProvider>
  <div className="min-h-screen bg-gray-50">
    <header>
      {/* Logo + Navegación */}
    </header>
    <main>
      {/* Contenido dinámico según vista actual */}
    </main>
  </div>
</QueryClientProvider>
```

---

### **2. `components/ProductoList.tsx` - Lista de Productos**

**Propósito**: Muestra todos los productos del inventario en formato de tabla.

#### **Funcionalidades**:
- **Carga automática**: Obtiene productos al montar el componente
- **Estados de carga**: Loading, error, success
- **Información completa**: Precios, márgenes, stock
- **Indicadores visuales**: Colores para stock bajo/alto
- **Acciones**: Editar y eliminar productos

#### **Hook Principal**:
```typescript
const { data: productos = [], isLoading, error } = useProductos()
```

#### **Cálculos en Tiempo Real**:
- **Margen de ganancia**: `((precioPublico - precioCompra) / precioCompra) * 100`
- **Ganancia por unidad**: `precioPublico - precioCompra`
- **Valor total en stock**: `precioPublico * cantidad`

#### **Funciones Auxiliares**:
```typescript
// Calcula el margen de ganancia en porcentaje
const calculateMargin = (precioPublico: number, precioCompra: number) => {
  return ((precioPublico - precioCompra) / precioCompra * 100).toFixed(1)
}

// Determina el color del stock según la cantidad
const getStockColor = (cantidad: number) => {
  if (cantidad === 0) return 'text-red-600'      // Sin stock
  if (cantidad <= 5) return 'text-yellow-600'    // Stock bajo
  return 'text-green-600'                        // Stock normal
}
```

---

### **3. `components/BuscarProducto.tsx` - Búsqueda de Productos** ⭐

**Propósito**: Permite buscar productos por nombre con coincidencias parciales.

#### **Funcionalidades Clave**:
- **Búsqueda parcial**: Encuentra productos con términos que contengan el texto
- **Resultados múltiples**: Muestra todos los productos que coincidan
- **Búsqueda insensible**: No distingue mayúsculas/minúsculas
- **Vista de cards**: Cada resultado en formato de tarjeta
- **Información completa**: Precios, márgenes, stock, código de barras

#### **Estados Locales**:
```typescript
const [searchTerm, setSearchTerm] = useState('')     // Input del usuario
const [searchQuery, setSearchQuery] = useState('')  // Query para API
```

#### **Hook de Búsqueda**:
```typescript
const { data: productos = [], isLoading, error } = useSearchProductos(searchQuery)
```

#### **Flujo de Búsqueda**:
1. Usuario escribe en el input (`searchTerm`)
2. Al enviar formulario → actualiza `searchQuery`
3. Hook detecta cambio → hace petición a API
4. Resultados se muestran automáticamente

#### **Manejo de Estados**:
- **Loading**: Spinner mientras busca
- **Error**: Mensaje de error con reintento
- **Sin resultados**: Mensaje amigable con sugerencias
- **Resultados**: Grid de cards con productos

#### **Funciones Auxiliares**:
```typescript
// Maneja el envío del formulario de búsqueda
const handleSearch = (e: React.FormEvent) => {
  e.preventDefault()
  if (searchTerm.trim()) {
    setSearchQuery(searchTerm.trim())
  }
}

// Calcula margen de ganancia
const calculateMargin = (precioPublico: number, precioCompra: number) => {
  return ((precioPublico - precioCompra) / precioCompra * 100).toFixed(1)
}

// Determina colores de stock con clases de Tailwind
const getStockColor = (cantidad: number) => {
  if (cantidad === 0) return 'text-red-600 bg-red-50'
  if (cantidad <= 5) return 'text-yellow-600 bg-yellow-50'
  return 'text-green-600 bg-green-50'
}
```

---

### **4. `components/ProductoForm.tsx` - Formulario de Productos**

**Propósito**: Formulario para crear y editar productos con validación completa.

#### **Funcionalidades**:
- **Validación en tiempo real**: Usando Zod y React Hook Form
- **Modo dual**: Crear nuevo o editar existente
- **Cálculo automático**: Muestra margen en tiempo real
- **Manejo de errores**: Mensajes específicos por campo
- **UX optimizada**: Estados de loading y feedback

#### **Esquema de Validación (Zod)**:
```typescript
const productoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  precioPublico: z.number().min(0.01, 'El precio público debe ser mayor a 0'),
  precioCompra: z.number().min(0.01, 'El precio de compra debe ser mayor a 0'),
  descripcion: z.string().min(1, 'La descripción es requerida'),
  codigoBarra: z.string().min(1, 'El código de barras es requerido'),
  cantidad: z.number().min(1, 'La cantidad debe ser mayor a 0'),
})
```

#### **Hooks Utilizados**:
```typescript
// React Hook Form con validación Zod
const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = 
  useForm<ProductoInput>({
    resolver: zodResolver(productoSchema),
    defaultValues: producto ? { /* valores existentes */ } : undefined,
  })

// Hooks de mutación para crear/actualizar
const createProducto = useCreateProducto()
const updateProducto = useUpdateProducto()
```

#### **Flujo de Envío**:
1. Usuario llena formulario
2. Validación en tiempo real con Zod
3. Al enviar → determina si es crear o actualizar
4. Llama al hook correspondiente
5. Maneja success/error
6. Resetea formulario o navega

---

### **5. `components/Logo.tsx` - Logo Personalizado**

**Propósito**: Componente SVG personalizado para la marca del sistema.

#### **Características del Logo**:
- **Diseño temático**: Código de barras + símbolo de precio ($)
- **Tamaños flexibles**: sm, md, lg, xl
- **Colores consistentes**: Paleta azul del sistema
- **SVG optimizado**: Escalable y liviano

#### **Variantes**:
```typescript
// Logo completo para header
<Logo size="md" className="mr-3" />

// Logo simple para favicon
<LogoIcon className="h-8 w-8" />
```

#### **Elementos Visuales**:
- **Círculo con gradiente**: Fondo azul profesional
- **Código de barras**: Líneas verticales estilizadas
- **Símbolo $**: En círculo blanco para contraste
- **Gradiente**: Degradado azul moderno

---

## 🎣 **CUSTOM HOOKS**

### **`hooks/useProductos.ts` - Hooks de Estado**

**Propósito**: Abstrae la lógica de comunicación con la API usando React Query.

#### **Hooks Disponibles**:

##### **a) `useProductos()` - Lista Completa**
```typescript
const { data: productos = [], isLoading, error } = useProductos()
```
- **Función**: Obtiene todos los productos
- **Cache**: 5 minutos
- **Auto-refetch**: En focus de ventana

##### **b) `useProducto(identifier)` - Producto Individual**
```typescript
const { data: producto, isLoading, error } = useProducto(productId)
```
- **Función**: Obtiene producto específico por ID/código/nombre
- **Enabled**: Solo ejecuta si `identifier` existe
- **Uso**: Vista de detalle o edición

##### **c) `useSearchProductos(searchTerm)` - Búsqueda** ⭐
```typescript
const { data: productos = [], isLoading, error } = useSearchProductos('coca')
```
- **Función**: Búsqueda parcial por nombre
- **Enabled**: Solo ejecuta si `searchTerm` tiene contenido
- **Cache**: 2 minutos (más corto por ser búsqueda)
- **Debounce**: A través del estado local del componente

##### **d) `useCreateProducto()` - Crear Producto**
```typescript
const createProducto = useCreateProducto()
await createProducto.mutateAsync(nuevoProducto)
```
- **Función**: Crea nuevo producto
- **Optimistic Update**: Actualiza cache inmediatamente
- **Invalidation**: Refresca lista de productos

##### **e) `useUpdateProducto()` - Actualizar Producto**
```typescript
const updateProducto = useUpdateProducto()
await updateProducto.mutateAsync({ identifier: id, data: cambios })
```
- **Función**: Actualiza producto existente
- **Cache Update**: Actualiza tanto lista como producto individual
- **Optimistic**: Cambios inmediatos en UI

##### **f) `useDeleteProducto()` - Eliminar Producto**
```typescript
const deleteProducto = useDeleteProducto()
await deleteProducto.mutateAsync(productId)
```
- **Función**: Elimina producto
- **Cache Invalidation**: Remueve de todas las queries
- **Confirmación**: Manejada en el componente

#### **Configuración de React Query**:
```typescript
export const QUERY_KEYS = {
  productos: ['productos'] as const,
  producto: (id: string) => ['productos', id] as const,
  search: (term: string) => ['productos', 'search', term] as const,
}
```

---

## 🌐 **SERVICIOS DE API**

### **`services/api.ts` - Cliente HTTP**

**Propósito**: Maneja toda la comunicación con el backend de forma centralizada.

#### **Configuración Base**:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})
```

#### **Interceptores**:
- **Request**: Añade headers automáticamente
- **Response**: Maneja errores globalmente
- **Logging**: Registra errores para debugging

#### **Funciones del Servicio**:

##### **a) `getProductos()` - Obtener Todos**
```typescript
async getProductos(): Promise<Producto[]>
```
- **Endpoint**: `GET /productos`
- **Response**: Array de productos

##### **b) `getProducto(identifier)` - Obtener Uno**
```typescript
async getProducto(identifier: string): Promise<Producto>
```
- **Endpoint**: `GET /productos/:identifier`
- **Params**: ID, código de barras, o nombre exacto

##### **c) `searchProductos(searchTerm)` - Búsqueda** ⭐
```typescript
async searchProductos(searchTerm: string): Promise<Producto[]>
```
- **Endpoint**: `GET /productos/search?q=${searchTerm}`
- **Query**: Término de búsqueda URL-encoded
- **Response**: Array de productos que coincidan

##### **d) `createProducto(producto)` - Crear**
```typescript
async createProducto(producto: ProductoInput): Promise<Producto>
```
- **Endpoint**: `POST /productos`
- **Body**: Datos del nuevo producto

##### **e) `updateProducto(identifier, data)` - Actualizar**
```typescript
async updateProducto(identifier: string, data: Partial<ProductoInput>): Promise<Producto>
```
- **Endpoint**: `PATCH /productos/:identifier`
- **Body**: Campos a actualizar (parcial)

##### **f) `deleteProducto(identifier)` - Eliminar**
```typescript
async deleteProducto(identifier: string): Promise<Producto>
```
- **Endpoint**: `DELETE /productos/:identifier`
- **Response**: Producto eliminado

---

## 🏷️ **TIPOS TYPESCRIPT**

### **`types/index.ts` - Definiciones de Tipos**

**Propósito**: Define la estructura de datos y contratos de API de forma tipada.

#### **Tipo Principal - Producto**:
```typescript
export interface Producto {
  _id: string                    // ID de MongoDB
  nombre: string                 // Nombre del producto
  precioPublico: number          // Precio de venta
  precioCompra: number           // Precio de costo
  descripcion: string            // Descripción detallada
  codigoBarra: string            // Código de barras único
  cantidad: number               // Stock disponible
  createdAt: string              // Fecha de creación
  updatedAt: string              // Fecha de actualización
}
```

#### **Tipo para Input - ProductoInput**:
```typescript
export interface ProductoInput {
  nombre: string
  precioPublico: number
  precioCompra: number
  descripcion: string
  codigoBarra: string
  cantidad: number
}
// Nota: Sin _id, createdAt, updatedAt (manejados por backend)
```

#### **Tipo de Respuesta API**:
```typescript
export interface ApiResponse<T> {
  success: boolean               // Estado de la operación
  message: string                // Mensaje descriptivo
  data: T                        // Datos solicitados (tipados)
}
```

#### **Tipos de Utilidad**:
```typescript
// Para formularios de edición (todos los campos opcionales)
export type ProductoUpdate = Partial<ProductoInput>

// Para vistas de navegación
export type View = 'list' | 'create' | 'search'
```

---

## 🎨 **ESTILOS Y DISEÑO**

### **`index.css` - Estilos Globales**

**Propósito**: Define estilos base y clases de componentes reutilizables.

#### **Configuración Base**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### **Clases de Componentes Personalizadas**:

##### **Botones**:
```css
.btn-primary {
  background-color: #2563eb;
  color: white;
  font-weight: 500;
  /* ... más estilos */
}

.btn-secondary { /* Estilo para botones secundarios */ }
.btn-outline { /* Estilo para botones con borde */ }
```

##### **Formularios**:
```css
.input-field {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  /* ... focus styles, transitions */
}
```

##### **Cards y Contenedores**:
```css
.card {
  background-color: white;
  box-shadow: /* sombra sutil */;
  border-radius: 0.5rem;
  padding: 1.5rem;
  /* ... */
}
```

##### **Alertas y Estados**:
```css
.alert-success { /* Verde para éxito */ }
.alert-error { /* Rojo para errores */ }
.alert-warning { /* Amarillo para advertencias */ }
```

### **Configuración de Tailwind**:
```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

---

## ⚙️ **CONFIGURACIÓN Y BUILD**

### **Variables de Entorno (`.env`)**:
```env
VITE_API_URL=http://localhost:4000/api
```

### **Scripts Disponibles**:
- `npm run dev`: Servidor de desarrollo con HMR
- `npm run build`: Build de producción optimizado
- `npm run preview`: Preview del build de producción
- `npm run lint`: Linting con ESLint

### **Configuración de Vite**:
- **HMR**: Hot Module Replacement para desarrollo rápido
- **Build optimizado**: Bundling y minificación automática
- **TypeScript**: Soporte nativo sin configuración adicional

---

## 🔄 **FLUJO DE DATOS**

### **Arquitectura de Estado**:
```
UI Components
    ↓ (user actions)
Custom Hooks (React Query)
    ↓ (HTTP requests)
API Services (Axios)
    ↓ (REST calls)
Backend API
    ↓ (database operations)
MongoDB
```

### **Patrón de Actualización**:
1. **Optimistic Updates**: UI se actualiza inmediatamente
2. **Background Sync**: React Query sincroniza con servidor
3. **Error Handling**: Rollback automático en caso de error
4. **Cache Invalidation**: Mantiene datos frescos automáticamente

---

Esta documentación cubre completamente la arquitectura, componentes, hooks, servicios y flujo de datos del frontend. ¿Te gustaría que profundice en algún aspecto específico o agregue más detalles sobre alguna funcionalidad?
