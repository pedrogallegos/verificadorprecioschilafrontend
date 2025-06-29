import axios from 'axios'
import type { Producto, ProductoInput, ApiResponse } from '../types'

// Configuración base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export const productoService = {
  // Obtener todos los productos
  async getProductos(): Promise<Producto[]> {
    const response = await api.get<ApiResponse<Producto[]>>('/productos')
    return response.data.data
  },

  // Buscar producto por ID, código de barras o nombre
  async getProducto(identifier: string): Promise<Producto> {
    const response = await api.get<ApiResponse<Producto>>(`/productos/${identifier}`)
    return response.data.data
  },

  // Crear nuevo producto
  async createProducto(producto: ProductoInput): Promise<Producto> {
    const response = await api.post<ApiResponse<Producto>>('/productos', producto)
    return response.data.data
  },

  // Actualizar producto
  async updateProducto(identifier: string, producto: Partial<ProductoInput>): Promise<Producto> {
    const response = await api.patch<ApiResponse<Producto>>(`/productos/${identifier}`, producto)
    return response.data.data
  },

  // Eliminar producto
  async deleteProducto(identifier: string): Promise<Producto> {
    const response = await api.delete<ApiResponse<Producto>>(`/productos/${identifier}`)
    return response.data.data
  },

  // Buscar productos por nombre (búsqueda parcial)
  async searchProductos(searchTerm: string): Promise<Producto[]> {
    const response = await api.get<ApiResponse<Producto[]>>(`/productos/search?q=${encodeURIComponent(searchTerm)}`)
    return response.data.data
  },
}

export default api
